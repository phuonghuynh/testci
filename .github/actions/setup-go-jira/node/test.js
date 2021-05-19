const execSync = require('child_process').execSync;
console.log(execSync(`${process.env.JIRA} --help`).toString());;
