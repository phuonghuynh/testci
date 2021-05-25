exports.command = 'set-driver-version';
exports.desc = 'set version to driver build file';

const path = require('path');
const fs = require('fs');
const xml2json = require('xml2json');

exports.builder = (yargs) => {
  yargs
    .options('git', {
      string: true,
      desc: 'path to git source code',
      require: true,
      default: path.join(process.env.GITHUB_WORKSPACE, 'git'),
    })
    .check((argv) => {
      return true;
    })
}

exports.handler = async (argv) => {
  const props = path.resolve(argv.git);
  const data = xml2json.toJson(xml);
}
