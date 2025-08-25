import type { Visitor, PluginPass, ConfigAPI } from '@babel/core';

import { type Options, transformerCallExpression } from './transformers.ts';
import { evaluate } from './evaluate.ts';
import { literals, builtInMember, builtInConstructor, KeyChecker } from './keys.ts';
import { isBoolean, bool } from './utils.ts';

const plugin = (api: ConfigAPI, options: Options = {}) => {
  api.assertVersion(7);

  if (Array.isArray(options.globalObjects)) {
    options.globalObjects.forEach((key) => {
      builtInMember.add(key);
    });
  }

  if (Array.isArray(options.globalFunctions)) {
    options.globalFunctions.forEach((key) => {
      builtInConstructor.add(key);
    });
  }

  const transformers = transformerCallExpression(options.transform);

  const visitor: Visitor<PluginPass> = {
    IfStatement: {
      exit(path) {
        const node = path.node;
        const checker = new KeyChecker(path);

        if (checker.functionGroup(node.test)) {
          node.test = bool(true);
        }

        if (isBoolean(node.test)) {
          if (node.test.value) {
            if (node.alternate != null) {
              node.alternate = undefined;
            }
          } else {
            if (node.alternate == null) {
              path.remove();
            } else {
              node.consequent = { type: 'EmptyStatement' };
            }
          }
        }
      },
    },

    LogicalExpression: {
      exit(path) {
        const node = path.node;
        const checker = new KeyChecker(path);

        if (checker.functionGroup(node.left) || checker.isWellKnownSymbol(node.left)) {
          path.replaceWith(
            node.operator === '&&'
              ? node.right
              : node.left,
          );
        } else if (isBoolean(node.left)) {
          path.replaceWith(
            node.operator === '&&'
              ? node.left.value
                ? node.right
                : node.left
              : node.operator === '||'
                ? node.left.value
                  ? node.left
                  : node.right
                : node.left,
          );
        }
      },
    },

    ConditionalExpression: {
      exit(path) {
        const node = path.node;
        const checker = new KeyChecker(path);

        if (checker.functionGroup(node.test)) {
          path.replaceWith(node.consequent);
        } else if (isBoolean(node.test)) {
          path.replaceWith(node.test.value ? node.consequent : node.alternate);
        }
      },
    },

    UnaryExpression: {
      exit(path) {
        const node = path.node;

        if (node.operator !== '!') {
          return;
        }

        const checker = new KeyChecker(path);

        if (checker.functionGroup(node.argument) || checker.isWellKnownSymbol(node.argument)) {
          path.replaceWith(bool(false));
        } else if (isBoolean(node.argument)) {
          path.replaceWith(bool(!node.argument.value));
        }
      },
    },

    BinaryExpression(path) {
      const checker = new KeyChecker(path);
      const value = evaluate(checker, path.node);

      if (value !== null) {
        path.replaceWith(bool(value));
      }
    },

    ExpressionStatement: {
      exit(path) {
        const exp = path.node.expression;
        const checker = new KeyChecker(path);

        if (checker.functionGroup(exp) || literals.has(exp.type)) {
          path.remove();
        }
      },
    },

    CallExpression: {
      exit(path) {
        for (let i = 0; i < transformers.length;) {
          if (transformers[i++](path)) {
            return;
          }
        }
      },
    },
  };

  return {
    name: 'transform-remove-polyfill',
    visitor,
  };
};

export { plugin as default };
