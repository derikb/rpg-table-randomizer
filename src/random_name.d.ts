declare namespace _default {
    export { setNameData };
    export { setRandomizer };
    export { generateList };
    export { selectName };
    export { selectSurname };
    export { createName };
    export { registerNameType };
    export { nameTokenCallback };
}
export default _default;
/**
 * Name generator...
 * @param {Object} data a lot of names divided by type. see /samples/names.json for formatting
 */
declare function setNameData(data: any): void;
declare function setRandomizer(instance: any): void;
/**
 * Generate a bunch of names, half male, half female
 * @param {Number} [number=10] number of names in the list (half will be male, half will be female)
 * @param {String} [name_type] type of name or else it will randomly select
 * @param {Bool} [create=false] new names or just pick from list
 * @return {Object} arrays of names inside male/female property
 */
declare function generateList(number?: number, name_type?: string, create?: any): any;
/**
 * Select a name from one of the lists
 * @param {String} name_type What name list/process to use else random
 * @param {String} gender male, female, random, ''
 * @param {String} style first=first name only, else full name
 * @returns {String} a name
 */
declare function selectName(name_type?: string, gender?: string, style?: string): string;
/**
 * Select a sur/last name only from one of the lists
 * @param {String} name_type what list/process to use, else random
 * @returns {String} a name
 */
declare function selectSurname(name_type?: string): string;
/**
 * Create a name using Markov chains
 * @param {String} [name_type=random] what list/process to use
 * @param {String} [gender=random] male or female or both
 * @param {String} style first=first name only, else full name
 * @returns {String} a name
 */
declare function createName(name_type?: string, gender?: string, style?: string): string;
/**
 * Add some name data
 * Note: you can overwrite existing name_types if you want
 * @param {String} name_type the shortname for the type
 * @param {Object} data names
 * @param {Array} data.male male names
 * @param {Array} data.female female names
 * @param {Array} data.surnames surnames
 * @param {String} [label] descriptive name of type (defaults to just the name_type)
 * @return {Boolean} success or failure
 */
declare function registerNameType(name_type: string, data?: {
    male: any[];
    female: any[];
    surnames: any[];
}, label?: string): boolean;
/**
 * Callback for the Randomizer to generate names from a token.
 * Token parts will be:
 * 0: "name" literally
 * 1: type of name (often a nationality/language/ethnicity/etc)
 * 2: gender ("male"/"female" for which name list to pick from, defaults to randomizing between them).
 * 3: style ("first" for a first name, else a full name will be returned)
 * @param {String[]} token_parts Parts of a token: 0 will be the action (name in most cases.)
 * @param {String} full_token Full token wrapped in double braces.
 * @param {String} curtable Key for current table token was found in (helpful if `this` token is found).
 * @returns
 */
declare function nameTokenCallback(token_parts: string[], full_token?: string, curtable?: string): string;
