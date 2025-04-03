import { assert } from '@open-wc/testing';
import { ExtensionMimeTypeMap, MimeTypeShorthandMap } from '../src';
import { getType, parseJwt } from '../src/util';

describe('Module: util', () => {
  describe('getType', () => {
    it('should infer m3u8 from .m3u8 src extension', () => {
      const extension = 'm3u8';
      const expected = ExtensionMimeTypeMap.M3U8;
      const actual = getType({ src: `http://foo.com/bar.${extension}` });
      assert.equal(actual, expected);
    });

    it('should infer mp4 from .mp4 src extension', () => {
      const extension = 'mp4';
      const expected = ExtensionMimeTypeMap.MP4;
      const actual = getType({ src: `http://foo.com/bar.${extension}` });
      assert.equal(actual, expected);
    });

    it('should infer m3u8 from .M3U8 src extension', () => {
      const extension = 'm3u8';
      const expected = ExtensionMimeTypeMap.M3U8;
      const actual = getType({ src: `http://foo.com/bar.${extension.toUpperCase()}` });
      assert.equal(actual, expected);
    });

    it('should infer mp4 from .MP4 src extension', () => {
      const extension = 'mp4';
      const expected = ExtensionMimeTypeMap.MP4;
      const actual = getType({ src: `http://foo.com/bar.${extension.toUpperCase()}` });
      assert.equal(actual, expected);
    });

    it('should respect explicit type even with .m3u8 src extension', () => {
      const extension = 'm3u8';
      const expected = ExtensionMimeTypeMap.MP4;
      const actual = getType({ src: `http://foo.com/bar.${extension}`, type: ExtensionMimeTypeMap.MP4 });
      assert.equal(actual, expected);
    });

    it('should respect explicit type even with .mp4 src extension', () => {
      const extension = 'mp4';
      const expected = ExtensionMimeTypeMap.M3U8;
      const actual = getType({ src: `http://foo.com/bar.${extension}`, type: ExtensionMimeTypeMap.M3U8 });
      assert.equal(actual, expected);
    });

    it('should support hls shorthand type even with .mp4 src extension', () => {
      const extension = 'mp4';
      const expected = ExtensionMimeTypeMap.M3U8;
      const actual = getType({ src: `http://foo.com/bar.${extension}`, type: MimeTypeShorthandMap.HLS });
      assert.equal(actual, expected);
    });

    it('should support Mux extensionless m3u8 URLs', () => {
      const expected = ExtensionMimeTypeMap.M3U8;
      // Mux extensionless m3u8 URLs should be treated as M3U8
      const actual = getType({ src: 'https://stream.mux.com/abc123' });
      assert.equal(actual, expected);
    });

    it('should support Mux extensionless m3u8 URLs with custom domain', () => {
      const expected = ExtensionMimeTypeMap.M3U8;
      // Mux extensionless m3u8 URLs with custom domain should be treated as M3U8
      const actual = getType({ src: 'https://stream.abc.com/abc123', customDomain: 'abc.com' });
      assert.equal(actual, expected);
    });
  });

  describe('parseJwt', () => {
    it('should yield the expected payload POJO from a serialized/compact JWT', () => {
      const compactHeader =
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFkamYzb2JpYURUcEF0QVlpS3NCMkpvRlkwMXBpbEJMTHdYcUQzaHpJYURJIn0';
      const compactPayload =
        'eyJleHAiOjE5NjE2NDY0MDMsImF1ZCI6InYiLCJzdWIiOiJxSUpCcWFKUGtoTlhpSGJlZDhqMmp5eDAydFFRV0JJNWZMNldrSVFZTDYzdyJ9';
      const compactSignature =
        'mukZou10_iwaqPeHVFbXwTZShMK1D8kWpFAFOl6bwuIMB7hx0bAqscZxj5FwrIB8dzB6s_9YtJEEVXcR6ezxOhOc_y2ij1XM4YQYCuGH-elJc3rapHbahv2K7L_asz9Bdu1Ld6i6Ux7keNpEuGSYCDmsPmvdII7_XAPmzU01ZTvaXqCgzCY2PO7xz6z3hu1HOww2eL41TSif_Zu0okNZlhfHE9U-nyr4OVpuS9Q-rTtVvfE2ILSd9Ezt02AuOK-JkBCeR3Xf-UrbXB33ZFHLJrYVA-B516Iym0CGRfVssZsAn80_PNaxS_3M_OmVzyaDJ4zudb-YjGcaNl0yf96h6w';
      const token = `${compactHeader}.${compactPayload}.${compactSignature}`;

      const expected = {
        exp: 1961646403, // The expiration
        aud: 'v', // For "video" (and subs/cc) assets
        sub: 'qIJBqaJPkhNXiHbed8j2jyx02tQQWBI5fL6WkIQYL63w', // The playback id
      };
      const actual = parseJwt(token);
      assert.deepEqual(actual, expected);
    });

    it('should not validate the header', () => {
      const compactHeader = 'this-is-fake';
      const compactPayload =
        'eyJleHAiOjE5NjE2NDY0MDMsImF1ZCI6InYiLCJzdWIiOiJxSUpCcWFKUGtoTlhpSGJlZDhqMmp5eDAydFFRV0JJNWZMNldrSVFZTDYzdyJ9';
      const compactSignature =
        'mukZou10_iwaqPeHVFbXwTZShMK1D8kWpFAFOl6bwuIMB7hx0bAqscZxj5FwrIB8dzB6s_9YtJEEVXcR6ezxOhOc_y2ij1XM4YQYCuGH-elJc3rapHbahv2K7L_asz9Bdu1Ld6i6Ux7keNpEuGSYCDmsPmvdII7_XAPmzU01ZTvaXqCgzCY2PO7xz6z3hu1HOww2eL41TSif_Zu0okNZlhfHE9U-nyr4OVpuS9Q-rTtVvfE2ILSd9Ezt02AuOK-JkBCeR3Xf-UrbXB33ZFHLJrYVA-B516Iym0CGRfVssZsAn80_PNaxS_3M_OmVzyaDJ4zudb-YjGcaNl0yf96h6w';
      const token = `${compactHeader}.${compactPayload}.${compactSignature}`;

      const expected = {
        exp: 1961646403, // The expiration
        aud: 'v', // For "video" (and subs/cc) assets
        sub: 'qIJBqaJPkhNXiHbed8j2jyx02tQQWBI5fL6WkIQYL63w', // The playback id
      };
      const actual = parseJwt(token);
      assert.deepEqual(actual, expected);
    });

    it('should not validate the signature', () => {
      const compactHeader =
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFkamYzb2JpYURUcEF0QVlpS3NCMkpvRlkwMXBpbEJMTHdYcUQzaHpJYURJIn0';
      const compactPayload =
        'eyJleHAiOjE5NjE2NDY0MDMsImF1ZCI6InYiLCJzdWIiOiJxSUpCcWFKUGtoTlhpSGJlZDhqMmp5eDAydFFRV0JJNWZMNldrSVFZTDYzdyJ9';
      const compactSignature = 'this-is-fake';
      const token = `${compactHeader}.${compactPayload}.${compactSignature}`;

      const expected = {
        exp: 1961646403, // The expiration
        aud: 'v', // For "video" (and subs/cc) assets
        sub: 'qIJBqaJPkhNXiHbed8j2jyx02tQQWBI5fL6WkIQYL63w', // The playback id
      };
      const actual = parseJwt(token);
      assert.deepEqual(actual, expected);
    });

    it('should not confirm existence of signature', () => {
      const compactHeader =
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFkamYzb2JpYURUcEF0QVlpS3NCMkpvRlkwMXBpbEJMTHdYcUQzaHpJYURJIn0';
      const compactPayload =
        'eyJleHAiOjE5NjE2NDY0MDMsImF1ZCI6InYiLCJzdWIiOiJxSUpCcWFKUGtoTlhpSGJlZDhqMmp5eDAydFFRV0JJNWZMNldrSVFZTDYzdyJ9';
      const token = `${compactHeader}.${compactPayload}`; // No compact signature

      const expected = {
        exp: 1961646403, // The expiration
        aud: 'v', // For "video" (and subs/cc) assets (audience)
        sub: 'qIJBqaJPkhNXiHbed8j2jyx02tQQWBI5fL6WkIQYL63w', // The playback id (subject)
      };
      const actual = parseJwt(token);
      assert.deepEqual(actual, expected);
    });

    it('should yield undefined if missing compact dot separators', () => {
      const compactHeader =
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFkamYzb2JpYURUcEF0QVlpS3NCMkpvRlkwMXBpbEJMTHdYcUQzaHpJYURJIn0';
      const compactPayload =
        'eyJleHAiOjE5NjE2NDY0MDMsImF1ZCI6InYiLCJzdWIiOiJxSUpCcWFKUGtoTlhpSGJlZDhqMmp5eDAydFFRV0JJNWZMNldrSVFZTDYzdyJ9';
      const compactSignature =
        'mukZou10_iwaqPeHVFbXwTZShMK1D8kWpFAFOl6bwuIMB7hx0bAqscZxj5FwrIB8dzB6s_9YtJEEVXcR6ezxOhOc_y2ij1XM4YQYCuGH-elJc3rapHbahv2K7L_asz9Bdu1Ld6i6Ux7keNpEuGSYCDmsPmvdII7_XAPmzU01ZTvaXqCgzCY2PO7xz6z3hu1HOww2eL41TSif_Zu0okNZlhfHE9U-nyr4OVpuS9Q-rTtVvfE2ILSd9Ezt02AuOK-JkBCeR3Xf-UrbXB33ZFHLJrYVA-B516Iym0CGRfVssZsAn80_PNaxS_3M_OmVzyaDJ4zudb-YjGcaNl0yf96h6w';
      const token = `${compactHeader}${compactPayload}${compactSignature}`; // Omitted dot separators
      const actual = parseJwt(token);
      assert.notExists(actual, 'missing dot separators');
      const actualPayloadOnly = parseJwt(compactPayload); // Only providing compact payload
      assert.notExists(actualPayloadOnly, 'missing full compact JWT (payload only)');
    });

    it('should yield undefined if the compact payload does not deserialize to valid JSON', () => {
      const compactHeader =
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFkamYzb2JpYURUcEF0QVlpS3NCMkpvRlkwMXBpbEJMTHdYcUQzaHpJYURJIn0';
      const compactPayload =
        'THIS_WILL_NOT_JSON_eyJleHAiOjE5NjE2NDY0MDMsImF1ZCI6InYiLCJzdWIiOiJxSUpCcWFKUGtoTlhpSGJlZDhqMmp5eDAydFFRV0JJNWZMNldrSVFZTDYzdyJ9';
      const compactSignature =
        'mukZou10_iwaqPeHVFbXwTZShMK1D8kWpFAFOl6bwuIMB7hx0bAqscZxj5FwrIB8dzB6s_9YtJEEVXcR6ezxOhOc_y2ij1XM4YQYCuGH-elJc3rapHbahv2K7L_asz9Bdu1Ld6i6Ux7keNpEuGSYCDmsPmvdII7_XAPmzU01ZTvaXqCgzCY2PO7xz6z3hu1HOww2eL41TSif_Zu0okNZlhfHE9U-nyr4OVpuS9Q-rTtVvfE2ILSd9Ezt02AuOK-JkBCeR3Xf-UrbXB33ZFHLJrYVA-B516Iym0CGRfVssZsAn80_PNaxS_3M_OmVzyaDJ4zudb-YjGcaNl0yf96h6w';
      const token = `${compactHeader}.${compactPayload}.${compactSignature}`;
      const actual = parseJwt(token);
      assert.notExists(actual);
    });
  });
});
