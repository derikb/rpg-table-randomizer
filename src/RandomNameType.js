import { randomString } from './randomizer.js';

/**
 * Class for name data.
 */
class RandomNameType {
    /**
     *
     * @param {String} key Key to identify uniquely in tokens and methods.
     * @param {String} label Human readable label.
     * @param {String[]} male Names.
     * @param {String[]} female Names.
     * @param {String[]} surname Names.
     */
    constructor ({
        key = '',
        label = '',
        male = [],
        female = [],
        surname = []
    }) {
        this.key = key;
        this.label = label || key;
        this.male = Array.isArray(male) ? male : [];
        this.female = Array.isArray(female) ? female : [];
        this.surname = Array.isArray(surname) ? surname : [];
    }
    /**
     * Returns all personal names.
     * @returns {String[]}
     */
    getAllPersonalNames () {
        return Array.prototype.concat(this.male, this.female);
    }
    /**
     * Return a personal name list.
     * @param {String} gender Mixed, random, male, female
     * @returns {String[]}
     */
    getPersonalNameList (gender = 'random') {
        // Mixed gets all the personal names.
        if (gender === 'mixed' || gender === '') {
            return this.getAllPersonalNames();
        }
        // If specific gender is requested
        // return regardless of if it's empty
        if (gender === 'male') {
            return this.male;
        }
        if (gender === 'female') {
            return this.female;
        }
        // Else  return a random list
        const randomList = [];
        if (this.male.length > 0) {
            randomList.push('male');
        }
        if (this.female.length > 0) {
            randomList.push('female');
        }
        if (randomList.length === 0) {
            return [];
        }
        gender = randomString(randomList);
        return this[gender];
    }
}

export default RandomNameType;
