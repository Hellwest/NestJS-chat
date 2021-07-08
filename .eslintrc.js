// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  globals: {},
  plugins: [
    "@typescript-eslint",
    "prettier",
    "jest",
    "filenames",
    "promise",
    "security",
    "no-secrets",
    "unicorn",
    "optimize-regex",
    "eslint-comments",
  ],
  extends: [
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:promise/recommended",
    "plugin:security/recommended",
    "plugin:unicorn/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: "./",
    jsx: true,
    useJSXTextNode: true,
  },
  overrides: [
    {
      files: ["*.spec.ts"],
      env: {
        "jest/globals": true,
      },
    },
  ],
  rules: {
    // general
    "max-lines": ["error", 500],
    "no-console": "error",
    "no-dupe-keys": "error",
    "object-shorthand": "error",
    "no-undef": "error",
    "no-unused-vars": ["off"],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "no-warning-comments": [
      "error",
      {
        terms: ["no commit"],
        location: "anywhere",
      },
    ],
    curly: "error",
    "no-unneeded-ternary": "error",
    "no-nested-ternary": "error",
    "eslint-comments/no-unused-disable": "error",
    "padding-line-between-statements": [
      "warn",
      {
        blankLine: "always",
        prev: "*",
        next: ["return", "if", "for", "export"],
      },
    ],

    // filenames
    "filenames/match-regex": ["error", "^[a-z0-9.-]+$", false],
    "filenames/match-exported": "off",
    "filenames/no-index": "error",

    // ts
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/explicit-member-accessibility": [
      "warn",
      { accessibility: "no-public" },
    ],
    "@typescript-eslint/no-parameter-properties": "off",

    // prettier
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
        singleQuote: false,
        semi: false,
        arrowParens: "always",
      },
    ],

    // promise
    "promise/prefer-await-to-then": "warn",
    "promise/prefer-await-to-callbacks": "warn",

    // no-secrets
    "no-secrets/no-secrets": "error",

    // regex
    "optimize-regex/optimize-regex": "warn",

    // unicorn
    "unicorn/no-array-reduce": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-null": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        replacements: {
          props: false,
          e2e: false,
          db: false,
        },
      },
    ],
  },
}
