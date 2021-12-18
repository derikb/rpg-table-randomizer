export default MarkovGenerator;
/**
 * Adapted from http://blog.javascriptroom.com/2013/01/21/markov-chains/
 */
declare class MarkovGenerator {
    /**
     *
     * @param {Object} memory the "memory" where the language parts go
     * @param {String} separator If you want to delimit the generated parts
     * @param {Number} order How many... something... to something.... oh it's been too long I don't remember how this works...
     */
    constructor({ memory, separator, order }: any);
    memory: any;
    separator: any;
    order: any;
    /**
     * Is the memory key already set.
     * @param {String} key
     */
    isMemoryKeySet(key: string): boolean;
    /**
     * Generate a starting array for the chain based on the order number
     * @return {Array} just an empty array of length=order
     */
    genInitial(): any[];
    /**
     * Get a random array element
     * @param {Array} arr an array
     * @return {String|Object} random value
     */
    getRandomValue(arr: any[]): string | any;
    /**
     * Chunk the word or phrase
     * @param {String} txt the text to chunk
     * @param {Function} cb callback function
     * @return {null} null
     */
    breakText(txt: string, cb: Function): null;
    /**
     * Feed text to memory
     * @param {String} key key for the chain (so we can store multiple memories)
     * @param {String} txt word or phrase
     * @return {null} null
     */
    learn(key: string, txt: string): null;
    /**
     * Iterate through, calls self
     * @param {Array} state array of most recent x(x=order) elements in chain
     * @param {Array} ret the chain
     * @return {Array}
     */
    step(state: any[], ret: any[]): any[];
    /**
     * Return a generated response
     * @param {String} key key for the chain (so we can store multiples
     * @param {Array} seed letters to start the response (?)
     */
    generate(key: string, seed: any[]): string;
    cur_key: string;
}
