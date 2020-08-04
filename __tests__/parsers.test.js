import path from 'path';
import fs from 'fs';
import parsers from '../src/parsers';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('Check parsers function - json', () => {
  const filePath = getFixturePath('json/file1.json');
  const file = fs.readFileSync(filePath);
  const fileExpectEncode = JSON.parse(file);
  const fileParserEncode = parsers(file, 'json');
  expect(fileParserEncode).toMatchObject(fileExpectEncode);
});

test('Check parsers function - yaml', () => {
  const filePath = getFixturePath('yaml/file1.yaml');
  const file = fs.readFileSync(filePath);
  const fileExpectEncode = JSON.parse(file);
  const fileParserEncode = parsers(file, 'yaml');
  expect(fileParserEncode).toMatchObject(fileExpectEncode);
});
