import { assert } from '@open-wc/testing';
import { getSrcFromPlaybackId } from '../src/helpers.ts';

describe('helpers', () => {
  it('getSrcFromPlaybackId with no token', function () {
    assert.equal(getSrcFromPlaybackId('12345'), 'https://stream.mux.com/12345.m3u8?redundant_streams=true');
  });

  it('getSrcFromPlaybackId with a token', function () {
    assert.equal(getSrcFromPlaybackId('12345', 't-1234'), 'https://stream.mux.com/12345.m3u8?token=t-1234');
  });
});
