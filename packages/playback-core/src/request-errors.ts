import { LoaderResponse } from 'hls.js';
import { parseJwt } from './util';

// 3 digits for mux-specific codes
// token related = 2xx
//      generic 0x
//          missing (but expected) - 01
//          malformed - 02
//      expiry - 1x
//          expired - 10 (generic)
//      audience - 2x
//          missing - 21
//          mismatch - 22
//      subject - 3x
//          mismatch - 32
export const MuxErrorCode = {
  NOT_AN_ERROR: 0,
  UNKNOWN_ERROR: 2000000,
  NOT_FOUND: 2404000,
  NO_STATUS: 2000001,
  GENERIC_SERVER_FAIL: 2500000,
  TOKEN_MISSING: 2403201,
  TOKEN_MALFORMED: 2412202,
  TOKEN_EXPIRED: 2403210,
  TOKEN_AUD_MISSING: 2403221,
  TOKEN_AUD_MISMATCH: 2403222,
  TOKEN_SUB_MISMATCH: 2403232,
} as const;

export const getErrorCodeFromResponse = (
  resp: Pick<Response, 'status' | 'headers' | 'url'> | Pick<LoaderResponse, 'code' | 'url'>,
  playbackId: string | undefined,
  token?: string | undefined,
  expectedAud?: string | undefined
) => {
  const status = 'status' in resp ? resp.status : resp.code;
  const requestDate = 'headers' in resp ? new Date(resp.headers.get('date') as string) : new Date();
  // Not an error. WHAT ARE YOU EVEN DOING HERE?!?
  if (status === 200) return MuxErrorCode.NOT_AN_ERROR;
  /** @TODO How to handle this case (CJP) */
  if (!status) return MuxErrorCode.NO_STATUS;

  const jwtObj = parseJwt(token);
  if (status >= 500) {
    // Make sure we didn't get here because of a malformed JWT and/or claim
    if (!!token && !jwtObj) {
      console.error('malformed compact JWT DRM token string!');
      return MuxErrorCode.TOKEN_MALFORMED;
    } else {
      /**
       * @TODO We plausibly should have some basic retry logic for all other 500 status
       * cases (CJP)
       **/
      console.error('generic server error!');
      return MuxErrorCode.GENERIC_SERVER_FAIL;
    }
  } else if (status === 403 || status === 400) {
    if (jwtObj) {
      /** @TODO aud mismatches are 403 for video URL responses but 400 here. Should change this for consistency (CJP) */
      // Everything was "valid" but auth failed somehow
      const { exp, aud, sub } = jwtObj;
      if (exp * 1000 < requestDate.getTime()) {
        console.error('DRM token expired!');
        return MuxErrorCode.TOKEN_EXPIRED;
      } else if (sub !== playbackId) {
        console.error('DRM token Playback ID mismatch!');
        return MuxErrorCode.TOKEN_SUB_MISMATCH;
      } else if (!aud) {
        console.error('missing JWT audience!');
        return MuxErrorCode.TOKEN_AUD_MISSING;
      } else if (aud !== expectedAud) {
        console.error('incorrect JWT audience!');
        return MuxErrorCode.TOKEN_AUD_MISMATCH;
      }
    } else {
      /** @TODO omitted tokens are 403 for video URL responses but 400 here. Should change this for consistency (CJP) */
      // NOTE: This *should* not happen, since the drm token
      // is currently used to detect whether or not DRM should
      // be setup at all. Including for exhaustiveness. (CJP)
      console.error('no DRM token provided!');
      return MuxErrorCode.TOKEN_MISSING;
    }
  } else if (status === 404) {
    // NOTE: This *should* not happen, since the URL should never be invalid if code
    // is correct. Aka if we end up here it's almost definitely a bug.
    // Including for exhaustiveness. (CJP)
    console.error('url incorrect!');
    return MuxErrorCode.NOT_FOUND;
  }
  return MuxErrorCode.UNKNOWN_ERROR;
};
