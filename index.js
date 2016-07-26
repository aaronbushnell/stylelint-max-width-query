var stylelint = require("stylelint");
var styleSearch = require('style-search');

var ruleName = "tmi/max-width-query"
var messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: function() { return "asdfasdf" }
})

module.exports = stylelint.createPlugin(ruleName, function(enabled) {
  return function(root, result) {

    var validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: enabled,
      possible: [true, false]
    })

    if (!validOptions) { return }

    styleSearch({
      source: result,
      target: "green",
    }, function(match, count) {
      console.log('taco!');
    });
  }
})

module.exports.ruleName = ruleName
module.exports.messages = messages
