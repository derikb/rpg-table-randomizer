import { isEmpty, capitalize } from './r_helpers.js';
import MarkovGenerator from './MarkovGenerator.js';


/**
 * Stores the Markov object
 */
const markov = new MarkovGenerator({ order: 3 });

/**
 * @param {Object} namedata a lot of names divided by type. see /samples/names.json for formatting
 */
let namedata = {
	options: {}
};
/**
 * Name generator...
 * @param {Object} data a lot of names divided by type. see /samples/names.json for formatting
 */
const setNameData = function(data) {
	namedata = data;
}

/** @property {Randomizer} randomizer */
let randomizer = null;

const setRandomizer = function(instance) {
	randomizer = instance;
}

/**
 * Get a random name type from the available types.
 * @returns {String}
 */
const getRandomNameType = function() {
	return randomizer.rollRandomString(Object.keys(namedata.options));
};

/**
 * Capitalize names, account for multiword lastnames like "Van Hausen"
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
 * Generate a bunch of names, half male, half female
 * @param {Number} [number=10] number of names in the list (half will be male, half will be female)
 * @param {String} [name_type] type of name or else it will randomly select
 * @param {Bool} [create=false] new names or just pick from list
 * @return {Object} arrays of names inside male/female property
 */
const generateList = function (number = 10, name_type = 'random', create = false) {
	const names = { male: [], female: [] };

	for (let i = 1; i <= number; i++) {
		const gender = (i <= Math.ceil(number / 2)) ? 'male' : 'female';
		if (create) {
			names[gender].push(createName(name_type, gender, true));
		} else {
			names[gender].push(selectName(name_type, gender));
		}
	}
	return names;
};

/**
 * Select a personal name from one of the lists.
 * @param {String} name_type what list/process to use, else random
 * @param {String} gender
 * @returns {String}
 */
const selectPersonalName = function(name_type = 'random', gender = 'random') {
	let name = '';
	if (name_type === 'random' || name_type === 'mixed') {
		// randomize a type...
		name_type = getRandomNameType();
	}
	if (isEmpty(namedata[name_type])) {
		// Or should an error be thrown?
		return '';
	}
	if (gender === 'random' || isEmpty(gender)) {
		// randomize a gender...
		gender = randomizer.rollRandomString(['male', 'female']);
	}
	name = randomizer.rollRandomString(namedata[name_type][gender]);
	name = randomizer.findToken(name).trim();
	return capitalizeName(name);
};

/**
 * Select a sur/last name only from one of the lists
 * @param {String} name_type what list/process to use, else random
 * @returns {String} a name
 */
const selectSurname = function (name_type = 'random') {
	let name = '';
	if (name_type === 'random' || name_type === 'mixed') {
		// randomize a type...
		name_type = getRandomNameType();
	}
	if (isEmpty(namedata[name_type]['surname'])) {
		return '';
	}
	name = randomizer.rollRandomString(namedata[name_type]['surname']);
	name = randomizer.findToken(name);
	return capitalizeName(name);
};

/**
 * Select a name from one of the lists
 * @param {String} name_type What name list/process to use else random
 * @param {String} gender male, female, random, ''
 * @param {String} style first=first name only, else full name
 * @returns {String} a name
 */
 const selectName = function (name_type = 'random', gender = 'random', style = '') {
	if (name_type === 'random' || isEmpty(name_type)) {
		// randomize a type...
		name_type = getRandomNameType();
	}
	let name = selectPersonalName(name_type, gender);
	if (style !== 'first') {
		name += ' ' + selectSurname(name_type);
	}
	return name.trim();
};

/**
 * Create a personal name using markov chains.
 * @param {String} name_type what list/process to use, else random
 * @param {String} gender
 * @returns {String}
 */
const createPersonalName = function(name_type = 'random', gender = 'random') {
	if (name_type === 'random' || name_type === 'mixed' || isEmpty(name_type)) {
		// randomize a type...
		name_type = getRandomNameType();
	}
	if (gender !== 'male' && gender !== 'female' && gender !== 'mixed') {
		gender = randomizer.rollRandomString(['male', 'female']);
	}
	const mkey = `${name_type}_${gender}`;
	if (!markov.isMemoryKeySet(mkey)) {
		let namelist = [];
		if (gender === 'mixed') {
			namelist = namedata[name_type]['male'];
			namelist = namelist.concat(namedata[name_type]['female']);
		} else {
			namelist = namedata[name_type][gender];
		}
		namelist.forEach((v) => {
			markov.learn(mkey, v);
		});
	}
	return capitalizeName(markov.generate(mkey).trim());
};

/**
 * Create a sur/last name using markov chains.
 * @param {String} name_type what list/process to use, else random
 * @returns {String} a name
 */
const createSurName = function (name_type = 'random') {
	if (name_type === 'random' || name_type === 'mixed' || isEmpty(name_type)) {
		// randomize a type...
		name_type = getRandomNameType();
	}
	if (isEmpty(namedata[name_type]['surname'])) {
		return '';
	}
	const skey = `${name_type}_last`;
	if (!markov.isMemoryKeySet(skey)) {
		const namelist = namedata[name_type]['surname'];
		namelist.forEach((v) => {
			markov.learn(skey, v);
		});
	}
	return capitalizeName(markov.generate(skey).trim());
};

/**
 * Create a name using Markov chains
 * @param {String} [name_type=random] what list/process to use
 * @param {String} [gender=random] male or female or both
 * @param {String} style first=first name only, else full name
 * @returns {String} a name
 */
const createName = function (name_type = 'random', gender = 'random', style = '') {
	if (name_type === 'random' || isEmpty(name_type)) {
		// randomize a type...
		name_type = getRandomNameType();
	}
	let name = createPersonalName(name_type, gender);
	if (style !== 'first') {
		name = name + ' ' + createSurName(name_type);
	}
	return name.trim();
};

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
const registerNameType = function (name_type, data = {}, label = '') {
	if (typeof name_type === 'undefined' || isEmpty(data) ||  name_type === 'random' ||  name_type === 'mixed') {
		return false;
	}
	if (label === '') {
		label = name_type;
	}
	if (!data.male && !data.female && !data.surname) {
		return false;
	}
	namedata[name_type] = data;
	namedata.options[name_type] = label;
	return true;
};

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
const nameTokenCallback = function(token_parts, full_token = '', curtable = '') {
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
	string = createName(token_parts[1], token_parts[2], token_parts[3]);
	return string;
};

export default {
	setNameData,
	setRandomizer,
	generateList,
	selectName,
	selectPersonalName,
	selectSurname,
	createPersonalName,
	createSurName,
	createName,
	registerNameType,
	nameTokenCallback
};
