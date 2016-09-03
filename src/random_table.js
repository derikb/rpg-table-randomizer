'use strict';

//const randomizer = require('./randomizer.js');
const r_helpers = require('./r_helpers.js');

/**
 * RandomTable: Model for tables used by Randomizer
 * @param {Object} config the tables non-default attributes
 */
const RandomTable = function (config) {
	/**
	 * The primary attributes of this table
	 * @property {String} id id for the table, primary key for database if used
	 * @property {String} key identifier for the table
	 * @property {String} [title] title of the table
	 * @property {String} [author] author of the table
	 * @property {String} [description] description of the table
	 * @property {String} [source] source of the table
	 * @property {Array} [tags] subject tags
	 * @property {String|Array} [sequence] tables to roll on. if array it can be an array of strings (table names) or objects (two properties table: the table to roll on and times: the number of times to roll)
	 * @property {Array} [table] default table. array of strings or objects. removed after initialization.
	 * @property {Object} [tables] a property for each subtables. if table property is not set then the first propery of this Object is used to start rolling
	 * @property {Array} [result] current result array of objects
	 */
	this.id = 0;
	this.key = '';
	this.title = '';
	this.author = '';
	this.description = '';
	this.source = '';
	this.tags = [];
	this.sequence = ''; // where to start rolling and if other tables should always be rolled on
	this.tables = {};
	this.result = [];
	/**
	 * Run on first construction
	 * @param {Object} config data passed from the constructor
	 */
	this.initialize = function (config) {
		for (const prop in config) {
			if (config.hasOwnProperty(prop)) {
				this[prop] = config[prop];
			}
		}
		// make sure this.tables.default is set instead of this.table
		// maybe we dont need this
		if (!r_helpers.isEmpty(this.table)) {
			const tables = this.tables;
			tables.default = this.table;
			this.tables = tables;
			delete this.table;
		}
		if (this.key === '') {
			this.key = this.id;
		}
	};
	/**
	 * validate fields before saving
	 * @param {Object} attributes new attributes to save
	 * @returns {Object} error information
	 */
	this.validate = function (attributes) {
		// console.log(attributes);
		const error = { fields: [], general: '' };
		
		if (attributes.title === '') {
			error.fields.push({ field: 'title', message: 'Title cannot be blank' });
			error.general += 'Title cannot be blank. ';
		}
		
		if (typeof attributes.tables === 'string' || r_helpers.isEmpty(attributes.tables)) {
			error.fields.push({ field: 'title', message: 'Table cannot be empty' });
			error.general += 'Table cannot be empty. ';
		}
		
		if (!r_helpers.isEmpty(error.fields) || !r_helpers.isEmpty(error.general)) {
			return error;
		}
		return true;
	};
	/**
	 * Start the process of rolling
	 * @param {String} [start=''] subtable to roll on
	 * @returns {Boolean} success (always true right now)
	 */
	/*
	this.generateResult = function (start) {
		if (typeof start === 'undefined') {
			start = '';
		}
		// we look in the start table for what to roll if the start wasn't explicitly set in the call
		let sequence = (start === '') ? this.sequence : start;
		
		if (sequence === 'rollall') {
			// roll all the tables in order
			sequence = Object.keys(this.tables);
		}
		
		if (sequence === '') {
			// if no start attribute
			// try for "default" table
			if (typeof this.tables['default'] !== 'undefined') {
				this.result = this.selectFromTable('default');
			} else {
				// select first item from tables
				const k = Object.keys(this.tables);
				this.result = this.selectFromTable(k[0]);
			}
		} else if (typeof sequence === 'string') {
			this.result = this.selectFromTable(sequence);
		} else {
			let result = [];
			sequence.forEach((v) => {
				let r = '';
				if (r_helpers.isString(v)) {
					r = this.selectFromTable(v);
					result = result.concat(r);
					return;
				}
				// its an object
				var times = (typeof v.times === 'number') ? v.times : 1;
				for (let i = 1; i <= times; i++) {
					r = this.selectFromTable(v.table);
					result = result.concat(r);
				}
			});

			this.result = result;
		}
		
		return true;
	};
*/
	/**
	 * Get a result from a table/subtable
	 * DANGER: you could theoretically put yourself in an endless loop if the data were poorly planned
	 * ...but at worst that would just crash the users browser since there's no server processing involved... (???)
	 * @todo we'll have to fix for this with a node version
	 * @param {String} table table to roll on
	 * @returns {Array} array of object results { table: table that was rolled on, result: result string, desc: description string }
	 */
/*	 
	this.selectFromTable = function (table) {
		if (typeof table === 'undefined') {
			return [{ table: 'Error', result: 'No table found to roll on.', desc: '' }];
		}
		// console.log(table);
		let o = []; // output for sequence of rolls/selections
		const t = this.tables[table]; // the table/subtable
		const result = randomizer.rollRandom(t); // the random string from the table (either the object property, a string value from an array, or the value property from a selected object)
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
			const t_result = randomizer.findToken(result, this.key);
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
			r2 = this.selectFromTable(subtable);
			o = o.concat(r2);
		} else if (Array.isArray(subtable)) {
			// subtables is an array, assume reference to other tables, roll on each in turn
			subtable.forEach((v) => {
				r2 = this.selectFromTable(v);
				o = o.concat(r2);
			});
		} else if (r_helpers.isObject(subtable)) {
			// subtable is object assume embedded table(s)
			// loop over keys
			const k = Object.keys(subtable);
			k.forEach((kx) => {
				let result = randomizer.rollRandom(subtable[kx]);
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
				result = randomizer.findToken(result, this.key);
				
				o.push({ table: kx, result: result, desc: desc });
			});
		}
		
		return o;
	};
*/
	/**
	 * Show the results as a string
	 * @todo make this nicer/clearer #23
	 * Alternate: write a template to use in the views?
	 * @param {Boolean} [simple=false] if true only output the first result label
	 * @returns {String} the results
	 */
	this.niceString = function (simple) {
		if (typeof simple === 'undefined') {
			simple = false;
		}
		const r = this.result; // array
		if (r === '' || r.length === 0) { return ''; }
		
		if (r_helpers.isString(r)) { return r; } // will this ever happen?
		if (simple) { return r[0]['result']; } // @todo maybe use shift() instead, if editing this array won't be a problem. (else we could clone it...
		
		let o = '';
		const print_opt = (this.print) ? this.print : {};
		r.forEach((v) => {
			if (print_opt[v.table]) {
				if (!print_opt[v.table].hide_table || print_opt[v.table].hide_table === 0) {
					o += `${r_helpers.capitalize(v.table)}: `;
				}
				if (!print_opt[v.table].hide_result || print_opt[v.table].hide_result === 0) {
					o += `${r_helpers.capitalize(v.result)}<br/>`;
				}
				if (!print_opt[v.table].hide_desc || print_opt[v.table].hide_desc === 0) {
					if (v.desc !== '') { o += `${v.desc}<br/>`; }
				}
			} else {
				if (v.table === 'default') {
					o += `${r_helpers.capitalize(v.result)}<br/>`;
				} else {
					o += `${r_helpers.capitalize(v.table)}: ${r_helpers.capitalize(v.result)}<br/>`;
				}
				if (v.desc !== '') { o += `${v.desc}<br/>`; }
			}
		});
		o = o.replace(/<br\/>$/, '');
		return o;
	};
	/**
	 * outputs the json data for the table (import/export)
	 * @param {Boolean} [editmode=false] if false empty attributes will be stripped out
	 * @returns {Object} table attributes
	 */
	this.outputObject = function (editmode) {
		if (typeof editmode === 'undefined') { editmode = false; }
		// clone the data, this will strip out any functions too.
		const att = JSON.parse(JSON.stringify(this.attributes));
		const props = Object.keys(att);
		props.forEach((k) => {
			if (!editmode && r_helpers.isEmpty(att[k])) {
				delete att[k];
			}
		});
		delete att.id;
		return att;
	};
	/**
	 * outputs the json data for the table (import/export)
	 * @param {Boolean} [editmode=false] if false empty attributes will be stripped out
	 * @param {Boolean} [compress=false] if true JSON will not have indentation, etc.
	 * @returns {String} table attributes in JSON
	 */
	this.outputCode = function (editmode, compress) {
		if (typeof editmode === 'undefined') { editmode = false; }
		if (typeof compress === 'undefined') { compress = false; }
		
		const obj = this.outputObject(editmode);
		
		if (compress) {
			return JSON.stringify(obj);
		}
		return JSON.stringify(obj, null, 2);
	};
	/**
	 * Show the table options as an array suitable for iteration
	 * @param {String} table the table to list
	 * @returns {Array} array of objects to iterate over, normalized to label...?
	 */
	this.selectList = function (table) {
		table = this.tables[table];
		const o = [];
		// @todo this may be broken
		if (Array.isArray(table)) {
			table.forEach((v, k) => {
				const e = {};
				// account for tables that are just arrays of strings
				if (r_helpers.isString(k)) {
					e.label = k;
				} else {
					e.label = v.label;
				}
				o.push(e);
			});
		} else if (typeof table === 'object' && table !== null) {
			const props = Object.keys(table);
			props.forEach((k) => {
				const v = table[k];
				const e = {};
				// account for tables that are just arrays of strings
				if (r_helpers.isString(k)) {
					e.label = k;
				} else {
					e.label = v.label;
				}
				o.push(e);
			});
		}
		return o;
	};
	/**
	 * Get an object result in case we only have the label and need other data from it
	 * @param {String} label The item we are looking for
	 * @param {String} [table=default] the table to search
	 * @returns {Object} the object associated with the label or an empty one
	 */
	this.findObject = function (label, table) {
		if (typeof table === 'undefined' || table === '') {
			table = 'default';
		}
		const t = this.tables[table];
		if (t[label]) {
			return t[label];
		}
		if (Array.isArray(t)) {
			const obj = t.find((v) => {
				return v.label === label;
			});
			return (typeof obj !== 'undefined') ? obj : {};
		}
		return {};
	};
	/**
	  * find the result element for a specific table/subtable
	  * only works if we have already generated a result
	  * @param {String} table The table to look for
	  * @returns {Object} result element for specified table (or empty)
	  */
	this.findResultElem = function (table) {
		if (typeof table === 'undefined' || table === '') {
			table = 'default';
		}
		const obj = this.result.find((v) => {
			return v.table === table;
		});
		return (typeof obj !== 'undefined') ? obj : {};
	};
	
	/**
	 * Initialize the table, set the data, normalize, etc.
	 */
	this.initialize(config);
};

module.exports = RandomTable;
