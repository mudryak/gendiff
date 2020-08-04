import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const readFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fullPath = path.resolve(process.cwd(), filePath);
  const file = fs.readFileSync(fullPath, 'UTF8');
  const fileEncode = JSON.parse(file);
  return fileEncode;
};

const genDiff = (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  if (!file1 || !file2) {
    return null;
  }
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  const allKeys = _.uniq([...keys1, ...keys2]);
  const finall = allKeys.reduce((result, key) => {
    if (!_.has(file1, key)) {
      result.push(`  + ${key}: ${file2[key]}`);
      return result;
    }
    if (!_.has(file2, key)) {
      result.push(`  - ${key}: ${file1[key]}`);
      return result;
    }
    if (!_.isEqual(file1[key], file2[key])) {
      result.push(`  - ${key}: ${file1[key]}`);
      result.push(`  + ${key}: ${file2[key]}`);
      return result;
    }
    result.push(`    ${key}: ${file1[key]}`);
    return result;
  }, []);
  const result = ['{', ...finall, '}'].join('\n');
  return result;
};

export default genDiff;
