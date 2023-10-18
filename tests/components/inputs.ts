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
    const inputElement = new InputElement(config);
    expect(inputElement).to.be.instanceOf(InputElement);
  });
});
