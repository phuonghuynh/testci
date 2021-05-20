exports.command = 'iss-attachments <id>';
exports.desc = 'issue attach files, often use for "build-issue"';

exports.builder = {
  id: {
    string: true,
    desc: 'issue-id in full format, i.e. SCM-226',
    require: true,
  },
  // file: {
  //   array: true,
  //   string: true,
  //   desc: 'list of files path.resolve(xxx) to upload',
  //   require: true
  // }
}

const debug = require('debug')('JIRA');

exports.handler = (argv) => {
  console.log(JSON.stringify(argv));
};
