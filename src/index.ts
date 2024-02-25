import {
  type BinaryExpression,
  buildMatchMemberExpression,
} from '@babel/types';
import { declare as declarePlugin } from '@babel/helper-plugin-utils';

import { matchTypeof } from './patterns/typeof';
import { isNodeIdentifier } from './patterns/utils';

const isSymbolIterator = buildMatchMemberExpression('Symbol.iterator', false);

const operators = new Set<BinaryExpression['operator']>([
  '==',
  '!=',
  '===',
  '!==',
]);

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
            if (isNodeIdentifier(tyof.target, 'Symbol')) {
              if (tyof.expect === 'function' || tyof.expect === 'undefined') {
                path.replaceWith({
                  type: 'BooleanLiteral',
                  value: node.operator.startsWith(tyof.expect === 'function' ? '=' : '!'),
                });
              }
            }

            else if (isSymbolIterator(tyof.target) && tyof.expect === 'symbol') {
              path.replaceWith({
                type: 'BooleanLiteral',
                value: node.operator.startsWith('='),
              });
            }
          }
        }
      },
    },
  };
});

export { plugin as default };
