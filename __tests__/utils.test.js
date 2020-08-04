import path from 'path';
import genDiff from '../src/utils.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('сheck json comparison files', () => {
  const file1Path = getFixturePath('json/file1.json');
  const file2Path = getFixturePath('json/file2.json');
  const result = genDiff(file1Path, file2Path);
  const expectResult = `{
    host: hexlet.io
  - timeout: 20
  + timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
  expect(result).toBe(expectResult);
});

test('сheck failed json comparison files', () => {
  const file1Path = getFixturePath('json/file1.json');
  const file2Path = getFixturePath('json/undefied.json');
  const result = genDiff(file1Path, file2Path);
  expect(result).toBeNull();
});
