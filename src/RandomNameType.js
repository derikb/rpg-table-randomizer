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
}

export default RandomNameType;
