import t from '@babel/types';

interface PrototypeMember extends t.MemberExpression {
  readonly type: 'MemberExpression';
  readonly object: t.Identifier
  readonly property: t.Identifier
  readonly computed: false;
}

export const isPrototypeMember = (node: t.Node): node is PrototypeMember =>
  t.isMemberExpression(node, { computed: false }) &&
  t.isIdentifier(node.property, { name: 'prototype' }) &&
  t.isIdentifier(node.object, null);

export const isTypeof = (node: t.Node): node is t.UnaryExpression =>
  t.isUnaryExpression(node, { operator: 'typeof' });

export const isUndefined = (node: t.Node) =>
  t.isIdentifier(node, { name: 'undefined' }) ||
  t.isUnaryExpression(node, { operator: 'void' }) && t.isNumericLiteral(node.argument, null);
