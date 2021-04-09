import { isEmpty, isString, isObject, isUndefined } from './r_helpers.js';
import RandomTable from './random_table.js';


/**
 * Define the regex to find tokens
 * This looks for anything between double brackets.
 * Note: this is duplicated in RandomTable.findDependencies() so if updated, update it there too
 */
const tokenRegExp = new RegExp('({{2}.+?}{2})', 'g');
/**
 * Sum an array
 * @param {Array} arr an array of numbers
 * @returns {Number} Total value of numbers in array
 */
const arraySum = function(arr) {
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
 * Random integer between two numbers (stolen from underscorejs)
 * @param {Number} min mininum value
 * @param {Number} max maximum value
 * @return {Number} random value
 */
const random = function(min = 0, max = null) {
	if (max == null) {
		max = min;
		min = 0;
	}
	return min + Math.floor(Math.random() * (max - min + 1));
};

/**
 * Dice rolling simulator
 * @param {Number} [die=6] Die type
 * @param {Number} [number=1] Number of times to roll the die
 * @param {Number} [modifier=0] Numeric modifier to dice total
 * @param {String} [mod_op=+] Operator for the modifier (+,-,/,*)
 * @returns {Number} Number rolled (die*number [mod_op][modifier])
 */
const parseDiceNotation = function(die = 6, number = 1, modifier = 0, mod_op = '+') {
	modifier = parseInt(modifier, 10);
	die = parseInt(die, 10);

	if (number <= 0) {
		number = 1;
	} else {
		number = parseInt(number, 10);
	}

	let sum = 0;
	for (let i = 1; i <= number; i++) {
		sum = sum + random(1, die);
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
 * Randomizer - handles app randomization functions
 * Module exports a single instance of Randomizer...
 * @constructor
 */
class Randomizer {

	constructor({
		token_types = {}
	}) {
		this.token_types = {
			'roll': this.defaultRollToken.bind(this),
			'table': this.defaultTableToken.bind(this)
		};
		Object.keys(token_types).forEach((token) => {
			this.token_types[token] = token_types[token];
		});
	}
	/**
	 * Random value selection
	 * @param {Array} values an array of strings from which to choose
	 * @param {Array} weights a matching array of integers to weight the values (i.e. values and weights are in the same order)
	 * @returns {String} the randomly selected Array element from values param
	 */
	getWeightedRandom(values, weights) {
		let n = 0;
		const num = random(1, arraySum.call(this, weights));
		for (var i = 0; i < values.length; i++) {
			n = n + weights[i];
			if (n >= num) {
				break;
			}
		}
		return values[i];
	}
	/**
	 * Random value selection, wrapper for getWeightedRandom that processes the data into values/weights arrays
	 * @param {Object|Array} data An object or array of data
	 * @returns {String} the randomly selected Object property name, Array element, or value of the "label" property
	 */
	rollRandom(data) {
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
		} else if (isObject(data) && !isEmpty(data)) {
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
	}
	/**
	 * Generate a result from a RandomTable object
	 * @param {Object} rtable the RandomTable
	 * @param {String} [start=''] subtable to roll on
	 * @return {Array} array of object results { table: table that was rolled on, result: result string, desc: optional description string }
	 */
	getTableResult(rtable, start = '') {
		if (!isObject(rtable)) {
			return [{ table: 'Error', result: 'No table found to roll on.', desc: '' }];
		}
		let result = [];

		// if macro is set then we ignore a lot of stuff
		if (!isEmpty(rtable.macro)) {
			// iterate over the tables and get results
			rtable.macro.forEach((t) => {
				const table = this.getTableByKey(t);
				if (isEmpty(table)) { return; }
				this.getTableResult(table);
				result.push({ table: t, result: table.niceString() });
			});
			rtable.result = result;
			return result;
		}

		// we look in the start table for what to roll if the start wasn't explicitly set in the call
		let sequence = (!start) ? rtable.sequence : start;

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
				if (isString(seq)) {
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
	}
	/**
	 * Select from table based on a table key.
	 * @param {String} tableKey
	 * @param {String} table
	 */
	getTableResultByKey(tableKey, table = '') {
		if (!tableKey) {
			return [{ table: 'Error', result: 'No table key.', desc: '' }];
		}
		const rtable = this.getTableByKey(tableKey);
		if (isEmpty(rtable) || !(rtable instanceof RandomTable)) {
			return [{ table: 'Error', result: 'No table found to for that key.', desc: '' }];
		}
		return this.getTableResult(rtable, table);
	}
	/**
	 * Get a result from a table/subtable in a RandomTable object
	 * DANGER: you could theoretically put yourself in an endless loop if the data were poorly planned
	 * ...but at worst that would just crash the users browser since there's no server processing involved... (???)
	 * @todo we'll have to fix for this with a node version... make track the tables rolled on hierarchically, so a parent table doesn't call itself...?
	 * @param {Object} rtable the RandomTable object
	 * @param {String} table table to roll on
	 * @returns {Array} array of object results { table: table that was rolled on, result: result string, desc: optional description string }
	 */
	selectFromTable(rtable, table = '') {
		if (!isObject(rtable)) {
			return [{ table: 'Error', result: 'No table found to roll on.', desc: '' }];
		}
		if (!table) {
			return [{ table: 'Error', result: 'No table found to roll on.', desc: '' }];
		}
		// console.log(table);
		let o = []; // output for sequence of rolls/selections
		const t = rtable.tables[table]; // the table/subtable
		const result = this.rollRandom(t); // the random string from the table (either the object property, a string value from an array, or the value property from a selected object)
		let r = ''; // the string result from the table
		let result_print = true; // are we going to show this result

		if (isUndefined(t[result])) {
			// table is an array
			// r = _.findWhere(t, { label: result });
			r = t.find((v) => {
				return v.label === result;
			});
			if (isUndefined(r)) {
				// it's just an array of strings so we can stop here
				o.push({ table: table, result: result, desc: '' });
				return o;
			}
			result_print = (isUndefined(r['print'])) ? true : r['print'];
		} else {
			r = t[result];
			result_print = (isUndefined(t[result]['print'])) ? true : t[result]['print'];
		}
		// r is now the result object

		// if print==false we suppress the output from this table (good for top-level tables)
		if (result_print === true) {
			// add the description if there is one
			const desc = (isString(r['description'])) ? r['description'] : '';
			// replace any tokens
			const t_result = this.findToken(result, rtable.key);
			o.push({ table: table, result: t_result, desc: desc });
		}

		// are there subtables to roll on?
		const subtable = r.subtable;
		let r2 = ''; // subtable results
		if (isUndefined('undefined')) {
			// no subtables
			return o;
		} else if (isString(subtable)) {
			// subtables is a string reference to a table so we run this function again
			r2 = this.selectFromTable(rtable, subtable);
			o = o.concat(r2);
		} else if (Array.isArray(subtable)) {
			// subtables is an array, assume reference to other tables, roll on each in turn
			subtable.forEach((v) => {
				r2 = this.selectFromTable(rtable, v);
				o = o.concat(r2);
			});
		} else if (isObject(subtable)) {
			// subtable is object assume embedded table(s)
			// loop over keys
			const k = Object.keys(subtable);
			k.forEach((kx) => {
				let result = this.rollRandom(subtable[kx]);
				let desc = '';
				if (isUndefined(subtable[kx][result])) {
					// r2 = _.findWhere(subtable[kx], { label: result });
					r2 = subtable[kx].find((v) => {
						return v.label === result;
					});
					if (isObject(r2)) {
						desc = (isString(r2.description)) ? r2.description : '';
					}
				} else {
					desc = (isString(subtable[kx][result]['description'])) ? subtable[kx][result]['description'] : '';
				}
				result = this.findToken(result, rtable.key);

				o.push({ table: kx, result: result, desc: desc });
			});
		}

		return o;
	}
	/**
	 * Perform token replacement.  Only table and roll actions are accepted
	 * @param {String} token A value passed from findToken containing a token(s) {{SOME OPERATION}} Tokens are {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{roll:1d6+2}} (etc) (i.e. {{table:colonial_occupations:laborer}} {{table:color}} also generate names with {{name:flemish}} (surname only) {{name:flemish:male}} {{name:dutch:female}}
	 * @param {String} curtable key of the RandomTable the string is from (needed for "this" tokens)
	 * @returns {String} The value with the token(s) replaced by the operation or else just the token (in case it was a mistake or at least to make the error clearer)
	 */
	convertToken(token, curtable) {
		const parts = token.replace('{{', '').replace('}}', '').split(':');
		if (parts.length === 0) {
			return token;
		}

		// look for a token type we can run
		if (this.token_types[parts[0]]) {
			return this.token_types[parts[0]](parts, token, curtable);
		} else {
			return token;
		}
	}
	/**
	 * Look for tokens to perform replace action in convertToken
	 * @param {String} string usually a result from a RandomTable
	 * @param {String} curtable key of the RandomTable the string is from (needed for "this" tokens)
	 * @param {Function} [callback] optional callback to be performed on tokens...
	 * @returns {String} String with tokens replaced (if applicable)
	 */
	findToken(string, curtable = '', callback = null) {
		if (isEmpty(string)) {
			return '';
		}
		const newstring = string.replace(tokenRegExp, (token) => {
			return this.convertToken(token, curtable);
		});
		return newstring;
	}
	/**
	 * takes a string like '3d6+2', 'd6', '2d6', parses it, and puts it through roll
	 * @params {String} string a die roll notation
	 * @returns {Number} the result of the roll
	 */
	roll(string = '') {
		string = string.trim();
		const m = string.match(/^([0-9]*)d([0-9]+)(?:([\+\-\*\/])([0-9]+))*$/);
		if (!m) {
			return '';
		}
		return parseDiceNotation(m[2], m[1], m[4], m[3]);
	}
	/**
	 * Since tables are stored outside of this module, this function allows for the setting of a function which will be used to lookup a table by it's key
	 * @param {Function} lookup a function that takes a table key and returns the table data object
	 * @return {null} nothing
	 */
	setTableKeyLookup(lookup) {
		this.getTableByKey = lookup;
	}
	/**
	 * Placeholder that should be replaced by a function outside this module
	 * @param {String} key human readable table identifier
	 * @return {null} nothing, when replaced this function should return a table object
	 */
	getTableByKey(key) {
		return null;
	}
	/**
	 * Add a token variable
	 * @param {String} name Name of the token (used as first element).
	 * @param {Function} process Function to return token replacement value function is passed the token_parts (token split by ":"),  original full_token, current table name
	 */
	registerTokenType = function (name, process) {
		this.token_types[name] = process;
	}
	/**
	 * Dice roll token.
	 */
	defaultRollToken(token_parts, full_token, curtable) {
		return this.roll(token_parts[1]);
	}
	/**
	 * Table token lookup in the form:
	 * {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{table:SOMETABLE:SUBTABLE*2}} (roll subtable 2 times)
	 */
	defaultTableToken(token_parts, full_token, curtable) {
		let string = '';
		// console.log(token_parts);
		if (isUndefined(token_parts[1])) {
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
		const subtable = (isUndefined(token_parts[2])) ? '' : token_parts[2];

		for (var i = 1; i <= multiplier; i++) {
			this.getTableResult(t, subtable);
			string += t.niceString() + ', ';
		}
		string = string.trim();
		string = string.replace(/,$/, '');
		return string;
	}
}

export default Randomizer;
