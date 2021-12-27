/**
 * Display options for subtable results. Used in RandomTable and RandomTableResultSet
 */
export default class DisplayOptions {
    /**
     *
     * @property {String} table Subtable name.
     * @property {Boolean} hide_table Hide the subtable name.
     * @property {Boolean} hide_result Hide the result.
     * @property {Boolean} hide_desc Hide the description field.
     */
    constructor({ table, hide_table, hide_result, hide_desc }: {
        table?: string;
        hide_table?: boolean;
        hide_result?: boolean;
        hide_desc?: boolean;
    });
    table: string;
    /** Accept true, 1, or '1' to set these properties */
    hide_table: boolean;
    hide_result: boolean;
    hide_desc: boolean;
    /**
     * Custom JSON handler to strip defaults.
     * @returns {Object}
     */
    toJSON(): any;
}
