/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { afterEach, beforeEach, describe, it } from 'mocha';
import sinon from 'sinon';
import DialpadButton from '../../src/ts/components/buttons/buttons';
import DialpadButtonConfig from '../../src/ts/components/buttons/type';

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

  it('skeleton should return correct html element', () => {
    // Create DialpadButton instance
    const button = new DialpadButton(validConfig);

    // Create spy for titleElement getter
    const titleElementSpy = sinon.spy(button, 'titleElement', ['get']);

    // Create spy for subtitleElement getter
    const subtitleElementSpy = sinon.spy(button, 'subtitleElement', ['get']);

    // Create spy for configureButtonEvents
    const configureButtonEventsSpy = sinon.spy(button, 'configureButtonEvents');

    // Access skeleton
    const { skeleton } = button;

    // Assert that the skeleton is an HTMLElement
    expect(skeleton).to.be.instanceOf(HTMLButtonElement);

    // Assert that the skeleton has the correct tag name
    expect(skeleton.tagName).to.be.equal('BUTTON');

    // Assert that the skeleton has the correct class name
    expect(skeleton.className).to.be.equal('dialpad-btn');

    // Assert that the skeleton has the correct area-label attribute
    expect(skeleton.getAttribute('aria-label')).to.be.equal(
      validConfig.ariaLabel
    );

    // Assert that the titleElement getter was accessed
    expect(titleElementSpy.get.calledOnce).to.be.true;

    // Assert that the subtitleElement getter was accessed
    expect(subtitleElementSpy.get.calledOnce).to.be.true;

    // Assert that the configureButtonEvents called once with button skeleton
    expect(configureButtonEventsSpy.calledOnceWithExactly(skeleton)).to.be.true;

    // Assert that tileElement and subtitleElement appended expected in order
    sinon.assert.callOrder(titleElementSpy.get, subtitleElementSpy.get);

    // Assert that titleElement is appended in skeleton
    expect(skeleton.querySelector('.dialpad-btn__title')).to.exist;

    // Assert that subtitleElement is appended in skeleton
    expect(skeleton.querySelector('.dialpad-btn__subtitle')).to.exist;
  });

  it('configureButtonEvents should apply LongPressEvent on button if config.onLongPress is exists', () => {
    // Define a mock config for your object
    const config = {
      namespace: 'Test',
      onLongPress: sinon.stub(),
      subtitle: 'Subtitle',
      onClick: sinon.stub(),
      title: 'Title',
      ariaLabel: 'Aria Label',
      onLongPressCancel: sinon.stub(),
    };

    // Create DialpadButton instance
    const button = new DialpadButton(config);

    // Create buttonElement
    const btn = document.createElement('button');

    // Create a spy on applyLongPressEvent
    const applyLongPressEventSpy = sinon.spy(button, 'applyLongPressEvent');

    // Call configureButtonEvents for button element
    button.configureButtonEvents(btn);

    // Assert that applyLongPressEvent called once with expected button element
    expect(applyLongPressEventSpy.calledOnceWithExactly(btn)).to.be.true;
  });

  it('querySelector should retrieve button HTMLElement', () => {
    // Create DialpadButton
    const button = new DialpadButton(validConfig);

    // Expected button id
    const buttonId = `dialpad-btn-${validConfig.namespace}`;

    // Create spy for document getElementById
    const getElementByIdSpy = sinon.spy(document, 'getElementById');

    // Call the build method
    button.build(document.body);

    // Call querySelector
    const result = button.querySelector;

    // Assert that getElementById call with expected id
    expect(getElementByIdSpy.calledOnceWith(buttonId)).to.be.true;

    // Assert that the result is an HTMLButtonElement
    expect(result).to.be.an.instanceOf(HTMLButtonElement);

    // Assert that result HTMLElement has expected id
    expect(result.id).to.equal(buttonId);
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

    // Assert that the skeleton getter was accessed
    expect(skeletonGetterSpy.get.calledOnce).to.be.true;

    // Assert that the parentElement appendChild was called once with the correct argument
    expect(appendChildSpy.calledOnceWith(sinon.match.instanceOf(HTMLElement)))
      .to.be.true;

    // Assert that the parentElement now contains the button skeleton
    expect(button.querySelector).to.exist;
  });
});
