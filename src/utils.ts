import t from '@babel/types';

type A = keyof ArrayConstructor
type O = keyof ObjectConstructor;

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

export const oneOfIdentifier = (node: t.Node, set: Set<string>): node is t.Identifier =>
  t.isIdentifier(node) && set.has(node.name);

export const repliceGroup = (node: t.Node): node is t.MemberExpression => {
  if (t.isMemberExpression(node, { computed: false })) {
    if (t.isIdentifier(node.object)) {
      switch (node.object.name) {
        case 'Object':
          return oneOfIdentifier(node.property, objectKeys);
        case 'Array':
          return oneOfIdentifier(node.property, arrayKeys);
      }
    }
  }

  return false;
};
