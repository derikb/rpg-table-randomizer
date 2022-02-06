export default TableError;
/**
 * Custom error for handling known errors in the table roller.
 * @prop {String} key RandomTable key
 */
declare class TableError extends Error {
    constructor(message: any, key?: string);
    key: string;
}
