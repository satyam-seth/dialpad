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

  it('should throw an error for invalid config', () => {
    expect(() => new DialpadButton(invalidConfig)).to.throw(
      Error,
      'Invalid config for dialPad button'
    );
  });

  it('should has correct id', () => {
    // Create DialpadButton instance
    const button = new DialpadButton(validConfig);

    // Assert that id is correct
    expect(button.id).to.equal(`dialpad-btn-test-namespace`);
  });

  it('titleElement should return correct html element', () => {
    // Create DialpadButton instance
    const button = new DialpadButton(validConfig);

    // Access title element
    const { titleElement } = button;

    // Assert that the title element is an HTMLElement
    expect(titleElement).to.be.instanceOf(HTMLElement);

    // Assert that the title element has the correct tag name
    expect(titleElement.tagName).to.be.equal('H1');

    // Assert that the title element has the correct class name
    expect(titleElement.className).to.be.equal('dialpad-btn__title');

    // Assert that the title element has the correct inner text
    expect(titleElement.innerText).to.be.equal('test-title');
  });
});
