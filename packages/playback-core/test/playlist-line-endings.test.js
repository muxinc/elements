import { assert } from '@open-wc/testing';
import { getMultivariantPlaylistSessionData } from '../src/index.ts';
import { getFirstMediaPlaylistUrl } from '../src/util.ts';

const lines = [
  '#EXTM3U',
  '#EXT-X-SESSION-DATA:DATA-ID="com.apple.hls.chapters",URI="https://example.com/chapters.json"',
  '#EXT-X-SESSION-DATA:DATA-ID="com.example.title",VALUE="Episode 1",LANGUAGE="en"',
  '#EXT-X-STREAM-INF:BANDWIDTH=1280000',
  'https://example.com/media.m3u8',
];

describe('multivariant playlist line endings', () => {
  const expectedSessionData = {
    sessionData: {
      'com.apple.hls.chapters': {
        'DATA-ID': 'com.apple.hls.chapters',
        URI: 'https://example.com/chapters.json',
      },
      'com.example.title': {
        'DATA-ID': 'com.example.title',
        VALUE: 'Episode 1',
        LANGUAGE: 'en',
      },
    },
  };

  it('parses session data from a playlist with LF line endings', () => {
    assert.deepEqual(getMultivariantPlaylistSessionData(lines.join('\n')), expectedSessionData);
  });

  it('parses session data from a playlist with CRLF line endings', () => {
    assert.deepEqual(getMultivariantPlaylistSessionData(lines.join('\r\n')), expectedSessionData);
  });

  it('gets the first media playlist URL from a playlist with CRLF line endings', () => {
    assert.equal(getFirstMediaPlaylistUrl(lines.join('\r\n') + '\r\n'), 'https://example.com/media.m3u8');
  });
});
