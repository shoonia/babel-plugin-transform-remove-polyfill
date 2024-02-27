# babel-plugin-transform-remove-polyfill

[![CI](https://github.com/shoonia/babel-plugin-transform-remove-polyfill/actions/workflows/ci.yml/badge.svg)](https://github.com/shoonia/babel-plugin-transform-remove-polyfill/actions/workflows/ci.yml)

## Install

```bash
npm i babel-plugin-transform-remove-polyfill -D
# or
yarn add babel-plugin-transform-remove-polyfill -D
```

## Example

TypeScript helper functions `__assign` from [tslib](https://github.com/Microsoft/tslib)

**Before:**

```js
var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
      }
      return t;
  };
  return __assign.apply(this, arguments);
};
```

**After:**

```js
var __assign = Object.assign;
```

## License
[MIT](./LICENSE)
