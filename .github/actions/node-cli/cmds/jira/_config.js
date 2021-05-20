const JiraApi = require('jira-client');
const username = process.env.JIRA_API_EMAIL;
const token = process.env.JIRA_API_TOKEN;
const jira = new JiraApi({
  protocol: 'https',
  host: 'https://datalocker.atlassian.net',
  username: username,
  password: token,
  apiVersion: '2',
  strictSSL: true
});
const debug = require('debug')('JIRA');
debug(`using username`, )
module.exports = jira
