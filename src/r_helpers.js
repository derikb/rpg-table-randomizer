'use strict';

/**
 * Is it empty (stolen from Underscore)
 * @param {Object|String|?} obj some type of things
 * @return {Boolean} is it empty?
 */
const isEmpty = function (obj) {
	if (obj === null) {
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
}
/**
 * Is it an Object (stolen from Underscore)
 * @param {Object|String|?} obj some type of things
 * @return {Boolean} is it an object?
 */
const isObject = function(obj) {
	var type = typeof obj;
	return type === 'function' || type === 'object' && !!obj;
};
/**
 * Is a given variable undefined?
 * @param {Object|String|?} obj object to test
 * @return {Boolean} is it undefined
 */
const isUndefined = function(obj) {
	return obj === void 0;
};
/**
 * Capitalize a string
 * @param {String} string a string
 * @return {String} string with first letter capitalized
 */
const capitalize = function (string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
};
/**
 * Flatten array into comma separated, capitalized string
 */
const flatten = function(arr){
	let o = '';
	arr.forEach((v) => {
		o += capitalize(v)+', ';
	});
	o = o.trim();
	o = o.replace(/,$/, '');
	return o;
};
/**
 * Extend one object with anotyher
 */
const extend = function (obj, props) {
	for(let prop in props) {
		if (props.hasOwnProperty(prop)) {
			obj[prop] = props[prop];
		}
	}
};
/**
 * Iterate of Array or Object and apply callback
 * Callback is passed value, key, obj
 */
const iterate = (obj, cb) => {
	if (Array.isArray(obj)) {
		obj.forEach(cb.bind(this));
	} else if (isObject(obj)) {
		let keys = Object.keys(obj);
		for (let k in keys) {
			cb.bind(this, obj[k], k, obj);
		}
	}
};

module.exports = {
	isEmpty: isEmpty,
	isString: isString,
	isObject: isObject,
	capitalize: capitalize,
	flatten: flatten,
	extent: extend,
	iterate: iterate
};
