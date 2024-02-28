import t from '@babel/types';

type O = keyof ObjectConstructor;
type S = keyof SymbolConstructor;
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
  'getOwnPropertySymbols',
  'getOwnPropertyDescriptors',
  'defineProperty',
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
] satisfies S[]);

const builtInObjects = new Set<string>([
  'ArrayBuffer',
  'Int8Array',
  'Int16Array',
  'Int32Array',
  'Uint8Array',
  'Uint16Array',
  'Uint32Array',
  'Uint8ClampedArray',
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

export const oneOfIdentifier = (node: t.Node, set: Set<string>): node is t.Identifier =>
  t.isIdentifier(node) && set.has(node.name);

export const functionGrop = (node: t.Node): node is t.MemberExpression => {
  if (
    t.isMemberExpression(node, { computed: false }) &&
    t.isIdentifier(node.object)
  ) {
    switch (node.object.name) {
      case 'Object':
        return oneOfIdentifier(node.property, objectKeys);
      case 'Symbol':
        return oneOfIdentifier(node.property, symbolKeys);
      case 'Reflect':
        return oneOfIdentifier(node.property, reflectKeys);
    }
  }

  return false;
};

export const isBuiltInObject = (node: t.Node): node is t.Identifier =>
  oneOfIdentifier(node, builtInObjects);

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
