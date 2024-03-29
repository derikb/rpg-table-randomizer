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
    constructor({ key, title, results, displayOptions }: {
        key?: string;
        title?: string;
        results?: any[];
        displayOptions?: any;
    });
    key: string;
    title: string;
    results: any[];
    displayOptions: any;
    /**
     * Add a result to the set.
     * @param {RandomTableResult|TableErrorResult|object} data
     * @returns
     */
    addResult(data: RandomTableResult | TableErrorResult | object): void;
    get isSimple(): boolean;
    /**
     * Find the result for a specific table/subtable
     * @param {String} table The table to look for
     * @returns {RandomTableResult|null}
     */
    findResultByTable(table?: string): RandomTableResult | null;
    /**
     * Output the set as a string.
     * @param {Boolean} simple Simplify the output (just the result labels)
     * @returns
     */
    niceString(simple?: boolean): string;
    /**
     * Simple base output of result set.
     */
    toString(): string;
    /**
     * Custom JSON handler because Map doesn't JSON stringify automatically.
     * @returns {Object}
     */
    toJSON(): any;
}
import RandomTableResult from "./RandomTableResult.js";
import TableErrorResult from "./TableErrorResult.js";
