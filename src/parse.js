import YAML from 'js-yaml';
import ini from 'ini';

export default (type, content) => {
  const parserList = {
    json: JSON.parse,
    yml: YAML.safeLoad,
    ini: ini.parse,
  };

  return parserList[type](content);
};
