import { capitalize } from './r_helpers.js';
import MarkovGenerator from './MarkovGenerator.js';
import { randomString } from './randomizer.js';
import RandomNameError from './RandomNameError.js';
import RandomNameType from './RandomNameType.js';

/** Capitalize names, account for multiword lastnames like "Van Hausen"
 * @param {String} name a name
 * @return {String} name capitalized
 */
const capitalizeName = function (name) {
    const leave_lower = ['of', 'the', 'from', 'de', 'le', 'la'];
    // need to find spaces in name and capitalize letter after space
    const parts = name.split(' ');
    const upper_parts = parts.map((w) => {
        return (leave_lower.indexOf(w) >= 0) ? w : `${capitalize(w)}`;
    });
    return upper_parts.join(' ');
};

/**
 * @prop {Map<RandomNameType>} nameTypes
 * @prop {MarkovGenerator} _markov
 */
class RandonNameGenerator {
    /**
     * Random name generation.
     * @param {RandomNameType[]} namedata
     * @param {Number} [markovOrder=3] Markov generator settings.
     */
    constructor ({
        namedata = [],
        markovOrder = 3
    }) {
        this.nameTypes = new Map();
        if (Array.isArray(namedata)) {
            namedata.forEach((type) => {
                this.registerNameType(type);
            });
        }
        this._markov = new MarkovGenerator({ order: markovOrder });
    }
    /**
     * Add some name data
     * Note: you can overwrite existing name_types if you want
     * @param {RandomNameType} type
     * @throws {RandomNameError}
     */
    registerNameType (type) {
        if (!(type instanceof RandomNameType)) {
            throw RandomNameError('Must be instance of RandomNameType');
        }
        if (!type.key) {
            throw RandomNameError('RandomNameType must have key set.');
        }
        if (type.key === 'random' || type.key === 'mixed') {
            throw RandomNameError(`RandomNameType key ${type.key} is reserved.`);
        }
        if (type.male.length === 0 && type.female.length === 0 && type.surname.length === 0) {
            throw RandomNameError(`RandomNameType ${type.key} must include male, female, or surname lists.`);
        }
        this.nameTypes.set(type.key, type);
    }
    /**
     * Make sure namedata is set.
     * @param {String} name_type
     * @param {String} [subtype=''] Subtype like a gender or 'surname'
     * @throws RandomNameError
     */
    _validateNameType (name_type, subtype = '') {
        const type = this.nameTypes.get(name_type);
        if (!type) {
            throw new RandomNameError('Invalid name type.');
        }
        if (!subtype) {
            return;
        }
        if (!Array.isArray(type[subtype]) || type[subtype].length === 0) {
            throw new RandomNameError(`${name_type} type does have subtype ${subtype}`);
        }
    }
    /**
     * Keys of the name types that are set.
     * @returns {String[]}
     */
    getValidNameTypes () {
        return Array.from(this.nameTypes.keys());
    }
    /**
     * Get a random name type from the available types.
     * @returns {String}
     */
    getRandomNameType () {
        return randomString(Array.from(this.nameTypes.keys()));
    }
    /**
     * Select a personal name from one of the lists.
     * @param {String} name_type what list/process to use, else random
     * @param {String} gender
     * @returns {String}
     * @throws {RandomNameError}
     */
    selectPersonalName (name_type = 'random', gender = 'random') {
        if (name_type === 'random' || name_type === 'mixed') {
            // randomize a type...
            name_type = this.getRandomNameType();
        }
        if (gender === 'random' || gender === '') {
            // randomize a gender...
            gender = randomString(['male', 'female']);
        }
        this._validateNameType(name_type, gender);
        return capitalizeName(randomString(this.nameTypes.get(name_type)[gender]));
    }
    /**
     * Select a sur/last name only from one of the lists
     * @param {String} name_type what list/process to use, else random
     * @returns {String} a name
     * @throws {RandomNameError}
     */
    selectSurname (name_type = 'random') {
        if (name_type === 'random' || name_type === 'mixed') {
            // randomize a type...
            name_type = this.getRandomNameType();
        }
        this._validateNameType(name_type, 'surname');
        return capitalizeName(randomString(this.nameTypes.get(name_type).surname));
    }
    /**
     * Select a name from one of the lists
     * @param {String} name_type What name list/process to use else random
     * @param {String} gender male, female, random, ''
     * @param {String} style first=first name only, else full name
     * @returns {String} a name
     * @throws {RandomNameError}
     */
    selectName (name_type = 'random', gender = 'random', style = '') {
        if (name_type === 'random' || !name_type) {
            // randomize a type...
            name_type = this.getRandomNameType();
        }
        let name = this.selectPersonalName(name_type, gender);
        if (style !== 'first') {
            name += ` ${this.selectSurname(name_type)}`;
        }
        return name.trim();
    }
    /**
     * Create a personal name using markov chains.
     * @param {String} name_type what list/process to use, else random
     * @param {String} gender
     * @returns {String}
     * @throws {RandomNameError}
     */
    createPersonalName (name_type = 'random', gender = 'random') {
        if (name_type === 'random' || name_type === 'mixed' || !name_type) {
            // randomize a type...
            name_type = this.getRandomNameType();
        }
        this._validateNameType(name_type);
        if (gender !== 'male' && gender !== 'female' && gender !== 'mixed') {
            gender = randomString(['male', 'female']);
        }
        const mkey = `${name_type}_${gender}`;
        if (!this._markov.isMemoryKeySet(mkey)) {
            let namelist = [];
            if (gender === 'mixed') {
                namelist = this.nameTypes.get(name_type).getAllPersonalNames();
            } else {
                namelist = this.nameTypes.get(name_type)[gender];
            }
            if (namelist.length === 0) {
                throw new RandomNameError('Starting name list is empty.');
            }
            namelist.forEach((v) => {
                this._markov.learn(mkey, v);
            });
        }
        return capitalizeName(this._markov.generate(mkey).trim());
    }
    /**
     * Create a sur/last name using markov chains.
     * @param {String} name_type what list/process to use, else random
     * @returns {String} a name
     * @throws {RandomNameError}
     */
    createSurName (name_type = 'random') {
        if (name_type === 'random' || name_type === 'mixed' || !name_type) {
            // randomize a type...
            name_type = this.getRandomNameType();
        }
        this._validateNameType(name_type, 'surname');
        const skey = `${name_type}_last`;
        if (!this._markov.isMemoryKeySet(skey)) {
            const namelist = this.nameTypes.get(name_type).surname;
            namelist.forEach((v) => {
                this._markov.learn(skey, v);
            });
        }
        return capitalizeName(this._markov.generate(skey).trim());
    }
    /**
     * Create a name using Markov chains
     * @param {String} [name_type=random] what list/process to use
     * @param {String} [gender=random] male or female or both
     * @param {String} style first=first name only, else full name
     * @returns {String} a name
     * @throws {RandomNameError}
     */
    createName (name_type = 'random', gender = 'random', style = '') {
        if (name_type === 'random' || !name_type) {
            // randomize a type...
            name_type = this.getRandomNameType();
        }
        let name = this.createPersonalName(name_type, gender);
        if (style !== 'first') {
            name = `${name} ${this.createSurName(name_type)}`;
        }
        return name.trim();
    }
    /**
     * Generate a bunch of names, half male, half female
     * @param {Number} [number=10] number of names in the list (half will be male, half will be female)
     * @param {String} [name_type] type of name or else it will randomly select
     * @param {Bool} [create=false] new names or just pick from list
     * @return {Object} arrays of names inside male/female property
     * @throws {RandomNameError}
     */
    generateList (number = 10, name_type = 'random', create = false) {
        const names = { male: [], female: [] };

        for (let i = 1; i <= number; i++) {
            const gender = (i <= Math.ceil(number / 2)) ? 'male' : 'female';
            if (create) {
                names[gender].push(this.createName(name_type, gender, true));
            } else {
                names[gender].push(this.selectName(name_type, gender));
            }
        }
        return names;
    }
    /**
     * Callback for the TableRoller to generate names from a token.
     * Token parts will be:
     * 0: "name" literally
     * 1: type of name (often a nationality/language/ethnicity/etc)
     * 2: gender ("male"/"female" for which name list to pick from, defaults to randomizing between them).
     * 3: style ("first" for a first name, else a full name will be returned)
     * @param {String[]} token_parts Parts of a token: 0 will be the action (name in most cases.)
     * @param {String} full_token Full token wrapped in double braces.
     * @param {RandomTable|null} curtable Current table token was found in (helpful if `this` token is found) or null
     * @returns {String}
     */
    nameTokenCallback (token_parts, full_token = '', curtable = null) {
        let string = '';
        if (typeof token_parts[1] === 'undefined' || token_parts[1] === '') {
            token_parts[1] = 'random';
        }
        if (typeof token_parts[3] === 'undefined' || token_parts[3] !== 'first') {
            token_parts[3] = '';
        }
        if (typeof token_parts[2] === 'undefined' || token_parts[2] === '') {
            token_parts[2] = 'random';
        }
        try {
            string = this.selectName(token_parts[1], token_parts[2], token_parts[3]);
        } catch (e) {
            if (e instanceof RandomNameError) {
                return '';
            } else {
                throw e;
            }
        }
        return string;
    }
}

export default RandonNameGenerator;
