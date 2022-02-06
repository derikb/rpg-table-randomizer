import { capitalize, defaultToJSON } from './r_helpers.js';
import RandomTableResult from './RandomTableResult.js';
import TableErrorResult from './TableErrorResult.js';
import DisplayOptions from './DisplayOptions.js';

/**
 * Set of table results.
 */
export default class RandomTableResultSet {
    /**
     * @property {String} key RandomTable key
     * @property {String} title Title from the RandomTable parent
     * @property {RandomTableResult[]} results Randomized results.
     * @property {Map[DisplayOptions]|Object} displayOptions Display settings from the RandomTable parent.
     */
    constructor ({
        key = '',
        title = '',
        results = [],
        displayOptions = new Map()
    }) {
        this.key = key;
        this.title = title;
        this.results = [];
        results.forEach((r) => {
            this.addResult(r);
        });
        if (displayOptions instanceof Map) {
            this.displayOptions = displayOptions;
        } else {
            this.displayOptions = new Map();
            Object.keys(displayOptions).forEach((key) => {
                const data = displayOptions[key];
                const tableName = data.table || '';
                if (tableName) {
                    if (data instanceof DisplayOptions) {
                        this.displayOptions.set(tableName, data);
                        return;
                    }
                    this.displayOptions.set(tableName, new DisplayOptions(data));
                }
            });
        }
    }
    /**
     * Add a result to the set.
     * @param {RandomTableResult|TableErrorResult|object} data
     * @returns
     */
    addResult (data) {
        if (data instanceof RandomTableResult || data instanceof TableErrorResult) {
            this.results.push(data);
            return;
        }
        if (data.className === 'TableErrorResult') {
            this.results.push(new TableErrorResult(data));
            return;
        }
        this.results.push(new RandomTableResult(data));
    }

    get isSimple () {
        return this.results.length === 1;
    }

    /**
     * Find the result for a specific table/subtable
     * @param {String} table The table to look for
     * @returns {RandomTableResult|null}
     */
    findResultByTable (table = 'default') {
        const obj = this.results.find((v) => {
            return v.table === table;
        });
        return !obj ? null : obj;
    }
    /**
     * Output the set as a string.
     * @param {Boolean} simple Simplify the output (just the result labels)
     * @returns
     */
    niceString (simple = false) {
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
    toString () {
        return this.niceString();
    }
    /**
     * Custom JSON handler because Map doesn't JSON stringify automatically.
     * @returns {Object}
     */
    toJSON () {
        const obj = defaultToJSON.call(this);
        obj.className = 'RandomTableResultSet';
        return obj;
    }
}
