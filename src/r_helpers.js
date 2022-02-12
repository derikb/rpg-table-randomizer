/**
 * Is it empty (stolen from Underscore)
 * NOTE: this doesn't handle numbers well...
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
    if (obj instanceof Set || obj instanceof Map) {
        return obj.size === 0;
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
    if (Array.isArray(obj) ||
        obj instanceof Set ||
        obj instanceof Map) {
        return false;
    }
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
 * Convert a value for serialization.
 * @param {Any} value
 * @returns {Any} Though not Map or any class/object with a toJSON method.
 */
const serializeValue = function (value) {
    if (value === null ||
        typeof value === 'undefined' ||
        typeof value === 'function') {
        return;
    }
    if (isString(value)) {
        return value;
    }
    if (typeof value === 'number') {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map((el) => serializeValue(el));
    }
    if (typeof value.toJSON === 'function') {
        return value.toJSON();
    }
    // Convert Maps to plain objects
    if (value instanceof Map) {
        const obj = {};
        value.forEach(function (val, key) {
            obj[key] = serializeValue(val);
        });
        return obj;
    }
    // Convert Set to Array
    if (value instanceof Set) {
        return Array.from(value).map((el) => serializeValue(el));
    }
    // a plain Object would just return itself, no matter its property values
    // not sure if I use any in the classes that it is a concern
    return value;
};
/**
 * Default toJSON for classes.
 * Bind this to the class instance when calling.
 * @returns {Object}
 */
const defaultToJSON = function () {
    // We save the objects class name as a property
    // so we can recreate the right structure later
    // but it is done in each class as I can't find a good way
    // to consistently get the class name.
    const returnObj = {};
    for (const property in this) {
        const value = this[property];

        const value2 = serializeValue(value);
        if (typeof value2 === 'undefined') {
            continue;
        }
        returnObj[property] = value2;
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
