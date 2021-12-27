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
     * @param {String} table Sub/table name if relevant.
     * @returns {TableErrorResult}
     */
    _getErrorResult(error?: string, table?: string): TableErrorResult;
    /**
     * Return a result set with an error.
     * @param {String} error Error message
     * @returns {RandomTableResultSet}
     */
    _getErrorResultSet(error?: string): RandomTableResultSet;
    /**
     * Get a result from a table/subtable in a RandomTable object
     * DANGER: you could theoretically put yourself in an endless loop if the data were poorly planned
     * Calling method try to catch RangeError to handle that possibility.
     * @param {RandomTable} rtable the RandomTable object
     * @param {String} table table to roll on
     * @returns {RandomTableResult[]}
     */
    _selectFromTable(rtable: RandomTable, table: string): RandomTableResult[];
    /**
     * Get results array for macro setting of a table.
     * @param {RandomTable} rtable Table with macro set.
     * @returns {RandomTableResult[]}
     */
    _getTableMacroResult(rtable: RandomTable): RandomTableResult[];
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
     * Perform token replacement.  Only table and roll actions are accepted
     * @param {String} token A value passed from findToken containing a token(s) {{SOME OPERATION}} Tokens are {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{roll:1d6+2}} (etc) (i.e. {{table:colonial_occupations:laborer}} {{table:color}} also generate names with {{name:flemish}} (surname only) {{name:flemish:male}} {{name:dutch:female}}
     * @param {RandomTable|null} curtable RandomTable the string is from (needed for "this" tokens) or null
     * @returns {RandomTableResultSet|RandomTableResultSet[]|DiceResult|String|Any} The result of the token or else just the token (in case it was a mistake or at least to make the error clearer)
     */
    convertToken(token: string, curtable?: RandomTable | null): RandomTableResultSet | RandomTableResultSet[] | DiceResult | string | Any;
    /**
     * Look for tokens to perform replace action on them.
     * @param {String} entryLabel Usually a label from a RandomTableEntry
     * @param {RandomTable|null} curtable RandomTable the string is from (needed for "this" tokens) or null
     * @returns {String} String with tokens replaced (if applicable)
     */
    findToken(entryLabel: string, curtable?: RandomTable | null): string;
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
     * @returns {RandomTable}
     * @throws {TableError}
     */
    getTableByKey(key: string): RandomTable;
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
    _defaultRollToken(token_parts: any, full_token?: string, curtable?: any): DiceResult;
    /**
     * Table token lookup in the form:
     * {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{table:SOMETABLE:SUBTABLE*2}} (roll subtable 2 times)
     * @param {String[]} token_parts Token split by :
     * @param {String} full_token Original token
     * @param {RandomTable|null} curtable Current table or null.
     * @returns {RandomTableResultSet|RandomTableResultSet[]} One or more result sets.
     */
    _defaultTableToken(token_parts: string[], full_token: string, curtable?: RandomTable | null): RandomTableResultSet | RandomTableResultSet[];
}
import TableErrorResult from "./TableErrorResult.js";
import RandomTableResultSet from "./RandomTableResultSet.js";
import RandomTable from "./RandomTable.js";
import RandomTableResult from "./RandomTableResult.js";
