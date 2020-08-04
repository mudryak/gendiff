import yaml from 'js-yaml';
import ini from 'ini';

const parser = (file, fileType) => {
  switch (fileType) {
    case 'json':
      return JSON.parse(file);
    case 'yaml':
      return yaml.safeLoad(file);
    case 'ini':
      return ini.parse(file);
    default:
      throw new TypeError(`unknown data type - '${fileType}'`);
  }
};

export default parser;
