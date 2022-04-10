module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': ['error', 'never'],
    'keyword-spacing': ['error', { 'overrides': {
      'if': { 'after': false },
      'for': { 'after': false },
      'while': { 'after': false },
      'static': { 'after': false },
      'as': { 'after': false }
    } }],
    'no-unused-vars': 'off',
    'camelcase': 0,
    'object-curly-spacing': 0
  }
}
