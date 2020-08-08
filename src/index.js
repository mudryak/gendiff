import readFile from './utils.js';
import buildAST from './buildAST.js';
import getFormat from './formatters/index.js';

const genDiff = (filepath1, filepath2, format) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  if (!file1 || !file2) {
    return null;
  }
  const ast = buildAST(file1, file2);
  return getFormat(format)(ast);
};

export default genDiff;
