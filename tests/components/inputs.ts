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
});
