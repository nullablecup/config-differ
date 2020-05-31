import { isEqualValue, isNewValue, isMissingValue, isDifferentValue } from './data-definition';

const INDENT = ' ';
const CARRIAGE_RETURN = '\n';
const EMPTY_SPACE_FOR_STATUS = '  ';
const EQUAL_STATUS = '  ';
const MISSING_STATUS = '- ';
const NEW_STATUS = '+ ';

const BEGIN = `{${CARRIAGE_RETURN}`;
const END = '}';

const printStatus = (keyValueDiff, value = 'a') => {
  if (isEqualValue(keyValueDiff)) return EQUAL_STATUS;
  if (isNewValue(keyValueDiff)) return NEW_STATUS;
  if (isMissingValue(keyValueDiff)) return MISSING_STATUS;
  if (isDifferentValue(keyValueDiff) && value === 'a') return MISSING_STATUS;
  if (isDifferentValue(keyValueDiff) && value === 'b') return NEW_STATUS;
  return EMPTY_SPACE_FOR_STATUS;
};

const printIndent = (amountIdentaty) => {
  const i = (4 * (amountIdentaty - 1)) + 2;

  return INDENT.repeat(i);
};

const keyStart = (keyName, status, amountIdentaty = 1) => {
  const identaties = printIndent(amountIdentaty);
  return `${identaties}${status}${keyName}: {${CARRIAGE_RETURN}`;
};

const keyMiddle = (keyName, value, status, amountIdentaty = 1) => {
  const identaties = printIndent(amountIdentaty);
  return `${identaties}${status}${keyName}: ${value}${CARRIAGE_RETURN}`;
};

const keyEnd = (amountIdentaty = 1) => {
  const identaties = printIndent(amountIdentaty);
  return `${identaties}${EMPTY_SPACE_FOR_STATUS}}${CARRIAGE_RETURN}`;
};

export default (mode, list) => {
  if (mode === 'text') {
    console.log('list', list);
    const str1 = BEGIN;
    const str2 = keyStart('common', EQUAL_STATUS, 1);
    const str3 = keyMiddle('setting1', 'Value 1', printStatus(list[0]), 2);
    const str4 = keyMiddle('setting2', 200, printStatus(list[1]), 2);
    const str5 = keyMiddle('setting3', true, printStatus(list[2]), 2);
    const str6 = keyEnd(1);
    const str7 = END;
    return str1 + str2 + str3 + str4 + str5 + str6 + str7;
  }
  return {};
};
