exports.command = 'upload-build-assets';
exports.aliases = 'uba'
exports.desc = 'upload built assets to issue-id';

const path = require('path');
const fs = require('fs');

exports.builder = (yargs) => {
  yargs
    .options('id', {
      string: true,
      desc: 'ex: "--id SCM-226"\n(default) read file "./.jira.d/.releaseissue"',
      require: false,
    })
    .options('file', {
      array: true,
      string: true,
      alias: 'f',
      desc: 'ex: "-f xxx -f yyy.*"\nlist of files path.resolve(xxx) to upload',
      require: true
    })
    .check((argv) => {
      let id = argv.id;
      if (!id) {
        const idFile = path.resolve("./.jira.d/.releaseissue");
        if (fs.existsSync(idFile)) {
          argv.id = fs.readFileSync(idFile).toString();
          console.warn(">> using default issue-id", argv.id);
        }
        else {
          console.error("require jira issue id for upload assets");
          throw 'require arg "--id"';
        }
      }

      return true;
    })
}


exports.handler = async (argv) => {
  const id = argv.id;
  const files = argv.file;

  const jira = require('../../conf/jira/_api');

  const links = [];
  for (let file of files) {
    file = path.resolve(file);
    const reply = await jira.addAttachmentOnIssue(id, fs.createReadStream(file));
    links.push(reply[0].content);
  }

  console.log(">> add build comment", id);
  await jira.addComment(id, require('../../conf/jira/_build-comment')(links));
};
