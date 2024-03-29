/**
 * Is it empty (stolen from Underscore)
 * NOTE: this doesn't handle numbers well...
 * @param {Object|String|?} obj some type of things
 * @return {Boolean} is it empty?
 */
export function isEmpty(obj: any | string | unknown): boolean;
/**
 * Is it a String (stolen from Underscore)
 * @param {Object|String|?} obj some type of things
 * @return {Boolean} is it an string?
 */
export function isString(obj: any | string | unknown): boolean;
/**
 * Is it an Object (stolen from Underscore).
 * Note: This will return True for an Array also.
 * @param {Object|String|?} obj some type of things
 * @return {Boolean} is it an object?
 */
export function isObject(obj: any | string | unknown): boolean;
/**
 * Is a given variable undefined?
 * @param {Object|String|?} obj object to test
 * @return {Boolean} is it undefined
 */
export function isUndefined(obj: any | string | unknown): boolean;
/**
 * Capitalize a string
 * @param {String} string a string
 * @return {String} string with first letter capitalized
 */
export function capitalize(string: string): string;
/**
 * Default toJSON for classes.
 * Bind this to the class instance when calling.
 * @returns {Object}
 */
export function defaultToJSON(): any;
