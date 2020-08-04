import yaml from 'js-yaml';

const parser = (file, fileType) => {
  switch (fileType) {
    case 'json':
      return JSON.parse(file);
    case 'yaml':
      return yaml.safeLoad(file);
    default:
      throw new TypeError(`unknown data type - '${fileType}'`);
  }
};

export default parser;
