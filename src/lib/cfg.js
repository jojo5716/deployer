const path = require('path');
const touch       = require('touch');
const { homedir } = require('os');
const fs = require('fs-promise');

let file = process.env.NOW_JSON ? path.resolve(process.env.NOW_JSON) : path.resolve(homedir(), '.deployer.json')
let apiURL = 'http://127.0.0.1:5000/';

function read() {
    let existing = null
    try {
        existing = fs.readFileSync(file, 'utf8');
        existing = JSON.parse(existing);
    } catch (err) {}

    return existing || {}
}

function generateConfigFile(credentials, token) {
    fs.writeFileSync(file, JSON.stringify(credentials, null, 2))
}

module.exports = {
    read,
    apiURL,
    generateConfigFile
};
