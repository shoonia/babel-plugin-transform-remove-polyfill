import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void RegExp.prototype;

describe('RegExp.prototype', () => {
  test('transform #1', async () => {
    await expect(`(e, t, n) => {
    "use strict";
    var r = n(29745)
      , o = n(26506).supportsDescriptors
      , i = Object.getOwnPropertyDescriptor;
    e.exports = function() {
        if (o && "gim" === /a/gim.flags) {
            var e = i(RegExp.prototype, "flags");
            if (e && "function" == typeof e.get && "dotAll"in RegExp.prototype && "hasIndices"in RegExp.prototype) {
                var t = ""
                  , n = {};
                if (Object.defineProperty(n, "hasIndices", {
                    get: function() {
                        t += "d"
                    }
                }),
                Object.defineProperty(n, "sticky", {
                    get: function() {
                        t += "y"
                    }
                }),
                e.get.call(n),
                "dy" === t)
                    return e.get
            }
        }
        return r
    }
}`,
    ).toBeTransform(`(e, t, n) => {
  "use strict";

  var r = n(29745),
    o = n(26506).supportsDescriptors,
    i = Object.getOwnPropertyDescriptor;
  e.exports = function () {
    if (o && "gim" === /a/gim.flags) {
      var e = i(RegExp.prototype, "flags");
      if (e && "function" == typeof e.get && true && true) {
        var t = "",
          n = {};
        if (Object.defineProperty(n, "hasIndices", {
          get: function () {
            t += "d";
          }
        }), Object.defineProperty(n, "sticky", {
          get: function () {
            t += "y";
          }
        }), e.get.call(n), "dy" === t) return e.get;
      }
    }
    return r;
  };
};`,
    );
  });
});
