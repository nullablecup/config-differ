import { isObject } from 'lodash';

// FIXME: think how to simplify functions
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

export default astToPlain;
