import compare from '../src';

test('test display plain text', () => {
  const pathToBeforeJson = '__tests__/__fixtures__/before.json';
  const pathToAfterJson = '__tests__/__fixtures__/after.json';
  const result = (
    '{\n' +
    '    common: {\n' +
    '        setting1: Value 1\n' +
    '      - setting2: 200\n' +
    '        setting3: true\n' +
    '      - setting6: {\n' +
    '            key: value\n' +
    '        }\n' +
    '      + setting4: blah blah\n' +
    '      + setting5: {\n' +
    '            key5: value5\n' +
    '        }\n' +
    '    }\n' +
    '    group1: {\n' +
    '      + baz: bars\n' +
    '      - baz: bas\n' +
    '        foo: bar\n' +
    '    }\n' +
    '  - group2: {\n' +
    '        abc: 12345\n' +
    '    }\n' +
    '  + group3: {\n' +
    '        fee: 100500\n' +
    '    }\n' +
    '}'
  );
  expect(compare(pathToBeforeJson, pathToAfterJson)).toBe(result);
});
