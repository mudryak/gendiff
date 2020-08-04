import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'UTF-8');

const types = ['json', 'yaml', 'ini'];

describe.each(types)('Comparison files', (type) => {
  it(`Test type - ${type}`, () => {
    const beforePath = getFixturePath(`${type}/before.${type}`);
    const afterPath = getFixturePath(`${type}/after.${type}`);
    const expectResult = readFile(`${type}/result.txt`);
    const result = genDiff(beforePath, afterPath);
    expect(result).toBe(expectResult);
  });
});
