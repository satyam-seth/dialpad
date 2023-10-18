/* eslint-disable no-console */
import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import InputElement from '../../src/ts/components/forms/inputs';
import { InputElementConfig } from '../../src/ts/components/forms/types';

describe('Test Input Element', () => {
  let config: InputElementConfig;

  beforeEach(() => {
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
});
