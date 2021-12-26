/**
 * Class for entries in a random (sub)table.
 * This normalizes the various options into a class that makes the other code simpler.
 */
export class RandomTableEntry {
    /**
     *
     * @property {String} label Basic string label. Only required field. Can include tokens.
     * @property {Boolean} [print=true] Should the result be included in the output.
     * @property {String} [description] Extra description for the label.
     * @property {String[]} [subtable] Other tables to roll on.
     * @property {Number} [weight=1] Number to weight entry relative to other entries.
     */
    constructor({ label, print, description, subtable, weight }: {
        label?: string;
        print?: boolean;
        description?: string;
        subtable?: any[];
        weight?: number;
    });
    label: string;
    print: boolean;
    description: string;
    weight: number;
    subtable: any[];
    /**
     * Custom JSON handler because Map doesn't JSON stringify automatically.
     * @returns {Object}
     */
    toJSON(): any;
}
