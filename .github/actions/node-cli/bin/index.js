#!/usr/bin/env node

require('dotenv').config({path: require('path').join(__dirname, '..', '.env')});

require('yargs')
  .commandDir(require('path').join(__dirname, '..', 'cmds'))
  .demandCommand()
  .help()
  .argv;
