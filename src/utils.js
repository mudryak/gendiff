import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parser from './parse.js';

const getFileType = (pathFile) => {
  const baseName = path.extname(pathFile);
  return _.replace(baseName, '.', '');
};

const readFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fullPath = path.resolve(process.cwd(), filePath);
  const content = fs.readFileSync(fullPath, 'UTF8');
  const fileType = getFileType(filePath);
  const fileEncode = parser(content, fileType);
  return fileEncode;
};

export default readFile;
