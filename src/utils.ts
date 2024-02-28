import t from '@babel/types';

type K = keyof ObjectConstructor;
type R = keyof typeof Reflect;

const objectKeys = new Set<K>([
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
]);

const reflectKeys = new Set<R>([
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
]);

const builtInObjects = new Set([
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

export const isObjecMember = (node: t.Node): node is t.MemberExpression =>
  t.isMemberExpression(node, { computed: false })
  && t.isIdentifier(node.object, { name: 'Object' })
  && oneOfIdentifier(node.property, objectKeys);

export const isReflectMember = (node: t.Node): node is t.MemberExpression =>
  t.isMemberExpression(node, { computed: false })
  && t.isIdentifier(node.object, { name: 'Reflect' })
  && oneOfIdentifier(node.property, reflectKeys);

export const isBuiltInObject = (node: t.Node): node is t.Identifier =>
  oneOfIdentifier(node, builtInObjects);

export const objectMember = (property: K): t.MemberExpression => ({
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
