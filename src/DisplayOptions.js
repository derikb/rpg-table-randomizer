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
    constructor ({
        table = '',
        hide_table = false,
        hide_result = false,
        hide_desc = false
    }) {
        this.table = table;
        /** Accept true, 1, or '1' to set these properties */
        this.hide_table = (hide_table === true || hide_table === '1' || hide_table === 1);
        this.hide_result = (hide_result === true || hide_result === '1' || hide_result === 1);
        this.hide_desc = (hide_desc === true || hide_desc === '1' || hide_desc === 1);
    }
    /**
     * Custom JSON handler to strip defaults.
     * @returns {Object}
     */
    toJSON () {
        const returnObj = {
            className: 'DisplayOptions',
            table: this.table
        };
        if (this.hide_table) {
            returnObj.hide_table = true;
        }
        if (this.hide_result) {
            returnObj.hide_result = true;
        }
        if (this.hide_desc) {
            returnObj.hide_desc = true;
        }
        return returnObj;
    }
}
