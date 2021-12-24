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
            throw new RandomNameError('Must be instance of RandomNameType');
        }
        if (!type.key) {
            throw new RandomNameError('RandomNameType must have key set.');
        }
        if (type.key === 'random') {
            throw new RandomNameError(`RandomNameType key ${type.key} is reserved.`);
        }
        if (type.male.length === 0 && type.female.length === 0 && type.surname.length === 0) {
            throw new RandomNameError(`RandomNameType ${type.key} must include male, female, or surname lists.`);
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
            throw new RandomNameError(`${name_type} type does not have subtype ${subtype}`);
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
     * Get the name type
     * @param {String} name_type Name type key or random.
     * @returns {RandomNameType}
     * @throws {RandomNameError}
     */
    _getNameType (name_type) {
        if (name_type === 'random') {
            // randomize a type...
            name_type = this.getRandomNameType();
        }
        const nameType = this.nameTypes.get(name_type);
        if (!nameType) {
            throw new RandomNameError('Invalid name type.');
        }
        return nameType;
    }
    /**
     * Get a name list
     * @param {String} name_type
     * @param {String} subtype
     * @returns {String[]}
     */
    _getNameList (name_type = 'random', subtype = 'mixed') {
        const nameType = this._getNameType(name_type);
        if (subtype === 'surname') {
            if (nameType.surname.length === 0) {
                throw new RandomNameError(`${name_type} type does not have subtype ${subtype}`);
            }
            return nameType.surname;
        }
        const list = nameType.getPersonalNameList(subtype);
        if (list.length === 0) {
            throw new RandomNameError(`${name_type} type does not have subtype ${subtype}`);
        }
        return list;
    }
    /**
     * Select a personal name from one of the lists.
     * @param {String} name_type what list/process to use, else random
     * @param {String} gender
     * @returns {String}
     * @throws {RandomNameError}
     */
    selectPersonalName (name_type = 'random', gender = 'random') {
        const nameList = this._getNameList(name_type, gender);
        return capitalizeName(randomString(nameList));
    }
    /**
     * Select a sur/last name only from one of the lists
     * @param {String} name_type what list/process to use, else random
     * @returns {String} a name
     * @throws {RandomNameError}
     */
    selectSurname (name_type = 'random') {
        const nameList = this._getNameList(name_type, 'surname');
        return capitalizeName(randomString(nameList));
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
        const nameType = this._getNameType(name_type);
        const personalNameList = nameType.getPersonalNameList(gender);
        if (personalNameList.length === 0) {
            throw new RandomNameError(`${nameType.key} does not have list for ${gender}`);
        }
        let name = capitalizeName(randomString(personalNameList));
        if (style !== 'first') {
            name += ` ${capitalizeName(randomString(nameType.surname))}`;
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
        const nameType = this._getNameType(name_type);
        const namelist = nameType.getPersonalNameList(gender);
        if (namelist.length === 0) {
            throw new RandomNameError('Starting name list is empty.');
        }
        const mkey = `${nameType.key}_${gender}`;
        if (!this._markov.isMemoryKeySet(mkey)) {
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
        const nameType = this._getNameType(name_type);
        const namelist = nameType.surname;
        if (namelist.length === 0) {
            throw new RandomNameError('Starting name list is empty.');
        }
        const skey = `${nameType.key}_surname`;
        if (!this._markov.isMemoryKeySet(skey)) {
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
        if (name_type === 'random') {
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
                names[gender].push(this.createName(name_type, gender));
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
        if (!token_parts[1]) {
            token_parts[1] = 'random';
        }
        if (!token_parts[3] || token_parts[3] !== 'first') {
            token_parts[3] = '';
        }
        if (!token_parts[2]) {
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
