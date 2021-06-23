exports.command = 'set-driver-version';
exports.desc = 'set version to driver build file';

const path = require('path');
const fs = require('fs');
const xml2json = require('xml2json');
const semver = require('semver');
const _ = require('lodash');

exports.builder = (yargs) => {
  yargs
    .options('git', {
      string: true,
      desc: 'path to windows driver git source code, default is "{GITHUB_WORKSPACE}/git"',
      require: true,
      default: process.env.GITHUB_WORKSPACE
        ? path.join(process.env.GITHUB_WORKSPACE, 'git')
        : '',
    })
    .check((argv) => {
      let file = argv.git ? path.resolve(argv.git) : '';
      if (!file) {
        throw `--file is required`
      }

      // file = path.join(file, 'src', 'Props', 'OEM', 'DataLocker.props');
      // if (!fs.existsSync(file)) {
      //   throw `file ${file} doesn't existed`;
      // }

      argv.file = file;

      return true;
    })
}

exports.handler = async (argv) => {
  let file = path.resolve(argv.file);
  let xml = fs.readFileSync(file, 'utf8');
  const json = JSON.parse(xml2json.toJson(xml, {reversible: true}));

  const inputVersion = process.env.VER_NUMBER;
  const inputBuildNumber = process.env.BUILD_NUMBER;
  const coerceVersion = semver.coerce(inputVersion);

  _.set(json, 'Project.PropertyGroup.MAJORVER.$t', coerceVersion.major);
  _.set(json, 'Project.PropertyGroup.MINORVER.$t', coerceVersion.minor);
  _.set(json, 'Project.PropertyGroup.SPVER.$t', coerceVersion.patch);
  _.set(json, 'Project.PropertyGroup.BUILDNUM.$t', inputBuildNumber);

  xml = xml2json.toXml(JSON.stringify(json));
  fs.writeFileSync(file, xml, {encoding: 'utf8'});
}
