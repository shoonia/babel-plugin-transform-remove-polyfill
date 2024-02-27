import type {
  Node,
  LogicalExpression,
  FunctionExpression,
  VariableDeclarator,
} from '@babel/types';

import { isNodeIdentifier } from './utils';

const isNodeFunction = (node: Node): node is FunctionExpression =>
  node.type === 'FunctionExpression' && node.id == null && !node.async && !node.generator;

const isNodeLogical = (node: Node, operator: LogicalExpression['operator']): node is LogicalExpression =>
  node.type === 'LogicalExpression' && node.operator === operator;

export const isAssingTS = (node: VariableDeclarator): node is VariableDeclarator => {
  if (
    isNodeIdentifier(node.id, '__assign') &&
    node.init != null &&
    isNodeLogical(node.init, '||') &&
    isNodeLogical(node.init.left, '&&') &&
    node.init.left.left.type === 'ThisExpression' &&
    node.init.left.right.type === 'MemberExpression' &&
    node.init.left.right.object.type === 'ThisExpression' &&
    !node.init.left.right.computed &&
    isNodeIdentifier(node.init.left.right.property, '__assign') &&
    isNodeFunction(node.init.right) &&
    node.init.right.body.type === 'BlockStatement' &&
    node.init.right.body.body.length > 0
  ) {
    const exp = node.init.right.body.body[0];

    return (
      exp.type === 'ExpressionStatement' &&
      exp.expression.type === 'AssignmentExpression' &&
      exp.expression.operator === '=' &&
      isNodeIdentifier(exp.expression.left, '__assign') &&
      isNodeLogical(exp.expression.right, '||') &&
      isNodeFunction(exp.expression.right.right) &&
      exp.expression.right.left.type === 'MemberExpression' &&
      !exp.expression.right.left.computed &&
      isNodeIdentifier(exp.expression.right.left.object, 'Object') &&
      isNodeIdentifier(exp.expression.right.left.property, 'assign')
    );
  }

  return false;
};
