import { buildMatchMemberExpression } from '@babel/types';
import { declare as declarePlugin } from '@babel/helper-plugin-utils';

import { matchTypeof } from './patterns/typeof';
import { isNodeIdentifier, isNodeString } from './patterns/utils';

const isSymbolIterator = buildMatchMemberExpression('Symbol.iterator', false);

const operators = new Set([
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
          const toe = matchTypeof(node);

          const sholdReplice = toe.match && (
            isNodeIdentifier(toe.target, 'Symbol') && isNodeString(toe.expect, 'function') ||
            isSymbolIterator(toe.target) && isNodeString(toe.expect, 'symbol')
          );

          if (sholdReplice) {
            path.replaceWith({
              type: 'BooleanLiteral',
              value: node.operator.startsWith('='),
            });
          }
        }
      },
    },
  };
});

export { plugin as default };
