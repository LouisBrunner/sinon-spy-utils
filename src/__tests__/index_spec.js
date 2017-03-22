import chai from 'chai';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
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
    let testSpyAndDo = (options = {}) => {
      let deps = {
        doStuff() { return 12; },
        doThat() { return 0; },
      };
      let subject = {process() { if (options.throw) { throw new Error('A BALL'); } else { return (deps.doStuff() + deps.doThat()) * 10; } }};
      let args = options.array ? ['doStuff', 'doThat'] : ['doStuff'];

      expect(deps.doStuff()).to.equal(12);
      expect(deps.doThat()).to.equal(0);
      SpyUtils.SpyAndDo(deps, ...args, (spies) => {
        expect(spies.doStuff).not.to.have.been.called;
        if (options.array) {
          expect(spies.doThat).to.be.an.instanceof(Function);
        } else {
          expect(spies.doThat).to.be.undefined;
        }

        expect(deps.doStuff()).to.equal(12);
        expect(deps.doThat()).to.equal(0);

        expect(spies.doStuff).to.have.been.calledOnce;
        if (options.array) {
          expect(spies.doThat).to.have.been.calledOnce;
        }

        let threw = false;
        try {
          expect(subject.process()).to.equal(120);
        } catch (e) {
          if (options.throw) {
            expect(e.message).to.equal('A BALL');
            threw = true;
          } else {
            throw e;
          }
        }
        if (options.throw) {
          expect(threw).to.be.true;
        } else {
          expect(spies.doStuff).to.have.been.calledTwice;
          if (options.array) {
            expect(spies.doThat).to.have.been.calledTwice;
          }
        }
      });
      expect(deps.doStuff()).to.equal(12);
      expect(deps.doThat()).to.equal(0);
    };

    it('spies and destroys it after', () => testSpyAndDo());
    it('spies and destroys it after (throw)', () => testSpyAndDo({throw: true}));
    it('spies and destroys it after (array)', () => testSpyAndDo({array: true}));
    it('spies and destroys it after (array & throw)', () => testSpyAndDo({array: true, throw: true}));
  });

  describe('StubAndDo function', () => {
    let testStubAndDo = (options = {}) => {
      let deps = {
        doStuff() { return 12; },
        doThat() { return 0; },
      };
      let subject = {process() { if (options.throw) { throw new Error('A BALL'); } else { return (deps.doStuff() + deps.doThat()) * 10; } }};
      let args = options.array ? ['doStuff', 'doThat'] : ['doStuff'];

      expect(deps.doStuff()).to.equal(12);
      expect(deps.doThat()).to.equal(0);
      SpyUtils.StubAndDo(deps, ...args, (spies) => {
        expect(deps.doStuff()).to.be.undefined;
        spies.doStuff.returns(41);
        expect(deps.doStuff()).to.equal(41);

        if (options.array) {
          expect(deps.doThat()).to.be.undefined;
          spies.doThat.returns(1);
          expect(deps.doThat()).to.equal(1);
        } else {
          expect(deps.doThat()).to.equal(0);
        }

        let threw = false;
        try {
          expect(subject.process()).to.equal((options.array ? 420 : 410));
        } catch (e) {
          if (options.throw) {
            expect(e.message).to.equal('A BALL');
            threw = true;
          } else {
            throw e;
          }
        }
        if (options.throw) {
          expect(threw).to.be.true;
        }
      });
      expect(deps.doStuff()).to.equal(12);
      expect(deps.doThat()).to.equal(0);
    };

    it('stubs and destroys it after', () => testStubAndDo());
    it('stubs and destroys it after (throw)', () => testStubAndDo({throw: true}));
    it('stubs and destroys it after (array)', () => testStubAndDo({array: true}));
    it('stubs and destroys it after (array & throw)', () => testStubAndDo({array: true, throw: true}));
  });
});
