'use strict';

const _ = require('underscore');
const randomizer = require('./randomizer.js');
const r_helpers = require('./r_helpers.js');

/**
 * RandomTable: Model for tables used by Randomizer
 * @param {Object} config the tables non-default attributes
 */

const RandomTable = function (config) {
	this.key = '';
	/**
	 * Defaults for the attributes;
	 */
	this.defaults = function () {
		return {
			id: 0,
			appv: '',
			key: '',
			title: '',
			author: '',
			description: '',
			source: '',
			tags: [],
			sequence: '', // where to start rolling and if other tables should always be rolled on
			tables: {}, // subtables
			result: []
		};
	};
	/**
	 * The primary attributes of this table
	 */
	this.attributes = r_helpers.extend(this.defaults(), config);
	/**
	 * Retrieve an attribute
	 * @param {String} attr an attribute
	 * @return {String|Number|Object|Array} the attribute's current value
	 */
	this.get = function (attr) {
		return this.attributes[attr] ? this.attributes[attr] : '';
	};
	/**
	 * Set an attribute
	 * @param {String} attr an attribute
	 * @param {String|Number|Object|Array} val new value of the attribute
	 * @return null
	 */
	this.set = function (attr, val, opts) {
		if (opts && opts.silent && opts.silent === true) {
			// dont save right away?
		}
		this.attributes[attr] = val;
	};
	/**
	 * Remove attribute
	 */
	this.unset = function (attr) {
		delete this.attributes[attr];
	};
	/**
	 * This is the model for Random Tables.
	 *
	 * @constructs
	 * @property {String} key identifier for the table
	 * @property {String} id id for the table if it is locally saved
	 * @property {String} [title] title of the table
	 * @property {String} [author] author of the table
	 * @property {String} [description] description of the table
	 * @property {String} [source] source of the table
	 * @property {Array} [tags] subject tags
	 * @property {String|Array} [sequence] tables to roll on. if array it can be an array of strings (table names) or objects (two properties table: the table to roll on and times: the number of times to roll)
	 * @property {Array} [table] default table. array of strings or objects. removed after initialization.
	 * @property {Object} [tables] a property for each subtables. if table property is not set then the first propery of this Object is used to start rolling
	 * @property {Object} [result] current result
	 */
	this.initialize = function () {
		this.normalize();
		if (this.key === '') {
			if (this.get('key') !== '') {
				this.key = this.get('key');
				return;
			}
			this.key = this.get('id');
			this.set('key', this.key);
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
	 * Normalize data - mostly move "table" to "table.default"
	 * For some reason related to ease of table creation????
	 */
	this.normalize = function () {
		if (!r_helpers.isEmpty(this.get('table'))) {
			const tables = this.get('tables');
			tables.default = this.get('table');
			this.set('tables', tables);
			this.unset('table');
		}
/*
		@todo normalize the table data so it's always an array of objects with the value property?
		if (!r_helpers.isEmpty(this.get('tables'))) {
			const tables = this.get('tables');
				
		}
*/
	};
	/**
	 * Start the process of rolling
	 * @param {String} [start=''] subtable to roll on
	 * @returns {Boolean} success (always true right now)
	 */
	this.generateResult = function (start) {
		if (typeof start === 'undefined') {
			start = '';
		}
		// we look in the start table for what to roll if the start wasn't explicitly set in the call
		let sequence = (start === '') ? this.get('sequence') : start;
		
		if (sequence === 'rollall') {
			// roll all the tables in order
			sequence = Object.keys(this.get('tables'));
		}
		
		if (sequence === '') {
			// if no start attribute
			// try for "default" table
			if (typeof this.get('tables')['default'] !== 'undefined') {
				this.set('result', this.selectFromTable('default'), { silent: true });
			} else {
				// select first item from tables
				const k = Object.keys(this.get('tables'));
				this.set('result', this.selectFromTable(k[0]), { silent: true });
			}
		} else if (typeof sequence === 'string') {
			this.set('result', this.selectFromTable(sequence), { silent: true });
		} else {
			var result = [];
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

			this.set('result', result, { silent: true });
		}
		
		return true;
	};
	/**
	 * Get a result from a table/subtable
	 * DANGER: you could theoretically put yourself in an endless loop if the data were poorly planned
	 * ...but at worst that would just crash the users browser since there's no server processing involved... (???)
	 * @todo we'll have to fix for this with a node version
	 * @param {String} table table to roll on
	 * @returns {Array} array of object results { table: table that was rolled on, result: result string, desc: description string }
	 */
	this.selectFromTable = function (table) {
		if (typeof table === 'undefined') {
			return [{ table: 'Error', result: 'No table found to roll on.', desc: '' }];
		}
		// console.log(table);
		let o = []; // output for sequence of rolls/selections
		const t = this.get('tables')[table]; // the table/subtable
		const result = randomizer.rollRandom(t); // the random string from the table (either the object property, a string value from an array, or the value property from a selected object)
		let r = ''; // the string result from the table
		let result_print = true; // are we going to show this result
		
		if (r_helpers.isUndefined(t[result])) {
			// table is an array
			r = _.findWhere(t, { label: result });
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
			const t_result = randomizer.findToken(result, this.get('key'));
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
					r2 = _.findWhere(subtable[kx], { label: result });
					if (r_helpers.isObject(r2)) {
						desc = (r_helpers.isString(r2.description)) ? r2.description : '';
					}
				} else {
					desc = (r_helpers.isString(subtable[kx][result]['description'])) ? subtable[kx][result]['description'] : '';
				}
				result = randomizer.findToken(result, this.get('key'));
				
				o.push({ table: kx, result: result, desc: desc });
			});
		}
		
		return o;
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
		const r = this.get('result'); // array
		if (r === '' || r.length === 0) { return ''; }
		
		if (r_helpers.isString(r)) { return r; } // will this ever happen?
		if (simple) { return r[0]['result']; } // @todo maybe use shift() instead, if editing this array won't be a problem. (else we could clone it...
		
		let o = '';
		const print_opt = (this.get('print')) ? this.get('print') : {};
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
	 * Show the table options as a list
	 * @returns {String} the table as html lists
	 */
	this.niceList = function () {
		// iterature through each table
		
		// count the number of entries so we can columnize if necessary
		let t_length = 0;
		let t_tables = 0;
		_.each(this.get('tables'), function (v, k, l) {
			t_length++;
			t_tables++;
			if (Array.isArray(v)) {
				t_length = t_length + v.length;
			} else {
				for (const key in v) {
					if (v.hasOwnProperty(key)) { t_length++; }
				}
			}
		}, this);
		
		let use_columns = false;
		let breakpoint = false;
		if (t_length > 50) {
			use_columns = true;
			breakpoint = Math.ceil(t_length / 2);
		}
		
		let ct = 0;
		
		let o = '<div class="rtable_select">';
		
		if (use_columns) {
			o += '<div class="row">';
			o += '<div class="col-xs-6">';
		}
		
		_.each(this.get('tables'), function (v, k, l) {
			// most of the time we break in between tables (except single long tables, see below)
			if (use_columns && breakpoint) {
				if (ct >= breakpoint) {
					o += '</div><div class="col-xs-6">';
					breakpoint = false;
				}
			}
			
			if (k !== 'default') {
				o += `<header>${r_helpers.capitalize(k)}</header>`;
				ct++;
			}
			o += '<ol class="list-unstyled">';

			let tweight1 = 0;
			let tweight0 = 0;
			_.each(v, function (vx, kx, lx) {
				tweight0 = tweight1 + 1;
				const weight1 = (typeof vx.weight !== 'undefined') ? vx.weight : 1;
				tweight1 = tweight1 + weight1;
				const num = (tweight0 === tweight1) ? tweight0 : `${tweight0}-${tweight1}`;
								
				if (Array.isArray(lx) && r_helpers.isString(vx)) {
					// its an Array of strings
					o += `<li>${num}. ${r_helpers.capitalize(vx)}`;
					ct++;
				} else if (r_helpers.isString(kx)) {
					o += `<li>${num}. ${r_helpers.capitalize(kx)}`;
					ct++;
					// vx is an object
					if (typeof vx.description !== 'undefined') {
						o += ` - ${vx.description}`;
					}
					if (typeof vx.subtable !== 'undefined') {
						if (Array.isArray(vx.subtable)) {
							o += `<div class="subtable_roll">Roll on: ${r_helpers.flatten(vx.subtable)}</div>`;
						} else if (r_helpers.isString(vx.subtable)) {
							o += `<div class="subtable_roll">Roll on: ${r_helpers.capitalize(vx.subtable)}</div>`;
						} else {
							_.each(vx.subtable, function (vz, kv) {
								o += `<div class="subtable_roll">Roll ${r_helpers.capitalize(kv)}:<ol class="list-inline">`;
								let t2weight0 = 0;
								let t2weight1 = 0;
								_.each(vz, function (q, w, qw) {
									t2weight0 = t2weight1 + 1;
									const weight2 = (typeof q.weight !== 'undefined') ? q.weight : 1;
									t2weight1 = t2weight1 + weight2;
									const num2 = (t2weight0 === t2weight1) ? t2weight0 : `${t2weight0}-${t2weight1}`;
									if (Array.isArray(qw) && r_helpers.isString(q)) {
										o += `<li>${num2}. ${r_helpers.capitalize(q)}</li>`;
									} else if (r_helpers.isString(w)) {
										o += `<li>${num2}. ${r_helpers.capitalize(w)}</li>`;
									} else {
										o += `<li>${num2}. ${r_helpers.capitalize(q.label)}</li>`;
									}
								}, this);
								o += '</ol></div>';
							}, this);
						}
					}
				} else {
					o += `<li>${num}. ${vx.label}`;
					ct++;
					if (typeof vx.description !== 'undefined') {
						o += ` - ${vx.description}`;
					}
				}
				o += '</li>';
				
				// for single long tables we'll break in the list itself
				if (use_columns && breakpoint && t_tables === 1) {
					if (ct >= breakpoint) {
						o += '</ol></div><div class="col-xs-6"><ol class="list-unstyled">';
						breakpoint = false;
					}
				}
			}, this);
			o += '</ol>';
		}, this);
		
		if (use_columns) {
			o += '</div></div>';
		}
		
		o += '</div>';
		return o;
	};
	/**
	 * outputs the json data for the table (import/export)
	 * @param {Boolean} [editmode=false] if false empty attributes will be stripped out
	 * @returns {Object} table attributes
	 */
	this.outputObject = function (editmode) {
		if (typeof editmode === 'undefined') { editmode = false; }
		const att = _.clone(this.attributes);
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
		table = this.get('tables')[table];
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
	 * @returns {Object} the object associated with the label
	 */
	this.findObject = function (label, table) {
		if (typeof table === 'undefined' || table === '') {
			table = 'default';
		}
		const t = this.get('tables')[table];
		if (typeof t[label] === 'undefined') {
			return _.findWhere(t, { label: label });
		}
		return t[label];
	};
	/**
	  * find the result element for a specific table/subtable
	  * @param {String} table The table to look for
	  * @returns {Object} result element for specified table (or empty)
	  */
	this.findResultElem = function (table) {
		if (typeof table === 'undefined' || table === '') {
			table = 'default';
		}
		return _.findWhere(this.get('result'), { table: table });
	};
	// initialize the table
	this.initialize();
};

// RTable_Collection
const RTable_Collection = function () {
	
//	sortAttribute: "title",
//	sortDirection: 1,
	
	/**
	 * A collection of RandomTables
	 * Tables are added via appdata.tables (converted to an array of objects in AppRouter)
	 *
	 * @augments external:Backbone.Collection
	 * @constructs
	 */
/*
	initialize: function(){
		
	},
*/
	
	/**
	 * Add a RandomTable to the collection, trigger refresh so view updates
	 * @param {Object} [model] A RandomTable model to add to the collection
	 */
/*
	import: function (model) {
		this.add(model);
		this.trigger('refresh');
	},
*/
	
	/**
	 * trigger a refresh on the collection
	 */
/*
	refresh: function() {
		this.trigger('refresh')
	},
*/
	
	/**
	 * Sort the collection's Tables
	 * @param {String} attr The field to sort by
	 */
/*
	sortTables: function (attr) {
		if (typeof attr == 'undefined') { attr = 'title'; this.sortDirection = 1; }
		this.sortAttribute = attr;
		this.sort();
	},
*/
	
	/**
	 * Comparator function for sorting
	 */
/*
	comparator: function(a, b) {
		var a = a.get(this.sortAttribute),
		b = b.get(this.sortAttribute);
		
		if (r_helpers.isString(a)) {
			a = a.toLowerCase();
		}
		if (r_helpers.isString(b)) {
			b = b.toLowerCase();
		}
		
		if (a == b) return 0;
		
		//1 is ascending
		if (this.sortDirection == 1) {
			return a > b ? 1 : -1;
		} else {
			return a < b ? 1 : -1;
		}
	},
*/
	
	/**
	 * Search the collection
	 * @param {String} query words to look for
	 * @param {Function} callback function to perform with the matching models
	 */
/*
	search: function( query, callback ){
		var pattern = new RegExp( $.trim( query ).replace( / /gi, '|' ), "i");
		callback.call( this, this.filter(function( model ){
			if (pattern.test(model.attributes.title) || pattern.test(model.attributes.description) || pattern.test(model.attributes.author) || pattern.test(model.attributes.source)) {
				return true;
			}
		}));
	},
*/

	/**
	 * Returns a table from the collection based on ID
	 * @Param {String} id which random table to get
	 * @returns {Object} the randomtable model
	 */
/*
	getById: function(id) {
		if (typeof id == 'undefined' || r_helpers.isEmpty(id) || id == '0') {
			return {};
		}
		
		var t = this.findWhere({ id: id });
		if (typeof t == 'undefined') {
			return {};
		}
		return t;
	},
*/
	
	/**
	 * Return a table from the collection
	 * @Param {String} title which random table to get
	 * @returns {Object} the randomtable model
	 */
/*
	getByTitle: function(title) {
		if (typeof title == 'undefined' || title == '') {
			return {};
		}
		//console.log(title);
		//console.log(this.findWhere({ key: title }));
		
		var t = this.findWhere({ key: title });
		if (typeof t == 'undefined') {
			t = this.findWhere({ title: title });
		}
		if (typeof t == 'undefined') {
			return {};
		}
		return t;
	},
*/
	
	/**
	 * Return an array of tables from the collection
	 * @Param {String} tag a tag to search on
	 * @returns {Array} of randomtable models
	 */
/*
	getByTags: function(tag) {
		if (typeof tag == 'undefined' || tag == '') {
			return [];
		}
		//console.log(tag);
		var t = this.filter(function(model){
			return ( _.indexOf(model.get('tags'), tag) >= 0 );
		});
		//console.log(t);
		if (typeof t == 'undefined') {
			return [];
		}
		return t;
	},
*/
	
	/**
	 * Export the user saved custom tables
	 * @param {String} [which=user] user will only output user saved tables, all will output all tables
	 * @param {Boolean} [compress=false] if true JSON will not be indented with tabs/lines
	 * @returns {Array} Array of table objects ?
	 */
/*
	exportOutput: function(which, compress) {
		if (typeof which == 'undefined') {
			which = 'user';
		}
		if (typeof compress == 'undefined') {
			compress = false;
		}
		var t = this.filter(function(model){
			if (which == 'user') {
				return ( typeof model.get('id') !== 'undefined' );
			}
			return true;
		});
		//@todo maybe broken
		t.forEach((v, k, l) {
			l[k] = v.outputObject(false);
		});
		
		return t;
	}
*/
};

module.exports = RandomTable;
