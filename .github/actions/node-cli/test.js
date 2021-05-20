const execSync = require('child_process').execSync;
const spawnSync = require('child_process').spawnSync;
console.log(execSync(`${process.env.JIRA} --help`).toString());

