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


      argv.file = file;

      return true;
    })
}

exports.handler = async (argv) => {
  let file = path.resolve(argv.file);
  let xml = fs.readFileSync(file, 'utf8');
  const json = JSON.parse(xml2json.toJson(xml));

  const inputVersion = process.env.VER_NUMBER;
  const inputBuildNumber = process.env.BUILD_NUMBER;
  const coerceVersion = semver.coerce(inputVersion); //.major , .minor, .patch
  // const version = semver.valid(coerceVersion); // '42.6.7'

  _.set(json, 'Project.PropertyGroup.MAJORVER', coerceVersion.major);
  _.set(json, 'Project.PropertyGroup.MINORVER', coerceVersion.minor);
  _.set(json, 'Project.PropertyGroup.SPVER', coerceVersion.patch);
  _.set(json, 'Project.PropertyGroup.BUILDNUM', inputBuildNumber);

  xml = xml2json.toXml(json);
  fs.writeFileSync(file, xml, {encoding: 'utf8'});
}
