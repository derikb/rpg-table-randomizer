export default RandomNameType;
/**
 * Class for name data.
 */
declare class RandomNameType {
    /**
     *
     * @param {String} key Key to identify uniquely in tokens and methods.
     * @param {String} label Human readable label.
     * @param {String[]} male Names.
     * @param {String[]} female Names.
     * @param {String[]} surname Names.
     */
    constructor({ key, label, male, female, surname }: string);
    key: any;
    label: any;
    male: any[];
    female: any[];
    surname: any[];
    /**
     * Returns all personal names.
     * @returns {String[]}
     */
    getAllPersonalNames(): string[];
    /**
     * Return a personal name list.
     * @param {String} gender Mixed, random, male, female
     * @returns {String[]}
     */
    getPersonalNameList(gender?: string): string[];
}
