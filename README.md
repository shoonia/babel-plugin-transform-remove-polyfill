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
var __assign = Object.assign || function (t) {
  for (var s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
  }
  return t;
}
```

**After:**

```js
var __assign = Object.assign;
```

## Usage

With a configuration file [`babel.config.json`](https://babel.dev/docs/config-files#project-wide-configuration)

```json
{
  "plugins": ["babel-plugin-transform-remove-polyfill"]
}
```

## Transform options

### `transform`

Set to `true` to enable all transformers

```json
{
  "plugins": [
    [
      "babel-plugin-transform-remove-polyfill",
      {
        "transform": true
      }
    ]
  ]
}
```

or customization transform features

### `"unsafe:Array.from"`

`boolean`, defaults to `false`.

```json
{
  "plugins": [
    [
      "babel-plugin-transform-remove-polyfill",
      {
        "transform": {
          "unsafe:Array.from": true
        }
      }
    ]
  ]
}
```

**Example:**

```diff
- Array.prototype.slice.call(arguments)
+ Array.from(arguments)
```

> **⚠️ Warning:** Unsafe transformation

```js
// Object with a length property
const arrayLike = { length: 2 }

/**
 * Return empty array with length == 2
 *
 * [empty × 2]
 *   length: 2
 */
console.log(Array.prototype.slice.call(arrayLike));

/**
 * Return array with undefined values and length == 2
 *
 * [undefined, undefined]
 *   0: undefined
 *   1: undefined
 *   length: 2
 */
console.log(Array.from(arrayLike));
```

### `"optimize:Object.assign"`

`boolean`, defaults to `false`.

```json
{
  "plugins": [
    [
      "babel-plugin-transform-remove-polyfill",
      {
        "transform": {
          "optimize:Object.assign": true
        }
      }
    ]
  ]
}
```

**Example:**

```diff
- Object.assign(Object.assign({}, e), o);
+ Object.assign({}, e, o);
```

## License
[MIT](./LICENSE)
