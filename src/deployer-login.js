const chalk = require('chalk');
const inquirer    = require('inquirer');
const ora = require('ora')
const fetch = require('node-fetch')

const { homedir } = require('os');
const { validate } = require('email-validator');
// Internal dependencies
const cfg = require('./lib/cfg');

const spinner = ora({
  text: 'Waiting for authentication...',
  color: 'black'
})

function isLogged() {
    const exist = cfg.read();
    return Object.keys(exist).length > 0;
}

function getCredentials(callback) {
    const questions = [
        {
          name: 'username',
          type: 'input',
          message: 'Enter your username',
          validate: function( value ) {
            if (value.length) {
              return true;
            } else {
              return 'Please enter your username';
            }
          }
        },
        {
          name: 'password',
          type: 'password',
          message: 'Enter your password:',
          validate: function(value) {
            if (value.length) {
              return true;
            } else {
              return 'Please enter your password';
            }
          }
        }
    ];

    inquirer.prompt(questions).then(callback);
}

async function login() {

    getCredentials((credentials) => {
        spinner.start();
        process.stdout.write('\n');

        const res =  fetch(`${cfg.apiURL}/login/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(credentials)
          },
          body: credentials
        })

        .then((response) => response.json())
        .then((data) => {
            spinner.text = 'Login confirmed!'
            spinner.stopAndPersist('✔');
            process.stdout.write('\n');
            if (data.token) {

            } else {
                console.log(
                    chalk.red('Login failed!')
                );
                process.exit(0);
            }


        })


    });
}

login();
