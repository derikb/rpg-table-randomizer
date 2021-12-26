import RandomTableResult from './RandomTableResult.js';

/**
 * Class for results from RandomTable
 */
export default class TableErrorResult extends RandomTableResult {
    /**
     * Is this an error result.
     */
    get isError () {
        return true;
    }
}
