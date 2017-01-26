import path from 'path';

const getFileExtname = filePath => path.extname(filePath).replace(/\./g, '');

export { getFileExtname }; // eslint-disable-line
