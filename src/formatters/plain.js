import _ from 'lodash';

const getCorrectValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return value;
};

const plain = (ast, parentKey) => ast.map((value) => {
  const {
    status, children,
  } = value;
  const newValue = getCorrectValue(value.newValue);
  const oldValue = getCorrectValue(value.oldValue);
  const key = parentKey ? `${parentKey}.${value.key}` : value.key;
  switch (status) {
    case 'added':
      return `Property '${key}' was added with value: ${newValue}`;
    case 'removed':
      return `Property '${key}' was removed`;
    case 'changed':
      return `Property '${key}' was updated. From ${oldValue} to ${newValue}`;
    case 'unchanged':
      return '';
    case 'nested':
      return plain(children, key).filter((val) => val !== '').join('\n');
    default:
      throw new Error(`Incorrect status '${status}'`);
  }
});

export default (ast) => plain(ast).filter((val) => val !== '').join('\n');
