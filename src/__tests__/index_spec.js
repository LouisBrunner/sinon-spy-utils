import * as SpyUtils from '../index';

describe('SpyUtils functions', () => {
  describe('Mock function', () => {
    const testMock = (options = {}) => {
      let res;
      if (options.multiple) {
        res = SpyUtils.Mock('yes', 'oneTwo', 'destroy');
        expect(res.yes).toBeInstanceOf(Function);
        expect(res.oneTwo).toBeInstanceOf(Function);
        expect(res.destroy).toBeInstanceOf(Function);
      } else {
        res = SpyUtils.Mock('ert');
        expect(res.ert).toBeInstanceOf(Function);
      }
    };

    test('works with one argument', () => { testMock(); });
    test('works with multiple arguments', () => { testMock({multiple: true}); });
  });

  describe('SpyAndDo function', () => {
    const testSpyAndDo = (options = {}) => {
      const deps = {
        doStuff: () => { return 12; },
        doThat: () => { return 0; },
      };
      const subject = {
        process: () => {
          if (options.throw) {
            throw new Error('A BALL');
          }
          return (deps.doStuff() + deps.doThat()) * 10;
        },
      };
      const args = options.array ? ['doStuff', 'doThat'] : ['doStuff'];

      expect(deps.doStuff()).toEqual(12);
      expect(deps.doThat()).toEqual(0);
      SpyUtils.SpyAndDo(deps, ...args, (spies) => {
        expect(spies.doStuff.called).toEqual(false);
        if (options.array) {
          expect(spies.doThat).toBeInstanceOf(Function);
        } else {
          expect(spies.doThat).toBeUndefined();
        }

        expect(deps.doStuff()).toEqual(12);
        expect(deps.doThat()).toEqual(0);

        expect(spies.doStuff.callCount).toEqual(1);
        if (options.array) {
          expect(spies.doThat.callCount).toEqual(1);
        }

        let threw = false;
        try {
          expect(subject.process()).toEqual(120);
        } catch (e) {
          if (options.throw) {
            expect(e.message).toEqual('A BALL');
            threw = true;
          } else {
            throw e;
          }
        }
        if (options.throw) {
          expect(threw).toBe(true);
        } else {
          expect(spies.doStuff.callCount).toEqual(2);
          if (options.array) {
            expect(spies.doThat.callCount).toEqual(2);
          }
        }
      });
      expect(deps.doStuff()).toEqual(12);
      expect(deps.doThat()).toEqual(0);
    };

    test('spies and destroys it after', () => { testSpyAndDo(); });
    test('spies and destroys it after (throw)', () => { testSpyAndDo({throw: true}); });
    test('spies and destroys it after (array)', () => { testSpyAndDo({array: true}); });
    test('spies and destroys it after (array & throw)', () => { testSpyAndDo({array: true, throw: true}); });
  });

  describe('StubAndDo function', () => {
    const testStubAndDo = (options = {}) => {
      const deps = {
        doStuff: () => { return 12; },
        doThat: () => { return 0; },
      };
      const subject = {
        process: () => {
          if (options.throw) {
            throw new Error('A BALL');
          }
          return (deps.doStuff() + deps.doThat()) * 10;
        },
      };
      const args = options.array ? ['doStuff', 'doThat'] : ['doStuff'];

      expect(deps.doStuff()).toEqual(12);
      expect(deps.doThat()).toEqual(0);
      SpyUtils.StubAndDo(deps, ...args, (spies) => {
        expect(deps.doStuff()).toBeUndefined();
        spies.doStuff.returns(41);
        expect(deps.doStuff()).toEqual(41);

        if (options.array) {
          expect(deps.doThat()).toBeUndefined();
          spies.doThat.returns(1);
          expect(deps.doThat()).toEqual(1);
        } else {
          expect(deps.doThat()).toEqual(0);
        }

        let threw = false;
        try {
          expect(subject.process()).toEqual((options.array ? 420 : 410));
        } catch (e) {
          if (options.throw) {
            expect(e.message).toEqual('A BALL');
            threw = true;
          } else {
            throw e;
          }
        }
        if (options.throw) {
          expect(threw).toEqual(true);
        }
      });
      expect(deps.doStuff()).toEqual(12);
      expect(deps.doThat()).toEqual(0);
    };

    test('stubs and destroys it after', () => { testStubAndDo(); });
    test('stubs and destroys it after (throw)', () => { testStubAndDo({throw: true}); });
    test('stubs and destroys it after (array)', () => { testStubAndDo({array: true}); });
    test('stubs and destroys it after (array & throw)', () => { testStubAndDo({array: true, throw: true}); });
  });
});
