import Hls from './hls';
import type { HlsInterface } from './hls';
import type { Level } from 'hls.js';

// The hls.js commonJS module doesn't export CapLevelController, so get it from the default config.
const CapLevelController = Hls.DefaultConfig.capLevelController;

/**
 * A custom HLS.js CapLevelController that behaves like the default one, except
 * it enforces a "minimum maximum" to avoid forced capping to lower quality at small sizes
 */
class MinCapLevelController extends CapLevelController {
  // Never cap below this level.
  static minMaxResolution = 720;
  private static preferLowerResolution = new WeakMap<HlsInterface, boolean>();
  private static capDefaultResolution = new WeakMap<HlsInterface, number>();

  constructor(hls: HlsInterface) {
    super(hls);
  }

  /**
   * Set the preferLowerResolution flag for a specific hls instance
   */
  static setPreferLowerResolution(hls: HlsInterface, preferLowerResolution: boolean | undefined) {
    if (preferLowerResolution === undefined) {
      MinCapLevelController.preferLowerResolution.delete(hls);
    } else {
      MinCapLevelController.preferLowerResolution.set(hls, preferLowerResolution);
    }
  }

  static setCapDefaultResolution(hls: HlsInterface, capDefaultResolution: number | undefined) {
    if (capDefaultResolution) {
      MinCapLevelController.capDefaultResolution.set(hls, capDefaultResolution);
    } else {
      MinCapLevelController.capDefaultResolution.delete(hls);
    }
  }

  /**
   * Get the preferLowerResolution flag for a specific hls instance
   */
  private getPreferLowerResolution(): boolean {
    // NOTE: hls is a TS-private member in CapLevelController. Should be TS-protected (CJP)
    // @ts-ignore
    const hlsInstance = this.hls;
    // @ts-ignore
    const value = MinCapLevelController.preferLowerResolution.get(hlsInstance);
    // Default to false if not explicitly set
    return value ?? false;
  }

  private getCapDefaultResolution(): number | undefined {
    // NOTE: hls is a TS-private member in CapLevelController. Should be TS-protected (CJP)
    // @ts-ignore
    const hlsInstance = this.hls;
    // @ts-ignore
    return MinCapLevelController.capDefaultResolution.get(hlsInstance) ?? undefined;
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
   * Get the maximum level capped to capDefaultResolution
   *
   * Selection logic (in order of priority):
   * 1. If there's an exact match for capDefaultResolution, use it
   * 2. If no exact match exists, choose based on preferLowerResolution:
   *    - preferLowerResolution = false (default): take the lowest value that exceeds the cap
   *    - preferLowerResolution = true: take the highest value that doesn't exceed the cap
   */
  private getMaxLevelCapped(capLevelIndex: number): number {
    const validLevels = this.getValidLevels(capLevelIndex);
    const capDefaultResolution = this.getCapDefaultResolution();

    if (!capDefaultResolution) {
      return super.getMaxLevel(capLevelIndex);
    }

    // Note:capDefaultResolution refers to the height
    const maxHeight = capDefaultResolution;

    // Find levels that don't exceed the cap
    const levelsWithinCap = validLevels.filter((level) => {
      return level.height <= maxHeight;
    });

    // Find levels that exceed the cap
    const levelsAboveCap = validLevels.filter((level) => {
      return level.height > maxHeight;
    });

    // Check if there's an exact match first
    const exactMatch = levelsWithinCap.findIndex((level) => {
      return level.height === maxHeight;
    });

    if (exactMatch !== -1) {
      const exactLevel = levelsWithinCap[exactMatch];
      return validLevels.findIndex((level) => level === exactLevel);
    }

    // No exact match - choose based on preferLowerResolution
    const preferLower = this.getPreferLowerResolution();

    if (preferLower) {
      // preferLowerResolution = true: take the highest value that doesn't exceed the cap
      if (levelsWithinCap.length === 0) {
        // No levels within cap, return the lowest level
        return 0;
      }
      // Return the highest quality within cap (last item, since levels are ordered from lowest to highest)
      const highestQualityWithinCap = levelsWithinCap[levelsWithinCap.length - 1];
      return validLevels.findIndex((level) => level === highestQualityWithinCap);
    } else {
      // preferLowerResolution = false (default): take the lowest value that exceeds the cap
      if (levelsAboveCap.length === 0) {
        // No levels above cap, fallback to highest within cap (or lowest level if none)
        if (levelsWithinCap.length > 0) {
          const highestQualityWithinCap = levelsWithinCap[levelsWithinCap.length - 1];
          return validLevels.findIndex((level) => level === highestQualityWithinCap);
        }
        return 0;
      }
      // Return the lowest quality that exceeds the cap (first item, since levels are ordered from lowest to highest)
      const lowestQualityAboveCap = levelsAboveCap[0];
      return validLevels.findIndex((level) => level === lowestQualityAboveCap);
    }
  }

  getMaxLevel(capLevelIndex: number) {
    if (this.getCapDefaultResolution() !== undefined) {
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
