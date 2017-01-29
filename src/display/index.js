import pretty from './pretty';
import plain from './plain';

const converters = { pretty, plain };

const display = (astDiff, format) => {
  const converter = converters[format];
  if (!converter) {
    throw new Error(`The display format "${format}" isn't supported.`);
  }
  return converter(astDiff);
};

export default display;
