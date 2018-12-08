// @flow
import fs from 'fs';
import { getFileExtname } from './utils';
import parse from './parse';
import diff from './diff';
import display from './display';

// input json, yaml, ini
// transform to object
// difference return ast
// output in the desired format plain text, pretty, json
// парсинг аргументов, чтение файлов, парсинг файлов, нахождение различий, печать на экран

export default (pathToFileBefore, pathToFileAfter, formatDisplay = 'pretty') => {
  try {
    const firstRawText = fs.readFileSync(pathToFileBefore, 'utf-8');
    const secondRawText = fs.readFileSync(pathToFileAfter, 'utf-8');

    const formatFile = getFileExtname(pathToFileBefore);

    const astDiff = diff(parse(formatFile, firstRawText), parse(formatFile, secondRawText));

    return display(astDiff, formatDisplay);
  } catch (e) {
    console.error(`\nError\n${e.message}\n`);
  }
};
