import { expect } from 'chai';
import { after, before, describe, it } from 'mocha';
import sinon from 'sinon';

const jsdom = require('jsdom-global');

describe('dummy test', () => {
  it('should work', () => {
    expect(1).to.equal(1);
  });
});

describe('dummy test for jsdom', () => {
  let cleanup: any;

  before(() => {
    cleanup = jsdom();
    document.body.innerHTML = '<p>Hello world</p>';
  });

  after(() => {
    cleanup();
  });

  it('test dom', () => {
    const paragraph = document.querySelector('p')!;
    expect(paragraph.innerHTML).to.equal('Hello world');
  });

  it('test spy using sinon', () => {
    // Create a spy for document.querySelector
    const querySelectorSpy = sinon.spy(document, 'querySelector');

    // Call querySelector
    document.querySelector('body');

    // Assert that querySelector called Once
    // eslint-disable-next-line no-unused-expressions
    expect(querySelectorSpy.calledOnce).to.be.true;
  });
});
