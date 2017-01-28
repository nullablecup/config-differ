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
    const { state, key, value, oldValue } = diffState;

    if (state === 'nested') {
      return acc + mask[state](key, astToPlainText(value, `${space}    `), oldValue);
    } else if ((state === 'added' || state === 'deleted') && isObject(value)) {
      return acc + mask[state](key, astToPlainText(value, `${space}    `), oldValue);
    }

    return acc + mask[state](key, value, oldValue);
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
