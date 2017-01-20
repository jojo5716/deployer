#!/usr/bin/env node
"use strict";

const chalk       = require('chalk');
const clear       = require('clear');
const CLI         = require('clui');
const figlet      = require('figlet');
const inquirer    = require('inquirer');
const Preferences = require('preferences');
const Spinner     = CLI.Spinner;
const GitHubApi   = require('github');
const _           = require('lodash');
const git         = require('simple-git')();
const touch       = require('touch');
const fs          = require('fs');
const minimist    = require('minimist');
const { resolve } = require('path');
const loginService = require('./services/login');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('Deploy', { horizontalLayout: 'full' })
  )
);

const defaultCommand = 'deploy'
const commands = new Set([
  defaultCommand,
  'help',
  'list',
  'login',
  'remove'
]);

let cmd = defaultCommand
const args = process.argv.slice(2)
const index = args.findIndex(a => commands.has(a))

if (index > -1) {
  cmd = args[index]
  args.splice(index, 1)

  if (cmd === 'help') {
    if (index < args.length && commands.has(args[index])) {
      cmd = args[index];
      args.splice(index, 1);
    } else {
      cmd = defaultCommand
    }

    args.unshift('--help')
  }

}

const isLogged = loginService.isLogged();
if (!isLogged) cmd = 'login';

console.log(cmd);

const bin = resolve(__dirname, `deployer-${cmd}.js`);
process.argv = process.argv.slice(0, 2).concat(args)
require(bin, 'may-exclude')
