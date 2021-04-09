/**
 * Adapted from http://blog.javascriptroom.com/2013/01/21/markov-chains/
 */
class MarkovGenerator {
    /**
     *
     * @param {Object} memory the "memory" where the language parts go
     * @param {String} separator If you want to delimit the generated parts
     * @param {Number} order How many... something... to something.... oh it's been too long I don't remember how this works...
     */
    constructor({
        memory = {},
        separator = '',
        order = 2
    }) {
        this.memory = memory;
        this.separator = separator;
        this.order = order;
    }
    /**
     * Is the memory key already set.
     * @param {String} key
     */
    isMemoryKeySet(key) {
        return !!this.memory[key];
    }
    /**
     * Generate a starting array for the chain based on the order number
     * @return {Array} just an empty array of length=order
     */
    genInitial() {
        return Array(this.order).fill('');
    }
    /**
     * Get a random array element
     * @param {Array} arr an array
     * @return {String|Object}	random value
     */
    getRandomValue(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    /**
     * Chunk the word or phrase
     * @param {String} txt the text to chunk
     * @param {Function} cb callback function
     * @return {null} null
     */
    breakText(txt, cb) {
        const parts = txt.split(this.separator);
        const prev = this.genInitial();

        parts.forEach((v) => {
            v = v.toLowerCase();
            cb(prev, v);
            prev.shift();
            prev.push(v);
        });
        cb(prev, '');
    }
    /**
     * Feed text to memory
     * @param {String} key key for the chain (so we can store multiple memories)
     * @param {String} txt word or phrase
     * @return {null} null
     */
    learn(key, txt) {
        const mem = (this.memory[key]) ? this.memory[key] : {};
        // split up text then add the calculated parts to the memory for this key
        this.breakText(txt, (key, value) => {
            if (!mem[key]) {
                mem[key] = [];
            }
            mem[key].push(value);
            return mem;
        });
        this.memory[key] = mem;
    }
    /**
     * Iterate through, calls self
     * @param {Array} state array of most recent x(x=order) elements in chain
     * @param {Array} ret the chain
     * @return {Array}
     */
    step(state, ret) {
        const nextAvailable = this.memory[this.cur_key][state] || [''];
        const next = this.getRandomValue(nextAvailable);
        // we don't have anywhere to go
        if (!next) {
            return ret;
        }
        ret.push(next);
        const nextState = state.slice(1);
        nextState.push(next);
        return this.step(nextState, ret);
    }
    /**
     * Return a generated response
     * @param {String} key key for the chain (so we can store multiples
     * @param {Array} seed letters to start the response (?)
     */
    generate(key, seed) {
        if (!seed) {
            seed = this.genInitial();
        }
        this.cur_key = key;
        return seed.concat(this.step(seed, [])).join(this.separator);
    }
}

export default MarkovGenerator;
