/* eslint-disable unicorn/prefer-module */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const globalRules = require("../../.eslintrc.js")

module.exports = {
  ...globalRules,

  env: {
    ...globalRules.env,
    browser: true,
  },
}
