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
    /**
     * Custom JSON handler to strip empty props.
     * @returns {Object}
     */
    toJSON () {
        const obj = super.toJSON();
        obj.className = 'TableErrorResult';
        return obj;
    }
}
