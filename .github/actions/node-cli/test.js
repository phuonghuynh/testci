const semver = require('semver');
const inputVersion = '1.2.3-build.1';
let coerce = semver.coerce(inputVersion);
const version = semver.valid(coerce); // '42.6.7'
console.log(version);
