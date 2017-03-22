import chai from 'chai';
const expect = chai.expect;

import * as SpyUtils from '../index';

describe('SpyUtils functions', () => {
  describe('Mock function', () => {
    let testMock = (options = {}) => {
      let res;
      if (options.multiple) {
        res = SpyUtils.Mock('yes', 'oneTwo', 'destroy');
        expect(res.yes).to.be.an.instanceof(Function);
        expect(res.oneTwo).to.be.an.instanceof(Function);
        expect(res.destroy).to.be.an.instanceof(Function);
      } else {
        res = SpyUtils.Mock('ert');
        expect(res.ert).to.be.an.instanceof(Function);
      }
    };

    it('works with one argument', () => { testMock(); });
    it('works with multiple arguments', () => { testMock({multiple: true}); });
  });

  describe('SpyAndDo function', () => {
  });

  describe('StubAndDo function', () => {
  });
});
