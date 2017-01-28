import path from 'path';

const typeOf = obj =>
  Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

const isObject = obj =>
  typeOf(obj) === 'object';

const getFileExtname = filePath => path.extname(filePath).replace(/\./g, '');

export { getFileExtname, typeOf, isObject };
