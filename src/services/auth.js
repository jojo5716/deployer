// Native
const { homedir } = require('os')
const path = require('path')

// Packages
const fs = require('fs-promise')

let file = process.env.NOW_JSON ? path.resolve(process.env.NOW_JSON) : path.resolve(homedir(), '.now.json')

async function read() {
  let existing = null
  try {
    existing = fs.readFileSync(file, 'utf8')
    existing = JSON.parse(existing)
  } catch (err) {}
  return existing || {}
}

function isLogged() {
    const exist = read();

    return Object.keys(exist).length > 0;
}

module.exports = {
  read,
  isLogged
}
