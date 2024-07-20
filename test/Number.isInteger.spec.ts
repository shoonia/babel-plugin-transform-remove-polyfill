import { describe, test } from 'node:test';
import { expect } from './setup';

Number.isInteger;

describe('Number.isInteger', () => {
  test('typeof', () => {
    expect(typeof Number.isInteger).toBe('function');
  });

  test('transform #0', async () => {
    await expect(`var isFinite = require("is-finite");
    module.exports = Number.isInteger || function(val) {
      return typeof val === "number" && isFinite(val) && Math.floor(val) === val;
    };`,
    ).toBeTransform('var isFinite = require("is-finite");\nmodule.exports = Number.isInteger;');
  });
});
