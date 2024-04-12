import { describe, test } from 'node:test';
import { expect } from './setup';

describe('BinaryExpression replace logic', () => {
  const trueList = [
    'let x = undefined != Object.assign',
    'let x = undefined !== Object.assign',
    'let x = void 0 !== Object.assign',
    'let x = void 0 != Object.assign',
    'let x = Object.assign != undefined',
    'let x = Object.assign !== undefined',
    'let x = Object.assign != void 0',
    'let x = Object.assign !== void 0',
  ];

  trueList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('let x = true;');
    });
  });

  const falseList = [
    'let x = undefined == Object.assign',
    'let x = undefined === Object.assign',
    'let x = void 0 == Object.assign',
    'let x = void 0 === Object.assign',
    'let x = Object.assign == undefined',
    'let x = Object.assign === undefined',
    'let x = Object.assign == void 0',
    'let x = Object.assign === void 0',
  ];

  falseList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('let x = false;');
    });
  });
});
