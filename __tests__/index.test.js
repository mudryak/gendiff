import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const types = ['json', 'yaml'];
const expected = `{
    host: hexlet.io
  - timeout: 20
  + timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

describe.each(types)('Comparison files', (type) => {
  it(`Test type - ${type}`, () => {
    const beforePath = getFixturePath(`${type}/before.${type}`);
    const afterPath = getFixturePath(`${type}/after.${type}`);
    const result = genDiff(beforePath, afterPath);
    expect(result).toBe(expected);
  });
});
