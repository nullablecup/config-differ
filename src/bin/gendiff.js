#!/usr/bin/env node

import program from 'commander';
import diff from '..';

program
  .version('0.1.0')
  .arguments('<first_config> <second_config>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action(diff)
  .parse(process.argv);

