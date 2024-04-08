import { describe, test } from 'node:test';
import { expect } from './setup';

Array.prototype.find;

describe('Array.prototype.find', () => {
  test('typeof', () => {
    expect(typeof Array.prototype.find).toBe('function');
  });

  const trueList = [
    'typeof Array.prototype.find === "function"',
    'typeof Array.prototype.find == "function"',
    '"function" === typeof Array.prototype.find',
    '"function" == typeof Array.prototype.find',
    // undefined
    'typeof Array.prototype.find !== "undefined"',
    'typeof Array.prototype.find != "undefined"',
    '"undefined" !== typeof Array.prototype.find',
    '"undefined" != typeof Array.prototype.find',
  ];

  trueList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('true;');
    });
  });

  const falseList =  [
    'typeof Array.prototype.find !== "function"',
    'typeof Array.prototype.find != "function"',
    '"function" !== typeof Array.prototype.find',
    '"function" != typeof Array.prototype.find',
    // undefined
    'typeof Array.prototype.find === "undefined"',
    'typeof Array.prototype.find == "undefined"',
    '"undefined" === typeof Array.prototype.find',
    '"undefined" == typeof Array.prototype.find',
  ];

  falseList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('false;');
    });
  });

  const ternaryList = [
    'typeof Array.prototype.find === "function" ? 1 : 2',
    'typeof Array.prototype.find !== "function" ? 2 : 1',
    'typeof Array.prototype.find !== "undefined" ? 1 : 2',
    'typeof Array.prototype.find === "undefined" ? 2 : 1',
    // ==
    'typeof Array.prototype.find == "function" ? 1 : 2',
    'typeof Array.prototype.find != "function" ? 2 : 1',
    'typeof Array.prototype.find != "undefined" ? 1 : 2',
    'typeof Array.prototype.find == "undefined" ? 2 : 1',
    // ..
    '"function" === typeof Array.prototype.find ? 1 : 2',
    '"function" !== typeof Array.prototype.find ? 2 : 1',
    '"undefined" !== typeof Array.prototype.find ? 1 : 2',
    '"undefined" === typeof Array.prototype.find ? 2 : 1',
  ];

  ternaryList.forEach((code) => {
    test(code, async () => {
      await expect(code).toBeTransform('1;');
    });
  });
});
