const minimist = require('minimist');
const { resolve } = require('path');
const help = require('./deployer-help');

const argv = minimist(process.argv.slice(2), {
    string: [
        'config',
        'token',
        'name',
    ],
    boolean: [
        'help',
        'version',
        'login',
    ]
});

const apiUrl = argv.url || 'https://api.zeit.co'
const shouldLogin = argv.login

console.log(argv);

if (argv.h || argv.help) {
    help.show();
    process.exit(0);
} else if (argv.login) {

} else {

}
