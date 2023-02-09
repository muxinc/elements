// @ts-ignore
import HlsMin from 'hls.js/dist/hls.min.js';
import type HlsClassType from 'hls.js';

type Hls = typeof HlsClassType & HlsClassType;
const Hls: Hls = HlsMin as unknown as Hls;

export default Hls;
export type HlsInterface = HlsClassType;
