import _ from 'lodash';
import stylish from './formater.js';

const buildAST = (data1, data2) => {
  const keys = _.uniq([...Object.keys(data1), ...Object.keys(data2)]);
  const resultAST = keys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        key, status: 'added', newValue: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        key, status: 'removed', oldValue: data1[key],
      };
    }
    if (data1[key] === data2[key]) {
      return {
        key, status: 'unchanged', oldValue: data1[key], newValue: data2[key],
      };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, status: 'nested', children: buildAST(data1[key], data2[key]) };
    }
    return {
      key, status: 'changed', oldValue: data1[key], newValue: data2[key],
    };
  });
  return resultAST;
};

const data1 = {
  a: {
    b: 1,
    g: 1,
    c: 'asdads',
  },
  as: 'asdadadsddd',
};

const data2 = {
  a: {
    b: 5,
    m: 3,
    g: 2,
    c: 'asdads',
  },
  as: 'asdadadsddd',
};

stylish(buildAST(data1, data2));

// export default buildAST;
