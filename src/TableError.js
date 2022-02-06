/**
 * Custom error for handling known errors in the table roller.
 * @prop {String} key RandomTable key
 */
class TableError extends Error {
    constructor (message, key = '') {
        super(message);
        this.key = key;
        this.name = 'TableError';
    }
}

export default TableError;
