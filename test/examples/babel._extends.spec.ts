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

export const result = 'var _extends = Object.assign;';

it('@babel/helpers: _extends', async () => {
  await expect(code).toBeTransform(result);
});
