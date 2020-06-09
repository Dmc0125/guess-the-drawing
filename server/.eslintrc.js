module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: 'airbnb-base',
  rules: {
    'comma-dangle': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    camelcase: 0,
    'arrow-parens': 0,
    'no-plusplus': 0,
    'no-unused-vars': 'warn',
    'no-console': 0,
    'no-use-before-define': 0,
    'no-irregular-whitespace': 0,
  },
};
