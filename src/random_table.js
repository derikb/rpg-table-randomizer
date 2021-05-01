import { isEmpty, capitalize, isUndefined } from './r_helpers.js';


/**
 * Display options for subtable results. Used in RandomTable and RandomTableResultSet
 */
class DisplayOptions {
	/**
	 *
	 * @property {String} table Subtable name.
	 * @property {Boolean} hide_table Hide the subtable name.
	 * @property {Boolean} hide_result Hide the result.
	 * @property {Boolean} hide_desc Hide the description field.
	 */
	constructor({
		table = '',
		hide_table = false,
		hide_result = false,
		hide_desc = false
	}) {
		this.table = table;
		/** Accept true, 1, or '1' to set these properties */
		this.hide_table = (hide_table === true || hide_table == 1);
		this.hide_result = (hide_result === true || hide_result == 1);
		this.hide_desc = (hide_desc === true || hide_desc == 1);
	}
}

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
	 * @property {String[]} [tags] subject tags
	 * @property {String|String[]|Object[]} [sequence] tables to roll on. if array it can be an array of strings (table names) or objects (two properties table: the table to roll on and times: the number of times to roll)
	 * @property {String[]|Object[]} [table] default table. array of strings or objects. removed after initialization.
	 * @property {Object} [tables] a property for each subtables. if table property is not set then the first propery of this Object is used to start rolling
	 * @property {String[]} [macro] for tables that are only used to aggregate result from other tables, this array consists of table keys to be rolled on in order
	 * @property {Map[DisplayOptions]} [display_opt] Display options for the subtables.
	 * @property @deprecated {Object} [print] Backwards compatible. Key => Object data for display options.
	 * @property {Array} [dependencies] table keys that are needed to get full results from this table
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
		table = null,
		display_opt = []
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
		this.dependencies = dependencies;

		this.display_opt = new Map();
		// Backwards compatible.
		if (Object.keys(print).length > 0) {
			Object.keys(print).forEach((key) => {
				const data = print[key];
				data.table = key;
				const opt = new DisplayOptions(data);
				this.display_opt.set(key, opt);
			});
		}
		display_opt.forEach((data) => {
			const key = data.table || '';
			if (key) {
				const opt = new DisplayOptions(data);
				this.display_opt.set(key, opt);
			}
		});

		// make sure this.tables.default is set instead of table
		// maybe we dont need this
		if (!isEmpty(table)) {
			this.tables.default = table;
		}
	}
	toString() {
		return this.title;
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
	/**
	 * Custom JSON handler because Map doesn't JSON stringify automatically.
	 * @returns {Object}
	 */
	toJSON() {
		let returnObj = {};
		for (const property in this) {
			let value = this[property];
			if (value instanceof Map) {
				returnObj[property] = Array.from(value.values());
				continue;
			}
			returnObj[property] = value;
		}
		return returnObj;
	}
}

/**
 * Class for results from RandomTable
 */
 class RandomTableResult {
    /**
     * @property {String} table Title of subtable.
     * @property {String} result Randomized result label.
     * @property {String} desc Extra result description.
     */
    constructor({
        table = '',
        result = '',
        desc = ''
    }) {
        this.table = table;
        this.result = result;
        this.desc = desc;
    }
    /**
     * Is this from the "default" table.
     */
    get isDefault() {
        return this.table === 'default';
    }
    /**
     * Is this an error result.
     */
    get isError() {
        return this.table == 'Error';
    }
    toString() {
        return this.result;
    }
}
/**
 * Set of table results.
 */
class RandomTableResultSet {
    /**
     * @property {String} title Title from the RandomTable parent
     * @property {RandomTableResult[]} results Randomized results.
     * @property {Map[DisplayOptions]} displayOptions Display settings from the RandomTable parent.
     */
    constructor({
        title = '',
        results = [],
        displayOptions = new Map()
    }) {
        this.title = title;
        this.results = [];
        results.forEach((r) => {
            this.addResult(r);
        });
		if (displayOptions instanceof Map) {
			this.displayOptions = displayOptions;
		} else {
			this.displayOptions = new Map();
		}
    }
    /**
     * Add a result to the set.
     * @param {RandomTableResult|object} data
     * @returns
     */
    addResult(data) {
        if (data instanceof RandomTableResult) {
            this.results.push(data);
            return;
        }
        this.results.push(new RandomTableResult(data));
    }

    get isSimple() {
        return this.results.length == 1;
    }

    /**
     * Find the result for a specific table/subtable
     * @param {String} table The table to look for
     * @returns {RandomTableResult|null}
     */
	findResultByTable(table = 'default') {
		const obj = this.results.find((v) => {
			return v.table === table;
		});
		return isUndefined(obj) ? null : obj;
	}

    niceString(simple = false) {
		if (this.results.length === 0) {
			return '';
		}

		if (simple) {
			return this.results[0].toString();
		}

		let output = '';
		this.results.forEach((result) => {
            if (result.isError) {
                output += `Error: ${result.result}\n`;
                return;
            }
            const displayOpt = this.displayOptions.get(result.table);
			if (displayOpt) {
				if (!displayOpt.hide_table) {
					output += `${capitalize(result.table)}: `;
				}
				if (!displayOpt.hide_result) {
					output += `${capitalize(result.result)}\n`;
				}
				if (!displayOpt.hide_desc) {
					if (result.desc !== '') {
						output += `(${result.desc})\n`;
					}
				}
                return;
			}
            if (result.isDefault) {
                output += `${capitalize(result.result)}\n`;
            } else {
                output += `${capitalize(result.table)}: ${capitalize(result.result)}\n`;
            }
            if (result.desc !== '') {
                output += `${result.desc}\n`;
            }
		});
		return output.trim(); // trim off final linebreak
    }
	/**
	 * Simple base output of result set.
	 */
    toString() {
        return this.niceString();
    }
	/**
	 * Custom JSON handler because Map doesn't JSON stringify automatically.
	 * @returns {Object}
	 */
	 toJSON() {
		let returnObj = {};
		for (const property in this) {
			let value = this[property];
			if (value instanceof Map) {
				returnObj[property] = Array.from(value.values());
				continue;
			}
			returnObj[property] = value;
		}
		return returnObj;
	}
}

export default RandomTable;

export {
	RandomTable,
	DisplayOptions,
	RandomTableResult,
	RandomTableResultSet
};
