import readFile from './utils.js';
import buildAST from './buildAST.js';
import stylish from './formater.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  if (!file1 || !file2) {
    return null;
  }
  return stylish(buildAST(file1, file2));
};

export default genDiff;
