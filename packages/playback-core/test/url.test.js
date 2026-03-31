import { assert } from '@open-wc/testing';
import { getMediaPlaylistFromMultivariantPlaylist } from '../src/index.ts';

describe('getMediaPlaylistFromMultivariantPlaylist()', () => {
  let originalFetch;

  const makeMultivariantPlaylist = (mediaUrl) =>
    `#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-STREAM-INF:BANDWIDTH=1000000\n${mediaUrl}`;

  const mockFetch = (status, body) => {
    let lastFetchedUrl;
    globalThis.fetch = (url) => {
      lastFetchedUrl = url.toString();
      return Promise.resolve({ status, text: () => Promise.resolve(body) });
    };
    return { getLastFetchedUrl: () => lastFetchedUrl };
  };

  beforeEach(() => {
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('should fetch an absolute media playlist URL directly, ignoring masterPlaylistUrl', async () => {
    const absoluteMediaUrl = 'https://cdn.example.com/media/playlist.m3u8';
    const playlistContent = '#EXTM3U\n#EXT-X-ENDLIST';
    const { getLastFetchedUrl } = mockFetch(200, playlistContent);

    const result = await getMediaPlaylistFromMultivariantPlaylist(
      makeMultivariantPlaylist(absoluteMediaUrl),
      'https://other.example.com/master.m3u8'
    );

    assert.equal(getLastFetchedUrl(), absoluteMediaUrl);
    assert.equal(result, playlistContent);
  });

  it('should resolve a relative media playlist URL against masterPlaylistUrl', async () => {
    const relativeMediaUrl = 'media/playlist.m3u8';
    const masterUrl = 'https://cdn.example.com/hls/master.m3u8';
    const expectedUrl = 'https://cdn.example.com/hls/media/playlist.m3u8';
    const playlistContent = '#EXTM3U\n#EXT-X-ENDLIST';
    const { getLastFetchedUrl } = mockFetch(200, playlistContent);

    const result = await getMediaPlaylistFromMultivariantPlaylist(
      makeMultivariantPlaylist(relativeMediaUrl),
      masterUrl
    );

    assert.equal(getLastFetchedUrl(), expectedUrl);
    assert.equal(result, playlistContent);
  });

  it('should resolve a root-relative media playlist URL against masterPlaylistUrl origin', async () => {
    const relativeMediaUrl = '/hls/media/playlist.m3u8';
    const masterUrl = 'https://cdn.example.com/hls/master.m3u8';
    const expectedUrl = 'https://cdn.example.com/hls/media/playlist.m3u8';
    const playlistContent = '#EXTM3U\n#EXT-X-ENDLIST';
    const { getLastFetchedUrl } = mockFetch(200, playlistContent);

    const result = await getMediaPlaylistFromMultivariantPlaylist(
      makeMultivariantPlaylist(relativeMediaUrl),
      masterUrl
    );

    assert.equal(getLastFetchedUrl(), expectedUrl);
    assert.equal(result, playlistContent);
  });

  it('should warn when a relative media playlist URL is found but masterPlaylistUrl is not provided', async () => {
    try {
      await getMediaPlaylistFromMultivariantPlaylist(makeMultivariantPlaylist('media/playlist.m3u8'));
      assert.fail('expected rejection');
    } catch (err) {
      assert.instanceOf(err, Error);
      assert.include(err.message, 'masterPlaylistUrl');
    }
  });

  it('should reject when no media playlist URL is found in the multivariant playlist', async () => {
    const emptyPlaylist = '#EXTM3U\n#EXT-X-VERSION:3\n';
    try {
      await getMediaPlaylistFromMultivariantPlaylist(emptyPlaylist, 'https://cdn.example.com/master.m3u8');
      assert.fail('expected rejection');
    } catch (err) {
      assert.instanceOf(err, Error);
      assert.include(err.message, 'No media playlist URL found');
    }
  });

  it('should reject with the response when the fetch returns a non-200 status', async () => {
    mockFetch(404, '');
    try {
      await getMediaPlaylistFromMultivariantPlaylist(
        makeMultivariantPlaylist('https://cdn.example.com/media/playlist.m3u8')
      );
      assert.fail('expected rejection');
    } catch (resp) {
      assert.equal(resp.status, 404);
    }
  });
});
