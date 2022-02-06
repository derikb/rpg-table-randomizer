import { defaultToJSON } from './r_helpers.js';

/**
 * Class for results from RandomTable
 */
export default class RandomTableResult {
    /**
     * @property {String} key Key for RandomTable.
     * @property {String} table Title of subtable.
     * @property {String} result Randomized result label.
     * @property {String} desc Extra result description.
     */
    constructor ({
        key = '',
        table = '',
        result = '',
        desc = ''
    }) {
        this.key = key;
        this.table = table;
        this.result = result;
        this.desc = desc;
    }
    /**
     * Is this from the "default" table.
     */
    get isDefault () {
        return this.table === 'default';
    }
    /**
     * Is this an error result.
     */
    get isError () {
        return false;
    }
    toString () {
        return this.result;
    }
    /**
     * Custom JSON handler to strip empty props.
     * @returns {Object}
     */
    toJSON () {
        const obj = defaultToJSON.call(this);
        obj.className = 'RandomTableResult';
        return obj;
    }
}
