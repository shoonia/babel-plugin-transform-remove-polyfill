import type t from '@babel/types';

interface PrototypeMember extends t.MemberExpression {
  readonly type: 'MemberExpression';
  readonly object: t.Identifier
  readonly property: {
    readonly type: 'Identifier',
    readonly name: 'prototype'
  }
  readonly computed: false;
}

export const isMember = (node: t.Node): node is t.MemberExpression =>
  node.type === 'MemberExpression' && node.computed === false;

export const isIdent = (node: t.Node): node is t.Identifier =>
  node.type === 'Identifier';

export const isIdentName = (node: t.Node, name: string): node is t.Identifier =>
  node.type === 'Identifier' && node.name === name;

export const isString = (node: t.Node): node is t.StringLiteral =>
  node.type === 'StringLiteral';

export const isBoolean = (node: t.Node): node is t.BooleanLiteral =>
  node.type === 'BooleanLiteral';

export const isNumeric = (node: t.Node, value: number): node is t.NumericLiteral =>
  node.type === 'NumericLiteral' && node.value === value;

export const isPrototype = (node: t.Node): node is PrototypeMember =>
  isMember(node) && isIdentName(node.property, 'prototype') && isIdent(node.object);

export const isUnary = (node: t.Node, operator: t.UnaryExpression['operator']): node is t.UnaryExpression =>
  node.type === 'UnaryExpression' && node.operator === operator;

export const isUndefined = (node: t.Node): boolean =>
  isIdentName(node, 'undefined') || isUnary(node, 'void') && isNumeric(node.argument, 0);

export const bool = (value: boolean): t.BooleanLiteral => ({
  type: 'BooleanLiteral',
  value,
});

export const matchesPattern = (path: string) => {
  const parts = path.split('.').reverse();

  return (node: t.Node): node is t.MemberExpression => {
    if (!isMember(node)) {
      return false;
    }

    const nodes = [node.property];

    while (isMember(node = node.object)) {
      nodes.push(node.property);
    }

    nodes.push(node);

    return nodes.length === parts.length &&
      nodes.every((n, i) => isIdentName(n, parts[i]));
  };
};
