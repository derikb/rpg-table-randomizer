/* eslint-disable no-useless-escape */
import { isEmpty, isUndefined } from './r_helpers.js';
import { RandomTable, RandomTableResult, RandomTableResultSet } from './random_table.js';
import { getDiceResult } from './dice_roller.js';
import { getWeightedRandom } from './randomizer.js';
import TableError from './TableError.js';

/**
 * Define the regex to find tokens
 * This looks for anything between double brackets.
 * Note: this is duplicated in RandomTable.findDependencies() so if updated, update it there too
 */
const tokenRegExp = /({{2}.+?}{2})/g;

/**
 * TableRoller
 * Handles rolling on tables and tokens in tables/results.
 * @constructor
 */
class TableRoller {
    constructor ({
        token_types = {}
    }) {
        this.token_types = {
            roll: this._defaultRollToken.bind(this),
            table: this._defaultTableToken.bind(this)
        };
        Object.keys(token_types).forEach((token) => {
            this.token_types[token] = token_types[token];
        });
    }
    /**
     * Return an error result
     * @param {String} error Error message
     * @returns {RandomTableResult}
     */
    _getErrorResult (error = '') {
        return new RandomTableResult({
            table: 'Error',
            result: error
        });
    }
    /**
     * Return a result set with an error.
     * @param {String} error Error message
     * @returns {RandomTableResultSet}
     */
    _getErrorResultSet (error = '') {
        return new RandomTableResultSet({
            results: [
                this._getErrorResult(error)
            ]
        });
    }
    /**
     * Random selection from TableEntries, wrapper for getWeightedRandom that processes the data into values/weights arrays
     * @param {RandomTableEntry[]} entries Table entries.
     * @returns {RandomTableEntry|null} the randomly selected entry
     */
    _rollRandomEntry (entries) {
        const values = [];
        const weights = [];

        if (!Array.isArray(entries)) {
            return null;
        }
        entries.forEach((entry, k, l) => {
            weights.push(entry.weight);
            values.push(entry);
        });

        return getWeightedRandom(values, weights);
    }
    /**
     * Get a result from a table/subtable in a RandomTable object
     * DANGER: you could theoretically put yourself in an endless loop if the data were poorly planned
     * Calling method try to catch RangeError to handle that possibility.
     * @param {RandomTable} rtable the RandomTable object
     * @param {String} table table to roll on
     * @returns {RandomTableResult[]}
     */
    _selectFromTable (rtable, table) {
        if (!(rtable instanceof RandomTable)) {
            return [this._getErrorResult('Invalid table.')];
        }

        let o = []; // Results
        const entries = rtable.getSubtableEntries(table); // the table/subtable
        if (entries.length === 0) {
            return [this._getErrorResult('Invalid table name.')];
        }
        const entry = this._rollRandomEntry(entries);

        // if print is false we suppress the output from this table
        // (good for top-level tables that have subtables prop set)
        if (entry.print) {
            // replace any tokens
            const t_result = this.findToken(entry.label, rtable);
            o.push(new RandomTableResult({ table: table, result: t_result, desc: entry.description }));
        }

        // are there subtables to roll on?
        if (entry.subtable.length === 0) {
            // no subtables
            return o;
        }

        // Select from each subtable and add to results.
        entry.subtable.forEach((subtableName) => {
            const r2 = this._selectFromTable(rtable, subtableName);
            o = o.concat(r2);
        });
        return o;
    }
    /**
     * Get results array for macro setting of a table.
     * @param {RandomTable} rtable Table with macro set.
     * @returns {RandomTableResult[]}
     */
    _getTableMacroResult (rtable) {
        const results = [];
        try {
            rtable.macro.forEach((tableKey) => {
                const set = this.getTableResultSetByKey(tableKey);
                const result = new RandomTableResult({ table: tableKey, result: set.niceString() });
                results.push(result);
            });
        } catch (e) {
            if (e instanceof RangeError) {
                // This could be an infinite loop of table results referencing each other.
                results.push(this._getErrorResult(e.message));
            } else {
                throw e;
            }
        }
        return results;
    }
    /**
     * Generate a result from a RandomTable object
     * @param {RandomTable} rtable the RandomTable
     * @param {String} [start=''] subtable to roll on
     * @return {RandomTableResult[]}
     */
    getTableResult (rtable, start = '') {
        if (!(rtable instanceof RandomTable)) {
            return [
                this._getErrorResult('No table found to roll on.')
            ];
        }
        let results = [];

        // if macro is set then we ignore a lot of stuff
        if (rtable.macro.length > 0) {
            return this._getTableMacroResult(rtable);
        }

        // we look in the start table for what to roll if the start wasn't explicitly set in the call
        let sequence = (!start) ? rtable.sequence : [start];

        if (sequence[0] === 'rollall') {
            // roll all the tables in order
            sequence = rtable.subtableNames;
        }

        try {
            if (sequence.length === 0) {
                // if no start attribute
                // try for "default" table
                if (typeof rtable.tables.default !== 'undefined') {
                    results = this._selectFromTable(rtable, 'default');
                } else {
                    // select first item from tables
                    const tables = rtable.subtableNames;
                    results = this._selectFromTable(rtable, tables[0]);
                }
                return results;
            }

            sequence.forEach((seq) => {
                const r = this._selectFromTable(rtable, seq);
                results = results.concat(r);
            });
        } catch (e) {
            // In case of infinite recursion
            if (e instanceof RangeError) {
                results.push(this._getErrorResult(e.message));
            } else {
                throw e;
            }
        }

        return results;
    }

