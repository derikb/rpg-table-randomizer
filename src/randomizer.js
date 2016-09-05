'use strict';

const r_helpers = require('./r_helpers.js');

/**
 * Randomizer - handles app randomization functions
 * Module exports a single instance of Randomizer...
 * @constructor
 */
const Randomizer = function () {
	/**
	 * Store the token types/processing
	 */
	this.token_types = {};
	/**
	 * Random integer between two numbers (stolen from underscorejs)
	 * @param {Number} min mininum value
	 * @param {Number} max maximum value
	 * @return {Number} random value
	 */
	this.random = function (min, max) {
		if (max == null) {
			max = min;
			min = 0;
		}
		return min + Math.floor(Math.random() * (max - min + 1));
	};
	/**
	 * Sum an array
	 * @param {Array} arr an array of numbers
	 * @returns {Number} Total value of numbers in array
	 */
	function arraySum (arr) {
		let total = 0;
		for (let i = 0; i < arr.length; i++) {
			const v = parseFloat(arr[i]);
			if (!isNaN(v)) {
				total += v;
			}
		}
		return total;
	};
	/**
	 * Random value selection
	 * @param {Array} values an array of strings from which to choose
	 * @param {Array} weights a matching array of integers to weight the values (i.e. values and weights are in the same order)
	 * @returns {String} the randomly selected Array element from values param
	 */
	this.getWeightedRandom = function (values, weights) {
		let n = 0;
		const num = this.random(1, arraySum.call(this, weights));
		for (var i = 0; i < values.length; i++) {
			n = n + weights[i];
			if (n >= num) {
				break;
			}
		}
		return values[i];
	};
	/**
	 * Random value selection, wrapper for getWeightedRandom that processes the data into values/weights arrays
	 * @param {Object|Array} data An object or array of data
	 * @returns {String} the randomly selected Object property name, Array element, or value of the "label" property
	 */
	this.rollRandom = function (data) {
		const values = [];
		const weights = [];
			
		if (Array.isArray(data)) {
			data.forEach((v, k, l) => {
				if (typeof v === 'object') {
					if (typeof v.weight !== 'undefined') {
						weights.push(v.weight);
					} else {
						weights.push(1);
					}
					values.push(v.label);
				} else if (typeof v === 'string') {
					// nothing
					weights.push(1);
					values.push(v);
				}
			});
		} else if (typeof data === 'object' && data !== null) {
			const props = Object.keys(data);
			props.forEach((k) => {
				const v = data[k];
				if (typeof v.weight !== 'undefined') {
					weights.push(v.weight);
				} else {
					weights.push(1);
				}
				values.push(k);
			});
		}
		return this.getWeightedRandom(values, weights);
	};
	/**
	 * Dice rolling simulator
	 * @param {Number} [die=6] Die type
	 * @param {Number} [number=1] Number of times to roll the die
	 * @param {Number} [modifier=0] Numeric modifier to dice total
	 * @param {String} [mod_op=+] Operator for the modifier (+,-,/,*)
	 * @returns {Number} Number rolled (die*number [mod_op][modifier])
	 */
	function parseDiceNotation (die, number, modifier, mod_op) {
		modifier = (typeof modifier === 'undefined') ? 0 : parseInt(modifier, 10);
		die = (typeof die === 'undefined') ? 6 : parseInt(die, 10);
		mod_op = (typeof mod_op === 'undefined') ? '+' : mod_op;

		if (typeof number === 'undefined' || number === 0) {
			number = 1;
		} else {
			number = parseInt(number, 10);
		}
		
		let sum = 0;
		for (let i = 1; i <= number; i++) {
			sum = sum + this.random(1, die);
		}
		if (modifier === 0) {
			return sum;
		}
		
		switch (mod_op) {
			case '*':
				sum = sum * modifier;
				break;
			case '-':
				sum = sum - modifier;
				break;
			case '/':
				sum = sum / modifier;
				break;
			case '+':
			default:
				sum = sum + modifier;
				break;
		}
		return Math.round(sum);
	};
	/**
	 * Generate a result from a RandomTable object
	 * @param {Object} rtable the RandomTable
	 * @param {String} [start=''] subtable to roll on
	 * @return {Array} array of object results { table: table that was rolled on, result: result string, desc: optional description string }
	 */
	this.getTableResult = function (rtable, start) {
		if (!r_helpers.isObject(rtable)) {
			return [{ table: 'Error', result: 'No table found to roll on.', desc: '' }];
		}
		let result = [];
		if (typeof start === 'undefined') {
			start = '';
		}
		// we look in the start table for what to roll if the start wasn't explicitly set in the call
		let sequence = (start === '') ? rtable.sequence : start;
		
		if (sequence === 'rollall') {
			// roll all the tables in order
			sequence = Object.keys(rtable.tables);
		}
		
		if (sequence === '') {
			// if no start attribute
			// try for "default" table
			if (typeof rtable.tables['default'] !== 'undefined') {
				result = this.selectFromTable(rtable, 'default');
			} else {
				// select first item from tables
				const tables = Object.keys(rtable.tables);
				result = this.selectFromTable(rtable, tables[0]);
			}
		} else if (typeof sequence === 'string') {
			result = this.selectFromTable(rtable, sequence);
		} else {
			sequence.forEach((seq) => {
				let r = '';
				if (r_helpers.isString(seq)) {
					r = this.selectFromTable(rtable, seq);
					result = result.concat(r);
					return;
				}
				// its an object
				const table = (seq.table) ? seq.table : '';
				if (table === '') {
					return;
				}
				const times = (typeof seq.times === 'number') ? seq.times : 1;
				for (let i = 1; i <= times; i++) {
					r = this.selectFromTable(table);
					result = result.concat(r);
				}
			});
		}
		
		rtable.result = result;
		return result;
	};
	/**
	 * Get a result from a table/subtable in a RandomTable object
	 * DANGER: you could theoretically put yourself in an endless loop if the data were poorly planned
	 * ...but at worst that would just crash the users browser since there's no server processing involved... (???)
	 * @todo we'll have to fix for this with a node version
	 * @param {Object} rtable the RandomTable object
	 * @param {String} table table to roll on
	 * @returns {Array} array of object results { table: table that was rolled on, result: result string, desc: optional description string }
	 */
	this.selectFromTable = function (rtable, table) {
		if (!r_helpers.isObject(rtable)) {
			return [{ table: 'Error', result: 'No table found to roll on.', desc: '' }];
		}
		if (typeof table === 'undefined') {
			return [{ table: 'Error', result: 'No table found to roll on.', desc: '' }];
		}
		// console.log(table);
		let o = []; // output for sequence of rolls/selections
		const t = rtable.tables[table]; // the table/subtable
		const result = this.rollRandom(t); // the random string from the table (either the object property, a string value from an array, or the value property from a selected object)
		let r = ''; // the string result from the table
		let result_print = true; // are we going to show this result
		
		if (r_helpers.isUndefined(t[result])) {
			// table is an array
			// r = _.findWhere(t, { label: result });
			r = t.find((v) => {
				return v.label === result;
			});
			if (r_helpers.isUndefined(r)) {
				// it's just an array of strings so we can stop here
				o.push({ table: table, result: result, desc: '' });
				return o;
			}
			result_print = (typeof r['print'] === 'undefined') ? true : r['print'];
		} else {
			r = t[result];
			result_print = (typeof t[result]['print'] === 'undefined') ? true : t[result]['print'];
		}
		// r is now the result object
		
		// if print==false we suppress the output from this table (good for top-level tables)
		if (result_print === true) {
			// add the description if there is one
			const desc = (r_helpers.isString(r['description'])) ? r['description'] : '';
			// replace any tokens
			const t_result = this.findToken(result, rtable.key);
			o.push({ table: table, result: t_result, desc: desc });
		}
		
		// are there subtables to roll on?
		const subtable = r.subtable;
		let r2 = ''; // subtable results
		if (typeof subtable === 'undefined') {
			// no subtables
			return o;
		} else if (r_helpers.isString(subtable)) {
			// subtables is a string reference to a table so we run this function again
			r2 = this.selectFromTable(rtable, subtable);
			o = o.concat(r2);
		} else if (Array.isArray(subtable)) {
			// subtables is an array, assume reference to other tables, roll on each in turn
			subtable.forEach((v) => {
				r2 = this.selectFromTable(rtable, v);
				o = o.concat(r2);
			});
		} else if (r_helpers.isObject(subtable)) {
			// subtable is object assume embedded table(s)
			// loop over keys
			const k = Object.keys(subtable);
			k.forEach((kx) => {
				let result = this.rollRandom(subtable[kx]);
				let desc = '';
				if (r_helpers.isUndefined(subtable[kx][result])) {
					// r2 = _.findWhere(subtable[kx], { label: result });
					r2 = subtable[kx].find((v) => {
						return v.label === result;
					});
					if (r_helpers.isObject(r2)) {
						desc = (r_helpers.isString(r2.description)) ? r2.description : '';
					}
				} else {
					desc = (r_helpers.isString(subtable[kx][result]['description'])) ? subtable[kx][result]['description'] : '';
				}
				result = this.findToken(result, rtable.key);
				
				o.push({ table: kx, result: result, desc: desc });
			});
		}
		
		return o;
	};
	/**
	 * Perform token replacement.  Only table and roll actions are accepted
	 * @param {String} token A value passed from findToken containing a token(s) {{SOME OPERATION}} Tokens are {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{roll:1d6+2}} (etc) (i.e. {{table:colonial_occupations:laborer}} {{table:color}} also generate names with {{name:flemish}} (surname only) {{name:flemish:male}} {{name:dutch:female}}
	 * @returns {String} The value with the token(s) replaced by the operation or else just the token (in case it was a mistake or at least to make the error clearer)
	 */
	function convertToken (token, curtable) {
		const parts = token.replace('{{', '').replace('}}', '').split(':');
		if (parts.length === 0) { return token; }
		
		// look for a token type we can run
		if (this.token_types[parts[0]]) {
			return this.token_types[parts[0]](parts, token, curtable);
		} else {
			return token;
		}
	};
	/**
	 * Look for tokens to perform replace action in convertToken
	 * @param {String} string usually a result from a RandomTable
	 * @param {String} curtable key of the RandomTable the string is from (needed for "this" tokens)
	 * @returns {String} String with tokens replaced (if applicable)
	 */
	this.findToken = function (string, curtable) {
		if (typeof curtable === 'undefined') { curtable = ''; }
		const regexp = new RegExp('({{2}.+?}{2})', 'g');
		const newstring = string.replace(regexp, (token) => {
			return convertToken.call(this, token, curtable);
		});
		return newstring;
	};
	/**
	 * takes a string like '3d6+2', 'd6', '2d6', parses it, and puts it through roll
	 * @params {String} string a die roll notation
	 * @returns {Number} the result of the roll
	 */
	this.roll = function (string) {
		string = (typeof string === 'undefined') ? '' : string.trim();
		const m = string.match(/^([0-9]*)d([0-9]+)(?:([\+\-\*\/])([0-9]+))*$/);
		if (m) {
			if (typeof m[4] === 'undefined') { m[4] = 0; }
			if (m[1] !== '') {
				return parseDiceNotation.call(this, parseInt(m[2], 10), parseInt(m[1], 10), parseInt(m[4], 10), m[3]);
			} else {
				return parseDiceNotation.call(this, parseInt(m[2], 10), '1', parseInt(m[4], 10), m[3]);
			}
		}
		return '';
	};
	/**
	 * Since tables are stored outside of this module, this function allows for the setting of a function which will be used to lookup a table by it's key
	 * @param {Function} lookup a function that takes a table key and returns the table data object
	 * @return {null} nothing
	 */
	this.setTableKeyLookup = function (lookup) {
		this.getTableByKey = lookup;
	};
	/**
	 * Placeholder that should be replaced by a function outside this module
	 * @param {String} key human readable table identifier
	 * @return {null} nothing, when replaced this function should return a table object
	 */
	this.getTableByKey = function (key) {
		return null;
	};
	/**
	 * Add a token variable
	 * @param {String} name Name of the token (used as first element
	 * @param {Function} process Function to return token replacement value function is passed the token_parts (token split by ":"),  original full_token, current table name
	 */
	this.registerTokenType = function (name, process) {
		this.token_types[name] = process;
	};
	/**
	 * Dice roll token.
	 */
	this.registerTokenType('roll', (token_parts, full_token, curtable) => {
		return this.roll(token_parts[1]);
	});
	/**
	 * Table token lookup in the form:
	 * {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{table:SOMETABLE:SUBTABLE*2}} (roll subtable 2 times)
	 */
	this.registerTokenType('table', (token_parts, full_token, curtable) => {
		let string = '';
		// console.log(token_parts);
		if (typeof token_parts[1] === 'undefined') {
			return full_token;
		}
		let multiplier = 1;
		if (token_parts[1].indexOf('*') !== -1) {
			const x = token_parts[1].split('*');
			token_parts[1] = x[0];
			multiplier = x[1];
		}
		
		// what table do we roll on
		let t = null;
		if (token_parts[1] === 'this') {
			// reroll on same table
			// console.log('this..'+curtable);
			t = this.getTableByKey(curtable);
			// console.log(t);
		} else {
			t = this.getTableByKey(token_parts[1]);
			// console.log(t);
		}
		if (t === null || typeof t !== 'object') {
			return full_token;
		}
		if (typeof token_parts[2] !== 'undefined' && token_parts[2].indexOf('*') !== -1) {
			const x = token_parts[2].split('*');
			token_parts[2] = x[0];
			multiplier = x[1];
		}
		const subtable = (typeof token_parts[2] === 'undefined') ? '' : token_parts[2];

		for (var i = 1; i <= multiplier; i++) {
			this.getTableResult(t, subtable);
			string += t.niceString(true) + ', ';
		}
		string = string.trim();
		string = string.replace(/,$/, '');
		return string;
	});
};

module.exports = new Randomizer();
