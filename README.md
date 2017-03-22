# sinon-spy-utils [![NPM Version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![dependencies Status][deps-image]][deps-url] [![devDependencies Status][deps-dev-image]][deps-dev-url]

This package is a collection of util functions to make your life easier when using [Sinon.js](http://sinonjs.org).
At the moment, it contains *3* functions: `Mock` (creating fake objects), `SpyAndDo` (scoped spy) and `StubAndDo` (scoped stub).


## Installation

### Node Installation

```sh
npm install sinon-spy-utils
```

You can then `SpyUtils = require('sinon-spy-utils')` or `import { Mock } from 'sinon-spy-utils'`.

### Browser Installation

Use the minified UMD build in the `dist` folder: [here](dist/sinon-spy-utils.min.js).
It exports a global `window.SinonSpyUtils` when imported as a `<script>` tag.


## Usage

Every code snippet will be presented in 3 different styles: Node.js `require`, Node.js `import` and Browser Javascript (with required HTML `<script>`s).

### Mock

This function creates a mock object containing functions corresponding to the provided names.

 - *require*:
```js
  var Mock = require('sinon-spy-utils').Mock;
  ...
  var fakeUser = Mock('getName', 'getAvatar', 'getAge');
```

 - *import*:
```js
  import { Mock } from 'sinon-spy-utils';
  ...
  const fakeUser = Mock('getName', 'getAvatar', 'getAge');
```

 - *browser*:
```js
  <script src="sinon.min.js"></script>
  <script src="sinon-spy-utils.min.js"></script>
  ...
  var fakeUser = SinonSpyUtils.Mock('getName', 'getAvatar', 'getAge');
```

### SpyAndDo

This function will spy the listed functions of the provided object and call the provided function. The spied functions will be restored whatever happens.

 - *require*:
```js
  var SpyAndDo = require('sinon-spy-utils').SpyAndDo;
  ...
  SpyAndDo(console, 'error', 'log', function (spies) {
    functionThatCallsConsoleLog(); // your function
    expect(spies.log).to.have.been.called; // your test (here using sinon + chai style)
  });
```

 - *import*:
```js
  import { SpyAndDo } from 'sinon-spy-utils';
  ...
  SpyAndDo(console, 'error', 'log', (spies) => {
    functionThatCallsConsoleLog(); // your function
    expect(spies.log).to.have.been.called; // your test (here using sinon + chai style)
  });
```

 - *browser*:
```js
  <script src="sinon.min.js"></script>
  <script src="sinon-spy-utils.min.js"></script>
  ...
  SinonSpyUtils.SpyAndDo(console, 'error', 'log', function (spies) {
    functionThatCallsConsoleLog(); // your function
    expect(spies.log).to.have.been.called; // your test (here using sinon + chai style)
  });
```


### StubAndDo

This function will stub the listed functions of the provided object and call the provided function. The stubbed functions will be restored whatever happens.

 - *require*:
```js
  var StubAndDo = require('sinon-spy-utils').StubAndDo;
  ...
  StubAndDo(console, 'error', 'log', function (spies) {
    functionThatCallsConsoleLog(); // your function
    expect(spies.log).to.have.been.called; // your test (here using sinon + chai style)
  });
```

 - *import*:
```js
  import { StubAndDo } from 'sinon-spy-utils';
  ...
  StubAndDo(console, 'error', 'log', (spies) => {
    functionThatCallsConsoleLog(); // your function
    expect(spies.log).to.have.been.called; // your test (here using sinon + chai style)
  });
```

 - *browser*:
```js
  <script src="sinon.min.js"></script>
  <script src="sinon-spy-utils.min.js"></script>
  ...
  SinonSpyUtils.StubAndDo(console, 'error', 'log', function (spies) {
    functionThatCallsConsoleLog(); // your function
    expect(spies.log).to.have.been.called; // your test (here using sinon + chai style)
  });
```


## License

MIT, Copyright (c) 2017 Louis Brunner



[npm-image]: https://img.shields.io/npm/v/sinon-spy-utils.svg
[npm-url]: https://npmjs.org/package/sinon-spy-utils
[travis-image]: https://travis-ci.org/LouisBrunner/sinon-spy-utils.svg?branch=master
[travis-url]: https://travis-ci.org/LouisBrunner/sinon-spy-utils
[coveralls-image]: https://coveralls.io/repos/github/LouisBrunner/sinon-spy-utils/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/LouisBrunner/sinon-spy-utils?branch=master
[deps-image]: https://david-dm.org/louisbrunner/sinon-spy-utils/status.svg
[deps-url]: https://david-dm.org/louisbrunner/sinon-spy-utils
[deps-dev-image]: https://david-dm.org/louisbrunner/sinon-spy-utils/dev-status.svg
[deps-dev-url]: https://david-dm.org/louisbrunner/sinon-spy-utils?type=dev
