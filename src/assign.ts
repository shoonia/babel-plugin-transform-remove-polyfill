import t from '@babel/types';

const isNodeFunction = (node: t.Node, params: number): node is t.FunctionExpression =>
  t.isFunctionExpression(node, { id: null, async: false, generator: false }) &&
  node.params.length === params;

const isThisAssign = t.buildMatchMemberExpression('this.__assign', false);
const isObjectAssign = t.buildMatchMemberExpression('Object.assign', false);
const isAssignBind = t.buildMatchMemberExpression('Object.assign.bind', false);

export const isAssignTS = (node: t.VariableDeclarator): boolean => {
  if (
    t.isIdentifier(node.id, { name: '__assign' }) &&
    t.isLogicalExpression(node.init, { operator: '||' }) &&
    t.isLogicalExpression(node.init.left, { operator: '&&' }) &&
    t.isThisExpression(node.init.left.left) &&
    isThisAssign(node.init.left.right) &&
    isNodeFunction(node.init.right, 0) &&
    node.init.right.body.body.length === 2
  ) {
    const exp = node.init.right.body.body[0];

    return (
      t.isExpressionStatement(exp) &&
      t.isReturnStatement(node.init.right.body.body[1]) &&
      t.isAssignmentExpression(exp.expression, { operator: '=' }) &&
      t.isIdentifier(exp.expression.left, { name: '__assign' }) &&
      t.isLogicalExpression(exp.expression.right, { operator: '||' }) &&
      isObjectAssign(exp.expression.right.left) &&
      isNodeFunction(exp.expression.right.right, 1)
    );
  }

  return false;
};

export const isAssingBabel = (node: t.FunctionDeclaration): boolean => {
  if (
    t.isIdentifier(node.id, { name: '_extends' }) &&
    !node.async &&
    !node.generator &&
    node.params.length === 0 &&
    node.body.body.length === 2
  ) {
    const exp = node.body.body[0];

    return (
      t.isExpressionStatement(exp) &&
      t.isReturnStatement(node.body.body[1]) &&
      t.isAssignmentExpression(exp.expression) &&
      t.isIdentifier(exp.expression.left, { name: '_extends' }) &&
      t.isConditionalExpression(exp.expression.right) &&
      isObjectAssign(exp.expression.right.test) &&
      t.isCallExpression(exp.expression.right.consequent) &&
      isAssignBind(exp.expression.right.consequent.callee) &&
      isNodeFunction(exp.expression.right.alternate, 1)
    );
  }

  return false;
};
