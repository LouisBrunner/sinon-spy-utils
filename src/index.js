import sinon from 'sinon';

export const Mock = (...funcs) => {
  let obj = {};
  for (let func of funcs) {
    obj[func] = sinon.stub();
  }
  return obj;
};

let XXXAndDo = (sinonFunc, object, rest) => {
  let methods = rest.slice(0, rest.length - 1), func = rest[rest.length - 1];
  let results = {};
  for (let method of methods) {
    results[method] = sinon[sinonFunc](object, method);
  }
  try {
    func(results);
  } finally {
    for (let method of methods) {
      results[method].restore();
    }
  }
};

export const StubAndDo = (object, ...rest) => {
  XXXAndDo('stub', object, rest);
};

export const SpyAndDo = (object, ...rest) => {
  XXXAndDo('spy', object, rest);
};
