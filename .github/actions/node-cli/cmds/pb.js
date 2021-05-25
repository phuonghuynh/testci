exports.command = 'pb';
exports.desc = 'set of pb command';

exports.builder = function (yargs) {
  return yargs.commandDir(require('path').join(__dirname, 'pb'));
};
