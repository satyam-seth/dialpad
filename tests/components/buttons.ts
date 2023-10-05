/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { afterEach, beforeEach, describe, it } from 'mocha';
import sinon from 'sinon';
import DialpadButtonConfig from 'src/ts/components/buttons/type';
import DialpadButton from '../../src/ts/components/buttons/buttons';

const jsdom = require('jsdom-global');

describe('Test Dialpad Button', () => {
  let validConfig: DialpadButtonConfig;
  let invalidConfig: DialpadButtonConfig;
  let cleanup: any;

  beforeEach(() => {
    cleanup = jsdom();

    validConfig = {
      namespace: 'test-namespace',
      ariaLabel: 'test-label',
      title: 'test-title',
      onClick(value: string): void {
        console.log(value);
      },
    };

    invalidConfig = {
      namespace: 'test-namespace',
      ariaLabel: 'test-label',
      title: 'test-title',
      onClick(value: string): void {
        console.log(value);
      },
      onLongPress(value: string): void {
        console.log(value);
      },
    };
  });

  afterEach(() => {
    // cleanup jsdom
    cleanup();

    // Restore the spies
    sinon.restore();
  });

  it('should not throw an error for valid config', () => {
    expect(() => new DialpadButton(validConfig)).to.not.throw();
  });
});
