import type { BinaryExpression } from '@babel/types';
import { declare as declarePlugin } from '@babel/helper-plugin-utils';

import { matchTypeof } from './patterns/typeof';
import { objectMember, isNodeIdentifier, oneOfIdentifier } from './patterns/utils';

const operators = new Set<BinaryExpression['operator']>([
  '==',
  '!=',
  '===',
  '!==',
]);

const classes = new Set([
  'Symbol',
  'WeakMap',
  'WeakSet',
  'WeakRef',
] as const);

const plugin = declarePlugin((api) => {
  api.assertVersion(7);

  const isSymbolIterator = api.types.buildMatchMemberExpression('Symbol.iterator', false);
  const isSymbolFor = api.types.buildMatchMemberExpression('Symbol.for', false);
  const isObjectHasOwn = api.types.buildMatchMemberExpression('Object.prototype.hasOwnProperty.call', false);
  const isObjectAssign = api.types.buildMatchMemberExpression('Object.assign', false);
  const isObjectSetProtoOf = api.types.buildMatchMemberExpression('Object.setPrototypeOf', false);

  return {
    name: 'transform-remove-polyfill',
    visitor: {
      BinaryExpression(path) {
        const node = path.node;

        if (operators.has(node.operator)) {
          const tyof = matchTypeof(node);

          if (tyof.match) {
            if (oneOfIdentifier(tyof.target, classes)) {
              if (tyof.expect === 'function' || tyof.expect === 'undefined') {
                path.replaceWith({
                  type: 'BooleanLiteral',
                  value: node.operator.startsWith(tyof.expect === 'function' ? '=' : '!'),
                });
              }
            }

            else if (tyof.expect === 'symbol') {
              if (
                isSymbolIterator(tyof.target) ||
                tyof.target.type === 'CallExpression' && isNodeIdentifier(tyof.target.callee, 'Symbol')
              ) {
                path.replaceWith({
                  type: 'BooleanLiteral',
                  value: node.operator.startsWith('='),
                });
              }
            }
          }
        }
      },

      LogicalExpression(path) {
        const node = path.node;

        if (node.operator === '&&') {
          if (isSymbolFor(node.left)) {
            path.replaceWith(node.right);
          }
        }
        else if (node.operator === '||') {
          if (
            isObjectAssign(node.left) ||
            isObjectSetProtoOf(node.left)
          ) {
            path.replaceWith(node.left);
          }
        }
      },

      CallExpression(path) {
        const node = path.node;

        if (
          isObjectHasOwn(node.callee) &&
          node.arguments.length === 2 &&
          node.arguments.every((i) => i.type === 'Identifier')
        ) {
          node.callee = objectMember('hasOwn');
        }
      },

      ConditionalExpression(path) {
        const node = path.node;

        if (isObjectSetProtoOf(node.test)) {
          path.replaceWith(node.consequent);
        }
      },
    },
  };
});

export { plugin as default };
