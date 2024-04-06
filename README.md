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

`transform`

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

`"Object.hasOwn"`

`boolean`, defaults to `false`.

Transform `Object.prototype.hasOwnProperty.call(obj, key)` to `Object.hasOwn(obj, key)`

```json
{
  "plugins": [
    [
      "babel-plugin-transform-remove-polyfill",
      {
        "transform": {
          "Object.hasOwn": true
        }
      }
    ]
  ]
}
```

**Example:**

```diff
- if (Object.prototype.hasOwnProperty.call(obj, key)) { /*...*/ }
+ if (Object.hasOwn(obj, key)) { /*...*/ }
```

`"Array.from"`

`boolean`, defaults to `false`.

Transform `Array.prototype.slice.call(arraylike)` to `Array.from(arraylike)`

```json
{
  "plugins": [
    [
      "babel-plugin-transform-remove-polyfill",
      {
        "transform": {
          "Array.from": true
        }
      }
    ]
  ]
}
```

**Example:**

```diff
- let list = Array.prototype.slice.call(arguments);
+ let list = Array.from(arguments);
```

## License
[MIT](./LICENSE)
