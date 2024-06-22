import { isEmpty, isString, isObject, defaultToJSON } from './r_helpers.js';
import DisplayOptions from './DisplayOptions.js';
import RandomTableEntry from './RandomTableEntry.js';
import { getWeightedRandom } from './randomizer.js';

/**
 * RandomTable: Model for tables used by TableRoller
 */
export default class RandomTable {
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
     * @property {String[]} [macro] for tables that are only used to aggregate result from other tables, this array consists of table keys and optionsl subtables to be rolled on in order
     * @property {Map[DisplayOptions]} [display_opt] Display options for the subtables.
     * @property {Array} [dependencies] table keys that are needed to get full results from this table
     *
     * Note the Constructor args are not exactly the same as the properties. Some type changes are made to convert data.
     */
    constructor ({
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
    toString () {
        return this.title;
    }
    /**
     * Make sure table entries are all RandomTableEntry objects.
     * @param {Array} data
     * @returns RandomTableEntry[]
     */
    _normalizeTable (data) {
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
            if (isObject(d)) {
                entries.push(new RandomTableEntry(d));
            }
        });
        return entries;
    }
    /**
     * Normalize the tables/table constructor data.
     * @param {Object} tables
     * @param {Array} table
     * @returns
     */
    _normalizeTables (tables, table) {
        if (isEmpty(tables) && isEmpty(table)) {
            return;
        }
        this.tables = {};
        // put default table in first.
        if (!isEmpty(table) && Array.isArray(table)) {
            this.tables.default = this._normalizeTable(table);
        }
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
    }
    /**
     * Basic sequence of table rolls.
     * Either the start, the default sequence, the default table, or just the first one.
     * @param {String} start Subtable name to start with.
     * @returns {String[]}
     */
    getSequence (start = '') {
        if (start !== '') {
            return [start];
        }
        if (this.sequence.length === 0) {
            if (this.tables.default) {
                return ['default'];
            }
            return [this.subtableNames[0]];
        }
        if (this.sequence[0] === 'rollall') {
            return this.subtableNames;
        }
        return this.sequence;
    }
    /**
     * All the subtable names.
     * @returns {String[]}
     */
    get subtableNames () {
        return Object.keys(this.tables);
    }
    /**
     * Get entries for a specific subtable.
     * @param {String} [name=default] Subtable name.
     * @returns {RandomTableEntry[]}
     */
    getSubtableEntries (name = 'default') {
        return this.tables[name] || [];
    }
    /**
     * Get a random entry from a subtable.
     * @param {String} subtableName
     * @returns {RandomTableEntry|null}
     */
    getRandomEntry (subtableName) {
        const entries = this.getSubtableEntries(subtableName);
        if (entries.length === 0) {
            return null;
        }
        const values = [];
        const weights = [];
        entries.forEach((entry) => {
            weights.push(entry.weight);
            values.push(entry);
        });
        return getWeightedRandom(values, weights);
    }
    /**
     * Get an entry in case we only have the label and need other data from it
     * @param {String} label The item we are looking for
     * @param {String} [table=default] the table to search
     * @returns {RandomTableEntry|null}
     */
    findEntry (label, table = 'default') {
        const t = this.tables[table];
        if (!t) {
            return null;
        }
        const entry = t.find((e) => {
            return e.label === label;
        });
        if (!entry) {
            return null;
        }
        return entry;
    }
    /**
     * Find the dependent tables to get full results for this table
     * @return {Array} table keys
     */
    findDependencies () {
        // check field first, if it's not null we'll trust it...?
        if (this.dependencies !== null) {
            return this.dependencies;
        }
        // iterate over the tables and look for table tokens
        let dep = [];

        // Check macro
        this.macro.forEach((macro) => {
            const parts = macro.split(':');
            if (parts.length > 0 && parts[0] !== 'this') {
                dep.push(parts[0]);
            }
        });
        const tokenRegExp = /({{2}.+?}{2})/g;
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
    toJSON () {
        const obj = defaultToJSON.call(this);
        obj.className = 'RandomTable';
        return obj;
    }
}
