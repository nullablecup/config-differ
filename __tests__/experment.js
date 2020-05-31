import { createTree } from '../src/print';
import {
  makeNewValue, makeMissingValue, makeEqualValue, makeDifferentValue,
} from '../src/data-definition';


test('test createTree', () => {
  const listOfKeyValueDiff = [
    makeEqualValue(['common', 'setting1'], 'Value 1'),
    makeMissingValue(['common', 'setting2'], 200),
    makeEqualValue(['common', 'setting3'], true),
  ];
  // makeMissingValue(['common', 'setting6', 'key'], 'value'),
  // makeNewValue(['common', 'setting4'], 'blah blah'),
  // makeNewValue(['common', 'setting5', 'key5'], 'value5'),
  // makeEqualValue(['group1', 'foo'], 'bar'),
  // makeDifferentValue(['group1', 'baz'], 'bas', 'bars'),
  // makeMissingValue(['group2', 'abc'], 12345),
  // makeNewValue(['group3', 'fee'], 100500),

  const expected = {
    common: {
      setting1: makeEqualValue(['common', 'setting1'], 'Value 1'),
      setting2: makeMissingValue(['common', 'setting2'], 200),
      setting3: makeEqualValue(['common', 'setting3'], true),
    },
  };

  expect(createTree(listOfKeyValueDiff)).toEqual(expected);
});
