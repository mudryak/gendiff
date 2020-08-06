#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../index.js';

const { program } = commander;

program
  .version('0.0.3', '-v, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filePath1, filePath2) => {
    console.log(genDiff(filePath1, filePath2, program.format));
  })
  .parse(process.argv);
