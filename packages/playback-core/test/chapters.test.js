import { aTimeout, assert, fixture, oneEvent, waitUntil } from '@open-wc/testing';
import { parseAppleJsonChapters } from '../src/chapters.ts';
import {
  addChapters,
  getActiveChapter,
  getChapters,
  getTextTrack,
  setSessionDataChapters,
  setupChapters,
} from '../src/text-tracks.ts';
import {
  Hls,
  fetchAndApplyChaptersSessionData,
  getMetadata,
  initialize,
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

const manifestLoadedData = ({ url, chaptersUri }) => ({
  levels: [],
  audioTracks: [],
  url,
  stats: {},
  networkDetails: null,
  sessionData: { 'com.apple.hls.chapters': { 'DATA-ID': 'com.apple.hls.chapters', URI: chaptersUri } },
  sessionKeys: null,
  contentSteering: null,
  startTimeOffset: null,
  variableList: null,
});

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

    it('prefers the language-neutral ("und") title when no title matches a preferred language', () => {
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

    describe('with preferred languages', () => {
      const titled = (...titles) => [
        { 'start-time': 0, titles: titles.map(([language, title]) => ({ language, title })) },
      ];
      const titleFor = (json, preferredLanguages) => parseAppleJsonChapters(json, preferredLanguages)[0].value;

      it('prefers a title in a preferred language over the language-neutral one', () => {
        assert.equal(titleFor(titled(['und', 'Intro'], ['es', 'Introducción']), ['es']), 'Introducción');
      });

      it('matches the full language tag before the primary subtag', () => {
        const json = titled(['pt-PT', 'Introdução (PT)'], ['pt-BR', 'Introdução (BR)']);

        assert.equal(titleFor(json, ['pt-BR']), 'Introdução (BR)');
      });

      it('falls back to the primary subtag in either direction', () => {
        assert.equal(titleFor(titled(['en', 'Intro'], ['es', 'Introducción']), ['es-419']), 'Introducción');
        assert.equal(titleFor(titled(['es', 'Introducción'], ['en-GB', 'Intro']), ['en-US']), 'Intro');
      });

      it('follows the order of the preferred languages', () => {
        const json = titled(['en', 'Intro'], ['es', 'Introducción'], ['fr', 'Introduction']);

        assert.equal(titleFor(json, ['de', 'fr', 'es']), 'Introduction');
        assert.equal(titleFor(json, ['es-MX', 'fr']), 'Introducción');
      });

      it('matches language tags case-insensitively', () => {
        assert.equal(titleFor(titled(['en', 'Intro'], ['pt-br', 'Introdução']), ['pt-BR']), 'Introdução');
      });

      it('falls back to the language-neutral title, then the first one, when nothing matches', () => {
        assert.equal(titleFor(titled(['es', 'Introducción'], ['und', 'Intro']), ['de']), 'Intro');
        assert.equal(titleFor(titled(['es', 'Introducción'], ['en', 'Intro']), ['de']), 'Introducción');
      });

      it('skips empty titles', () => {
        assert.equal(titleFor(titled(['es', ''], ['und', 'Intro']), ['es']), 'Intro');
      });

      it('keeps titles without a language', () => {
        assert.equal(titleFor([{ 'start-time': 0, titles: [{ title: 'Intro' }] }], ['es']), 'Intro');
        assert.equal(titleFor([{ 'start-time': 0, titles: [{ language: null, title: 'Intro' }] }], []), 'Intro');
        assert.equal(
          titleFor(
            [{ 'start-time': 0, titles: [{ title: 'Intro' }, { language: 'es', title: 'Introducción' }] }],
            ['es']
          ),
          'Introducción'
        );
      });

      it('matches the language-neutral title case-insensitively', () => {
        assert.equal(titleFor(titled(['es', 'Introducción'], ['UND', 'Intro']), ['de']), 'Intro');
      });
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

    it('applies no chapters when a teardown happens after the document resolved', async () => {
      mockFetch(async () => jsonResponse(chaptersDocument));
      const observer = new MutationObserver(() => mediaEl.dispatchEvent(new Event('teardown')));
      observer.observe(mediaEl, { childList: true });

      await fetchAndApplyChaptersSessionData(CHAPTERS_URL, mediaEl);
      observer.disconnect();

      assert.isOk(getTextTrack(mediaEl, 'chapters', 'chapters'));
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

    it('skips the stream chapters when addChapters() runs while their track is being created', async () => {
      mockFetch(async () => jsonResponse(chaptersDocument));
      const observer = new MutationObserver(() =>
        addChapters(mediaEl, [{ startTime: 0, endTime: 50, value: 'User A' }])
      );
      observer.observe(mediaEl, { childList: true });

      await fetchAndApplyChaptersSessionData(CHAPTERS_URL, mediaEl);
      observer.disconnect();

      assert.deepEqual(getChapters(mediaEl), [{ startTime: 0, endTime: 50, value: 'User A' }]);
    });

    it('replaces the stream chapters with chapters added later through addChapters()', async () => {
      mockFetch(async () => jsonResponse(chaptersDocument));
      await fetchAndApplyChaptersSessionData(CHAPTERS_URL, mediaEl);

      await addChapters(mediaEl, [{ startTime: 5, endTime: 20, value: 'User A' }]);

      assert.deepEqual(getChapters(mediaEl), [{ startTime: 5, endTime: 20, value: 'User A' }]);
    });

    describe('title language', () => {
      const multilingualDocument = [
        {
          'start-time': 0,
          titles: [
            { language: 'en', title: 'Intro' },
            { language: 'es', title: 'Introducción' },
          ],
        },
      ];
      let navigatorLanguages;

      beforeEach(() => {
        navigatorLanguages = undefined;
        Object.defineProperty(navigator, 'languages', {
          configurable: true,
          get: () =>
            navigatorLanguages ?? Object.getOwnPropertyDescriptor(Navigator.prototype, 'languages').get.call(navigator),
        });
        mockFetch(async () => jsonResponse(multilingualDocument));
      });

      afterEach(() => {
        delete navigator.languages;
      });

      it('prefers the browser languages over the lang of the player', async () => {
        navigatorLanguages = ['es-AR', 'en'];
        mediaEl = await fixture(`<video lang="en"></video>`);

        await fetchAndApplyChaptersSessionData(CHAPTERS_URL, mediaEl);

        assert.equal(getChapters(mediaEl)[0].value, 'Introducción');
      });

      it('uses the lang of the media element when no browser language matches', async () => {
        navigatorLanguages = ['de'];
        mediaEl = await fixture(`<video lang="es"></video>`);

        await fetchAndApplyChaptersSessionData(CHAPTERS_URL, mediaEl);

        assert.equal(getChapters(mediaEl)[0].value, 'Introducción');
      });

      it('uses the lang of a shadow host, as for a player that renders its media in shadow DOM', async () => {
        navigatorLanguages = ['de'];
        const host = await fixture(`<div lang="es"></div>`);
        host.attachShadow({ mode: 'open' }).innerHTML = '<video></video>';
        mediaEl = host.shadowRoot.querySelector('video');

        await fetchAndApplyChaptersSessionData(CHAPTERS_URL, mediaEl);

        assert.equal(getChapters(mediaEl)[0].value, 'Introducción');
      });

      it('treats an empty lang as unknown instead of deferring to the shadow hosts', async () => {
        navigatorLanguages = ['de'];
        const host = await fixture(`<div lang="es"></div>`);
        host.attachShadow({ mode: 'open' }).innerHTML = '<video lang=""></video>';
        mediaEl = host.shadowRoot.querySelector('video');

        await fetchAndApplyChaptersSessionData(CHAPTERS_URL, mediaEl);

        assert.equal(getChapters(mediaEl)[0].value, 'Intro');
      });

      it('ignores a lang inherited from light DOM ancestors or the document', async () => {
        navigatorLanguages = ['de'];
        const container = await fixture(`<div lang="es"><video></video></div>`);
        mediaEl = container.querySelector('video');
        const documentLang = document.documentElement.getAttribute('lang');
        document.documentElement.setAttribute('lang', 'es');

        try {
          await fetchAndApplyChaptersSessionData(CHAPTERS_URL, mediaEl);
        } finally {
          if (documentLang === null) document.documentElement.removeAttribute('lang');
          else document.documentElement.setAttribute('lang', documentLang);
        }

        assert.equal(getChapters(mediaEl)[0].value, 'Intro');
      });
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

  describe('open last chapter', () => {
    const MP4_SRC = 'https://stream.mux.com/A3VXy02VoUinw01pwyomEO3bHnG4P32xzV7u1j1FSzjNg/low.mp4';
    const openChapters = [
      { startTime: 0, endTime: 1, value: 'Intro' },
      { startTime: 1, value: 'Rest' },
    ];
    let mediaEl;

    beforeEach(async () => {
      mediaEl = await fixture(`<video preload="auto" crossorigin muted></video>`);
    });

    afterEach(() => {
      mediaEl.remove();
      mediaEl = undefined;
    });

    it('ends at Infinity while the media duration is unknown', async () => {
      await setSessionDataChapters(mediaEl, openChapters);

      assert.deepEqual(getChapters(mediaEl), [
        { startTime: 0, endTime: 1, value: 'Intro' },
        { startTime: 1, endTime: Infinity, value: 'Rest' },
      ]);
    });

    it('ends at Infinity while the media duration is zero', async () => {
      Object.defineProperty(mediaEl, 'duration', { get: () => 0, configurable: true });
      await setSessionDataChapters(mediaEl, openChapters);

      assert.deepEqual(getChapters(mediaEl), [
        { startTime: 0, endTime: 1, value: 'Intro' },
        { startTime: 1, endTime: Infinity, value: 'Rest' },
      ]);
    });

    it('ends at Infinity for an unbounded media duration', async () => {
      Object.defineProperty(mediaEl, 'duration', { get: () => Infinity, configurable: true });
      await setSessionDataChapters(mediaEl, openChapters);

      assert.deepEqual(getChapters(mediaEl), [
        { startTime: 0, endTime: 1, value: 'Intro' },
        { startTime: 1, endTime: Infinity, value: 'Rest' },
      ]);
    });

    it('ends at the media duration once it is known', async () => {
      await setSessionDataChapters(mediaEl, openChapters);
      mediaEl.src = MP4_SRC;
      await oneEvent(mediaEl, 'loadedmetadata');

      assert.isTrue(Number.isFinite(mediaEl.duration));
      assert.equal(getChapters(mediaEl)[1].endTime, mediaEl.duration);
    });

    it('ends at the media duration as the active chapter and in the chapterchange detail', async () => {
      await setSessionDataChapters(mediaEl, openChapters);
      const chaptersReady = setupChapters(mediaEl);
      mediaEl.src = MP4_SRC;
      await chaptersReady;
      if (mediaEl.readyState < HTMLMediaElement.HAVE_METADATA) await oneEvent(mediaEl, 'loadedmetadata');

      const chapterChange = new Promise((resolve) => {
        mediaEl.addEventListener('chapterchange', function onChange({ detail }) {
          if (detail.value !== 'Rest') return;
          mediaEl.removeEventListener('chapterchange', onChange);
          resolve(detail);
        });
      });
      mediaEl.currentTime = 1.5;
      const detail = await chapterChange;

      assert.deepEqual(detail, { startTime: 1, endTime: mediaEl.duration, value: 'Rest' });
      assert.deepEqual(getActiveChapter(mediaEl), detail);
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

    describe('native playback: source torn down before its stream info is applied', () => {
      const multivariant = [
        '#EXTM3U',
        '#EXT-X-SESSION-DATA:DATA-ID="com.apple.hls.chapters",URI="chapters.json"',
        '#EXT-X-STREAM-INF:BANDWIDTH=1',
        'media.m3u8',
      ].join('\n');
      const media = ['#EXTM3U', '#EXT-X-PLAYLIST-TYPE:EVENT', '#EXT-X-TARGETDURATION:4'].join('\n');
      const deferred = () => {
        let resolve;
        const promise = new Promise((r) => (resolve = r));
        return { promise, resolve };
      };
      let requests;
      let streamTypeChanges;

      const mockFetch = (pendingUrlSuffix, gate) => {
        const throwIfAborted = (signal) => {
          if (signal?.aborted) throw new DOMException('The operation was aborted.', 'AbortError');
        };
        window.fetch = async (url, init) => {
          throwIfAborted(init?.signal);
          requests.push({ url: String(url), signal: init?.signal });
          if (String(url).endsWith(pendingUrlSuffix)) await gate.promise;
          throwIfAborted(init?.signal);
          if (String(url).endsWith('chapters.json')) return jsonResponse(chaptersDocument);
          const body = String(url).endsWith('media.m3u8') ? media : multivariant;
          return { ok: true, status: 200, url: String(url), text: async () => body };
        };
      };

      beforeEach(() => {
        requests = [];
        streamTypeChanges = 0;
        mediaEl.addEventListener('streamtypechange', () => streamTypeChanges++);
      });

      it('applies nothing when torn down while the multivariant playlist loads', async () => {
        const gate = deferred();
        mockFetch('main.m3u8', gate);

        const pending = updateStreamInfoFromSrc(
          'https://stream.example.com/main.m3u8',
          mediaEl,
          'application/vnd.apple.mpegurl'
        );
        await waitUntil(() => requests.length === 1);
        mediaEl.dispatchEvent(new Event('teardown'));
        gate.resolve();
        await pending.catch(() => {});
        await aTimeout(50);

        assert.isTrue(requests[0].signal.aborted);
        assert.deepEqual(
          requests.map(({ url }) => url),
          ['https://stream.example.com/main.m3u8']
        );
        assert.equal(streamTypeChanges, 0);
        assert.notProperty(muxMediaState.get(mediaEl), 'liveEdgeStartOffset');
        assert.deepEqual(getChapters(mediaEl), []);
      });

      it('applies no chapters when torn down while the chapters document loads', async () => {
        const gate = deferred();
        mockFetch('chapters.json', gate);

        await updateStreamInfoFromSrc('https://stream.example.com/main.m3u8', mediaEl, 'application/vnd.apple.mpegurl');
        await waitUntil(() => requests.some(({ url }) => url.endsWith('chapters.json')));
        mediaEl.dispatchEvent(new Event('teardown'));
        gate.resolve();
        await aTimeout(50);

        assert.isTrue(requests.find(({ url }) => url.endsWith('chapters.json')).signal.aborted);
        assert.deepEqual(getChapters(mediaEl), []);
      });
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

    it('native playback: resolves a relative chapters URI against the multivariant response URL after a redirect', async () => {
      const multivariant = [
        '#EXTM3U',
        '#EXT-X-SESSION-DATA:DATA-ID="com.apple.hls.chapters",URI="chapters.json"',
        '#EXT-X-STREAM-INF:BANDWIDTH=1',
        'media.m3u8',
      ].join('\n');
      const media = ['#EXTM3U', '#EXT-X-PLAYLIST-TYPE:VOD', '#EXT-X-TARGETDURATION:4', '#EXT-X-ENDLIST'].join('\n');
      const redirectedUrl = 'https://cdn.example.com/redirected/main.m3u8';
      const fetchCalls = [];
      window.fetch = async (url) => {
        fetchCalls.push(String(url));
        if (String(url).endsWith('chapters.json')) return jsonResponse(chaptersDocument);
        if (String(url).endsWith('media.m3u8'))
          return { ok: true, status: 200, url: String(url), text: async () => media };
        // The multivariant request redirects, so its response URL differs from the requested src.
        return { ok: true, status: 200, url: redirectedUrl, text: async () => multivariant };
      };

      await updateStreamInfoFromSrc('https://stream.example.com/main.m3u8', mediaEl, 'application/vnd.apple.mpegurl');
      await waitUntil(() => getChapters(mediaEl).length === 2);

      assert.deepEqual(
        fetchCalls.filter((url) => url.endsWith('chapters.json')),
        ['https://cdn.example.com/redirected/chapters.json']
      );
    });

    it('native playback: resolves relative URIs against src when the multivariant response URL is empty', async () => {
      const multivariant = [
        '#EXTM3U',
        '#EXT-X-SESSION-DATA:DATA-ID="com.apple.hls.chapters",URI="chapters.json"',
        '#EXT-X-STREAM-INF:BANDWIDTH=1',
        'media.m3u8',
      ].join('\n');
      const media = ['#EXTM3U', '#EXT-X-PLAYLIST-TYPE:VOD', '#EXT-X-TARGETDURATION:4', '#EXT-X-ENDLIST'].join('\n');
      const fetchCalls = [];
      window.fetch = async (url) => {
        fetchCalls.push(String(url));
        if (String(url).endsWith('chapters.json')) return jsonResponse(chaptersDocument);
        const body = String(url).endsWith('media.m3u8') ? media : multivariant;
        return { ok: true, status: 200, url: '', text: async () => body };
      };

      await updateStreamInfoFromSrc('https://stream.example.com/main.m3u8', mediaEl, 'application/vnd.apple.mpegurl');
      await waitUntil(() => getChapters(mediaEl).length === 2);

      assert.include(fetchCalls, 'https://stream.example.com/media.m3u8');
      assert.deepEqual(
        fetchCalls.filter((url) => url.endsWith('chapters.json')),
        ['https://stream.example.com/chapters.json']
      );
    });

    it('hls.js playback: applies chapters and metadata on MANIFEST_LOADED', async () => {
      window.fetch = async () => jsonResponse(chaptersDocument);
      let metadataEvents = 0;
      mediaEl.addEventListener('muxmetadata', () => metadataEvents++);
      hls = setupHls({ src: 'https://stream.example.com/main.m3u8', preferPlayback: 'mse' }, mediaEl);

      hls.trigger(
        Hls.Events.MANIFEST_LOADED,
        manifestLoadedData({ url: 'https://stream.example.com/main.m3u8', chaptersUri: CHAPTERS_URL })
      );
      await waitUntil(() => getChapters(mediaEl).length === 2);

      assert.equal(metadataEvents, 1);
    });

    it('hls.js playback: resolves a relative chapters URI against the manifest response URL after a redirect', async () => {
      const fetchCalls = [];
      window.fetch = async (url) => {
        fetchCalls.push(String(url));
        return jsonResponse(chaptersDocument);
      };
      hls = setupHls({ src: 'https://stream.example.com/main.m3u8', preferPlayback: 'mse' }, mediaEl);

      // The manifest request redirected, so the response URL differs from the requested src.
      hls.trigger(
        Hls.Events.MANIFEST_LOADED,
        manifestLoadedData({ url: 'https://cdn.example.com/redirected/main.m3u8', chaptersUri: 'chapters.json' })
      );
      await waitUntil(() => getChapters(mediaEl).length === 2);

      assert.deepEqual(fetchCalls, ['https://cdn.example.com/redirected/chapters.json']);
    });

    it('hls.js playback through initialize(): keeps the chapters when the document resolves right away', async () => {
      window.fetch = async () => jsonResponse(chaptersDocument);
      const core = initialize(
        {
          src: 'https://stream.example.com/main.m3u8',
          preferPlayback: 'mse',
          preload: 'none',
          disableTracking: true,
        },
        mediaEl
      );
      hls = core.engine;
      await waitUntil(() => getTextTrack(mediaEl, 'chapters', 'chapters'));

      hls.trigger(
        Hls.Events.MANIFEST_LOADED,
        manifestLoadedData({ url: 'https://stream.example.com/main.m3u8', chaptersUri: CHAPTERS_URL })
      );
      await waitUntil(() => getChapters(mediaEl).length === 2);
      await aTimeout(50);

      assert.equal(getChapters(mediaEl).length, 2);
      assert.isFalse(mediaEl.querySelector('track[label="chapters"]').hasAttribute('src'));
    });
  });
});
