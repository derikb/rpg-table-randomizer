import { isEmpty, capitalize, isUndefined, isString, isObject } from './r_helpers.js';


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
	/**
	 * Custom JSON handler to strip defaults.
	 * @returns {Object}
	 */
	toJSON() {
		let returnObj = {
			table: this.table
		};
		if (this.hide_table) {
			returnObj.hide_table = true;
		}
		if (this.hide_result) {
			returnObj.hide_result = true;
		}
		if (this.hide_desc) {
			returnObj.hide_desc = true;
		}
		return returnObj;
	}
}


/**
 * Class for entries in a random (sub)table.
 * This normalizes the various options into a class that makes the other code simpler.
 */
class RandomTableEntry {
	/**
	 *
	 * @property {String} label Basic string label. Only required field. Can include tokens.
	 * @property {Boolean} [print=true] Should the result be included in the output.
	 * @property {String} [description] Extra description for the label.
	 * @property {String[]} [subtable] Other tables to roll on.
	 * @proparty {Number} [weight=1] Number to weight entry relative to other entries.
	 */
	constructor({
		label = '',
		print = true,
		description = '',
		subtable = [],
		weight = 1
	}) {
		this.label = label;
		this.print = !(print === false || print == 0);
		this.description = description;
		this.weight = parseInt(weight, 10);
		if (this.weight <= 0) {
			this.weight = 1;
		}
		// Make sure it's an array of string.
		if (isString(subtable)) {
			this.subtable = [subtable];
		} else if (Array.isArray(subtable)) {
			this.subtable = subtable.map((el) => { return el.toString(); });
		}
	}
	/**
	 * Custom JSON handler because Map doesn't JSON stringify automatically.
	 * @returns {Object}
	 */
	toJSON() {
		let returnObj = {};
		for (const property in this) {
			let value = this[property];
			if (isEmpty(value)) {
				continue;
			}
			returnObj[property] = value;
		}
		return returnObj;
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
	 * @property {String[]} [sequence] tables to roll on as default.
	 * @property {String[]|Object[]} [table] default table. array of strings or objects. removed after initialization.
	 * @property {Object} [tables] a property for each subtables.
	 * @property {RandomTableEntries[]} tables[subtablename] Entries for subtables.
	 * @property {String[]} [macro] for tables that are only used to aggregate result from other tables, this array consists of table keys to be rolled on in order
	 * @property {Map[DisplayOptions]} [display_opt] Display options for the subtables.
	 * @property @deprecated {Object} [print] Backwards compatible. Key => Object data for display options.
	 * @property {Array} [dependencies] table keys that are needed to get full results from this table
	 *
	 * Note the Constructor args are not exactly the same as the properties. Some type changes are made to convert data.
	 */
	constructor({
		id = 0,
		key = null,
		title = '',
		author = '',
		description = '',
		source = '',
		tags = [],
		sequence = [],
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
		this.macro = macro;
		this.dependencies = dependencies;

		this._normalizeTables(tables, table);

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
				if (data instanceof DisplayOptions) {
					this.display_opt.set(key, data);
					return;
				}
				const opt = new DisplayOptions(data);
				this.display_opt.set(key, opt);
			}
		});
	}
	toString() {
		return this.title;
	}
	/**
	 * Make sure table entries are all RandomTableEntry objects.
	 * @param {Array} data
	 * @returns RandomTableEntry[]
	 */
	_normalizeTable(data) {
		const entries = [];
		data.forEach((d) => {
			if (isEmpty(d)) {
				return;
			}
			if (isString(d)) {
				entries.push(new RandomTableEntry({
					label: d
				}));
				return;
			}
			if (d instanceof RandomTableEntry) {
				entries.push(d);
				return;
			}
			entries.push(new RandomTableEntry(d));
		});
		return entries;
	}
	/**
	 * Normalize the tables/table constructor data.
	 * @param {Object} tables
	 * @param {Array} table
	 * @returns
	 */
	_normalizeTables(tables, table) {
		if (isEmpty(tables) && isEmpty(table)) {
			return;
		}
		this.tables = {};
		if (isObject(tables)) {
			const subtableNames = Object.keys(tables);
			subtableNames.forEach((name) => {
				const data = tables[name];
				if (!Array.isArray(data)) {
					return;
				}
				this.tables[name] = this._normalizeTable(data);
			});
		}
		if (!isEmpty(table) && Array.isArray(table)) {
			this.tables.default = this._normalizeTable(table);
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
	 * All the subtable names.
	 * @returns {String[]}
	 */
	get subtableNames() {
		return Object.keys(this.tables);
	}
	/**
	 * Get entries for a specific subtable.
	 * @param {String} [name=default] Subtable name.
	 * @returns {RandomTableEntry[]}
	 */
	getSubtableEntries(name = 'default') {
		return this.tables[name] || [];
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
	 * Get an entry in case we only have the label and need other data from it
	 * @param {String} label The item we are looking for
	 * @param {String} [table=default] the table to search
	 * @returns {RandomTableEntry|null}
	 */
	findEntry(label, table = 'default') {
		const t = this.tables[table];
		if (isEmpty(t)) {
			return null;
		}
		const entry = t.find((e) => {
			return e.label == label;
		});
		if (!entry) {
			return null;
		}
		return entry;
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
			table.forEach((result) => {
				const tokens = result.label.match(tokenRegExp);
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
				const mapArray = Array.from(value.values());
				if (mapArray.length > 0) {
					returnObj[property] = Array.from(value.values());
				}
				continue;
			}
			if (isEmpty(value)) {
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
	/**
	 * Custom JSON handler to strip empty props.
	 * @returns {Object}
	 */
	toJSON() {
		let returnObj = {};
		for (const property in this) {
			let value = this[property];
			if (isEmpty(value)) {
				continue;
			}
			returnObj[property] = value;
		}
		return returnObj;
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
			return this.results.map((r) => { return r.toString(); }).join(' ');
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
				const mapArray = Array.from(value.values());
				if (mapArray.length > 0) {
					returnObj[property] = Array.from(value.values());
				}
				continue;
			}
			if (isEmpty(value)) {
				continue;
			}
			returnObj[property] = value;
		}
		return returnObj;
	}
}

export default RandomTable;

export {
	RandomTableEntry,
	RandomTable,
	DisplayOptions,
	RandomTableResult,
	RandomTableResultSet
};
