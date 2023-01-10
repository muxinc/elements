import { assert } from '@open-wc/testing';
import { addCuePoints } from '../src/tracks.ts';

// "https://stream.mux.com/A3VXy02VoUinw01pwyomEO3bHnG4P32xzV7u1j1FSzjNg/high.mp4"
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

      it('creates serialized cues for the cuepoints', async () => {
        const track = await addCuePoints(mediaEl, cuePoints);
        assert.equal(track.cues.length, cuePoints.length);
        track.cues.forEach((cue, index) => {
          assert.equal(cue.startTime, cuePoints[index].timestamp);
          // Since `undefined` isn't serializable, it is represented as null in JSON.
          const expectedValue = cuePoints[index].value ?? null;
          // Parsing to not assume string formatting in the JSON.
          assert.deepEqual(JSON.parse(cue.text), expectedValue);
        });
      });

      it('handles out of order cuePoints', async () => {
        const rotatedCuePoints = [];
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
    });
  });
});
