// import _ from 'lodash';

const createSpaces = (count) => ' '.repeat(count === 0 ? 2 : 2 + count * 4);

const stylish = (ast, space) => ast.map((value) => {
  const {
    status, newValue, oldValue, children,
  } = value;
  switch (status) {
    case 'added':
      return console.log(newValue, oldValue, children);
    case 'removed':
      return console.log(newValue, oldValue, children);
    case 'changed':
      return console.log(newValue, oldValue, children);
    case 'unchanged':
      return console.log(newValue, oldValue, children);
    case 'nested':
      return console.log(newValue, oldValue, children);
    default:
      throw new Error(`Incorrect status '${status}'`);
  }
});

export default stylish;
