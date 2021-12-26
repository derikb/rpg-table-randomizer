/**
 * Set of table results.
 */
export class RandomTableResultSet {
    /**
     * @property {String} title Title from the RandomTable parent
     * @property {RandomTableResult[]} results Randomized results.
     * @property {Map[DisplayOptions]} displayOptions Display settings from the RandomTable parent.
     */
    constructor({ title, results, displayOptions }: {
        title?: string;
        results?: any[];
        displayOptions?: any;
    });
    title: string;
    results: any[];
    displayOptions: any;
    /**
     * Add a result to the set.
     * @param {RandomTableResult|object} data
     * @returns
     */
    addResult(data: RandomTableResult | object): void;
    get isSimple(): boolean;
    /**
     * Find the result for a specific table/subtable
     * @param {String} table The table to look for
     * @returns {RandomTableResult|null}
     */
    findResultByTable(table?: string): RandomTableResult | null;
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
