import { assert } from '@open-wc/testing';
import { ExtensionMimeTypeMap, MimeTypeShorthandMap } from '../src';
import { getType } from '../src/util';

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
  });
});
