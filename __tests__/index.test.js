import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'UTF-8');
const types = ['json', 'yaml', 'ini'];
const formats = ['stylish', 'plain', 'json'];

describe.each(formats)('Comparison files', (format) => {
  it.each(types)(`Testing format - ${format}`, (type) => {
    const beforePath = getFixturePath(`${type}/before.${type}`);
    const afterPath = getFixturePath(`${type}/after.${type}`);
    const expectResult = readFile(`result-${format}.txt`);
    const result = genDiff(beforePath, afterPath, format);
    expect(result).toBe(expectResult);
  });
});
