import compare from '../src';

test('test display pretty', () => {
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

test('test display plain text', () => {
  const pathToBeforeJson = '__tests__/__fixtures__/before.json';
  const pathToAfterJson = '__tests__/__fixtures__/after.json';

  const result = [
    'Property "common.setting2" was removed',
    'Property "common.setting6" was removed',
    'Property "common.setting4" was added with value: blah blah',
    'Property "common.setting5" was added with complex value',
    'Property "group1.baz" was updated. From "bas" to "bars"',
    'Property "group2" was removed',
    'Property "group3" was added with complex value',
  ].join('\n');
  expect(compare(pathToBeforeJson, pathToAfterJson, 'plain')).toBe(result);
});
