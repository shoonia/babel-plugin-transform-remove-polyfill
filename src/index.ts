import { declare as declarePlugin } from '@babel/helper-plugin-utils';

import { typeofSymbol, typeofSymbolIterator } from './patterns/Symbol';

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
          if (typeofSymbol(node) || typeofSymbolIterator(node)) {
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
