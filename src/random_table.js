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
		if (r_helpers.isString(r) || !Array.isArray(r) || r.length === 0) { return ''; }
		
		if (simple) { return r[0]['result']; } // @todo maybe use shift() instead, if editing this array won't be a problem. (else we could clone it...
		
		let o = '';
		const print_opt = (this.print) ? this.print : {};
		r.forEach((v) => {
			if (print_opt[v.table]) {
				if (!print_opt[v.table].hide_table || print_opt[v.table].hide_table === 0) {
					o += `${r_helpers.capitalize(v.table)}: `;
				}
				if (!print_opt[v.table].hide_result || print_opt[v.table].hide_result === 0) {
					o += `${r_helpers.capitalize(v.result)}\n`;
				}
				if (!print_opt[v.table].hide_desc || print_opt[v.table].hide_desc === 0) {
					if (v.desc !== '') { o += `${v.desc}\n`; }
				}
			} else {
				if (v.table === 'default') {
					o += `${r_helpers.capitalize(v.result)}\n`;
				} else {
					o += `${r_helpers.capitalize(v.table)}: ${r_helpers.capitalize(v.result)}\n`;
				}
				if (v.desc !== '') { o += `${v.desc}\n`; }
			}
		});
		o = o.trim(); //trim off final linebreak
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
		const att = JSON.parse(JSON.stringify(this));
		const props = Object.keys(att);
		props.forEach((k) => {
			if (!editmode && r_helpers.isEmpty(att[k])) {
				delete att[k];
			}
		});
		// don't include results
		if (att.result && editmode) {
			att.result = [];
		} else if (att.result) {
			delete att.result;
		}
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
