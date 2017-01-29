import { isObject } from 'lodash';

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

const astToPlain = (astDiff, domen = '') => {
  const mask = {
    deleted: key => `Property "${domen}${key}" was removed`,
    added: (key, value) => `Property "${domen}${key}" was added with value: ${value}`,
    addedComplex: key => `Property "${domen}${key}" was added with complex value`,
    changed: (key, value, oldValue) => `Property "${domen}${key}" was updated. From "${oldValue}" to "${value}"`,
    changedComplex: key => `Property "${domen}${key}" was added with complex value`,
  };

  const plainText = astDiff.reduce((acc, { type, key, value, oldValue }) => {
    if (type === 'nested') {
      acc.push(astToPlain(value, `${domen}${key}.`));
      return acc;
    } else if ((type === 'added' || type === 'changed') && isObject(value)) {
      acc.push(mask[`${type}Complex`](key));
      return acc;
    } else if (type !== 'notChanged') {
      acc.push(mask[type](key, value, oldValue));
    }
    return acc;
  }, []);

  return plainText.join('\n');
};

const converters = {
  plain: astToPlain,
  pretty: astToPretty,
};

const display = (astDiff, format) => {
  const converter = converters[format];
  if (!converter) {
    throw new Error(`The display format "${format}" isn't supported.`);
  }
  return converter(astDiff);
};

export default display;
