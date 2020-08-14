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

const parseIni = (data) => {
  const iniData = ini.parse(data);
  return correctIniParse(iniData);
};

const parse = (data, dataType) => {
  switch (dataType) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.safeLoad(data);
    case 'ini':
      return parseIni(data);
    default:
      throw new TypeError(`unknown data type - '${dataType}'`);
  }
};

export default parse;
