import { assert, nextFrame, oneEvent, aTimeout, waitUntil } from '@open-wc/testing';
import { addCuePoints, getCuePoints, getActiveCuePoint } from '../src/tracks.ts';

describe('textTracks', () => {
  describe('cuePoints', () => {
    let mediaEl;
    const cuePoints = [
      { timestamp: 0, value: 'string' },
      { timestamp: 1, value: 2 },
      { timestamp: 2, value: true },
      { timestamp: 3, value: undefined },
      { timestamp: 4 },
      { timestamp: 5, value: null },
      { timestamp: 6, value: { complex: 'object' } },
    ];

    beforeEach(() => {
      mediaEl = document.createElement('video');
    });

    afterEach(() => {
      mediaEl = undefined;
    });

    describe('addCuePoints()', () => {
      it('accepts an array of cuepoints and yields a track for cuePoints', async () => {
        const track = await addCuePoints(mediaEl, cuePoints);
        assert.equal(track.mode, 'hidden');
        assert.equal(track.kind, 'metadata');
      });

      it('creates non-overlapping serialized cues for the cuepoints', async () => {
        const track = await addCuePoints(mediaEl, cuePoints);
        assert.equal(track.cues.length, cuePoints.length);
        track.cues.forEach((cue, index, cues) => {
          assert.equal(cue.startTime, cuePoints[index].timestamp);
          const expectedEndTime = cues[index + 1]?.startTime;
          if (expectedEndTime) {
            assert.equal(cue.endTime, expectedEndTime);
          }
          // Since `undefined` isn't serializable, it is represented as null in JSON.
          const expectedValue = cuePoints[index].value ?? null;
          // Parsing to not assume string formatting in the JSON.
          assert.deepEqual(JSON.parse(cue.text), expectedValue);
        });
      });

      it('handles out of order cuePoints', async () => {
        const rotatedCuePoints = [];
        // Simple rotation to make timestamps out of order
        cuePoints.forEach((cuePoint, i) => {
          const newIndex = (i + 3) % cuePoints.length;
          rotatedCuePoints[newIndex] = cuePoint;
        });

        const track = await addCuePoints(mediaEl, rotatedCuePoints);
        assert.equal(track.cues.length, cuePoints.length);
        track.cues.forEach((cue, index) => {
          assert.equal(cue.startTime, cuePoints[index].timestamp);
          // Since `undefined` isn't serializable, it is represented as null in JSON.
          const expectedValue = cuePoints[index].value ?? null;
          // Parsing to not assume string formatting in the JSON.
          assert.deepEqual(JSON.parse(cue.text), expectedValue);
        });
      });

      it('reuses the same track when adding cuePoints multiple times', async () => {
        const trackA = await addCuePoints(mediaEl, cuePoints);
        const trackB = await addCuePoints(mediaEl, cuePoints);
        assert.equal(trackB, trackA);
      });

      it('should ensure cuePoints do not overlap, even after multiple invocations', async () => {
        const track = await addCuePoints(mediaEl, cuePoints);
        const refCuePointIdx = Math.floor(cuePoints.length / 2);
        const refCuePointBefore = cuePoints[refCuePointIdx];
        const refCuePointAfter = cuePoints[refCuePointIdx + 1];
        const timestamp = refCuePointBefore.timestamp + (refCuePointAfter.timestamp - refCuePointBefore.timestamp) / 2;
        const additionalCuePoint = {
          timestamp,
          value: 'non-overlapping',
        };
        await addCuePoints(mediaEl, [additionalCuePoint]);
        const actualCueIdx = Array.prototype.findIndex.call(track.cues, (cue) => cue.startTime === timestamp);
        const actualCue = track.cues[actualCueIdx];
        const expectedEndTime = track.cues[actualCueIdx + 1]?.startTime;
        assert.equal(actualCue.endTime, expectedEndTime);
        const actualPreviousCue = track.cues[actualCueIdx - 1];
        const expectedPreviousEndTime = actualCue.startTime;
        assert.equal(actualPreviousCue.endTime, expectedPreviousEndTime);
      });

      it('should set the last cuePoint endTime as MAX_SAFE_INTEGER if duration is not a finite number', async () => {
        const track = await addCuePoints(mediaEl, cuePoints);
        const lastCue = track.cues[track.cues.length - 1];
        assert.equal(lastCue.endTime, Number.MAX_SAFE_INTEGER);
      });

      it('should set the last cuePoint endTime as mediaEl.duration if duration is a finite number', async () => {
        mediaEl.src = 'https://stream.mux.com/A3VXy02VoUinw01pwyomEO3bHnG4P32xzV7u1j1FSzjNg/low.mp4';
        mediaEl.load();
        await oneEvent(mediaEl, 'durationchange');
        const track = await addCuePoints(mediaEl, cuePoints);
        const lastCue = track.cues[track.cues.length - 1];
        assert.equal(lastCue.endTime, mediaEl.duration);
      });
    });

    describe('getCuePoints()', () => {
      it('yields an empty array if no cuePoints have been added', () => {
        const actualCuePoints = getCuePoints(mediaEl);
        assert(Array.isArray(actualCuePoints));
        assert.equal(actualCuePoints.length, 0);
      });

      it('should get the added cuePoints from a media element with values deserialized', async () => {
        const cuePoints = [
          { timestamp: 0, value: null },
          { timestamp: 12, value: { label: 'CTA 1', showDuration: 10 } },
          { timestamp: 30, value: { label: 'CTA 2', showDuration: 5 } },
          { timestamp: 43, value: null },
        ];
        await addCuePoints(mediaEl, cuePoints);
        const actualCuePoints = getCuePoints(mediaEl);

        actualCuePoints.forEach((actualCuePoint, index) => {
          const expectedCuePoint = cuePoints[index];
          assert.deepEqual(actualCuePoint, expectedCuePoint);
        });
      });

      it('converts undefined cuePoint values into nulls', async () => {
        const cuePoints = [{ timestamp: 0, value: undefined }, { timestamp: 4 }];
        await addCuePoints(mediaEl, cuePoints);
        const actualCuePoints = getCuePoints(mediaEl);

        actualCuePoints.forEach((actualCuePoint) => {
          assert.equal(actualCuePoint.value, null);
        });
      });
    });

    describe('getActiveCuePoints()', () => {
      const cuePoints = [
        { timestamp: 0, value: { label: 'CTA 1', showDuration: 10 } },
        { timestamp: 30, value: { label: 'CTA 2', showDuration: 5 } },
        { timestamp: 120, value: { label: 'CTA 3', showDuration: 5 } },
      ];

      it('yields undefined if no active cuePoints have been added', () => {
        const activeCuePoint = getActiveCuePoint(mediaEl);
        assert.equal(activeCuePoint, undefined);
      });

      it('should get the active cuePoint based on the media element currentTime', async () => {
        mediaEl.src = 'https://stream.mux.com/A3VXy02VoUinw01pwyomEO3bHnG4P32xzV7u1j1FSzjNg/low.mp4';
        mediaEl.load();
        const expectedCuePoint = cuePoints[1];
        await oneEvent(mediaEl, 'canplay');
        const track = await addCuePoints(mediaEl, cuePoints);
        mediaEl.currentTime = expectedCuePoint.timestamp + 0.001;
        await oneEvent(track, 'cuechange');
        const actualCuePoint = getActiveCuePoint(mediaEl);
        assert.deepEqual(actualCuePoint, expectedCuePoint);
      });

      it('should get the closest previous cuePoint when seeking between cuePoint timestamps', async () => {
        mediaEl.src = 'https://stream.mux.com/A3VXy02VoUinw01pwyomEO3bHnG4P32xzV7u1j1FSzjNg/low.mp4';
        mediaEl.load();
        const expectedCuePoint = cuePoints[1];
        const currentTime = expectedCuePoint.timestamp + (cuePoints[2].timestamp - expectedCuePoint.timestamp) / 2;
        await oneEvent(mediaEl, 'canplay');
        const track = await addCuePoints(mediaEl, cuePoints);
        mediaEl.currentTime = currentTime;
        await oneEvent(track, 'cuechange');
        await waitUntil(() => !!track.activeCues[0].startTime);
        const actualCuePoint = getActiveCuePoint(mediaEl);
        assert.deepEqual(actualCuePoint, expectedCuePoint);
      });
    });
  });
});
