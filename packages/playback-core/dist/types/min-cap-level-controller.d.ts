import type { HlsInterface } from './hls';
import type { Level } from 'hls.js';
declare const CapLevelController: typeof import("hls.js").CapLevelController;
/**
 * A custom HLS.js CapLevelController that behaves like the default one, except
 * it enforces a "minimum maximum" to avoid forced capping to lower quality at small sizes
 */
declare class MinCapLevelController extends CapLevelController {
    static minMaxResolution: number;
    constructor(hls: HlsInterface);
    get levels(): Level[];
    getValidLevels(capLevelIndex: number): Level[];
    getMaxLevel(capLevelIndex: number): number;
}
export default MinCapLevelController;
