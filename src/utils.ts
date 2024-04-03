import t from '@babel/types';

type SP = keyof typeof String.prototype;
type AP = keyof Array<null>;
type A = keyof ArrayConstructor
type O = keyof ObjectConstructor;
type R = keyof typeof Reflect;

const arrayProtoKeys = new Set<string>([
  'keys', //      38
  'entries', //   38
  'find', //      45
  'findIndex', // 45
  'fill', //      45
  'includes', //  47
  'flat', //      69
  'flatMap', //   69
] satisfies AP[]);

const stringProtoKeys = new Set<string>([
  'trim', //        4
  'normalize', //   34
  'includes', //    41
  'startsWith', //  41
  'endsWith', //    41
  'repeat', //      41
  'codePointAt', // 41
  'padStart', //    57
  'padEnd', //      57
  'trimStart', //   66
  'trimEnd', //     66
] satisfies SP[]);

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

const arrayKeys = new Set<string>([
  'of',
  'from',
  'isArray',
] satisfies A[]);

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
] as const);

export const oneOfIdentifier = (node: t.Node, set: Set<string>): node is t.Identifier =>
  t.isIdentifier(node, null) && set.has(node.name);

export const repliceGroup = (node: t.Node): node is t.MemberExpression => {
  if (t.isMemberExpression(node, { computed: false })) {
    if (t.isIdentifier(node.object, null)) {
      switch (node.object.name) {
        case 'Object':
          return oneOfIdentifier(node.property, objectKeys);
        case 'Array':
          return oneOfIdentifier(node.property, arrayKeys);
        case 'Reflect':
          return oneOfIdentifier(node.property, reflectKeys);
      }
    }
    else if (
      t.isMemberExpression(node.object, { computed: false }) &&
      t.isIdentifier(node.object.property, { name: 'prototype' }) &&
      t.isIdentifier(node.object.object, null)
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
