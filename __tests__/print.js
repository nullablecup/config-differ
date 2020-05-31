import print from '../src/print';
import {
  makeNewValue, makeMissingValue, makeEqualValue, makeDifferentValue,
} from '../src/data-definition';

test('test display pretty', () => {
  const listOfKeyValueDiff = [
    makeEqualValue(['common', 'setting1'], 'Value 1'),
    makeMissingValue(['common', 'setting2'], 200),
    makeEqualValue(['common', 'setting3'], true),
    makeMissingValue(['common', 'setting6', 'key'], 'value'),
    makeNewValue(['common', 'setting4'], 'blah blah'),
    makeNewValue(['common', 'setting5', 'key5'], 'value5'),
    makeEqualValue(['group1', 'foo'], 'bar'),
    makeDifferentValue(['group1', 'baz'], 'bas', 'bars'),
    makeMissingValue(['group2', 'abc'], 12345),
    makeNewValue(['group3', 'fee'], 100500),
  ];
  const result = (
    ''
      + '{\n'
      + '    common: {\n'
      + '        setting1: Value 1\n'
      + '      - setting2: 200\n'
      + '        setting3: true\n'
      + '      - setting6: {\n'
      + '            key: value\n'
      + '        }\n'
      + '      + setting4: blah blah\n'
      + '      + setting5: {\n'
      + '            key5: value5\n'
      + '        }\n'
      + '    }\n'
      + '    group1: {\n'
      + '        foo: bar\n'
      + '      + baz: bars\n'
      + '      - baz: bas\n'
      + '    }\n'
      + '  - group2: {\n'
      + '        abc: 12345\n'
      + '    }\n'
      + '  + group3: {\n'
      + '        fee: 100500\n'
      + '    }\n'
      + '}'
  );
  expect(print('text', listOfKeyValueDiff)).toBe(result);
});
