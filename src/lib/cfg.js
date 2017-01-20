const { homedir } = require('os');
const path = require('path');

const fs = require('fs-promise');
let file = process.env.NOW_JSON ? path.resolve(process.env.NOW_JSON) : path.resolve(homedir(), '.now.json')
let apiURL = 'http://127.0.0.1:5000/';

function read() {
    let existing = null
    try {
        existing = fs.readFileSync(file, 'utf8');
        existing = JSON.parse(existing);
    } catch (err) {}

    return existing || {}
}

module.exports = {
    read,
    apiURL
};
