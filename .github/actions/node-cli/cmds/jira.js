exports.command = 'gojira';
exports.desc = 'set of jira command, required ${JIRA} point the exec "go-jira"';
exports.aliases = 'jira'

exports.builder = function (yargs) {
  return yargs.commandDir(require('path').join(__dirname, 'gojira'));
};
