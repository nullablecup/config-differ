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


const NEW = 'NEW';
export const makeNewValue = (path, value) => ({ type: NEW, path, value });
/**
 * Interpretation as a new value by path
 *
 * @typedef {Object} New
 * @property {NEW} type
 * @property {Path} path
 * @property {Value} value
 */
const newValue = makeNewValue(['version'], '1.2.0');


const MISSING = 'MISSING';
export const makeMissingValue = (path, value) => ({ type: MISSING, path, value });
/**
 * Interpretation as a missing value by path
 *
 * @typedef {Object} Missing
 * @property {MISSING} type
 * @property {Path} path
 * @property {Value} value
 */
const missingValue = makeMissingValue(['userData', 'lastName'], 'Salamander');


const EQUAL = 'EQUAL';
export const makeEqualValue = (path, value) => ({ type: EQUAL, path, value });
/**
 * Interpretation as a equal value by path
 *
 * @typedef {Object} Equal
 * @property {EQUAL} type
 * @property {Path} path
 * @property {Value} value
 */
const equalValue = makeEqualValue(['userData', 'middleName'], 'Morkovich');


const DIFFERENT = 'DIFFERENT';
export const makeDifferentValue = (path, valueA, valueB) => ({ type: DIFFERENT, path, valueA, valueB });
/**
 * Interpretation as a different value by path
 *
 * @typedef {Object} Different
 * @property {DIFFERENT} type
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
