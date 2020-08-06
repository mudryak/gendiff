import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'UTF-8');
const expectResult = readFile('result.txt');
const types = ['json', 'yaml', 'ini'];

describe.each(types)('Comparison files', (type) => {
  it(`Test type - ${type}`, () => {
    const beforePath = getFixturePath(`${type}/before.${type}`);
    const afterPath = getFixturePath(`${type}/after.${type}`);
    const result = genDiff(beforePath, afterPath);
    expect(result).toBe(expectResult);
  });
});
