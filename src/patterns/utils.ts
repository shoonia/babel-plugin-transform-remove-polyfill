import type { Node, StringLiteral, Identifier, } from '@babel/types';

export const isNodeString = (node: Node, value: string): node is StringLiteral => {
  return node.type === 'StringLiteral' && node.value === value;
};

export const isNodeIdentifier = (node: Node, name: string): node is Identifier => {
  return node.type === 'Identifier' && node.name === name;
}
