import { describe, test } from 'node:test';
import { expect } from './setup.ts';

describe('no-transform', () => {
  const list = [
    '"use strict";',
    'typeof identifier === "function" ? 0 : 1;',
    'typeof identifier !== "function" ? 0 : 1;',
    '"undefined" == typeof identifier ? 0 : 1;',
    '"undefined" != typeof identifier ? 0 : 1;',
    'Object.getOwnPropertyDescriptor(r, t);',
    'typeof Symbol + "__tag";',
    'Reflect.__proto__;',
    '"randomKeyName" in Object;',
    '"append" in Element.prototype;',
  ];

  list.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform(code);
    });
  });
});
