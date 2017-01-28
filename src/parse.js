import YAML from 'js-yaml';
import ini from 'ini';

const parserList = {
  json: JSON.parse,
  yml: YAML.safeLoad,
  ini: ini.parse,
};

export default (format, content) => {
  const parser = parserList[format];
  if (!parser) {
    throw new Error(`Format "${format}" isn't supported.`);
  }
  return parser(content);
};
