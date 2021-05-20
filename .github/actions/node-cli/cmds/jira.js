exports.command = 'jira';
exports.desc = 'set of jira command';

exports.builder = function (yargs) {
  return yargs.commandDir(require('path').join(__dirname, 'jira'));
};
