import { defineConfig, globalIgnores } from 'eslint/config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([ globalIgnores([ '**/dist/' ]), {
  extends: compat.extends('eslint:recommended', 'next', 'plugin:@typescript-eslint/recommended'),

  plugins: {
    '@typescript-eslint': typescriptEslint
  },

  languageOptions: {
    globals: {
      ...globals.browser,
      React: true,
      JSX: 'readonly'
    },

    ecmaVersion: 'latest',
    sourceType: 'module',

    parserOptions: {
      parser: '@typescript-eslint/parser'
    }
  },

  rules: {
    '@next/next/no-img-element': 'off',
    'array-bracket-newline': [ 'error', 'consistent' ],

    'array-bracket-spacing': [ 'error', 'always', {
      objectsInArrays: true,
      arraysInArrays: true
    } ],

    'arrow-body-style': [ 'error', 'as-needed' ],
    'arrow-parens': [ 'error', 'always' ],
    'brace-style': [ 'error', '1tbs' ],
    'comma-dangle': [ 'error', 'never' ],
    eqeqeq: [ 'error' ],

    'func-style': [ 'error', 'declaration', {
      allowArrowFunctions: true
    } ],

    'function-paren-newline': [ 'error', 'multiline' ],
    'implicit-arrow-linebreak': [ 'error', 'beside' ],

    indent: [ 'error', 2, {
      SwitchCase: 1
    } ],

    'keyword-spacing': [ 'error', {
      before: true
    } ],

    'linebreak-style': [ 'error', 'unix' ],

    'max-len': [ 'error', {
      code: 180,
      tabWidth: 2,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true
    } ],

    'no-confusing-arrow': [ 'error' ],
    'no-debugger': [ 'warn' ],
    'no-else-return': [ 'error' ],
    'no-empty-function': [ 'error' ],
    'no-extra-semi': [ 'error' ],
    'no-lonely-if': [ 'error' ],
    'no-loop-func': [ 'error' ],
    'no-multi-assign': [ 'error' ],
    'no-param-reassign': [ 'error' ],
    'no-sequences': [ 'error' ],
    'no-trailing-spaces': [ 'error' ],
    'no-undef': [ 'error' ],
    'no-useless-concat': [ 'error' ],
    'no-var': [ 'error' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'object-shorthand': [ 'error', 'methods' ],
    'one-var': [ 'error', 'never' ],

    'operator-linebreak': [ 'error', 'before', {
      overrides: {
        '=': 'none'
      }
    } ],

    'padded-blocks': [ 'error', 'never' ],

    'padding-line-between-statements': [ 'error', {
      blankLine: 'always',
      prev: '*',
      next: 'multiline-block-like'
    }, {
      blankLine: 'always',
      prev: 'multiline-block-like',
      next: '*'
    } ],

    'prefer-arrow-callback': [ 'error' ],

    'prefer-const': [ 'error', {
      destructuring: 'any',
      ignoreReadBeforeAssign: false
    } ],

    'prefer-object-spread': [ 'error' ],
    'prefer-template': [ 'error' ],
    quotes: [ 'error', 'single' ],

    'semi-spacing': [ 'error', {
      before: false,
      after: true
    } ],

    semi: [ 'error', 'always' ],
    'space-before-blocks': [ 'error', 'always' ],

    'space-before-function-paren': [ 'error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    } ],

    'space-in-parens': [ 'error', 'never' ],

    'switch-colon-spacing': [ 'error', {
      after: true,
      before: false
    } ],

    'no-multiple-empty-lines': [ 'error', {
      max: 1,
      maxEOF: 1
    } ],

    'no-unneeded-ternary': [ 'error' ],
    'no-promise-executor-return': [ 'error' ],
    'no-self-compare': [ 'error' ],
    'no-unmodified-loop-condition': [ 'error' ],
    'no-unreachable-loop': [ 'error' ],
    'no-new': [ 'error' ],
    'no-await-in-loop': [ 'error' ],
    'no-constructor-return': [ 'error' ],
    'no-extra-bind': [ 'error' ],
    'no-extend-native': [ 'error' ],
    'no-implicit-coercion': [ 'error' ],
    'no-label-var': [ 'error' ],
    'no-return-assign': [ 'error' ],

    'no-unused-expressions': [ 'error', {
      enforceForJSX: true,
      allowTaggedTemplates: true
    } ],

    'operator-assignment': [ 'error' ],
    yoda: [ 'error' ],
    'no-nested-ternary': [ 'off' ]
  }
} ]);