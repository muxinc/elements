import { assert } from '@open-wc/testing';
import { getPosterURLFromPlaybackId, getStoryboardURLFromPlaybackId, AttributeTokenList } from '../src/helpers.ts';

// token key Key-Must-Be-at-least-32-bytes-in-length!
// generated via https://dinochiesa.github.io/jwt/
const THUMBNAIL_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ0In0.BUhYQ9GTTFrrqyfT_7d2hb7FCnpmdRnzHPJulYU_yUo';
const STORYBOARD_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJzIn0.aYYPU6VETdQOF04OEbhDYPOCgIxmngVBIfC6BQXbgI8';

describe('helpers', () => {
  describe('getPosterURLFromPlaybackId', () => {
    it('with no token', () => {
      assert.equal(getPosterURLFromPlaybackId('12345'), 'https://image.mux.com/12345/thumbnail.webp');
    });

    it('with a token', () => {
      assert.equal(
        getPosterURLFromPlaybackId('12345', { token: THUMBNAIL_TOKEN }),
        `https://image.mux.com/12345/thumbnail.webp?token=${THUMBNAIL_TOKEN}`
      );
    });

    it('with a thumbnailTime', () => {
      assert.equal(
        getPosterURLFromPlaybackId('12345', { thumbnailTime: 20 }),
        'https://image.mux.com/12345/thumbnail.webp?time=20'
      );
    });

    it('with a thumbnailTime and token', () => {
      assert.equal(
        getPosterURLFromPlaybackId('12345', { token: THUMBNAIL_TOKEN, thumbnailTime: 20 }),
        `https://image.mux.com/12345/thumbnail.webp?token=${THUMBNAIL_TOKEN}`
      );
    });

    it('with a custom domain', () => {
      assert.equal(
        getPosterURLFromPlaybackId('12345', { customDomain: 'fake.com' }),
        'https://image.fake.com/12345/thumbnail.webp'
      );
    });

    it('no url with a mismatched token', () => {
      assert.equal(getPosterURLFromPlaybackId('12345', { token: STORYBOARD_TOKEN }), undefined);
    });

    it('no url with a bad token', () => {
      assert.equal(getPosterURLFromPlaybackId('12345', { token: 'bad-token' }), undefined);
    });
  });

  describe('getStoryboardURLFromPlaybackId', () => {
    it('with no token', () => {
      assert.equal(getStoryboardURLFromPlaybackId('12345'), 'https://image.mux.com/12345/storyboard.vtt?format=webp');
    });

    it('with a token', () => {
      assert.equal(
        getStoryboardURLFromPlaybackId('12345', { token: STORYBOARD_TOKEN }),
        `https://image.mux.com/12345/storyboard.vtt?token=${STORYBOARD_TOKEN}&format=webp`
      );
    });

    it('with a custom domain', () => {
      assert.equal(
        getStoryboardURLFromPlaybackId('12345', { customDomain: 'fake.com' }),
        'https://image.fake.com/12345/storyboard.vtt?format=webp'
      );
    });

    it('no url with a mismatched token', () => {
      assert.equal(getStoryboardURLFromPlaybackId('12345', { token: THUMBNAIL_TOKEN }), undefined);
    });

    it('no url with a bad token', () => {
      assert.equal(getStoryboardURLFromPlaybackId('12345', { token: 'bad-token' }), undefined);
    });
  });

  describe('AttributeTokenList', () => {
    it('Add single token', function () {
      let list = new AttributeTokenList();

      list.add('token-1');
      list = [...list];

      assert.deepEqual(list, ['token-1'], 'Assert that tokens is "token-1".');
    });

    it('Add multiple tokenes', function () {
      let list = new AttributeTokenList();

      list.add('token-1', 'token-2');
      list = [...list];

      assert.deepEqual(list, ['token-1', 'token-2'], 'Assert that tokens is "token-1" and "token-2".');
    });

    it('Just add token once', function () {
      let list = new AttributeTokenList();

      list.add('token-1');
      list.add('token-1');
      list = [...list];

      assert.deepEqual(list, ['token-1'], 'Assert that token was only added once.');
    });

    it('Just add token once', function () {
      let list = new AttributeTokenList();

      list.add('token-1');
      list.add('token-1');
      list = [...list];

      assert.deepEqual(list, ['token-1'], 'Assert that token was only added once.');
    });

    it('Check contains with a single token', function () {
      let list = new AttributeTokenList();

      list.add('token-1');

      assert.ok(list.contains('token-1'), 'Assert that list contains token "token-1".');
    });

    it('Check contains with multiple tokens', function () {
      let list = new AttributeTokenList();

      list.add('token-1');
      list.add('token-2');

      assert.ok(list.contains('token-1'), 'Assert that list contains token "token-1".');
    });

    it('Check contains with non existing token', function () {
      let list = new AttributeTokenList();

      list.add('token-1');

      assert.equal(list.contains('token-2'), false, 'Assert that list does not contains token "token-2".');
    });

    it('Check contains with non existing tokens', function () {
      let list = new AttributeTokenList();

      list.add('token-1');
      list.add('token-2');

      assert.equal(list.contains('token-3'), false, 'Assert that list does not contains token "token-3".');
    });

    it('Get item at index', function () {
      let list = new AttributeTokenList();

      list.add('token-1');
      list.add('token-2');

      assert.equal(list.item(1), 'token-2', 'Assert that "token-2" is at index 1.');
    });

    it('Get item at non existing index', function () {
      let list = new AttributeTokenList();

      list.add('token-1');

      assert.equal(list.item(1), null, 'Assert that item() gives null for non existing token.');
    });

    it('Remove single token', function () {
      let list = new AttributeTokenList();

      list.add('token-1');
      list.add('token-2');

      list.remove('token-2');
      list = [...list];

      assert.deepEqual(list, ['token-1'], 'Assert that "token-2" was removed.');
    });

    it('Remove multiple tokens', function () {
      let list = new AttributeTokenList();

      list.add('token-1');
      list.add('token-2');

      list.remove('token-1', 'token-2');
      list = [...list];

      assert.deepEqual(list, [], 'Assert that "token-1" and "token-2" was removed.');
    });

    it('Toggle addition of token', function () {
      let list = new AttributeTokenList();

      list.toggle('token-1');
      list = [...list];

      assert.deepEqual(list, ['token-1'], 'Assert that tokens is "token-1".');
    });

    it('Toggle removal of token', function () {
      let list = new AttributeTokenList();

      list.add('token-1');
      list.toggle('token-1');
      list = [...list];

      assert.deepEqual(list, [], 'Assert that tokens is empty.');
    });

    it('Toggle removal of token', function () {
      let list = new AttributeTokenList();

      list.add('token-1');
      list.toggle('token-1');
      list = [...list];

      assert.deepEqual(list, [], 'Assert that tokens is empty.');
    });

    it('Toggle removal of token', function () {
      let list = new AttributeTokenList();

      list.add('token-1');
      list.toggle('token-1');
      list = [...list];

      assert.deepEqual(list, [], 'Assert that tokens is empty.');
    });

    it('Test toggle force with filled token list', function () {
      let list = new AttributeTokenList();

      list.add('token-1');

      assert.equal(list.toggle('token-1', false), false, 'Assert that toggle returns false.');
    });

    it('Test toggle force = true with filled token list', function () {
      let list = new AttributeTokenList();

      list.add('token-1');

      assert.equal(list.toggle('token-1', true), true, 'Assert that toggle returns true.');
    });

    it('Test toggle force = true with empty token list', function () {
      let list = new AttributeTokenList();

      assert.ok(list.toggle('token-1', true), 'Assert that toggle returns true.');
    });

    it('Test toggle force = false with empty token list', function () {
      let list = new AttributeTokenList();
      let result = list.toggle('token-12', false);

      list = [...list];

      assert.deepEqual(list, [], 'Assert that token list is empty');
      assert.equal(result, false, 'Assert that toggle returns false.');
    });

    it('Test toString()', function () {
      let list = new AttributeTokenList();

      list.add('token-1', 'token-2');

      assert.equal(list.toString(), 'token-1 token-2', 'Assert that tokens are space separated.');
    });

    it('Test length after add', function () {
      let list = new AttributeTokenList();

      list.add('token-1');

      assert.equal(list.length, 1, 'Assert that length is 1.');
    });

    it('Test length after remove', function () {
      let list = new AttributeTokenList();

      list.add('token-1');
      list.add('token-2');
      list.add('token-3');

      list.remove('token-1');

      assert.equal(list.length, 2, 'Assert that length is 2.');
    });
  });
});
