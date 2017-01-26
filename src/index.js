// @flow

// input json, yaml, ini
// transform to object
// difference return ast
// output in the desired format plain text, pretty, json

// Формат для объектов Difference
// 1. notChanged
// 2. changed
// 3. added
// 4. deleted
export class DiffState {
  constructor(status, key, value, oldValue) {
    this.status = status;
    this.key = key;
    this.value = value;
    this.oldValue = oldValue;
  }

  getState() {
    return this.status;
  }

  getKey() {
    return this.key;
  }

  getValue() {
    return this.value;
  }

  getOldValue() {
    return this.oldValue;
  }
}

const isNotChanged = (before, after, afterKey) =>
  before[afterKey] === after[afterKey];

const isChanged = (before, after, afterKey) =>
  before[afterKey] !== after[afterKey];

const isAdded = (before, afterKey) =>
  !(afterKey in before);

const isDeleted = (after, beforeKey) =>
  !(beforeKey in after);

const getAstDiff = (before: Object, after: Object): Object => {
  const afterKeys = Object.keys(after);
  const beforeKeys = Object.keys(before);

  const intersecting = afterKeys.filter(afterKey => afterKey in before);

  const notChangedDiffList = intersecting.filter(afterKey => isNotChanged(before, after, afterKey));
  const changedDiffList = intersecting.filter(afterKey => isChanged(before, after, afterKey));
  const addedDiffList = afterKeys.filter(afterKey => isAdded(before, afterKey));
  const deletedDiffList = beforeKeys.filter(beforeKey => isDeleted(after, beforeKey));

  return [].concat(
    notChangedDiffList.map(key => new DiffState('notChanged', key, after[key])),
    changedDiffList.map(key => new DiffState('changed', key, after[key], before[key])),
    deletedDiffList.map(key => new DiffState('deleted', key, before[key])),
    addedDiffList.map(key => new DiffState('added', key, after[key])),
  );
};

export default getAstDiff;

