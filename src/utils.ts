import t from '@babel/types';

type AP = keyof Array<unknown>;
type A = keyof ArrayConstructor
type O = keyof ObjectConstructor;
type SM = keyof SymbolConstructor;
type ST = keyof typeof String.prototype;
type R = keyof typeof Reflect;

const arrayProtoKeys = new Set<string>([
  'find',
  'findIndex',
  'includes',
] satisfies AP[]);

const arrayKeys = new Set<string>([
  'of',
  'from',
  'isArray',
] satisfies A[]);

const objectKeys = new Set<string>([
  'assign',
  'create',
  'setPrototypeOf',
  'getPrototypeOf',
  'keys',
  'values',
  'entries',
  'fromEntries',
  'getOwnPropertyNames',
  'getOwnPropertySymbols',
  'getOwnPropertyDescriptor',
  'getOwnPropertyDescriptors',
  'defineProperty',
  'defineProperties',
  'is',
  'freeze',
  'isFrozen',
  'seal',
  'isSealed',
  'isExtensible',
  'preventExtensions',
] satisfies O[]);

const reflectKeys = new Set<string>([
  'apply',
  'construct',
  'defineProperty',
  'deleteProperty',
  'get',
  'getOwnPropertyDescriptor',
  'getPrototypeOf',
  'has',
  'isExtensible',
  'ownKeys',
  'preventExtensions',
  'set',
  'setPrototypeOf',
] satisfies R[]);

const symbolKeys = new Set<string>([
  'for',
  'keyFor',
] satisfies SM[]);

const wellKnownSymbols = new Set<string>([
  'iterator',
  'toStringTag',
] satisfies SM[]);

const builtInObjects = new Set<string>([
  'ArrayBuffer',
  'Int8Array',
  'Int16Array',
  'Int32Array',
  'Uint8Array',
  'Uint16Array',
  'Uint32Array',
  'Float32Array',
  'Float64Array',
  'Uint8ClampedArray',
  'DataView',
  'Set',
  'Map',
  'Symbol',
  'WeakMap',
  'WeakSet',
  'WeakRef',
  'Proxy',
  'Promise',
  'BigInt',
  'URLSearchParams',
] as const);

const stringProtoKeys = new Set<string>([
  'includes',
  'startsWith',
  'endsWith',
  'padStart',
  'padEnd',
  'trimStart',
  'trimEnd',
  'repeat',
  'normalize',
  'localeCompare',
] satisfies ST[]);

export const oneOfIdentifier = (node: t.Node, set: Set<string>): node is t.Identifier =>
  t.isIdentifier(node) && set.has(node.name);

export const functionGrop = (node: t.Node): node is t.MemberExpression => {
  if (t.isMemberExpression(node, { computed: false })) {
    if (t.isIdentifier(node.object)) {
      switch (node.object.name) {
        case 'Object':
          return oneOfIdentifier(node.property, objectKeys);
        case 'Symbol':
          return oneOfIdentifier(node.property, symbolKeys);
        case 'Reflect':
          return oneOfIdentifier(node.property, reflectKeys);
        case 'Array':
          return oneOfIdentifier(node.property, arrayKeys);
      }
    }
    else if (
      t.isMemberExpression(node.object, { computed: false }) &&
      t.isIdentifier(node.object.property, { name: 'prototype' }) &&
      t.isIdentifier(node.object.object)
    ) {
      switch (node.object.object.name) {
        case 'Array':
          return oneOfIdentifier(node.property, arrayProtoKeys);
        case 'String':
          return oneOfIdentifier(node.property, stringProtoKeys);
      }
    }
  }

  return false;
};

export const isBuiltInObject = (node: t.Node): node is t.Identifier =>
  oneOfIdentifier(node, builtInObjects);

export const isWellKnownSymbol = (node: t.Node): node is t.MemberExpression =>
  t.isMemberExpression(node, { computed: false }) &&
  t.isIdentifier(node.object, { name: 'Symbol' }) &&
  oneOfIdentifier(node.property, wellKnownSymbols);

export const objectMember = (property: O): t.MemberExpression => ({
  type: 'MemberExpression',
  object: {
    type: 'Identifier',
    name: 'Object',
  },
  computed: false,
  property: {
    type: 'Identifier',
    name: property,
  },
});
