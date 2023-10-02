import { expect } from 'chai';
import { after, before, describe, it } from 'mocha';

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
});
