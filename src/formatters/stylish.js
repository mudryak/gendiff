import _ from 'lodash';

const createSpaces = (count) => {
  const step = 2;
  const countSpaces = count === 0 ? step : count * 4 + step;
  return ' '.repeat(countSpaces);
};

const createCorretString = (value, countSpaces) => {
  if (_.isObject(value)) {
    const string = _.map(value, (val, key) => {
      const correctVal = createCorretString(val, countSpaces + 1);
      return `${createSpaces(countSpaces + 1)}  ${key}: ${correctVal}`;
    }).join('\n');
    return `{\n${string}\n${createSpaces(countSpaces)}  }`;
  }
  return value;
};

const stylish = (ast, countSpaces = 0) => ast.map((value) => {
  const {
    status, key, children,
  } = value;
  const newValue = createCorretString(value.newValue, countSpaces);
  const oldValue = createCorretString(value.oldValue, countSpaces);
  switch (status) {
    case 'added':
      return `${createSpaces(countSpaces)}+ ${key}: ${newValue}`;
    case 'removed':
      return `${createSpaces(countSpaces)}- ${key}: ${oldValue}`;
    case 'changed':
      return `${createSpaces(countSpaces)}- ${key}: ${oldValue}\n${createSpaces(countSpaces)}+ ${key}: ${newValue}`;
    case 'unchanged':
      return `${createSpaces(countSpaces)}  ${key}: ${oldValue}`;
    case 'nested':
      return `${createSpaces(countSpaces)}  ${key}: {\n${stylish(children, countSpaces + 1)}\n${createSpaces(countSpaces)}  }`;
    default:
      throw new Error(`Incorrect status '${status}'`);
  }
}).join('\n');

export default (ast) => `{\n${stylish(ast)}\n}`;
