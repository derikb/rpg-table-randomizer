export default TableRoller;
/**
 * TableRoller
 * Handles rolling on tables and tokens in tables/results.
 * @constructor
 */
declare class TableRoller {
    constructor({ token_types }: {
        token_types?: {};
    });
    token_types: {
        roll: any;
        table: any;
    };
    /**
     * Return an error result
     * @param {String} error Error message
     * @returns {RandomTableResult}
     */
    _getErrorResult(error?: string): RandomTableResult;
    /**
     * Return a result set with an error.
     * @param {String} error Error message
     * @returns {RandomTableResultSet}
     */
    _getErrorResultSet(error?: string): RandomTableResultSet;
    /**
     * Random selection from TableEntries, wrapper for getWeightedRandom that processes the data into values/weights arrays
     * @param {RandomTableEntry[]} entries Table entries.
     * @returns {RandomTableEntry|null} the randomly selected entry
     */
    _rollRandomEntry(entries: RandomTableEntry[]): RandomTableEntry | null;
    /**
     * Generate a result from a RandomTable object
     * @param {RandomTable} rtable the RandomTable
     * @param {String} [start=''] subtable to roll on
     * @return {RandomTableResult[]}
     */
    getTableResult(rtable: RandomTable, start?: string): RandomTableResult[];
    /**
     * Get result set from a table based on the key.
     * @param {String} tableKey
     * @param {String} table
     * @returns {RandomTableResultSet}
     */
    getTableResultSetByKey(tableKey: string, table?: string): RandomTableResultSet;
    /**
     * Get result set from a table based on the key.
     * @param {RandomTable} rtable Main table object.
     * @param {String} [table] Subtable
     * @returns {RandomTableResultSet}
     */
    getResultSetForTable(rtable: RandomTable, table?: string): RandomTableResultSet;
    /**
     * Get a result from a table/subtable in a RandomTable object
     * DANGER: you could theoretically put yourself in an endless loop if the data were poorly planned
     * ...but at worst that would just crash the users browser since there's no server processing involved... (???)
     * @todo we'll have to fix for this with a node version... make track the tables rolled on hierarchically, so a parent table doesn't call itself...?
     * @param {Object} rtable the RandomTable object
     * @param {String} table table to roll on
     * @returns {RandomTableResult[]}
     */
    _selectFromTable(rtable: any, table: string): RandomTableResult[];
    /**
     * Perform token replacement.  Only table and roll actions are accepted
     * @param {String} token A value passed from findToken containing a token(s) {{SOME OPERATION}} Tokens are {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{roll:1d6+2}} (etc) (i.e. {{table:colonial_occupations:laborer}} {{table:color}} also generate names with {{name:flemish}} (surname only) {{name:flemish:male}} {{name:dutch:female}}
     * @param {String} curtable key of the RandomTable the string is from (needed for "this" tokens)
     * @returns {RandomTableResultSet|RandomTableResultSet[]|DiceResult|String|Any} The result of the token or else just the token (in case it was a mistake or at least to make the error clearer)
     */
    convertToken(token: string, curtable?: string): RandomTableResultSet | RandomTableResultSet[] | DiceResult | string | Any;
    /**
     * Look for tokens to perform replace action on them.
     * @param {String} entryLabel Usually a label from a RandomTableEntry
     * @param {String} curtable key of the RandomTable the string is from (needed for "this" tokens)
     * @returns {String} String with tokens replaced (if applicable)
     */
    findToken(entryLabel: string, curtable?: string): string;
    /**
     * Since tables are stored outside of this module, this function allows for the setting of a function which will be used to lookup a table by it's key
     * @param {Function} lookup a function that takes a table key and returns a RandomTable or null
     */
    setTableKeyLookup(lookup: Function): void;
    /**
     * Placeholder that should be replaced by a function outside this module
     * @param {String} key human readable table identifier
     * @return {null} nothing, when replaced this function should return a table object
     */
    _customGetTableByKey(key: string): null;
    /**
     * Return a table based on it's key.
     * This requires calling setTableKeyLookup and setting a lookup method
     * That returns a RandomTable object or null.
     * @param {String} key human readable table identifier
     * @returns {RandomTable|null}
     */
    getTableByKey(key: string): RandomTable | null;
    /**
     * Add a token variable
     * @param {String} name Name of the token (used as first element).
     * @param {Function} process Function to return token replacement value function is passed the token_parts (token split by ":"),  original full_token, current table name
     */
    registerTokenType(name: string, process: Function): void;
    /**
     * Dice roll token.
     * @returns {DiceResult}
     */
    _defaultRollToken(token_parts: any, full_token?: string, curtable?: string): DiceResult;
    /**
     * Table token lookup in the form:
     * {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{table:SOMETABLE:SUBTABLE*2}} (roll subtable 2 times)
     * @param {String[]} token_parts Token split by :
     * @param {String} full_token Original token
     * @param {String} curtable Current table's key.
     * @returns {RandomTableResultSet|RandomTableResultSet[]} One or more result sets.
     */
    _defaultTableToken(token_parts: string[], full_token: string, curtable: string): RandomTableResultSet | RandomTableResultSet[];
}
import { RandomTableResult } from "./random_table.js";
import { RandomTableResultSet } from "./random_table.js";
import { RandomTable } from "./random_table.js";
import { DiceResult } from "./dice_roller.js";
