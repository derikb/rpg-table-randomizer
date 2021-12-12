/**
 * Is it empty (stolen from Underscore)
 * @param {Object|String|?} obj some type of things
 * @return {Boolean} is it empty?
 */
const isEmpty = function (obj) {
    if (obj === null || obj === undefined) {
        return true;
    }
    if (Array.isArray(obj) || isString(obj)) {
        return obj.length === 0;
    }
    return Object.keys(obj).length === 0;
};
/**
 * Is it a String (stolen from Underscore)
 * @param {Object|String|?} obj some type of things
 * @return {Boolean} is it an string?
 */
const isString = function (obj) {
    return toString.call(obj) === '[object String]';
};
/**
 * Is it an Object (stolen from Underscore)
 * @param {Object|String|?} obj some type of things
 * @return {Boolean} is it an object?
 */
const isObject = function (obj) {
    const type = typeof obj;
    return (type === 'function' || type === 'object') && !!obj;
};
/**
 * Is a given variable undefined?
 * @param {Object|String|?} obj object to test
 * @return {Boolean} is it undefined
 */
const isUndefined = function (obj) {
    return obj === undefined;
};
/**
 * Capitalize a string
 * @param {String} string a string
 * @return {String} string with first letter capitalized
 */
const capitalize = function (string) {
    return isEmpty(string) ? string : string.charAt(0).toUpperCase() + string.slice(1);
};

export {
    isEmpty,
    isString,
    isObject,
    isUndefined,
    capitalize
};
