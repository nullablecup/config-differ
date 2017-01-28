import { isObject } from 'lodash';

const astToPlainText = (astDiff, space = '') => {
  const mask = {
    notChanged: (key, value) => `${space}    ${key}: ${value}\n`,
    changed: (key, value, oldValue) => `${space}  + ${key}: ${value}\n${space}  - ${key}: ${oldValue}\n`,
    deleted: (key, value) => `${space}  - ${key}: ${value}\n`,
    added: (key, value) => `${space}  + ${key}: ${value}\n`,
    nested: (key, value) => `${space}    ${key}: ${value}\n`,
  };

  const plainTextMiddle = astDiff.reduce((acc, diffState) => {
    const { type, key, value, oldValue } = diffState;

    if (type === 'nested') {
      return acc + mask[type](key, astToPlainText(value, `${space}    `), oldValue);
    } else if ((type === 'added' || type === 'deleted') && isObject(value)) {
      return acc + mask[type](key, astToPlainText(value, `${space}    `), oldValue);
    }

    return acc + mask[type](key, value, oldValue);
  }, '');

  return `{\n${plainTextMiddle}${space}}`;
};

const display = (astDiff, format) => {
  switch (format) {
    case 'plainText':
    default:
      return astToPlainText(astDiff);
  }
};

export default display;
