import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void JSON.stringify;

describe('JSON.stringify', () => {
  test('typeof', () => {
    expect(typeof JSON.stringify).toBe('function');
  });

  test('transform #1', async () => {
    await expect(` typeof JSON.stringify != "function" && (JSON.stringify = function(e, t, n) {
      var r;
      gap = "",
      indent = "";
      if (typeof n == "number") for (r = 0; r < n; r += 1) indent += " ";
      else
          typeof n == "string" && (indent = n);
      rep = t;
      if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
        "": e
      });
      throw new Error("JSON.stringify")
  })`).toBeTransform('');
  });
});
