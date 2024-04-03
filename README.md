# babel-plugin-transform-remove-polyfill

[![CI](https://github.com/shoonia/babel-plugin-transform-remove-polyfill/actions/workflows/ci.yml/badge.svg)](https://github.com/shoonia/babel-plugin-transform-remove-polyfill/actions/workflows/ci.yml)

## Install

```bash
npm i babel-plugin-transform-remove-polyfill -D
# or
yarn add babel-plugin-transform-remove-polyfill -D
```

## Example

**Before:**

```js
var assign = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t];

    for (var r in n) {
      if (Object.prototype.hasOwnProperty.call(n, r)) {
        e[r] = n[r]
      }
    }
  }
  return e;
};
```

**After:**

```js
var assign = Object.assign;
```

## License
[MIT](./LICENSE)
