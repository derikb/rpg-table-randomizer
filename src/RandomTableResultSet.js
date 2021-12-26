import { capitalize, defaultToJSON } from './r_helpers.js';
import RandomTableResult from './RandomTableResult.js';

/**
 * Set of table results.
 */
export default class RandomTableResultSet {
    /**
     * @property {String} title Title from the RandomTable parent
     * @property {RandomTableResult[]} results Randomized results.
     * @property {Map[DisplayOptions]} displayOptions Display settings from the RandomTable parent.
     */
    constructor ({
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
    addResult (data) {
        if (data instanceof RandomTableResult) {
            this.results.push(data);
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
        return defaultToJSON.call(this);
    }
}
