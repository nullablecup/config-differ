const astToPlainText = (astDiff) => {
  const mask = {
    notChanged: (key, value) => `    ${key}: ${value}\n`,
    changed: (key, value, oldValue) => `  + ${key}: ${value}\n  - ${key}: ${oldValue}\n`,
    deleted: (key, value) => `  - ${key}: ${value}\n`,
    added: (key, value) => `  + ${key}: ${value}\n`,
  };

  const plainTextMiddle = astDiff.reduce((acc, diffState) => {
    const { state, key, value, oldValue } = diffState;

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

export default display;
