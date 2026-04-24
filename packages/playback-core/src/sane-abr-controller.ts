import Hls from './hls';
import type { HlsInterface } from './hls';

// The hls.js commonJS module doesn't re-export AbrController as a value, so get it from the default config.
const AbrController = Hls.DefaultConfig.abrController;

/**
 * Default minimum sample duration (ms) used by the EWMA bandwidth estimator.
 * Matches the hls.js / Shaka historical default. See the long-form rationale
 * on {@link createSaneAbrController} for why callers may want to lower this.
 */
export const DEFAULT_MIN_BANDWIDTH_SAMPLE_DURATION_MS = 50;

const patchEstimator = (controller: InstanceType<typeof AbrController>, minDelayMs: number) => {
  // `minDelayMs_` is a private member of EwmaBandWidthEstimator; access via `any`.
  const estimator = (controller as any).bwEstimator;
  if (estimator) {
    estimator.minDelayMs_ = minDelayMs;
  }
};

/**
 * Create a custom hls.js AbrController class that exposes the EWMA bandwidth
 * estimator's minimum sample-duration floor (`minDelayMs_`) as a configurable
 * constructor argument.
 *
 * Background
 * ----------
 * `EwmaBandWidthEstimator#sample()` clamps `durationMs` to `minDelayMs_`
 * before computing `bandwidth = 8000 * numBytes / durationMs`. hls.js
 * inherited `minDelayMs_ = 50` from Shaka in 2016 as a defensive clamp
 * against three failure modes:
 *   1. HTTP cache hits producing sub-millisecond "downloads"
 *      (e.g. 5 MB / 0.2ms = 200 Gbps samples poisoning the fast EWMA).
 *   2. `performance.now()` timer resolution (historically ~1ms, post-Spectre
 *      clamped to 100µs–2ms depending on the browser) producing
 *      duration = 0 and bandwidth = Infinity.
 *   3. Statistical noise on very short transfers where OS scheduling /
 *      TCP ACK timing dominate over actual network capacity.
 *
 * The 50ms value is a conservative round number Shaka picked; it is not
 * derived from any measurement of real fragment sizes or bandwidth. We
 * preserve it as the default here so behavior matches upstream hls.js, but
 * expose this factory so callers can tune it.
 *
 * Why a caller might lower it
 * ---------------------------
 * Some of the original assumptions behind 50ms have weakened over the years:
 *   - Fragment bitrates are much higher. A 100 Mbps+ connection can truly
 *     finish a 50KB fragment in ~4ms, so the 50ms floor will systematically
 *     undercount fast transfers of small segments on modern 4K/HDR ladders.
 *   - hls.js now guards against cache-hit samples elsewhere
 *     (init-segment / reload filtering), partly handling the original
 *     motivation for the floor.
 *   - Worst-case timer resolution is now ~2ms (Spectre clamping), so values
 *     as low as ~5ms are still comfortably above divide-by-near-zero
 *     territory.
 *
 * Callers that want to experiment with lower floors (e.g. 5, or 0 to
 * disable the clamp entirely) can pass their own `minDelayMs`.
 */
export const createSaneAbrController = (
  minDelayMs: number = DEFAULT_MIN_BANDWIDTH_SAMPLE_DURATION_MS
): typeof AbrController => {
  return class SaneAbrController extends AbrController {
    constructor(hls: HlsInterface) {
      super(hls);
      patchEstimator(this, minDelayMs);
    }

    public resetEstimator(abrEwmaDefaultEstimate?: number) {
      super.resetEstimator(abrEwmaDefaultEstimate);
      // `this.bwEstimator` is replaced with a fresh instance on reset; re-poke it.
      patchEstimator(this, minDelayMs);
    }
  };
};

/**
 * Default `SaneAbrController` class wired up with the default
 * {@link DEFAULT_MIN_BANDWIDTH_SAMPLE_DURATION_MS} floor. Preserved for code that
 * imported the class directly (e.g. `new SaneAbrController(hls)`).
 */
const SaneAbrController = createSaneAbrController();
export default SaneAbrController;
