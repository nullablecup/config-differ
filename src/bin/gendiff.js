#!/usr/bin/env babel-node

import program from 'commander';

program
  .version('0.0.6')
  .arguments('<first_config> <second_config>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);

