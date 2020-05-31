/**
 * Interpretation as value of configs
 *
 * @typedef {(Boolean|Number|String)} Value
 */

/**
 * Interpretation as path of configs
 * Format depth is indicated through dots
 * Example:
 * - ["common", "setting", "version"]
 * - ["name"]
 *
 * @typedef {[String]} Path
 */


const NEW_VALUE = 'NEW_VALUE';
export const makeNewValue = (path, value) => ({ type: NEW_VALUE, path, value });
/**
 * Interpretation as a new value by path
 *
 * @typedef {Object} New
 * @property {NEW_VALUE} type
 * @property {Path} path
 * @property {Value} value
 */
const newValue = makeNewValue(['version'], '1.2.0');


const MISSING_VALUE = 'MISSING_VALUE';
export const makeMissingValue = (path, value) => ({ type: MISSING_VALUE, path, value });
/**
 * Interpretation as a missing value by path
 *
 * @typedef {Object} Missing
 * @property {MISSING_VALUE} type
 * @property {Path} path
 * @property {Value} value
 */
const missingValue = makeMissingValue(['userData', 'lastName'], 'Salamander');


const EQUAL_VALUE = 'EQUAL_VALUE';
export const makeEqualValue = (path, value) => ({ type: EQUAL_VALUE, path, value });
/**
 * Interpretation as a equal value by path
 *
 * @typedef {Object} Equal
 * @property {EQUAL_VALUE} type
 * @property {Path} path
 * @property {Value} value
 */
const equalValue = makeEqualValue(['userData', 'middleName'], 'Morkovich');


const DIFFERENT_VALUE = 'DIFFERENT_VALUE';
export const makeDifferentValue = (path, valueA, valueB) => ({ type: DIFFERENT_VALUE, path, valueA, valueB });
/**
 * Interpretation as a different value by path
 *
 * @typedef {Object} Different
 * @property {DIFFERENT_VALUE} type
 * @property {Path} path
 * @property {Value} valueA
 * @property {Value} valueB
 */
const differentValue = makeDifferentValue(['userData', 'firstName'], 'Mike', 'John');

/**
 * Interpretation as a unit of difference key value between configs
 *
 * @typedef {(New|Missing|Equal|Different)} KeyValueDiff
 */

// [List-of KeyValueDiff]
const simpleDiffConfig = [newValue, missingValue, equalValue, differentValue];

export const isNewValue = keyValueDiff => keyValueDiff.type === NEW_VALUE;
export const isEqualValue = keyValueDiff => keyValueDiff.type === EQUAL_VALUE;
export const isMissingValue = keyValueDiff => keyValueDiff.type === MISSING_VALUE;
export const isDifferentValue = keyValueDiff => keyValueDiff.type === DIFFERENT_VALUE;
