import { assert, fixture, waitUntil } from '@open-wc/testing';
import { parseAppleJsonChapters } from '../src/chapters.ts';
import { addChapters, getChapters } from '../src/text-tracks.ts';
import {
  Hls,
  fetchAndApplyChaptersSessionData,
  getMetadata,
  muxMediaState,
  setupHls,
  toChaptersSessionDataUrl,
  updateStreamInfoFromSrc,
} from '../src/index.ts';

const CHAPTERS_URL = 'https://example.com/chapters.json';

const chaptersDocument = [
  {
    'start-time': 0,
    titles: [{ language: 'und', title: 'Intro' }],
    metadata: [{ key: 'com.mux.video.branding', value: 'mux-free-plan' }],
  },
  { 'start-time': 10, titles: [{ language: 'und', title: 'Chapter 2' }] },
];

const jsonResponse = (json) => ({ ok: true, status: 200, json: async () => json });

describe('chapters', () => {
  describe('parseAppleJsonChapters()', () => {
    it('maps each entry to a Chapter, using the next entry start-time as endTime', () => {
      const json = [
        { 'start-time': 0, titles: [{ language: 'en', title: 'Intro' }] },
        { 'start-time': 10, titles: [{ language: 'en', title: 'Chapter 2' }] },
        { 'start-time': 30, titles: [{ language: 'en', title: 'Chapter 3' }] },
      ];

      assert.deepEqual(parseAppleJsonChapters(json), [
        { startTime: 0, endTime: 10, value: 'Intro' },
        { startTime: 10, endTime: 30, value: 'Chapter 2' },
        { startTime: 30, value: 'Chapter 3' },
      ]);
    });

    it('prefers an entry duration over the next entry start-time', () => {
      const json = [
        { 'start-time': 0, duration: 5, titles: [{ language: 'en', title: 'Intro' }] },
        { 'start-time': 10, titles: [{ language: 'en', title: 'Chapter 2' }] },
      ];

      assert.equal(parseAppleJsonChapters(json)[0].endTime, 5);
    });

    it('prefers the language-neutral ("und") title when present', () => {
      const json = [
        {
          'start-time': 0,
          titles: [
            { language: 'es', title: 'Introducción' },
            { language: 'und', title: 'Intro' },
          ],
        },
      ];

      assert.equal(parseAppleJsonChapters(json)[0].value, 'Intro');
    });

    it('falls back to the first title when there is no language-neutral entry', () => {
      const json = [
        {
          'start-time': 0,
          titles: [
            { language: 'es', title: 'Introducción' },
            { language: 'en', title: 'Intro' },
          ],
        },
      ];

      assert.equal(parseAppleJsonChapters(json)[0].value, 'Introducción');
    });

    it('yields no chapters for the untitled document Mux serves for assets without metadata', () => {
      assert.deepEqual(parseAppleJsonChapters([{ 'start-time': 0 }]), []);
      assert.deepEqual(parseAppleJsonChapters([{ 'start-time': 0, titles: [] }]), []);
    });

    it('drops untitled entries but still ends the previous chapter at their start', () => {
      const json = [
        { 'start-time': 0, titles: [{ language: 'en', title: 'Intro' }] },
        { 'start-time': 10, titles: [] },
      ];

      assert.deepEqual(parseAppleJsonChapters(json), [{ startTime: 0, endTime: 10, value: 'Intro' }]);
    });

    it('returns an empty array for a non-array document', () => {
      assert.deepEqual(parseAppleJsonChapters({ not: 'an array' }), []);
      assert.deepEqual(parseAppleJsonChapters(null), []);
      assert.deepEqual(parseAppleJsonChapters(undefined), []);
    });

    it('ignores entries without a numeric start-time', () => {
      const json = [{ 'start-time': 0, titles: [{ language: 'en', title: 'Intro' }] }, { titles: [] }, 'garbage'];

      assert.equal(parseAppleJsonChapters(json).length, 1);
    });
  });

  describe('toChaptersSessionDataUrl()', () => {
    const playlistUrl = 'https://stream.example.com/abc.m3u8';

    it('prefers URI over VALUE', () => {
      assert.equal(
        toChaptersSessionDataUrl({ URI: 'https://a.com/c.json', VALUE: 'https://b.com/c.json' }, playlistUrl),
        'https://a.com/c.json'
      );
    });

    it('falls back to a VALUE that is a URL', () => {
      assert.equal(toChaptersSessionDataUrl({ VALUE: 'https://b.com/c.json' }, playlistUrl), 'https://b.com/c.json');
    });

    it('resolves a relative URI against the playlist URL', () => {
      assert.equal(
        toChaptersSessionDataUrl({ URI: 'chapters/c.json' }, playlistUrl),
        'https://stream.example.com/chapters/c.json'
      );
    });

    it('returns undefined without a usable URL', () => {
      assert.isUndefined(toChaptersSessionDataUrl(undefined, playlistUrl));
      assert.isUndefined(toChaptersSessionDataUrl({}, playlistUrl));
      assert.isUndefined(toChaptersSessionDataUrl({ VALUE: 'inline value' }, playlistUrl));
    });
  });

  describe('fetchAndApplyChaptersSessionData()', () => {
    let mediaEl;
    let originalFetch;
    let fetchCalls;

    const mockFetch = (impl) => {
      window.fetch = async (url, init) => {
        fetchCalls.push(String(url));
        return impl(url, init);
      };
    };

    beforeEach(async () => {
      mediaEl = await fixture(`<video></video>`);
      muxMediaState.set(mediaEl, {});
      originalFetch = window.fetch;
      fetchCalls = [];
    });

    afterEach(() => {
      window.fetch = originalFetch;
      muxMediaState.delete(mediaEl);
      mediaEl.remove();
      mediaEl = undefined;
    });

    it('fetches the document once and applies both the Mux metadata and the chapters', async () => {
      mockFetch(async () => jsonResponse(chaptersDocument));
      let metadataEvents = 0;
      mediaEl.addEventListener('muxmetadata', () => metadataEvents++);

      await fetchAndApplyChaptersSessionData(CHAPTERS_URL, mediaEl);

      assert.deepEqual(fetchCalls, [CHAPTERS_URL]);
      assert.equal(metadataEvents, 1);
      assert.deepEqual(getMetadata(mediaEl), { 'com.mux.video.branding': 'mux-free-plan' });
      assert.deepEqual(
        getChapters(mediaEl).map(({ value }) => value),
        ['Intro', 'Chapter 2']
      );
    });

    it('does not duplicate chapters when applied twice', async () => {
      mockFetch(async () => jsonResponse(chaptersDocument));

      await fetchAndApplyChaptersSessionData(CHAPTERS_URL, mediaEl);
      await fetchAndApplyChaptersSessionData(CHAPTERS_URL, mediaEl);

      assert.equal(getChapters(mediaEl).length, 2);
    });

    it('applies nothing when a teardown happens while the document is loading', async () => {
      let resolveJson;
      mockFetch(async (_url, init) => {
        assert.instanceOf(init.signal, AbortSignal);
        return { ok: true, status: 200, json: () => new Promise((resolve) => (resolveJson = resolve)) };
      });
      let metadataEvents = 0;
      mediaEl.addEventListener('muxmetadata', () => metadataEvents++);

      const pending = fetchAndApplyChaptersSessionData(CHAPTERS_URL, mediaEl);
      await waitUntil(() => resolveJson);
      mediaEl.dispatchEvent(new Event('teardown'));
      resolveJson(chaptersDocument);
      await pending;

      assert.equal(metadataEvents, 0);
      assert.deepEqual(getChapters(mediaEl), []);
    });

    it('keeps chapters added through addChapters() and skips the stream chapters', async () => {
      await addChapters(mediaEl, [
        { startTime: 0, endTime: 50, value: 'User A' },
        { startTime: 50, value: 'User B' },
      ]);
      mockFetch(async () => jsonResponse(chaptersDocument));

      await fetchAndApplyChaptersSessionData(CHAPTERS_URL, mediaEl);

      const chapters = getChapters(mediaEl);
      assert.deepEqual(
        chapters.map(({ value }) => value),
        ['User A', 'User B']
      );
      assert.equal(chapters[0].endTime, 50);
    });

    it('replaces the stream chapters with chapters added later through addChapters()', async () => {
      mockFetch(async () => jsonResponse(chaptersDocument));
      await fetchAndApplyChaptersSessionData(CHAPTERS_URL, mediaEl);

      await addChapters(mediaEl, [{ startTime: 5, endTime: 20, value: 'User A' }]);

      assert.deepEqual(getChapters(mediaEl), [{ startTime: 5, endTime: 20, value: 'User A' }]);
    });

    it('adds no chapters for an untitled document but still applies its metadata', async () => {
      mockFetch(async () => jsonResponse([{ 'start-time': 0, metadata: [{ key: 'video_title', value: 'x' }] }]));

      await fetchAndApplyChaptersSessionData(CHAPTERS_URL, mediaEl);

      assert.deepEqual(getChapters(mediaEl), []);
      assert.deepEqual(getMetadata(mediaEl), { video_title: 'x' });
    });

    [
      [
        'the fetch rejects',
        async () => {
          throw new Error('network down');
        },
      ],
      ['the response is not ok', async () => ({ ok: false, status: 404, statusText: 'Not Found' })],
      [
        'the body is not valid JSON',
        async () => ({
          ok: true,
          status: 200,
          json: async () => {
            throw new SyntaxError('Unexpected token');
          },
        }),
      ],
      ['the document is malformed', async () => jsonResponse({ not: 'a chapters document' })],
    ].forEach(([scenario, impl]) => {
      it(`does not throw and applies nothing when ${scenario}`, async () => {
        mockFetch(impl);
        let metadataEvents = 0;
        mediaEl.addEventListener('muxmetadata', () => metadataEvents++);

        await fetchAndApplyChaptersSessionData(CHAPTERS_URL, mediaEl);

        assert.equal(metadataEvents, 0);
        assert.deepEqual(getChapters(mediaEl), []);
      });
    });
  });

  describe('session data call sites', () => {
    let mediaEl;
    let originalFetch;
    let hls;

    beforeEach(async () => {
      mediaEl = await fixture(`<video></video>`);
      muxMediaState.set(mediaEl, {});
      originalFetch = window.fetch;
    });

    afterEach(() => {
      window.fetch = originalFetch;
      hls?.destroy();
      hls = undefined;
      muxMediaState.delete(mediaEl);
      mediaEl.remove();
      mediaEl = undefined;
    });

    it('native playback: applies chapters and metadata from the multivariant playlist session data', async () => {
      const multivariant = [
        '#EXTM3U',
        '#EXT-X-SESSION-DATA:DATA-ID="com.apple.hls.chapters",URI="chapters.json"',
        '#EXT-X-STREAM-INF:BANDWIDTH=1',
        'https://stream.example.com/media.m3u8',
      ].join('\n');
      const media = ['#EXTM3U', '#EXT-X-PLAYLIST-TYPE:VOD', '#EXT-X-TARGETDURATION:4', '#EXT-X-ENDLIST'].join('\n');
      const fetchCalls = [];
      window.fetch = async (url) => {
        fetchCalls.push(String(url));
        if (String(url).endsWith('chapters.json')) return jsonResponse(chaptersDocument);
        const body = String(url).endsWith('media.m3u8') ? media : multivariant;
        return { ok: true, status: 200, url: String(url), text: async () => body };
      };
      let metadataEvents = 0;
      mediaEl.addEventListener('muxmetadata', () => metadataEvents++);

      await updateStreamInfoFromSrc('https://stream.example.com/main.m3u8', mediaEl, 'application/vnd.apple.mpegurl');
      await waitUntil(() => getChapters(mediaEl).length === 2);

      assert.equal(metadataEvents, 1);
      assert.deepEqual(
        fetchCalls.filter((url) => url.endsWith('chapters.json')),
        ['https://stream.example.com/chapters.json']
      );
    });

    it('hls.js playback: applies chapters and metadata on MANIFEST_PARSED', async () => {
      window.fetch = async () => jsonResponse(chaptersDocument);
      let metadataEvents = 0;
      mediaEl.addEventListener('muxmetadata', () => metadataEvents++);
      hls = setupHls({ src: 'https://stream.example.com/main.m3u8', preferPlayback: 'mse' }, mediaEl);

      hls.trigger(Hls.Events.MANIFEST_PARSED, {
        levels: [],
        audioTracks: [],
        subtitleTracks: [],
        firstLevel: 0,
        stats: {},
        audio: false,
        video: true,
        altAudio: false,
        sessionData: { 'com.apple.hls.chapters': { 'DATA-ID': 'com.apple.hls.chapters', URI: CHAPTERS_URL } },
      });
      await waitUntil(() => getChapters(mediaEl).length === 2);

      assert.equal(metadataEvents, 1);
    });
  });
});
