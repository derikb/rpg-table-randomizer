/**
 * Custom error for handling known errors in the table roller.
 */
class TableError extends Error {
    constructor (message) {
        super(message);
        this.name = 'TableError';
    }
}

export default TableError;
