import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  return fs.readFileSync(fullPath, 'UTF8');
};

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(readFile(filepath1));
  const file2 = JSON.parse(readFile(filepath2));
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
  console.log(['{', ...finall, '}'].join('\n\r'));
};

export default genDiff;
