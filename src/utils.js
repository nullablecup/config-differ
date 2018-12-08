import path from 'path';

export const getFileExtname = filePath => path.extname(filePath).replace(/\./g, '');
