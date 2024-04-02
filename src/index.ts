import type { Visitor, PluginPass } from '@babel/core';
import { declare as declarePlugin } from '@babel/helper-plugin-utils';
import { repliceGroup } from './utils';

const plugin = declarePlugin((api) => {
  api.assertVersion(7);

  const t = api.types;

  const visitor: Visitor<PluginPass> = {
    IfStatement(path) {
      const node = path.node;

      if (repliceGroup(node.test)) {
        node.test = t.booleanLiteral(true);
      }
    },
  };

  return {
    name: 'transform-remove-polyfill',
    visitor,
  };
});

export { plugin as default };
