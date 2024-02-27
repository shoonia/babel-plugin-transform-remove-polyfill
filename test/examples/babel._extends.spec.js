import { t } from '../utils.js';

const code =
`function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

  return _extends.apply(this, arguments);
}`;

const result =
`function _extends() {
  _extends = Object.assign.bind();
  return _extends.apply(this, arguments);
}`;

it('@babel/helpers: _extends', async () => {
  expect(await t(code)).toBe( result);
});
