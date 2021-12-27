/**
 * Class for results from RandomTable
 */
export default class RandomTableResult {
    /**
     * @property {String} table Title of subtable.
     * @property {String} result Randomized result label.
     * @property {String} desc Extra result description.
     */
    constructor({ table, result, desc }: {
        table?: string;
        result?: string;
        desc?: string;
    });
    table: string;
    result: string;
    desc: string;
    /**
     * Is this from the "default" table.
     */
    get isDefault(): boolean;
    /**
     * Is this an error result.
     */
    get isError(): boolean;
    toString(): string;
    /**
     * Custom JSON handler to strip empty props.
     * @returns {Object}
     */
    toJSON(): any;
}
