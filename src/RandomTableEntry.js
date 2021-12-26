import { isString, defaultToJSON } from './r_helpers.js';

/**
 * Class for entries in a random (sub)table.
 * This normalizes the various options into a class that makes the other code simpler.
 */
export default class RandomTableEntry {
    /**
     *
     * @property {String} label Basic string label. Only required field. Can include tokens.
     * @property {Boolean} [print=true] Should the result be included in the output.
     * @property {String} [description] Extra description for the label.
     * @property {String[]} [subtable] Other tables to roll on.
     * @property {Number} [weight=1] Number to weight entry relative to other entries.
     */
    constructor ({
        label = '',
        print = true,
        description = '',
        subtable = [],
        weight = 1
    }) {
        this.label = label;
        this.print = !(print === false || print === '0' || print === 0);
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
    toJSON () {
        return defaultToJSON.call(this);
    }
}
