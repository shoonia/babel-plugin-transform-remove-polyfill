import type { Node, Identifier, MemberExpression } from '@babel/types';

type K = keyof ObjectConstructor;

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

export const isNodeIdentifier = (node: Node, name: string): node is Identifier =>
  node.type === 'Identifier' && node.name === name;

export const oneOfIdentifier = (node: Node, set: Set<string>): node is Identifier =>
  node.type === 'Identifier' && set.has(node.name);

export const isObjecMember = (node: Node): node is MemberExpression =>
  node.type === 'MemberExpression'
  && !node.computed
  && isNodeIdentifier(node.object, 'Object')
  && oneOfIdentifier(node.property, objectKeys);

export const isBuiltInObject = (node: Node): node is Identifier =>
  oneOfIdentifier(node, builtInObjects);

export const objectMember = (property: K): MemberExpression => ({
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
