exports.command = 'hello';
exports.desc = 'test cmd for yargs';

exports.builder = {
  name: {
    string: true,
    desc: "name to say hello",
  },
};

exports.handler = (argv) => {
  console.log('console log hello', argv.name);
};
