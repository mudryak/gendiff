import stylish from './stylish.js';
import plain from './plain.js';

const getFormat = (format) => {
  switch (format) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    default:
      throw new TypeError(`Incorrect format - '${format}'`);
  }
};

export default getFormat;
