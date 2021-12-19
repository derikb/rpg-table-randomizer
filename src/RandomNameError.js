/**
 * Custom error for handling known errors in the name generator.
 */
class RandomNameError extends Error {
    constructor (message) {
        super(message);
        this.name = 'RandomNameError';
    }
}

export default RandomNameError;
