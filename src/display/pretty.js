import { isObject } from 'lodash';

// FIXME: think how to simplify functions
const astToPretty = (astDiff, space = '') => {
  const mask = {
    notChanged: (key, value) => `${space}    ${key}: ${value}\n`,
    changed: (key, value, oldValue) => `${space}  + ${key}: ${value}\n${space}  - ${key}: ${oldValue}\n`,
    deleted: (key, value) => `${space}  - ${key}: ${value}\n`,
    added: (key, value) => `${space}  + ${key}: ${value}\n`,
    nested: (key, value) => `${space}    ${key}: ${value}\n`,
  };

  const prettyTextCenter = astDiff.reduce((acc, { type, key, value, oldValue }) => {
    if (type === 'nested') {
      return acc + mask[type](key, astToPretty(value, `${space}    `), oldValue);
    } else if ((type === 'added' || type === 'deleted') && isObject(value)) {
      return acc + mask[type](key, astToPretty(value, `${space}    `), oldValue);
    }

    return acc + mask[type](key, value, oldValue);
  }, '');

  return `{\n${prettyTextCenter}${space}}`;
};

export default astToPretty;
