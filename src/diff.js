import { union, isObject } from 'lodash';

const isNotChanged = (before, after, key) => before[key] === after[key];

const isChanged = (before, after, key) => before[key] !== after[key] && !isObject(after[key]);

const isAdded = (before, key) => (before[key] === undefined);

const isDeleted = (after, key) => (after[key] === undefined);

const setNested = obj =>
  Object.keys(obj).map(key =>
    ({ type: 'notChanged', key, value: isObject(obj[key]) ? setNested(obj[key]) : obj[key] }));

export const getAstDiff = (before: Object, after: Object): Object => {
  const unitedKeys = union(Object.keys(before), Object.keys(after));

  return unitedKeys.map((key) => {
    if (isAdded(before, key)) {
      return { type: 'added', key, value: isObject(after[key]) ? setNested(after[key]) : after[key] };
    } else if (isDeleted(after, key)) {
      return { type: 'deleted', key, value: isObject(before[key]) ? setNested(before[key]) : before[key] };
    } else if (isNotChanged(before, after, key)) {
      return { type: 'notChanged', key, value: after[key] };
    } else if (isChanged(before, after, key)) {
      return { type: 'changed', key, value: after[key], oldValue: before[key] };
    }
    return { type: 'nested', key, value: getAstDiff(before[key], after[key]) };
  });
};

export default getAstDiff;
