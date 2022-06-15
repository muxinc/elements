import { assert } from '@open-wc/testing';
import { getSrcFromPlaybackId, getPosterURLFromPlaybackId, getStoryboardURLFromPlaybackId } from '../src/helpers.ts';

describe('helpers', () => {
  describe('getSrcFromPlaybackId', () => {
    it('with no token', () => {
      assert.equal(getSrcFromPlaybackId('12345'), 'https://stream.mux.com/12345.m3u8?redundant_streams=true');
    });

    it('with a token', () => {
      assert.equal(
        getSrcFromPlaybackId('12345', { token: 't-1234' }),
        'https://stream.mux.com/12345.m3u8?token=t-1234'
      );
    });

    it('with a custom domain', () => {
      assert.equal(
        getSrcFromPlaybackId('12345', { domain: 'fake.com' }),
        'https://stream.fake.com/12345.m3u8?redundant_streams=true'
      );
    });
  });

  describe('getPosterURLFromPlaybackId', () => {
    it('with no token', () => {
      assert.equal(getPosterURLFromPlaybackId('12345'), 'https://image.mux.com/12345/thumbnail.jpg');
    });

    it('with a token', () => {
      assert.equal(
        getPosterURLFromPlaybackId('12345', { token: 't-1234' }),
        'https://image.mux.com/12345/thumbnail.jpg?token=t-1234'
      );
    });

    it('with a thumbnailTime', () => {
      assert.equal(
        getPosterURLFromPlaybackId('12345', { thumbnailTime: 20 }),
        'https://image.mux.com/12345/thumbnail.jpg?time=20'
      );
    });

    it('with a thumbnailTime and token', () => {
      assert.equal(
        getPosterURLFromPlaybackId('12345', { token: 't-1234', thumbnailTime: 20 }),
        'https://image.mux.com/12345/thumbnail.jpg?token=t-1234'
      );
    });

    it('with a custom domain', () => {
      assert.equal(
        getPosterURLFromPlaybackId('12345', { domain: 'fake.com' }),
        'https://image.fake.com/12345/thumbnail.jpg'
      );
    });
  });

  describe('getStoryboardURLFromPlaybackId', () => {
    it('with no token', () => {
      assert.equal(getStoryboardURLFromPlaybackId('12345'), 'https://image.mux.com/12345/storyboard.vtt');
    });

    it('with a token', () => {
      assert.equal(
        getStoryboardURLFromPlaybackId('12345', { token: 't-1234' }),
        'https://image.mux.com/12345/storyboard.vtt?token=t-1234'
      );
    });

    it('with a custom domain', () => {
      assert.equal(
        getStoryboardURLFromPlaybackId('12345', { domain: 'fake.com' }),
        'https://image.fake.com/12345/storyboard.vtt'
      );
    });
  });
});