    /**
     * Get result set from a table based on the key.
     * @param {String} tableKey
     * @param {String} table
     * @returns {RandomTableResultSet}
     */
    getTableResultSetByKey (tableKey, table = '') {
        try {
            const rtable = this.getTableByKey(tableKey);
            const results = this.getTableResult(rtable, table);
            return new RandomTableResultSet({
                title: rtable.title,
                results: results,
                displayOptions: rtable.display_opt
            });
        } catch (e) {
            if (e instanceof TableError) {
                return this._getErrorResultSet(e.message);
            } else {
                // Rethrow unexpected errors
                throw e;
            }
        }
    }
    /**
     * Get result set from a table based on the key.
     * @param {RandomTable} rtable Main table object.
     * @param {String} [table] Subtable
     * @returns {RandomTableResultSet}
     */
    getResultSetForTable (rtable, table = '') {
        if (!(rtable instanceof RandomTable)) {
            return this._getErrorResultSet(`Invalid table data.`);
        }
        const results = this.getTableResult(rtable, table);
        return new RandomTableResultSet({
            title: rtable.title,
            results: results,
            displayOptions: rtable.display_opt
        });
    }
    /**
     * Perform token replacement.  Only table and roll actions are accepted
     * @param {String} token A value passed from findToken containing a token(s) {{SOME OPERATION}} Tokens are {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{roll:1d6+2}} (etc) (i.e. {{table:colonial_occupations:laborer}} {{table:color}} also generate names with {{name:flemish}} (surname only) {{name:flemish:male}} {{name:dutch:female}}
     * @param {RandomTable|null} curtable RandomTable the string is from (needed for "this" tokens) or null
     * @returns {RandomTableResultSet|RandomTableResultSet[]|DiceResult|String|Any} The result of the token or else just the token (in case it was a mistake or at least to make the error clearer)
     */
    convertToken (token, curtable = null) {
        let parts = token.replace('{{', '').replace('}}', '').split(':');
        parts = parts.map((el) => {
            return el.trim();
        });
        if (parts.length === 0) {
            return token;
        }

        // look for a token type we can run
        try {
            if (this.token_types[parts[0]]) {
                return this.token_types[parts[0]](parts, token, curtable);
            } else {
                return token;
            }
        } catch (e) {
            if (e instanceof RangeError) {
                // This could be an infinite loop of table results referencing each other.
                return this._getErrorResultSet(e.message);
            } else {
                throw e;
            }
        }
    }
    /**
     * Look for tokens to perform replace action on them.
     * @param {String} entryLabel Usually a label from a RandomTableEntry
     * @param {RandomTable|null} curtable RandomTable the string is from (needed for "this" tokens) or null
     * @returns {String} String with tokens replaced (if applicable)
     */
    findToken (entryLabel, curtable = null) {
        if (isEmpty(entryLabel)) {
            return '';
        }
        const newstring = entryLabel.replace(tokenRegExp, (token) => {
            return this.convertToken(token, curtable).toString();
        });
        return newstring;
    }
    /**
     * Since tables are stored outside of this module, this function allows for the setting of a function which will be used to lookup a table by it's key
     * @param {Function} lookup a function that takes a table key and returns a RandomTable or null
     */
    setTableKeyLookup (lookup) {
        this._customGetTableByKey = lookup;
    }
    /**
     * Placeholder that should be replaced by a function outside this module
     * @param {String} key human readable table identifier
     * @return {null} nothing, when replaced this function should return a table object
     */
    _customGetTableByKey (key) {
        return null;
    }
    /**
     * Return a table based on it's key.
     * This requires calling setTableKeyLookup and setting a lookup method
     * That returns a RandomTable object or null.
     * @param {String} key human readable table identifier
     * @returns {RandomTable}
     * @throws {TableError}
     */
    getTableByKey (key) {
        if (!key) {
            throw new TableError('No table key.');
        }
        const table = this._customGetTableByKey(key);
        if (!table || !(table instanceof RandomTable)) {
            throw new TableError(`No table found for key: ${key}`);
        }
        return table;
    }
    /**
     * Add a token variable
     * @param {String} name Name of the token (used as first element).
     * @param {Function} process Function to return token replacement value function is passed the token_parts (token split by ":"),  original full_token, current table name
     */
    registerTokenType (name, process) {
        this.token_types[name] = process;
    }
    /**
     * Dice roll token.
     * @returns {DiceResult}
     */
    _defaultRollToken (token_parts, full_token = '', curtable = null) {
        return getDiceResult(token_parts[1]);
    }
    /**
     * Table token lookup in the form:
     * {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{table:SOMETABLE:SUBTABLE*2}} (roll subtable 2 times)
     * @param {String[]} token_parts Token split by :
     * @param {String} full_token Original token
     * @param {RandomTable|null} curtable Current table or null.
     * @returns {RandomTableResultSet|RandomTableResultSet[]} One or more result sets.
     */
    _defaultTableToken (token_parts, full_token, curtable = null) {
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
        let rtable = null;
        if (token_parts[1] === 'this') {
            if (!curtable) {
                return full_token;
            }
            // reroll on same table
            rtable = curtable;
        } else {
            // Table lookup
            try {
                rtable = this.getTableByKey(token_parts[1]);
            } catch (e) {
                if (e instanceof TableError) {
                    return full_token;
                } else {
                    // Rethrow unexpected errors
                    throw e;
                }
            }
        }

        if (typeof token_parts[2] !== 'undefined' && token_parts[2].indexOf('*') !== -1) {
            const x = token_parts[2].split('*');
            token_parts[2] = x[0];
            multiplier = x[1];
        }
        const subtable = (isUndefined(token_parts[2])) ? '' : token_parts[2];

        const results = [];
        for (let i = 1; i <= multiplier; i++) {
            results.push(this.getResultSetForTable(rtable, subtable));
        }
        return results.length === 1 ? results[0] : results;
    }
}

export default TableRoller;
