import {
  type BinaryExpression,
  buildMatchMemberExpression,
} from '@babel/types';
import { declare as declarePlugin } from '@babel/helper-plugin-utils';

import { matchTypeof } from './patterns/typeof';
import { isNodeIdentifier, oneOfIdentifier } from './patterns/utils';

const isSymbolIterator = buildMatchMemberExpression('Symbol.iterator', false);
const isSymbolFor = buildMatchMemberExpression('Symbol.for', false);
const isObjectHasOwn = buildMatchMemberExpression('Object.prototype.hasOwnProperty.call', false);

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

        if (node.operator === '&&' && isSymbolFor(node.left)) {
          node.left = {
            type: 'BooleanLiteral',
            value: true,
          };
        }
      },

      CallExpression(path) {
        const node = path.node;

        if (
          isObjectHasOwn(node.callee) &&
          node.arguments.length === 2 &&
          node.arguments.every((i) => i.type === 'Identifier')
        ) {
          node.callee = {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'Object',
            },
            computed: false,
            property: {
              type: 'Identifier',
              name: 'hasOwn',
            },
          };
        }
      },
    },
  };
});

export { plugin as default };
