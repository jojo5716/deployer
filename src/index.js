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
const loginService       = require('./deployer-login');
const log         = require('./lib/log');

clear();

log.ascii('Deploy');

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
        args.unshift('--help');
    }
}

if (!loginService.isLogged() || cmd === 'login') {
    if (cmd !== 'login') log.warning('You are not log in');
    loginService.login()
    .then((response) => response)
    .then((username) => {
        if (username) {
            console.log(username);
            process.exit(0);
        }
    })

}

const bin = resolve(__dirname, `deployer-${cmd}.js`);
process.argv = process.argv.slice(0, 2).concat(args)
require(bin, 'may-exclude')
