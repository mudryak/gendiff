#!/usr/bin/env node
import commander from 'commander';

const { program } = commander;

program
  .version('0.0.1', '-v, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format');

program.parse(process.argv);
