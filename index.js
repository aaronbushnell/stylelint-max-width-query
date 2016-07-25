var stylelint = require("stylelint");

var ruleName = "tmi/max-width-query";

stylelint.utils.ruleMessages(ruleName, {
  expected: "Expected ...",
})

module.exports = stylelint.createPlugin(ruleName, function (expectation) {
  const runColorHexCase = stylelint.rules["color-hex-case"](expectation)
  return (root, result) => {
    if (root.toString().indexOf("@@check-color-hex-case") === -1) return
    runColorHexCase(root, result)
  }
})
