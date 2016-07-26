var stylelint = require("stylelint");
var styleSearch = require('style-search');

var ruleName = "tmi/max-width-query"

module.exports = stylelint.createPlugin(ruleName, function (enabled) {
  return function (root, result) {
    var validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: enabled,
      possible: [true, false]
    })

    if (!validOptions) { return }

    root.walkAtRules(function (statement) {
      styleSearch({
        source: statement.toString(),
        target: "@media (max-width",
      }, function (match, count) {
        stylelint.utils.report({
          ruleName: ruleName,
          result: result,
          node: statement,
          message: 'Expected min-width instead of max-width query.'
        });
      });
    })
  }
})

module.exports.ruleName = ruleName
