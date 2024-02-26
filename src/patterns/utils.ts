import type { Node, Identifier, MemberExpression } from '@babel/types';

export const isNodeIdentifier = (node: Node, name: string): node is Identifier =>
  node.type === 'Identifier' && node.name === name;

export const oneOfIdentifier = (node: Node, set: Set<string>): node is Identifier =>
  node.type === 'Identifier' && set.has(node.name);

export const objectMember = (property: keyof ObjectConstructor): MemberExpression => ({
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
