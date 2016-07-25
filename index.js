var stylelint = require("stylelint");

var ruleName = "tmi/max-width-query"
var messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: function(classname) { return "NO!" }
})

module.exports = stylelint.createPlugin(ruleName, function(enabled) {
  return function(root, result) {

    var validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: enabled,
      possible: [true, false]
    })

    if (!validOptions) { return }

    var utilityClasses = primerUtilities.cssstats.selectors.values

    if (utilityClasses.length == 0) {
      return
    }

    root.walkRules(function(rule) {

      var ruleClasses = rule.selector.match(/\.[a-z\-_0-9]+/ig)

      if (ruleClasses != null) {
        for (var i = 0; i < ruleClasses.length; i++) {
          var ruleClass = ruleClasses[i]
          if (utilityClasses.indexOf(ruleClass) >= 0) {
            stylelint.utils.report({
              message: messages.rejected(ruleClass),
              node: rule,
              result: result,
              ruleName: ruleName
            })
          }
        }
      }
    })
  }
})

module.exports.ruleName = ruleName
module.exports.messages = messages
