import { assert } from '@open-wc/testing';
import { getMediaPlaylistFromMultivariantPlaylist } from '../src/index.ts';
import { getFirstMediaPlaylistUrl, toAbsoluteUrl } from '../src/util.ts';

describe('getFirstMediaPlaylistUrl()', () => {
  it('should return the URL line following #EXT-X-STREAM-INF', () => {
    const playlist = '#EXTM3U\n#EXT-X-STREAM-INF:BANDWIDTH=1000000\nhttps://cdn.example.com/media.m3u8';
    assert.equal(getFirstMediaPlaylistUrl(playlist), 'https://cdn.example.com/media.m3u8');
  });

  it('should return the first variant when multiple are present', () => {
    const playlist =
      '#EXTM3U\n#EXT-X-STREAM-INF:BANDWIDTH=500000\nhttps://cdn.example.com/low.m3u8\n#EXT-X-STREAM-INF:BANDWIDTH=2000000\nhttps://cdn.example.com/high.m3u8';
    assert.equal(getFirstMediaPlaylistUrl(playlist), 'https://cdn.example.com/low.m3u8');
  });

  it('should return undefined when no #EXT-X-STREAM-INF entry is present', () => {
    const playlist = '#EXTM3U\n#EXT-X-VERSION:3\n';
    assert.isUndefined(getFirstMediaPlaylistUrl(playlist));
  });

  it('should return a relative URL as-is', () => {
    const playlist = '#EXTM3U\n#EXT-X-STREAM-INF:BANDWIDTH=1000000\nmedia/playlist.m3u8';
    assert.equal(getFirstMediaPlaylistUrl(playlist), 'media/playlist.m3u8');
  });
});

describe('toAbsoluteUrl()', () => {
  it('should return an absolute URL unchanged', () => {
    const url = 'https://cdn.example.com/media/playlist.m3u8';
    assert.equal(toAbsoluteUrl(url).toString(), url);
  });

  it('should resolve a relative URL against an absolute base', () => {
    assert.equal(
      toAbsoluteUrl('media/playlist.m3u8', 'https://cdn.example.com/hls/master.m3u8').toString(),
      'https://cdn.example.com/hls/media/playlist.m3u8'
    );
  });

  it('should resolve a root-relative URL against an absolute base', () => {
    assert.equal(
      toAbsoluteUrl('/hls/media/playlist.m3u8', 'https://cdn.example.com/other/master.m3u8').toString(),
      'https://cdn.example.com/hls/media/playlist.m3u8'
    );
  });

  it('should resolve a relative URL when base is itself relative (uses window.location.href)', () => {
    const expected = new URL('media/playlist.m3u8', new URL('/hls/master.m3u8', window.location.href)).toString();
    assert.equal(toAbsoluteUrl('media/playlist.m3u8', '/hls/master.m3u8').toString(), expected);
  });

  it('should accept a URL instance as base', () => {
    assert.equal(
      toAbsoluteUrl('media/playlist.m3u8', new URL('https://cdn.example.com/hls/master.m3u8')).toString(),
      'https://cdn.example.com/hls/media/playlist.m3u8'
    );
  });

  it('should default to window location URL when URL is relative and no base is provided', () => {
    const expected = new URL('media/playlist.m3u8', window.location.href).toString();
    assert.equal(toAbsoluteUrl('media/playlist.m3u8'), expected);
  });
});

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

  it('should resolve a relative media playlist URL when masterPlaylistUrl is itself relative', async () => {
    const relativeMediaUrl = 'media/playlist.m3u8';
    const relativeMasterUrl = '/hls/master.m3u8';
    // window.location.href in the test browser is something like http://localhost:8004/
    const expectedUrl = new URL(relativeMediaUrl, new URL(relativeMasterUrl, window.location.href)).toString();
    const playlistContent = '#EXTM3U\n#EXT-X-ENDLIST';
    const { getLastFetchedUrl } = mockFetch(200, playlistContent);

    const result = await getMediaPlaylistFromMultivariantPlaylist(
      makeMultivariantPlaylist(relativeMediaUrl),
      relativeMasterUrl
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
