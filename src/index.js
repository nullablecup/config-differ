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

const compare = (pathToFileBefore, pathToFileAfter, formatDisplay = 'plainText') => { // eslint-disable-line
  try {
    const firstFileConfig = fs.readFileSync(pathToFileBefore, 'utf-8');
    const secondFileConfig = fs.readFileSync(pathToFileAfter, 'utf-8');

    const typeFile = getFileExtname(pathToFileBefore);

    const astDiff = diff(parse(typeFile, firstFileConfig), parse(typeFile, secondFileConfig));

    return display(astDiff, formatDisplay);
  } catch (e) {
    console.error(`\nError\n${e.message}\n`);
  }
};

export default compare;
