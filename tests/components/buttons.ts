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
      subtitle: 'test-subtitle',
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

  it('subtitleElement should return correct html element', () => {
    // Create DialpadButton instance
    const button = new DialpadButton(validConfig);

    // Access subtitle element
    const { subtitleElement } = button;

    // Assert that the subtitle element is an HTMLElement
    expect(subtitleElement).to.be.instanceOf(HTMLElement);

    // Assert that the subtitle element has the correct tag name
    expect(subtitleElement.tagName).to.be.equal('P');

    // Assert that the subtitle element has the correct class name
    expect(subtitleElement.className).to.be.equal('dialpad-btn__subtitle');

    // Assert that the subtitle element has the correct inner text
    expect(subtitleElement.innerText).to.be.equal('test-subtitle');
  });

  it('build should append skeleton to parentElement', () => {
    // Create DialpadButton instance
    const button = new DialpadButton(validConfig);

    // Create spy for skeleton getter
    const skeletonGetterSpy = sinon.spy(button, 'skeleton', ['get']);

    // Create spy for appendChild method
    const appendChildSpy = sinon.spy(document.body, 'appendChild');

    // Call the build method
    button.build(document.body);

    // Assert that the getter was accessed
    expect(skeletonGetterSpy.get.calledOnce).to.be.true;

    // Assert that the parentElement appendChild was called once with the correct argument
    expect(appendChildSpy.calledOnceWith(sinon.match.instanceOf(HTMLElement)))
      .to.be.true;

    // Assert that the parentElement now contains the button skeleton
    expect(button.querySelector).to.exist;
  });
});
