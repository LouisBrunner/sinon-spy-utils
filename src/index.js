import sinon from 'sinon';

export const Mock = (...funcs) => {
  const obj = {};
  for (const func of funcs) {
    obj[func] = sinon.stub();
  }
  return obj;
};

const XXXAndDo = (sinonFunc, object, rest) => {
  const methods = rest.slice(0, rest.length - 1), func = rest[rest.length - 1];
  const results = {};
  for (const method of methods) {
    results[method] = sinon[sinonFunc](object, method);
  }
  try {
    func(results);
  } finally {
    for (const method of methods) {
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
