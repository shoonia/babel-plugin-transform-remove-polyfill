import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Promise.prototype.finally;

describe('Promise.prototype.finally', () => {
  test('typeof', () => {
    expect(typeof Promise.prototype.finally).toBe('function');
  });

  test('transform #0', async () => {
    await expect('if (Promise.prototype.finally) {}').toBeTransform('if (true) {}');
  });

  test('transform #1', async () => {
    await expect(`Promise.prototype.finally || (Promise.prototype.finally = function(e) {
    if ("function" != typeof e)
        return this.then(e, e);
    var t = this.constructor || Promise;
    return this.then((function(n) {
        return t.resolve(e()).then((function() {
            return n
        }
        ))
    }), (function(n) {
        return t.resolve(e()).then((function() {
            throw n
        }))
    }))
})`)
      .toBeTransform('');
  });
});
