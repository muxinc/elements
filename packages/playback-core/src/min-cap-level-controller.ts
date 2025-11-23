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
  // WeakMap to store preferHigherResolution flag per hls instance
  private static preferHigherResolution = new WeakMap<HlsInterface, boolean>();
  private static capDefaultResolution = new WeakMap<HlsInterface, number>();

  constructor(hls: HlsInterface) {
    super(hls);
  }

  /**
   * Set the preferHigherResolution flag for a specific hls instance
   */
  static setPreferHigherResolution(hls: HlsInterface, preferHigherResolution: boolean | undefined) {
    if (preferHigherResolution === undefined) {
      // undefined means false by default - delete to use default
      MinCapLevelController.preferHigherResolution.delete(hls);
    } else {
      // Store the explicit value (true or false)
      MinCapLevelController.preferHigherResolution.set(hls, preferHigherResolution);
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
   * Get the preferHigherResolution flag for a specific hls instance
   * Returns false by default if not explicitly set
   */
  private getPreferHigherResolution(): boolean {
    // NOTE: hls is a TS-private member in CapLevelController. Should be TS-protected (CJP)
    // @ts-ignore
    const hlsInstance = this.hls;
    // @ts-ignore
    const value = MinCapLevelController.preferHigherResolution.get(hlsInstance);
    // Default to false if not explicitly set (undefined means false by default)
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
   * If preferHigherResolution is true: take the lowest value that exceeds the cap
   * If preferHigherResolution is false: take the highest value that doesn't exceed the cap
   */
  private getMaxLevelCapped(capLevelIndex: number): number {
    const validLevels = this.getValidLevels(capLevelIndex);
    const capDefaultResolution = this.getCapDefaultResolution();

    if (!capDefaultResolution) {
      // Should not happen, but fallback
      return super.getMaxLevel(capLevelIndex);
    }

    // capDefaultResolution refers to the height (e.g., 540p means height = 540)
    const maxHeight = capDefaultResolution;

    // Find levels that don't exceed the cap (within cap) - compare by height
    const levelsWithinCap = validLevels.filter((level) => {
      return level.height <= maxHeight;
    });

    // Find levels that exceed the cap (above cap) - compare by height
    const levelsAboveCap = validLevels.filter((level) => {
      return level.height > maxHeight;
    });

    // Check if there's an exact match first - if so, use it regardless of preference
    const exactMatch = levelsWithinCap.findIndex((level) => {
      return level.height === maxHeight;
    });

    if (exactMatch !== -1) {
      // Find the index in validLevels
      const exactLevel = levelsWithinCap[exactMatch];
      return validLevels.findIndex((level) => level === exactLevel);
    }

    // No exact match - choose based on preferHigherResolution
    const preferHigher = this.getPreferHigherResolution();

    if (preferHigher) {
      // preferHigherResolution = true: take the lowest value that exceeds the cap
      if (levelsAboveCap.length === 0) {
        // No levels above cap, return the highest within cap (or lowest level if none)
        if (levelsWithinCap.length > 0) {
          // Levels are ordered from lowest to highest quality, so last item is highest quality
          const highestQualityWithinCap = levelsWithinCap[levelsWithinCap.length - 1];
          return validLevels.findIndex((level) => level === highestQualityWithinCap);
        }
        return 0;
      }

      // Return the lowest quality that exceeds the cap (first item in levelsAboveCap)
      // Levels are ordered from lowest to highest quality, so first item is lowest quality
      const lowestQualityAboveCap = levelsAboveCap[0];
      return validLevels.findIndex((level) => level === lowestQualityAboveCap);
    } else {
      // preferHigherResolution = false (default): take the highest value that doesn't exceed the cap
      if (levelsWithinCap.length === 0) {
        // No levels within cap, return the lowest level
        return 0;
      }
      // No exact match - return the highest quality within cap (last item)
      // Levels are ordered from lowest to highest quality, so last item is highest quality
      const highestQualityWithinCap = levelsWithinCap[levelsWithinCap.length - 1];
      return validLevels.findIndex((level) => level === highestQualityWithinCap);
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
