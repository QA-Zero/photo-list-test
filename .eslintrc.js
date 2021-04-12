module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/essential',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'max-len': [
      'error',
      140,
    ],
    'indent': [
      'error',
      2,
      { SwitchCase: 1 },
    ],
    'space-before-function-paren': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'no-param-reassign': [
      'error',
      { props: false },
    ],
    'no-plusplus': [
      'error',
      { allowForLoopAfterthoughts: true },
    ],
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'linebreak-style': ['error', 'windows'],
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    'arrow-parens': 'off',
    'object-curly-newline': ['error', {
      'ExportDeclaration': { 'minProperties': 4 },
    }],
    'operator-linebreak': 'off',
    'curly': 'off',
    'no-bitwise': 'off',
    'no-else-return': 'off',
  },
  settings: {
    'import/resolver': 'nuxt',
  },
};
