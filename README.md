# babel-plugin-transform-remove-polyfill

[![CI](https://github.com/shoonia/babel-plugin-transform-remove-polyfill/actions/workflows/ci.yml/badge.svg)](https://github.com/shoonia/babel-plugin-transform-remove-polyfill/actions/workflows/ci.yml)

A [Babel](https://babeljs.io/) plugin that removes polyfills and transforms feature detection patterns for modern JavaScript environments. Perfect for targeting evergreen browsers where native APIs are guaranteed to be available.

## Features

- 🚀 **Removes polyfills** - Transforms polyfill fallbacks to use native APIs directly
- 🔍 **Eliminates feature detection** - Converts `typeof` checks and conditionals to their known values
- ⚡ **Code optimization** - Simplifies logical expressions and removes dead code
- 🎯 **Built-in API support** - Covers 50+ JavaScript built-ins (Object, Array, String, Symbol, etc.)

## Install

```bash
npm i babel-plugin-transform-remove-polyfill -D
# or
yarn add babel-plugin-transform-remove-polyfill -D
```

## Quick Example

**Input:**
```js
// Polyfill pattern
var assign = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
```

**Output:**
```js
// Native API usage
var assign = Object.assign;
```

## Usage

### Basic Setup

Add to your [`babel.config.json`](https://babeljs.io/docs/config-files):

```json
{
  "plugins": ["babel-plugin-transform-remove-polyfill"]
}
```

### With Options

```json
{
  "plugins": [
    ["babel-plugin-transform-remove-polyfill", {
      "transform": true
    }]
  ]
}
```

## Transformations

### 1. Polyfill Removal

Transforms polyfill patterns to use native APIs:

```js
// Before
var isArray = Array.isArray || function(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

// After
var isArray = Array.isArray;
```

### 2. Feature Detection Elimination

Removes typeof checks for known built-ins:

```js
// Before
if (typeof Object.defineProperty === 'function') {
  Object.defineProperty(obj, 'prop', descriptor);
}

// After
Object.defineProperty(obj, 'prop', descriptor);
```

### 3. Dead Code Elimination

Removes unreachable code paths:

```js
// Before
if (typeof Symbol !== 'undefined') {
  obj[Symbol.iterator] = function() { return this; };
} else {
  obj.iterate = function() { return this; };
}

// After
obj[Symbol.iterator] = function() { return this; };
```

## Configuration

### Enable All Optimizations

```json
{
  "plugins": [
    ["babel-plugin-transform-remove-polyfill", {
      "transform": true
    }]
  ]
}
```

### Granular Control

Enable specific optimizations:

```json
{
  "plugins": [
    ["babel-plugin-transform-remove-polyfill", {
      "transform": {
        "optimize:Object.assign": true
      }
    }]
  ]
}
```

### Custom Global Objects

Add your own global objects to be recognized:

```json
{
  "plugins": [
    ["babel-plugin-transform-remove-polyfill", {
      "globalObjects": ["customGlobal"],
      "globalFunctions": ["customFunction"]
    }]
  ]
}
```

## Advanced Examples

### Object.assign Optimization

The `optimize:Object.assign` option flattens nested Object.assign calls:

```js
// Before
Object.assign(Object.assign({}, defaults), options);

// After (with optimize:Object.assign: true)
Object.assign({}, defaults, options);
```

### hasOwnProperty Modernization

Automatically converts to modern `Object.hasOwn`:

```js
// Before
Object.prototype.hasOwnProperty.call(obj, prop);

// After
Object.hasOwn(obj, prop);
```

## License
[MIT](./LICENSE)
