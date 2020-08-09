import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const correctIniParse = (obj) => {
  const keys = Object.keys(obj);
  return keys.reduce((acc, key) => {
    const value = obj[key];
    if (_.isObject(value)) {
      acc[key] = correctIniParse(value);
      return acc;
    }
    if (!Number.isNaN(parseInt(value, 10))) {
      acc[key] = Number(value);
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
};

const parseIni = (file) => {
  const iniFile = ini.parse(file);
  return correctIniParse(iniFile);
};

const parser = (file, fileType) => {
  switch (fileType) {
    case 'json':
      return JSON.parse(file);
    case 'yaml':
      return yaml.safeLoad(file);
    case 'ini':
      return parseIni(file);
    default:
      throw new TypeError(`unknown data type - '${fileType}'`);
  }
};

export default parser;
