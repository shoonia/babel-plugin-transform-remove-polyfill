import { describe, test } from 'node:test';
import { expect } from './setup';

describe('BinaryExpression (in) replace logic', () => {
  test('should remove IfStatement', async () => {
    expect('object' == typeof globalThis && 'fromEntries'in Object && 'flatMap'in Array.prototype && 'trimEnd'in String.prototype && 'allSettled'in Promise && 'matchAll'in String.prototype && 'replaceAll'in String.prototype && 'any'in Promise && 'at'in String.prototype && 'at'in Array.prototype && 'hasOwn'in Object).toBe(true);

    await expect('let A = "object" == typeof globalThis && "fromEntries"in Object && "flatMap"in Array.prototype && "trimEnd"in String.prototype && "allSettled"in Promise && "matchAll"in String.prototype && "replaceAll"in String.prototype && "any"in Promise && "at"in String.prototype && "at"in Array.prototype && "hasOwn"in Object')
      .toBeTransform('let A = "object" == typeof globalThis && true && true && true && true && true && true && true && "at" in String.prototype && "at" in Array.prototype && "hasOwn" in Object;');
  });
});
