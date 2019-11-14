module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      globalReturn: true,
      jsx: true,
    },
  },
  env: {
    node: true,
    es6: true,
    jest: true,
  },
}
