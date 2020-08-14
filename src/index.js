import readFile from './utils.js';
import buildAST from './buildAST.js';
import getFormat from './formatters/index.js';

const genDiff = (filepath1, filepath2, format) => {
  const content1 = readFile(filepath1);
  const content2 = readFile(filepath2);
  if (!content1 || !content2) {
    return null;
  }
  const ast = buildAST(content1, content2);
  return getFormat(format)(ast);
};

export default genDiff;
