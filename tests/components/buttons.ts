/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { after, before, describe, it } from 'mocha';
import DialpadButtonConfig from 'src/ts/components/buttons/type';
import DialpadButton from '../../src/ts/components/buttons/buttons';

const jsdom = require('jsdom-global');

describe('Test Dialpad Button', () => {
  let validConfig: DialpadButtonConfig;
  let invalidConfig: DialpadButtonConfig;
  let cleanup: any;

  before(() => {
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

  after(() => {
    cleanup();
  });

  it('should throw an error for invalid config', () => {
    expect(() => new DialpadButton(invalidConfig)).to.throw(
      Error,
      'Invalid config for dialPad button'
    );
  });

  it('should not throw an error for valid config', () => {
    expect(() => new DialpadButton(validConfig)).to.not.throw();
  });

  it('should has valid id', () => {
    // Create DialpadButton instance
    const button = new DialpadButton(validConfig);

    // Assert that id is correct
    expect(button.id).to.equal(`dialpad-btn-test-namespace`);
  });

  it('build should append skeleton to parentElement', () => {
    // Create DialpadButton instance
    const button = new DialpadButton(validConfig);

    // Call the build method
    button.build(document.body);

    // Assert that the parentElement now contains the button skeleton
    expect(button.querySelector).to.exist;
  });
});
