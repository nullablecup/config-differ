import pretty from './pretty';
import plain from './plain';
import json from './json';

const converters = { pretty, plain, json };

const display = (astDiff, format) => {
  const converter = converters[format];
  if (!converter) {
    throw new Error(`The display format "${format}" isn't supported.`);
  }
  return converter(astDiff);
};

export default display;
