/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { afterEach, beforeEach, describe, it } from 'mocha';
import sinon from 'sinon';
import InputElement from '../../src/ts/components/forms/inputs';
import { InputElementConfig } from '../../src/ts/components/forms/types';

const jsdom = require('jsdom-global');

describe('Test Input Element', () => {
  let config: InputElementConfig;
  let cleanup: any;

  beforeEach(() => {
    cleanup = jsdom();

    config = {
      namespace: 'test-namespace',
      onValueEmpty: () => {
        console.log('value empty');
      },
      onValueNonEmpty: () => {
        console.log('value non empty');
      },
    };
  });

  afterEach(() => {
    // cleanup jsdom
    cleanup();

    // Restore the spies
    sinon.restore();
  });

  it('should able to create object for valid config', () => {
    // Create InputElement instance
    const input = new InputElement(config);

    // Assert that input is instance of InputElement
    expect(input).to.be.instanceOf(InputElement);
  });

  it('should has correct id', () => {
    // Create InputElement instance
    const input = new InputElement(config);

    // Assert that id is correct
    expect(input.id).to.equal(`input-test-namespace`);
  });

  it('querySelector should retrieve button HTMLElement', () => {
    // Create InputElement
    const input = new InputElement(config);

    // Expected input id
    const inputId = `input-${config.namespace}`;

    // Create spy for document getElementById
    const getElementByIdSpy = sinon.spy(document, 'getElementById');

    // Call the build method
    input.build(document.body);

    // Call querySelector
    const result = input.querySelector;

    // Assert that getElementById call with expected id
    expect(getElementByIdSpy.calledOnceWith(inputId)).to.be.true;

    // Assert that the result is an HTMLInputElement
    expect(result).to.be.an.instanceOf(HTMLInputElement);

    // Assert that result HTMLElement has expected id
    expect(result.id).to.equal(inputId);
  });

  it('build should append skeleton to parentElement', () => {
    // Create InputElement instance
    const input = new InputElement(config);

    // Create spy for skeleton getter
    const skeletonGetterSpy = sinon.spy(input, 'skeleton', ['get']);

    // Create spy for appendChild method
    const appendChildSpy = sinon.spy(document.body, 'appendChild');

    // Call the build method
    input.build(document.body);

    // Assert that the skeleton getter was accessed
    expect(skeletonGetterSpy.get.calledOnce).to.be.true;

    // Assert that the parentElement appendChild was called once with the correct argument
    expect(appendChildSpy.calledOnceWith(sinon.match.instanceOf(HTMLElement)))
      .to.be.true;

    // Assert that the parentElement now contains the button skeleton
    expect(input.querySelector).to.exist;
  });

  it('skeleton should return correct html element', () => {
    // Create InputElement instance
    const input = new InputElement(config);

    // Create stub for inputEventHandler
    const inputEventHandlerStub = sinon.stub(input, 'inputEventHandler');

    // Access skeleton
    const { skeleton } = input;

    // Assert that the skeleton is an HTMLElement
    expect(skeleton).to.be.instanceOf(HTMLInputElement);

    // Assert that the skeleton has the correct tag name
    expect(skeleton.tagName).to.be.equal('INPUT');

    // Assert that the skeleton has the correct class name
    expect(skeleton.className).to.be.equal('input-element');

    // Assert that the skeleton has the correct name attribute
    expect(skeleton.getAttribute('name')).to.be.equal('number');

    // Assert that the skeleton has the correct type attribute
    expect(skeleton.getAttribute('type')).to.be.equal('text');

    // Assert that the skeleton has the correct autofocus attribute
    expect(skeleton.autofocus).to.be.true;

    // Assert that the skeleton has the correct inputMode attribute
    expect(skeleton.getAttribute('inputMode')).to.be.equal('none');

    // Assert that the skeleton has the correct autocomplete attribute
    expect(skeleton.getAttribute('autocomplete')).to.be.equal('off');

    // Simulate a click event on the skeleton
    const inputEvent = new Event('input');
    skeleton.dispatchEvent(inputEvent);

    // Assert that the inputEventHandlerStub called once
    expect(inputEventHandlerStub.calledOnce).to.be.true;
  });

  it('makeSureFocused should focus the element when not already focused', () => {
    // Create InputElement instance
    const input = new InputElement(config);

    // Create spy for focus
    const focusSpy = sinon.spy(input, 'focus');

    // build InputElement
    input.build(document.body);

    // Call makeSureFocused to focus the element
    input.makeSureFocused();

    // Assert that focusSpy is called once
    expect(focusSpy.calledOnce).to.be.true;

    // Call makeSureFocused
    input.makeSureFocused();

    // Assert that focusSpy is not called twice
    // but called once because the input element is already focused.
    expect(focusSpy.calledOnce).to.be.true;
  });

  it('selectionStartPosition should return the correct selection start position', () => {
    // Create InputElement instance
    const input = new InputElement(config);

    // Create spy for makeSureFocused
    const makeSureFocusedSpy = sinon.spy(input, 'makeSureFocused');

    // build InputElement
    input.build(document.body);

    // Call selectionStartPosition and assert the value
    expect(input.selectionStartPosition).to.equal(0);

    // Assert that makeSureFocusedSpy call once
    expect(makeSureFocusedSpy.calledOnce).to.be.true;
  });

  it('selectionEndPosition should return the correct selection end position', () => {
    // Create InputElement instance
    const input = new InputElement(config);

    // Create spy for makeSureFocused
    const makeSureFocusedSpy = sinon.spy(input, 'makeSureFocused');

    // build InputElement
    input.build(document.body);

    // Call selectionEndPosition and assert the value
    expect(input.selectionEndPosition).to.equal(0);

    // Assert that makeSureFocusedSpy call once
    expect(makeSureFocusedSpy.calledOnce).to.be.true;
  });

  it('selectionPosition should set the correct selection position', () => {
    // Create InputElement instance
    const input = new InputElement(config);

    // Create spy for makeSureFocused
    const makeSureFocusedSpy = sinon.spy(input, 'makeSureFocused');

    // build InputElement
    input.build(document.body);

    // Set input field value
    input.querySelector.value = 'hello';

    // Call selectionPosition to set the selection position
    input.selectionPosition = 2;

    // Assert that makeSureFocusedSpy call once
    expect(makeSureFocusedSpy.calledOnce).to.be.true;

    // Assert the selection start position is correctly set
    expect(input.selectionStartPosition).to.equal(2);

    // Assert the selection end position is correctly set
    expect(input.selectionEndPosition).to.equal(2);
  });

  it('focused should return correct focus status', () => {
    // Create InputElement instance
    const input = new InputElement(config);

    // build InputElement
    input.build(document.body);

    // Focus input element
    input.querySelector.focus();

    // Assert that the focused returns true
    expect(input.focused).to.be.true;

    // Blur input element
    input.querySelector.blur();

    // Assert that the focused returns false
    expect(input.focused).to.be.false;
  });

  it('value should return correct value', () => {
    // Create InputElement instance
    const input = new InputElement(config);

    // build InputElement
    input.build(document.body);

    // Set input element value
    input.querySelector.value = 'hello';

    // Assert that the focused returns false
    expect(input.value).to.be.equal('hello');
  });

  it('value should set correct value', () => {
    // Create InputElement instance
    const input = new InputElement(config);

    // build InputElement
    input.build(document.body);

    // Set input element value
    input.value = 'hello';

    // Assert that the focused returns false
    expect(input.querySelector.value).to.be.equal('hello');
  });
});
