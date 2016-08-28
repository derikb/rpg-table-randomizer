'use strict';

/**
 * Randomizer - handles app randomization functions
 * Module exports a single instance of Randomizer...
 * @constructor
 */
let Randomizer = function () {
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
	 * Random value selection
	 * @param {Array} values an array of strings from which to choose
	 * @param {Array} weights a matching array of integers to weight the values (i.e. values and weights are in the same order)
	 * @returns {String} the randomly selected Array element from values param
	 */
	this.getWeightedRandom = function (values, weights) {
		let n = 0;
		const num = this.random(1, this.arraySum(weights));
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
			let props = Object.keys(data);
			props.forEach((k) => {
				let v = data[k];
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
	this.roll = function (die, number, modifier, mod_op) {
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
	 * Sum an array
	 * @param {Array} arr an array of numbers
	 * @returns {Number} Total value of numbers in array
	 */
	this.arraySum = function (arr) {
		let total = 0;
		for (let i = 0; i < arr.length; i++) {
			let v = parseFloat(arr[i]);
			if (!isNaN(v)) {
				total += v;
			}
		}
		return total;
	};
	/**
	 * Perform token replacement.  Only table and roll actions are accepted
	 * @param {String} token A value passed from findToken containing a token(s) {{SOME OPERATION}} Tokens are {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{roll:1d6+2}} (etc) (i.e. {{table:colonial_occupations:laborer}} {{table:color}} also generate names with {{name:flemish}} (surname only) {{name:flemish:male}} {{name:dutch:female}}
	 * @returns {String} The value with the token(s) replaced by the operation or else just the token (in case it was a mistake or at least to make the error clearer)
	 */
	this.convertToken = function (token, curtable) {
		let parts = token.replace('{{', '').replace('}}', '').split(':');
		if (parts.length === 0) { return token; }
		
		// look for a token type we can run
		if (this.token_types[parts[0]]) {
			return this.token_types[parts[0]](parts, token, curtable);
		} else {
			return token;
		}
		
		// Only table and roll actions are accepted
/*
		switch (parts[0]) {
			case 'table':
				let multiplier = 1;
				if (parts[1].indexOf('*') !== -1) {
					var x = parts[1].split('*');
					parts[1] = x[0];
					multiplier = x[1];
				}
				
				// what table do we roll on
				let t = null;
				if (parts[1] === 'this') {
					// reroll on same table
					t = this.getTableByTitle(curtable);
				} else {
					t = this.getTableByTitle(parts[1]);
				}
				if (t !== null && typeof t !== 'object') {
					return token;
				}
				if (typeof parts[2] !== 'undefined' && parts[2].indexOf('*') !== -1) {
					const x = parts[2].split('*');
					parts[2] = x[0];
					multiplier = x[1];
				}
				let subtable = (typeof parts[2] === 'undefined') ? '' : parts[2];
				
				for (var i = 1; i <= multiplier; i++) {
					t.generateResult(subtable);
					string += t.niceString(true) + ', ';
				}
				string = string.trim();
				string = string.replace(/,$/, '');
				
				break;
			case 'roll':
				string = this.parseDiceNotation(parts[1]);
				break;
			case 'name':
				var n = new Names();
				if (typeof parts[1] === 'undefined' || parts[1] === '' || parts[1] === 'random') {
					parts[1] = '';
				}
				if (typeof parts[3] === 'undefined' || parts[3] !== 'first') {
					parts[3] = '';
				}
				if (typeof parts[2] === 'undefined') {
					string = n.generateSurname(parts[1]);
				} else if (parts[2] === 'male') {
					string = n.generateName(parts[1], 'male', parts[3]);
				} else if (parts[2] === 'female') {
					string = n.generateName(parts[1], 'female', parts[3]);
				} else if (parts[2] === 'random') {
					string = n.generateName(parts[1], 'random', parts[3]);
				}
				break;
			default:
				string = '';
		}

		return string;
		*/
	};
	/**
	 * Look for tokens to perform replace action in convertToken
	 * @param {String} string usually a result from a RandomTable
	 * @returns {String} String with tokens replaced (if applicable)
	 */
	this.findToken = function (string, curtable) {
		if (typeof curtable === 'undefined') { curtable = ''; }
		const regexp = new RegExp('({{2}.+?}{2})', 'g');
		const newstring = string.replace(regexp, (token) => {
			return this.convertToken(token, curtable);
		});
		return newstring;
	};
	/**
	 * takes a string like '3d6+2', 'd6', '2d6', parses it, and puts it through roll
	 * @params {String} string a die roll notation
	 * @returns {Number} the result of the roll
	 */
	this.parseDiceNotation = function (string) {
		const m = string.match(/^([0-9]*)d([0-9]+)(?:([\+\-\*\/])([0-9]+))*$/);
		if (m) {
			if (typeof m[4] === 'undefined') { m[4] = 0; }
			if (m[1] !== '') {
				return this.roll(parseInt(m[2], 10), parseInt(m[1], 10), parseInt(m[4], 10), m[3]);
			} else {
				return this.roll(parseInt(m[2], 10), '1', parseInt(m[4], 10), m[3]);
			}
		}
		return '';
	};
	/**
	 * Since tables are stored outside of this module, this function allows for the setting of a function which will be used to lookup a table by it's name
	 * @param {Function} lookup a function that takes a table name and returns the table data object
	 * @return {null} nothing
	 */
	this.setTableTitleLookup = function (lookup) {
		this.getTableByTitle = lookup;
	};
	/**
	 * Placeholder that should be replaced by a function outside this module
	 * @param {String} name table name identifier
	 * @return {null} nothing, when replaced this function should return a table object
	 */
	this.getTableByTitle = function (name) {
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
		return this.parseDiceNotation[token_parts[1]];
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
			var x = token_parts[1].split('*');
			token_parts[1] = x[0];
			multiplier = x[1];
		}
		
		// what table do we roll on
		let t = null;
		if (token_parts[1] === 'this') {
			// reroll on same table
			console.log('this..'+curtable);
			t = this.getTableByTitle(curtable);
			//console.log(t);
		} else {
			t = this.getTableByTitle(token_parts[1]);
		}
		if (t === null || typeof t !== 'object') {
			return full_token;
		}
		if (typeof token_parts[2] !== 'undefined' && token_parts[2].indexOf('*') !== -1) {
			const x = token_parts[2].split('*');
			token_parts[2] = x[0];
			multiplier = x[1];
		}
		let subtable = (typeof token_parts[2] === 'undefined') ? '' : token_parts[2];
		
		for (var i = 1; i <= multiplier; i++) {
			t.generateResult(subtable);
			string += t.niceString(true) + ', ';
		}
		string = string.trim();
		string = string.replace(/,$/, '');
		return string;
	});
};

module.exports = new Randomizer();
