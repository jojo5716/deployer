const chalk = require('chalk');
const figlet      = require('figlet');

function error(message) {
    console.log(
        chalk.red(message)
    );
}

function warning(message) {
    console.log(
        chalk.yellow(message)
    );
}

function success(message) {
    console.log(
        chalk.green(message)
    );
}

function ascii(message) {
    console.log(
      chalk.yellow(
        figlet.textSync(message, { horizontalLayout: 'full' })
      )
    );
}

module.exports = {
    error,
    success,
    warning,
    ascii
};
