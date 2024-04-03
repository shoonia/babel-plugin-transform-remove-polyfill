import t from '@babel/types';

type A = keyof ArrayConstructor
type O = keyof ObjectConstructor;
type R = keyof typeof Reflect;

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
  }

  return false;
};

export const isBuiltInObject = (node: t.Node): node is t.Identifier =>
  oneOfIdentifier(node, builtInObjects);
