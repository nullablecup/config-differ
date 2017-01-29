import { isArray } from 'lodash';

const astToJSON = (astDiff) => {
  const iter = ast =>
    ast.reduce((acc, { type, key, value }) => {
      if (type === 'deleted') {
        return acc;
      }
      if (isArray(value)) {
        return { ...acc, [key]: iter(value) };
      }
      return { ...acc, [key]: value };
    }, {});

  return JSON.stringify(iter(astDiff));
};

export default astToJSON;
