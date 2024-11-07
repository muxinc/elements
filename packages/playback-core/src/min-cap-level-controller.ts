import Hls, { CapLevelController, Level } from 'hls.js';

/**
 * A custom HLS.js CapLevelController that behaves like the default one, except
 * it enforces a "minimum maximum" to avoid forced capping to lower quality at small sizes
 */
class MinCapLevelController extends CapLevelController {
  constructor(hls: Hls) {
    super(hls);
  }

  getMaxLevel(capLevelIndex: number) {
    const baseMaxLevel = super.getMaxLevel(capLevelIndex);
    // NOTE: hls is a TS-private member in CapLevelController. Should be TS-protected (CJP)
    // @ts-ignore
    const levels = this.hls.levels as Level[];
    if (!levels.length) {
      return -1;
    }

    const validLevels = levels.filter(
      // NOTE: isLevelAllowed is a TS-private member in CapLevelController. Should be TS-protected (CJP)
      // @ts-ignore
      (level, index) => this.isLevelAllowed(level) && index <= capLevelIndex
    );

    if (
      validLevels[baseMaxLevel] &&
      // If the default CapLevelController's maxLevel selection is <= 480p (portrait or landscape),
      // let the playback engine still have the option of the next higher resolution
      Math.max(validLevels[baseMaxLevel].width, validLevels[baseMaxLevel].height) <= 480 &&
      baseMaxLevel < validLevels.length - 2
    ) {
      return baseMaxLevel + 1;
    }

    return baseMaxLevel;
  }
}

export default MinCapLevelController;
