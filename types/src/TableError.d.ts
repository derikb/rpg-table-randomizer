export default TableError;
/**
 * Custom error for handling known errors in the table roller.
 */
declare class TableError extends Error {
    constructor(message: any);
}
