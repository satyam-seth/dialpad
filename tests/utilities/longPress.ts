/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { afterEach, beforeEach, describe, it } from 'mocha';
import sinon from 'sinon';
import LongPressEvent from '../../src/ts/utilities/longPress';

const jsdom = require('jsdom-global');

describe('LongPressEvent', () => {
  let cleanup: any;

  beforeEach(() => {
    cleanup = jsdom();
  });

  afterEach(() => {
    // cleanup jsdom
    cleanup();

    // Restore the spies
    sinon.restore();
  });

  it('should detect long press and act accordingly', () => {
    // Use sinon to fake timers
    const clock = sinon.useFakeTimers();

    // Create dummy button for target
    const button = document.createElement('button');

    // Create onLongPressCallback spy
    const onLongPressCallbackSpy = sinon.spy();

    // Create onPressStart spy
    const onPressStartSpy = sinon.spy();

    // Create onLongPressCancel spy
    const onLongPressCancelSpy = sinon.spy();

    // Create a sample config for testing
    const config = {
      target: button,
      onLongPressCallback: onLongPressCallbackSpy,
      onPressStart: onPressStartSpy,
      onLongPressCancel: onLongPressCancelSpy,
    };

    // Call apply method
    LongPressEvent.apply(config);

    // Simulate button press
    button.dispatchEvent(new Event('mousedown'));

    // Simulate holding for 200ms
    clock.tick(200);

    // Simulate the release
    button.dispatchEvent(new Event('mouseup'));

    // Assert that onPressStartSpy called once
    expect(onPressStartSpy.calledOnce).to.be.true;

    // Assert that onLongPressCallbackSpy not called
    expect(onLongPressCallbackSpy.called).to.be.not.true;

    // Assert that onLongPressCancelSpy called once
    expect(onLongPressCancelSpy.calledOnce).to.true;

    // Reset spies
    onPressStartSpy.resetHistory();
    onLongPressCallbackSpy.resetHistory();
    onLongPressCancelSpy.resetHistory();

    // Simulate button press
    button.dispatchEvent(new Event('mousedown'));

    // Simulate holding for 501ms
    clock.tick(501);

    // Simulate the release
    button.dispatchEvent(new Event('mouseup'));

    // Assert that onPressStartSpy called once
    expect(onPressStartSpy.calledOnce).to.be.true;

    // Assert that onLongPressCallbackSpy called once
    expect(onLongPressCallbackSpy.calledOnce).to.be.true;

    // Assert that onLongPressCancelSpy not called
    expect(onLongPressCancelSpy.called).to.not.false;
  });
});
