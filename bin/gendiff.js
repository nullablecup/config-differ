#!/usr/bin/env babel-node

var program = require('commander');

program
  .version('0.0.4')
  .arguments('<first_config> <second_config>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);

