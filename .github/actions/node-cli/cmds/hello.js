exports.command = 'hello';
exports.desc = 'test cmd for yargs';

exports.builder = {
  name: {
    string: true,
    desc: "name to say hello",
  },
};

const debug = require('debug')('hello');

exports.handler = (argv) => {
  console.log('console log hello', argv.name);
  debug(`hello`, argv.name);
};
