exports.command = 'test';
exports.desc = 'test cmd for go-jira';

const debug = require('debug')('test');

exports.handler = (argv) => {
  const execSync = require('child_process').execSync;
  debug(execSync(`${process.env.JIRA} help`).toString());
};
