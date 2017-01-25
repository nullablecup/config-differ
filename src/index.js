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
    this._status = status;
    this._key = key;
    this._value = value;
    this._oldValue = oldValue;
  }

  getState() {
    return this._status;
  }

  getKey() {
    return this._key;
  }

  getValue() {
    return this._value;
  }

  getOldValue() {
    return this._oldValue;
  }
}

const getAstDiff = (before: object, after: object): object => {
  // return AST
  // Как сравнить 2 объекта
  // 1. Взять первый ключ из after и посмотреть есть ли он в before
  // 2. Если есть проверить значение
  //    - если одинакого кладем в дерево как не изменивщийся
  //    - если разное кладем как изменивщийся
  // 3. Если нет вставляем как добавленный
  // 4. Оставщийся в before кладем как удаленные
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);
  const astDiff = afterKeys.reduce((acc, key) => {
  }, []);
  // console.log(beforeKeys, afterKeys);
  return afterKeys;
}

export default getAstDiff;

