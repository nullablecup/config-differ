// @flow
import fs from 'fs';

// input json, yaml, ini
// transform to object
// difference return ast
// output in the desired format plain text, pretty, json

export const getContent = (path) => {
  const content = fs.readFileSync(path, 'utf-8');
  return JSON.parse(content);
};

// Формат для объектов DiffState
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

export const getAstDiff = (before: Object, after: Object): Object => {
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

export const astToPlainText = (astDiff) => {
  const mask = {
    notChanged: (key, value) => `    ${key}: ${value}\n`,
    changed: (key, value, oldValue) => `  + ${key}: ${value}\n  - ${key}: ${oldValue}\n`,
    deleted: (key, value) => `  - ${key}: ${value}\n`,
    added: (key, value) => `  + ${key}: ${value}\n`,
  };

  const plainTextMiddle = astDiff.reduce((acc, diffState) => {
    const state = diffState.getState();
    const key = diffState.getKey();
    const value = diffState.getValue();
    const oldValue = diffState.getOldValue();

    return acc + mask[state](key, value, oldValue);
  }, '');

  return `{\n${plainTextMiddle}}`;
};

const compare = (pathToFileBefore, pathToFileAfter) => {
  const before = getContent(pathToFileBefore);
  const after = getContent(pathToFileAfter);
  const astDiff = getAstDiff(before, after);
  return astToPlainText(astDiff);
};

export default compare;
