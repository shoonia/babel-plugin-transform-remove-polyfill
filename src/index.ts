import { declare as declarePlugin } from '@babel/helper-plugin-utils';

import { isMatch } from './isMatch';
import { pTypeofSymbol, pStringFunction } from './patterns/Symbol';

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
          if (
            isMatch(node.left, pStringFunction) && isMatch(node.right, pTypeofSymbol) ||
            isMatch(node.left, pTypeofSymbol) && isMatch(node.right, pStringFunction)
          ) {
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
