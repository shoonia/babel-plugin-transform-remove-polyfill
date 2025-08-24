import { describe, test } from 'node:test';
import { expect, parseAst } from './setup.ts';
import type { ExpressionStatement } from '@babel/types';

import { matchesPattern } from '../src/utils.ts';

type T = `${string}.${string}`;

describe('matchesPattern', () => {
  const trueCases: string[][] = [
    ['obj.prop',                        'obj.prop'],
    ['obj.nested.prop',                 'obj.nested.prop'],
    ['obj.a.b.c.d',                     'obj.a.b.c.d'],
    ['Array.prototype.indexOf',         'Array.prototype.indexOf'],
    ['Object.prototype.hasOwnProperty', 'Object.prototype.hasOwnProperty'],
    ['a.b.c',                           'a.b.c'],
    ['Symbol.iterator',                 'Symbol.iterator'],
    ['Reflect.apply',                   'Reflect.apply'],
  ];

  trueCases.forEach(([code, pattern]) => {
    test(`matches pattern "${pattern}" with code "${code}"`, async () => {
      const ast = await parseAst(code);
      const matcher = matchesPattern(pattern as T);
      const stmt = ast.program.body[0] as ExpressionStatement;
      expect(matcher(stmt.expression)).toBe(true);
    });
  });

  const falseCases: string[][] = [
    ['obj.prop',                        'other.prop'],
    ['obj.nested.prop',                 'obj.prop'],
    ['obj.prop',                        'obj.nested.prop'],
    ['obj["prop"]',                     'obj.prop'],
    ['obj.nested["prop"]',              'obj.nested.prop'],
    ['someVariable',                    'obj.prop'],
    ['obj.method()',                    'obj.method'],
    ['prop.obj',                        'obj.prop'],
    ['a.b.c',                           'a.b'],
    ['a.b.c.d',                         'a.b.c'],
    ['obj.nested.deep.prop',            'obj.nested'],
    ['Array.prototype.indexOf.call',    'Array.prototype.indexOf'],
    ['Object.prototype.hasOwnProperty', 'Object.prototype.hasOwnProperty.call'],
    ['window.document.body.style',      'window.document'],
  ];

  falseCases.forEach(([code, pattern]) => {
    test(`does not match pattern "${pattern}" with code "${code}"`, async () => {
      const ast = await parseAst(code);
      const matcher = matchesPattern(pattern as T);
      const stmt = ast.program.body[0] as ExpressionStatement;
      expect(matcher(stmt.expression)).toBe(false);
    });
  });
});
