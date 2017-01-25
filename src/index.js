// @flow

// input json, yaml, ini
// transform to object
// difference return ast
// output in the desired format plain text, pretty, json

const diff = (before: object, after: object): object => {
  // return AST
  // Как сравнить 2 объекта
  // 1. Взять первый ключ из after и посмотреть есть ли он в before
  // 2. Если есть проверить значение
  //    - если одинакого кладем в дерево как не изменивщийся
  //    - если разное кладем как изменивщийся
  // 3. Если нет вставляем как добавленный
  // 4. Оставщийся в before кладем как удаленные
  // Формат для объектов
  // 1. notChanged
  // 2. changed
  // 3. added
  // 4. deleted
  // Общий вид
  // status: '',
  // oldValue: '',
  // newValue: '',
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);

  console.log(beforeKeys, afterKeys);
  return afterKeys;
}

export default diff;

