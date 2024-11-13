import type Hls from 'hls.js';
import type { ILogger, Level } from 'hls.js';
import { CapLevelController } from 'hls.js';

/**
 * A custom HLS.js CapLevelController that behaves like the default one, except
 * it enforces a "minimum maximum" to avoid forced capping to lower quality at small sizes
 */
class MinCapLevelController extends CapLevelController {
  // Never cap below this level.
  static minMaxResolution = 720;

  constructor(hls: Hls) {
    super(hls);
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

  getMaxLevel(capLevelIndex: number) {
    const baseMaxLevel = super.getMaxLevel(capLevelIndex);
    const validLevels = this.getValidLevels(capLevelIndex);

    // Default maxLevel selection ended up out of bounds to indicate (e.g. -1), so use it
    if (!validLevels[baseMaxLevel]) return baseMaxLevel;

    const baseMaxLevelResolution = Math.min(validLevels[baseMaxLevel].width, validLevels[baseMaxLevel].height);
    // Use this syntax to grab static on the off chance of subclassing/best practice
    const preferredMinMaxResolution = (this.constructor as typeof MinCapLevelController).minMaxResolution;

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
