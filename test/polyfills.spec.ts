import { describe, test } from 'node:test';
import { expect } from './setup.ts';

describe('Polyfills modules', () => {
  test('transform #0', async () => {
    await expect(`var H = function() {
    "trimStart"in String.prototype || (String.prototype.trimStart = String.prototype.trimLeft),
    "trimEnd"in String.prototype || (String.prototype.trimEnd = String.prototype.trimRight),
    "description"in Symbol.prototype || Object.defineProperty(Symbol.prototype, "description", {
        configurable: !0,
        get: function() {
            var e = /\\((.*)\\)/.exec(this.toString());
            return e ? e[1] : void 0
        }
    }),
    Array.prototype.flat || (Array.prototype.flat = function(e, t) {
        return t = this.concat.apply([], this),
        e > 1 && t.some(Array.isArray) ? t.flat(e - 1) : t
    },
    Array.prototype.flatMap = function(e, t) {
        return this.map(e, t).flat()
    }),
    Promise.prototype.finally || (Promise.prototype.finally = function(e) {
        if ("function" != typeof e)
            return this.then(e, e);
        var t = this.constructor || Promise;
        return this.then((function(n) {
            return t.resolve(e()).then((function() {
                return n
            }
            ))
        }
        ), (function(n) {
            return t.resolve(e()).then((function() {
                throw n
            }
            ))
        }
        ))
    }),
    Object.fromEntries || (Object.fromEntries = function(e) {
        return Array.from(e).reduce((function(e, t) {
            return e[t[0]] = t[1],
            e
        }
        ), {})
    })
}`,
    ).toBeTransform(`var H = function () {
  true, true, true, Array.prototype.flat, Promise.prototype.finally, Object.fromEntries;
};`);
  });
});
