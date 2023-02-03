import { assert, fixture, aTimeout } from '@open-wc/testing';
import MuxLivestreamStatus from '../src/index.ts';

describe('<mux-livestream-status>', () => {
  it('shows correct status if livestream is live', async function () {
    this.timeout(3000);
    const statusEl = await fixture(`<mux-livestream-status
        playback-id="23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I"
      ></mux-livestream-status>`);
    let changeEventFired = false;
    statusEl.addEventListener('change', () => (changeEventFired = true));
    await aTimeout(2000);
    assert.isTrue(changeEventFired, 'change event fired');
    assert.equal(statusEl.status, 'active', 'status is "active"');
  });

  it('shows correct status if livestream is idle', async function () {
    // TODO: which livestream can we safely use to test this
    // currently using one of Adams
    this.timeout(3000);
    const statusEl = await fixture(`<mux-livestream-status
        playback-id="6BC2NFpXHw7jnWiZ202PpAkPrlGQZOFqKYbRcSlLaE700"
      ></mux-livestream-status>`);
    let changeEventFired = false;
    statusEl.addEventListener('change', () => (changeEventFired = true));
    await aTimeout(2000);
    assert.isTrue(changeEventFired, 'change event fired');
    assert.equal(statusEl.status, 'idle', 'status is "idle"');
  });

  it('calls the error callback if no livestream found', async function () {
    this.timeout(3000);
    const statusEl = await fixture(`<mux-livestream-status
        playback-id="non-existant-id"
      ></mux-livestream-status>`);
    let errorEventFired = false;
    statusEl.addEventListener('error', () => (errorEventFired = true));
    await aTimeout(2000);
    assert.isTrue(errorEventFired, 'error event fired');
  });

  // TODO: test unsubscribe function / abort
});
