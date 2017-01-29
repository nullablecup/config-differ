import { isObject } from 'lodash';

const astToPlain = (astDiff, domen = '') => {
  const mask = {
    deleted: key => `Property "${domen}${key}" was removed`,
    added: (key, value) => `Property "${domen}${key}" was added with value: ${value}`,
    addedComplex: key => `Property "${domen}${key}" was added with complex value`,
    changed: (key, value, oldValue) => `Property "${domen}${key}" was updated. From "${oldValue}" to "${value}"`,
    changedComplex: key => `Property "${domen}${key}" was added with complex value`,
  };

  return astDiff.filter(({ type }) => type !== 'notChanged')
    .map(({ type, key, value, oldValue }) => {
      if (type === 'nested') {
        return astToPlain(value, `${domen}${key}.`);
      } else if ((type === 'added' || type === 'changed') && isObject(value)) {
        return mask[`${type}Complex`](key);
      }
      return mask[type](key, value, oldValue);
    })
    .join('\n');
};

export default astToPlain;
