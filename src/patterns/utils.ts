import type { Node, Identifier } from '@babel/types';

export const isNodeIdentifier = (node: Node, name: string): node is Identifier =>
  node.type === 'Identifier' && node.name === name;
