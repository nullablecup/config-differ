#!/usr/bin/env node

import program from 'commander';
import diff from '..';

program
  .version('0.1.2')
  .arguments('<first_config> <second_config>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig, { format }) =>
    console.log(diff(firstConfig, secondConfig, format)))
  .parse(process.argv);

