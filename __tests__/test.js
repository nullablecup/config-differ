import compare from '../src';

test('test display plain text', () => {
  const pathToBeforeJson = '__tests__/__fixtures__/before.json';
  const pathToAfterJson = '__tests__/__fixtures__/after.json';
  const result = (
    '{\n' +
    '    host: hexlet.io\n' +
    '  + timeout: 20\n' +
    '  - timeout: 50\n' +
    '  - proxy: 123.234.53.22\n' +
    '  + verbose: true\n' +
    '}'
  );
  expect(compare(pathToBeforeJson, pathToAfterJson)).toBe(result);
});
