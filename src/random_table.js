import { isEmpty, isString, capitalize, isUndefined } from './r_helpers.js';

/**
 * RandomTable: Model for tables used by Randomizer
 * @param {Object} config the tables non-default attributes
 */
class RandomTable {
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
	 * @property {Array} [macro] for tables that are only used to aggregate result from other tables, this array consists of table keys to be rolled on in order
	 * @property {Object} [print] objects to describe what parts of a (sub)table should be displayed in the results
	 * @property {Object} [print.default] how to display the default table's results
	 * @property {Object} [print.default.hide_table] set to 1 will not show the table name
	 * @property {Object} [print.default.hide_result] set to 1 will not show the result on that (sub)table
	 * @property {Object} [print.default.hide_desc] set to 1 will not show any description for a result on that (sub)table
	 * @property {Array} [dependencies] table keys that are needed to get full results from this table
	 * @property {Array} [result] current result array of objects
	 */
	constructor({
		id = 0,
		key = null,
		title = '',
		author = '',
		description = '',
		source = '',
		tags = [],
		sequence = '', // where to start rolling and if other tables should always be rolled on
		tables = {},
		macro = [],
		print = {},
		dependencies = null,
		result = [],
		table = null
	}) {
		this.id = id;
		this.key = key || this.id; // default to the id.
		this.title = title;
		this.author = author;
		this.description = description;
		this.source = source;
		this.tags = tags;
		this.sequence = sequence;
		this.tables = tables;
		this.macro = macro;
		this.print = print;
		this.dependencies = dependencies;
		this.result = result;

		// make sure this.tables.default is set instead of table
		// maybe we dont need this
		if (!isEmpty(table)) {
			this.tables.default = table;
		}
	}
	/**
	 * validate fields before saving
	 * @param {Object} properties new attributes to save
	 * @returns {Object} error information
	 */
	validate(properties) {
		const error = { fields: [], general: '' };

		if (properties.title === '') {
			error.fields.push({ field: 'title', message: 'Title cannot be blank' });
			error.general += 'Title cannot be blank. ';
		}

		if (isEmpty(properties.tables) && isEmpty(properties.macro)) {
			error.fields.push({ field: 'tables', message: 'Both Tables and Macro cannot be empty' });
			error.general += 'Both Tables and Macro cannot be empty. ';
		}

		if (!isEmpty(error.fields) || !isEmpty(error.general)) {
			return error;
		}
		return true;
	}
	/**
	 * Show the results as a string
	 * @todo make this nicer/clearer #23
	 * Alternate: write a template to use in the views?
	 * @param {Boolean} [simple=false] if true only output the first result label
	 * @returns {String} the results
	 */
	niceString(simple = false) {
		const r = this.result; // array
		if (isString(r) || !Array.isArray(r) || r.length === 0) {
			return '';
		}

		if (simple) {
			return r[0]['result'];
		} // @todo maybe use shift() instead, if editing this array won't be a problem. (else we could clone it...)

		let output = '';
		const print_opt = (this.print) ? this.print : {};
		r.forEach((v) => {
			if (print_opt[v.table]) {
				if (!print_opt[v.table].hide_table || print_opt[v.table].hide_table === 0) {
					output += `${capitalize(v.table)}: `;
				}
				if (!print_opt[v.table].hide_result || print_opt[v.table].hide_result === 0) {
					output += `${capitalize(v.result)}\n`;
				}
				if (!print_opt[v.table].hide_desc || print_opt[v.table].hide_desc === 0) {
					if (v.desc !== '') {
						output += `${v.desc}\n`;
					}
				}
			} else {
				if (v.table === 'default') {
					output += `${capitalize(v.result)}\n`;
				} else {
					output += `${capitalize(v.table)}: ${capitalize(v.result)}\n`;
				}
				if (v.desc !== '') {
					output += `${v.desc}\n`;
				}
			}
		});
		return output.trim(); // trim off final linebreak
	}
	/**
	 * outputs the json data for the table (import/export)
	 * @param {Boolean} [editmode=false] if false empty properties will be stripped out
	 * @returns {Object} table attributes
	 */
	outputObject(editmode = false) {
		// clone the data, this will strip out any functions too.
		const att = JSON.parse(JSON.stringify(this));
		const props = Object.keys(att);
		props.forEach((k) => {
			if (!editmode && isEmpty(att[k])) {
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
	}
	/**
	 * outputs the json data for the table (import/export)
	 * @param {Boolean} [editmode=false] if false empty properties will be stripped out
	 * @param {Boolean} [compress=false] if true JSON will not have indentation, etc.
	 * @returns {String} table properties in JSON
	 */
	outputCode(editmode = false, compress = false) {
		const obj = this.outputObject(editmode);

		if (compress) {
			return JSON.stringify(obj);
		}
		return JSON.stringify(obj, null, 2);
	}
	/**
	 * Get an object result in case we only have the label and need other data from it
	 * @param {String} label The item we are looking for
	 * @param {String} [table=default] the table to search
	 * @returns {Object} the object associated with the label or an empty one
	 */
	findObject(label, table = 'default') {
		const t = this.tables[table];
		if (isEmpty(t)) {
			return {};
		}
		if (t[label]) {
			return t[label];
		}
		if (Array.isArray(t)) {
			const obj = t.find((v) => {
				return v.label === label;
			});
			return isUndefined(obj) ? {} : obj;
		}
		return {};
	}
	/**
	  * find the result element for a specific table/subtable
	  * only works if we have already generated a result
	  * @param {String} table The table to look for
	  * @returns {Object} result element for specified table (or empty)
	  */
	findResultElem(table = 'default') {
		const obj = this.result.find((v) => {
			return v.table === table;
		});
		return isUndefined(obj) ? {} : obj;
	}
	/**
	 * find the dependent tables to get full results for this table
	 * @return {Array} table keys
	 */
	findDependencies() {
		// check field first, if it's not null we'll trust it...?
		if (this.dependencies !== null) {
			return this.dependencies;
		}
		// iterate over the tables and look for table tokens
		let dep = [];
		const tokenRegExp = new RegExp('({{2}.+?}{2})', 'g');
		const tnames = Object.keys(this.tables);
		tnames.forEach((n) => {
			// n is sub/table name
			const table = this.tables[n];
			table.forEach((r) => {
				// r is object of table potential result
				if (!r.label) { return; }
				const tokens = r.label.match(tokenRegExp);
				if (tokens !== null) {
					tokens.forEach((token) => {
						const parts = token.replace('{{', '').replace('}}', '').split(':');
						if (parts.length > 1 && parts[0] === 'table' && parts[1] !== 'this') {
							dep.push(parts[1]);
						}
					});
				}
			});
		});
		dep = dep.reduce((a, b) => {
			if (a.indexOf(b) < 0) { a.push(b); }
			return a;
		}, []);
		this.dependencies = dep;
		return dep;
	}
}

export default RandomTable;
