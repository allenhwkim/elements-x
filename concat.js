#!/usr/bin/env node
const { glob } = require('glob');
const fs = require('fs');
const yargs = require('yargs/yargs')(process.argv.slice(2));

const argv = yargs.usage('Usage: $0 <pattern> <output>').demandCommand(2).argv;
const [pattern, output] = argv._;

(async function main() {
  fs.writeFileSync(output, '');
  const files = (await glob(pattern)).sort();
  files.forEach(function (filename) {
    fs.appendFileSync(output, fs.readFileSync(filename))
  });
})();
