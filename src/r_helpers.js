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
 * Is it an Object (stolen from Underscore).
 * Note: This will return True for an Array also.
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
/**
 * Default toJSON for classes.
 * Bind this to the class instance when calling.
 * @returns {Object}
 */
const defaultToJSON = function () {
    // @todo Should we save the objects class name as a property
    // so we can recreate the right structure later?
    const returnObj = {};
    for (const property in this) {
        const value = this[property];
        if (value instanceof Map) {
            if (value.size === 0) {
                continue;
            }
            // Note: This will be problematic if Map has keys that are not
            // permitted as object properties.
            returnObj[property] = Object.fromEntries(value.entries());
            continue;
        }
        if (isEmpty(value)) {
            continue;
        }
        returnObj[property] = value;
    }
    return returnObj;
};

export {
    isEmpty,
    isString,
    isObject,
    isUndefined,
    capitalize,
    defaultToJSON
};
