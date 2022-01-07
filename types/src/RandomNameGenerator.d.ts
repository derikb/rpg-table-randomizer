export default RandomNameGenerator;
/**
 * @prop {Map<RandomNameType>} nameTypes
 * @prop {MarkovGenerator} _markov
 */
declare class RandomNameGenerator {
    /**
     * Random name generation.
     * @param {RandomNameType[]} namedata
     * @param {Number} [markovOrder=3] Markov generator settings.
     */
    constructor({ namedata, markovOrder }: RandomNameType[]);
    nameTypes: Map<any, any>;
    _markov: MarkovGenerator;
    /**
     * Add some name data
     * Note: you can overwrite existing name_types if you want
     * @param {RandomNameType} type
     * @throws {RandomNameError}
     */
    registerNameType(type: RandomNameType): void;
    /**
     * Make sure namedata is set.
     * @param {String} name_type
     * @param {String} [subtype=''] Subtype like a gender or 'surname'
     * @throws RandomNameError
     */
    _validateNameType(name_type: string, subtype?: string): void;
    /**
     * Keys of the name types that are set.
     * @returns {String[]}
     */
    getValidNameTypes(): string[];
    /**
     * Get a random name type from the available types.
     * @returns {String}
     */
    getRandomNameType(): string;
    /**
     * Get the name type
     * @param {String} name_type Name type key or random.
     * @returns {RandomNameType}
     * @throws {RandomNameError}
     */
    _getNameType(name_type: string): RandomNameType;
    /**
     * Get a name list
     * @param {String} name_type
     * @param {String} subtype
     * @returns {String[]}
     */
    _getNameList(name_type?: string, subtype?: string): string[];
    /**
     * Select a personal name from one of the lists.
     * @param {String} name_type what list/process to use, else random
     * @param {String} gender
     * @returns {String}
     * @throws {RandomNameError}
     */
    selectPersonalName(name_type?: string, gender?: string): string;
    /**
     * Select a sur/last name only from one of the lists
     * @param {String} name_type what list/process to use, else random
     * @returns {String} a name
     * @throws {RandomNameError}
     */
    selectSurname(name_type?: string): string;
    /**
     * Select a name from one of the lists
     * @param {String} name_type What name list/process to use else random
     * @param {String} gender male, female, random, ''
     * @param {String} style first=first name only, else full name
     * @returns {String} a name
     * @throws {RandomNameError}
     */
    selectName(name_type?: string, gender?: string, style?: string): string;
    /**
     * Create a personal name using markov chains.
     * @param {String} name_type what list/process to use, else random
     * @param {String} gender
     * @returns {String}
     * @throws {RandomNameError}
     */
    createPersonalName(name_type?: string, gender?: string): string;
    /**
     * Create a sur/last name using markov chains.
     * @param {String} name_type what list/process to use, else random
     * @returns {String} a name
     * @throws {RandomNameError}
     */
    createSurName(name_type?: string): string;
    /**
     * Create a name using Markov chains
     * @param {String} [name_type=random] what list/process to use
     * @param {String} [gender=random] male or female or both
     * @param {String} style first=first name only, else full name
     * @returns {String} a name
     * @throws {RandomNameError}
     */
    createName(name_type?: string, gender?: string, style?: string): string;
    /**
     * Generate a bunch of names, half male, half female
     * @param {Number} [number=10] number of names in the list (half will be male, half will be female)
     * @param {String} [name_type] type of name or else it will randomly select
     * @param {Bool} [create=false] new names or just pick from list
     * @return {Object} arrays of names inside male/female property
     * @throws {RandomNameError}
     */
    generateList(number?: number, name_type?: string, create?: Bool): any;
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
    nameTokenCallback(token_parts: string[], full_token?: string, curtable?: RandomTable | null): string;
}
import MarkovGenerator from "./MarkovGenerator.js";
import RandomNameType from "./RandomNameType.js";
