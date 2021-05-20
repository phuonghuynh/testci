#!/usr/bin/env node

require('yargs')
    .commandDir(require('path').join(__dirname, '..', 'cmds'))
    .demandCommand()
    .help()
    .argv;
