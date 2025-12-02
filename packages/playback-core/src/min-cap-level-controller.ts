import Hls from './hls';
import type { HlsInterface } from './hls';
import type { Level } from 'hls.js';
import type { MaxAutoResolutionValue } from './types';

// The hls.js commonJS module doesn't export CapLevelController, so get it from the default config.
const CapLevelController = Hls.DefaultConfig.capLevelController;

/**
 * Resolution pricing tiers based on total pixels (width * height)
 * Values align with Mux Video pricing tiers: https://www.mux.com/docs/pricing/video#resolution-based-pricing
 */
const RESOLUTION_PIXEL_LIMITS: Record<string, number> = {
  '720p': 921600, // Up to 921,600 pixels (1280x720)
  '1080p': 2073600, // Up to 2,073,600 pixels (1920x1080)
  '1440p': 4194304, // Up to 4,194,304 pixels (2560x1440)
  '2160p': 8294400, // Up to 8,294,400 pixels (3840x2160)
};

/**
 * Convert resolution string to maximum total pixels
 * Only accepts predefined tiers from the list
 */
function resolutionToMaxPixels(resolution: string): number | undefined {
  const normalized = resolution.toLowerCase().trim();

  return RESOLUTION_PIXEL_LIMITS[normalized];
}

/**
 * A custom HLS.js CapLevelController that behaves like the default one, except
 * it enforces a "minimum maximum" to avoid forced capping to lower quality at small sizes
 */
class MinCapLevelController extends CapLevelController {
  // Never cap below this level.
  static minMaxResolution = 720;
  private static maxAutoResolution = new WeakMap<HlsInterface, MaxAutoResolutionValue>();

  constructor(hls: HlsInterface) {
    super(hls);
  }

  static setMaxAutoResolution(hls: HlsInterface, maxAutoResolution: MaxAutoResolutionValue | undefined) {
    if (maxAutoResolution) {
      MinCapLevelController.maxAutoResolution.set(hls, maxAutoResolution);
    } else {
      MinCapLevelController.maxAutoResolution.delete(hls);
    }
  }

  private getMaxAutoResolution(): MaxAutoResolutionValue | undefined {
    // NOTE: hls is a TS-private member in CapLevelController. Should be TS-protected
    // @ts-ignore
    const hlsInstance = this.hls;
    return MinCapLevelController.maxAutoResolution.get(hlsInstance) ?? undefined;
  }

  get levels() {
    // NOTE: hls is a TS-private member in CapLevelController. Should be TS-protected (CJP)
    // @ts-ignore
    return (this.hls.levels ?? []) as Level[];
  }

  getValidLevels(capLevelIndex: number) {
    return this.levels.filter(
      // NOTE: isLevelAllowed is a TS-private member in CapLevelController. Should be TS-protected (CJP)
      // @ts-ignore
      (level, index) => this.isLevelAllowed(level) && index <= capLevelIndex
    );
  }

  /**
   * Get the maximum level capped to maxAutoResolution
   *
   * Selection logic (in order of priority):
   * 1. If there's an exact match for maxAutoResolution, use it
   * 2. If no exact match exists, always select the highest quality that doesn't exceed the cap
   *    (to prevent extra costs by going over the resolution limit)
   */
  private getMaxLevelCapped(capLevelIndex: number): number {
    const validLevels = this.getValidLevels(capLevelIndex);
    const maxAutoResolution = this.getMaxAutoResolution();

    if (!maxAutoResolution) {
      return super.getMaxLevel(capLevelIndex);
    }

    // Convert resolution string to maximum total pixels
    const maxPixels = resolutionToMaxPixels(maxAutoResolution);
    if (!maxPixels) {
      // Invalid resolution string, fallback to default behavior
      return super.getMaxLevel(capLevelIndex);
    }

    // Compare by total pixels (width * height) to match Mux Video pricing tiers
    // Find levels that don't exceed the cap (total pixels <= maxPixels)
    const levelsWithinCap = validLevels.filter((level) => {
      const totalPixels = level.width * level.height;
      return totalPixels <= maxPixels;
    });

    // Check if there's an exact match first (total pixels === maxPixels)
    const exactMatch = levelsWithinCap.findIndex((level) => {
      const totalPixels = level.width * level.height;
      return totalPixels === maxPixels;
    });

    if (exactMatch !== -1) {
      const exactLevel = levelsWithinCap[exactMatch];
      return validLevels.findIndex((level) => level === exactLevel);
    }

    // No exact match - always select the highest quality that doesn't exceed the cap
    if (levelsWithinCap.length === 0) {
      // No levels within cap, return the lowest level
      return 0;
    }
    // Return the highest quality within cap (last item, since levels are ordered from lowest to highest)
    const highestQualityWithinCap = levelsWithinCap[levelsWithinCap.length - 1];
    return validLevels.findIndex((level) => level === highestQualityWithinCap);
  }

  getMaxLevel(capLevelIndex: number) {
    if (this.getMaxAutoResolution() !== undefined) {
      return this.getMaxLevelCapped(capLevelIndex);
    }

    const baseMaxLevel = super.getMaxLevel(capLevelIndex);
    const validLevels = this.getValidLevels(capLevelIndex);

    // Default maxLevel selection ended up out of bounds to indicate e.g. no capping/no levels available (yet), so use it
    if (!validLevels[baseMaxLevel]) return baseMaxLevel;

    const baseMaxLevelResolution = Math.min(validLevels[baseMaxLevel].width, validLevels[baseMaxLevel].height);
    const preferredMinMaxResolution = MinCapLevelController.minMaxResolution;

    // Default maxLevel selection already meets our conditions, so use it
    if (baseMaxLevelResolution >= preferredMinMaxResolution) return baseMaxLevel;

    // Default maxLevel selection is below the preferred "min max", so find the lowest level
    // that is >= the preference. We can simply repurpose CapLevelController:getMaxLevelByMediaSize()
    // for this, "lying" about the element's size.
    // NOTE: Since CapLevelController:getMaxLevelByMediaSize() uses "max square size" under the hood
    // already, we don't need to duplicate that logic here.
    const maxLevel = CapLevelController.getMaxLevelByMediaSize(
      validLevels,
      preferredMinMaxResolution * (16 / 9),
      preferredMinMaxResolution
    );

    return maxLevel;
  }
}

export default MinCapLevelController;
