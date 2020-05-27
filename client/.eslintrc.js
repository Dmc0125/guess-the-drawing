module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'arrow-parens': 0,
    'arrow-body-style': 0,
    'no-use-before-define': 0,
    'no-unused-vars': 'warn',
    'no-param-reassign': 0,
    'no-irregular-whitespace': 0,
  },
};
