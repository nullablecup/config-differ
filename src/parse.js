import YAML from 'js-yaml';

export default (type, content) => {
  const parserList = {
    json: JSON.parse,
    yml: YAML.safeLoad,
  };

  return parserList[type](content);
};
