/**
 * Interpretation as value of configs
 *
 * @typedef {(Boolean|Number|String)} Value
 */

/**
 * Interpretation as path of configs
 * Format depth is indicated through dots
 * Example:
 * - "common.setting.version"
 * - "name"
 *
 * @typedef {String} Path
 */


const NEW = 'NEW';
/**
 * Interpretation as a new value by path
 *
 * @typedef {Object} New
 * @property {NEW} type
 * @property {Path} path
 * @property {Value} value
 */
const newValue = { type: NEW, path: 'nickname', value: 'octopus' };


const MISSING = 'MISSING';
/**
 * Interpretation as a missing value by path
 *
 * @typedef {Object} Missing
 * @property {MISSING} type
 * @property {Path} path
 * @property {Value} value
 */
const missingValue = { type: MISSING, path: 'lastName', value: 'Salamander' };


const EQUAL = 'EQUAL';
/**
 * Interpretation as a equal value by path
 *
 * @typedef {Object} Equal
 * @property {EQUAL} type
 * @property {Path} path
 * @property {Value} value
 */
const equalValue = { type: EQUAL, path: 'middleName', value: 'Morkovich' };


const DIFFERENT = 'DIFFERENT';
/**
 * Interpretation as a different value by path
 *
 * @typedef {Object} Different
 * @property {DIFFERENT} type
 * @property {Path} path
 * @property {Value} valueA
 * @property {Value} valueB
 */
const differentValue = { type: DIFFERENT, path: 'firstName', valueA: 'Mike', valueB: 'John' };

/**
 * Interpretation as a unit of difference key value between configs
 *
 * @typedef {(New|Missing|Equal|Different)} DiffUnit
 */

// [List-of DiffUnit]
const simpleDiffConfig = [newValue, missingValue, equalValue, differentValue];
