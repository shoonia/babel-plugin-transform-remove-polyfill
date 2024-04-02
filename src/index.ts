import type { Visitor, PluginPass } from '@babel/core';
import { declare as declarePlugin } from '@babel/helper-plugin-utils';
import { repliceGroup } from './utils';

const plugin = declarePlugin((api) => {
  api.assertVersion(7);

  const t = api.types;

  const visitor: Visitor<PluginPass> = {
    IfStatement: {
      exit(path) {
        const node = path.node;

        if (repliceGroup(node.test)) {
          node.test = t.booleanLiteral(true);
        }
      },
    },

    LogicalExpression: {
      exit(path) {
        const node = path.node;

        if (repliceGroup(node.left)) {
          path.replaceWith(node.operator === '&&' ? node.right : node.left);
        }
        else if (t.isBooleanLiteral(node.left)) {
          path.replaceWith(
            node.operator === '&&'
              ? node.left.value
                ? node.right
                : node.left
              : node.operator === '||'
                ? node.left.value
                  ? node.left
                  : node.right
                : node.left
          );
        }
      },
    },

    ConditionalExpression: {
      exit(path) {
        const node = path.node;

        if (repliceGroup(node.test)) {
          path.replaceWith(node.consequent);
        }
        else if (t.isBooleanLiteral(node.test)) {
          path.replaceWith(node.test.value ? node.consequent : node.alternate);
        }
      },
    },
  };

  return {
    name: 'transform-remove-polyfill',
    visitor,
  };
});

export { plugin as default };
