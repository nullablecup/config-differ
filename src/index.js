// @flow
import fs from 'fs';
import path from 'path';
import parse from './parse';
import diff from './diff';

// input json, yaml, ini
// transform to object
// difference return ast
// output in the desired format plain text, pretty, json
// парсинг аргументов, чтение файлов, парсинг файлов, нахождение различий, печать на экран

export const getContent = (filePath) => {
  const type = path.extname(filePath).replace(/\./g, '');
  const content = fs.readFileSync(filePath, 'utf-8');
  return parse(type, content);
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

const display = (astDiff, format) => {
  switch (format) {
    case 'plainText':
    default:
      return astToPlainText(astDiff);
  }
};

const compare = (pathToFileBefore, pathToFileAfter, formatDisplay = 'plainText') => { // eslint-disable-line
  try {
    const before = getContent(pathToFileBefore);
    const after = getContent(pathToFileAfter);

    const astDiff = diff(before, after);
    return display(astDiff, formatDisplay);
  } catch (e) {
    console.error(`\nError\n${e.message}\n`);
  }
};

export default compare;
