import path from 'path';

const typeOf = obj =>
  Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

const getFileExtname = filePath => path.extname(filePath).replace(/\./g, '');

export { getFileExtname, typeOf }; // eslint-disable-line
