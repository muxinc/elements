import { assert } from '@open-wc/testing';
import { stylePropsToString, uniqueId } from '../src/utils.ts';

describe('utils', () => {
  it('stylePropsToString', function () {
    assert.equal(
      stylePropsToString({
        fontSize: '12px',
        color: '#fff',
      }),
      'font-size: 12px; color: #fff;'
    );
  });

  it('uniqueId', function () {
    let id = uniqueId('uid');
    assert.equal(id, 'uid1');

    assert.notEqual(uniqueId('uid'), id);
  });
});
