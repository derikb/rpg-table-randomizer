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
		if (create && name_type !== 'holmesian' && name_type !== 'demonic') {
			names[gender].push(createName(name_type, gender, true));
		} else {
			names[gender].push(selectName(name_type, gender));
		}
	}
	return names;
};

/**
 * Select a name from one of the lists
 * @param {String} name_type What name list/process to use else random
 * @param {String} gender male, female, random, ''
 * @param {String} style first=first name only, else full name
 * @returns {String} a name
 */
const selectName = function (name_type = 'random', gender = 'random', style = '') {
	let name = '';

	if (name_type === 'random') {
		// randomize a type...
		name_type = randomizer.rollRandom(Object.keys(namedata.options));
	}
	if (gender === 'random') {
		// randomize a gender...
		gender = randomizer.rollRandom(['male', 'female']);
	}
	if (style !== 'first') {
		style = '';
	}

	switch (name_type) {
		case 'holmesian':
			name = holmesname();
			break;
		case 'demonic':
			name = demonname();
			break;
		case 'cornish':
		case 'flemish':
		case 'dutch':
		case 'turkish':
		default:
			name = randomizer.rollRandom(namedata[name_type][gender]);
			if (style !== 'first' && typeof namedata[name_type]['surname'] !== 'undefined' && !isEmpty(namedata[name_type]['surname'])) {
				name += ' ' + randomizer.rollRandom(namedata[name_type]['surname']);
			}
			name = randomizer.findToken(name).trim();
			break;
	}
	return capitalizeName(name);
};

/**
 * Select a sur/last name only from one of the lists
 * @param {String} name_type what list/process to use, else random
 * @returns {String} a name
 */
const selectSurname = function (name_type = 'random') {
	let name = '';
	if (name_type === 'random') {
		// randomize a type...
		name_type = randomizer.rollRandom(Object.keys(namedata.options));
	}
	if (isEmpty(namedata[name_type]['surname'])) {
		return '';
	}
	switch (name_type) {
		case 'holmesian':
			name = holmesname();
			break;
		case 'cornish':
		case 'flemish':
		case 'dutch':
		case 'turkish':
		default:
			name = randomizer.rollRandom(namedata[name_type]['surname']);
			name = randomizer.findToken(name);
			break;
	}
	return capitalizeName(name);
};

/**
 * Create a name using Markov chains
 * @param {String} [name_type=random] what list/process to use
 * @param {String} [gender=random] male or female or both
 * @param {String} style first=first name only, else full name
 * @returns {String} a name
 */
const createName = function (name_type = 'random', gender = 'random', style = '') {
	if (name_type === 'random') {
		// randomize a type...
		name_type = randomizer.rollRandom(Object.keys(namedata.options));
	}
	if (!namedata[name_type]) {
		return '';
	}
	if (gender !== 'male' && gender !== 'female') {
		gender = randomizer.rollRandom(['male', 'female']);
	}

	const mkey = `${name_type}_${gender}`;
	let lastname = '';

	if (!markov.isMemoryKeySet(mkey)) {
		// console.log('learn '+mkey);
		let namelist = [];
		if (gender === '') {
			namelist = namedata[name_type]['male'];
			namelist = namelist.concat(namedata[name_type]['female']);
		} else {
			namelist = namedata[name_type][gender];
		}
		namelist.forEach((v) => {
			markov.learn(mkey, v);
		});
	}

	if (style !== 'first' && !isEmpty(namedata[name_type]['surname'])) {
		const skey = `${name_type}_last`;
		if (!markov.isMemoryKeySet(skey)) {
			// console.log('learn surname '+skey);
			const namelist = namedata[name_type]['surname'];
			namelist.forEach((v) => {
				markov.learn(skey, v);
			});
		}
		lastname = markov.generate(skey);
	}

	const thename = `${markov.generate(mkey)} ${lastname}`;
	return capitalizeName(thename.trim());
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
 * Generate a Holmes name
 * @returns {String} name
 */
const holmesname = function () {
	let name = '';
	const scount = randomizer.getWeightedRandom(namedata.holmesian_scount.values, namedata.holmesian_scount.weights);

	for (let i = 1; i <= scount; i++) {
		name += randomizer.rollRandom(namedata.holmesian_syllables); // array
		if (i < scount) {
			name += randomizer.getWeightedRandom(['', ' ', '-'], [3, 2, 2]);
		}
	}
	name = name.toLowerCase() + ' ' + randomizer.rollRandom(namedata.holmesian_title);

	name = randomizer.findToken(name);

	name = name.replace(/[\s\-]([a-z]{1})/g, (match) => {
		return match.toUpperCase();
	});
	return name;
};

/**
 * Demonic name
 * Taken from Jeff Rients, based on Goetia, as implemented here: http://www.random-generator.com/index.php?title=Goetic_Demon_Names
 * @return {String} a name
 */
const demonname = function () {
	let name = '';
	const format = randomizer.getWeightedRandom([ ['first', 'last'], ['first', 'inner', 'last'], ['first', 'inner', 'inner', 'last'], ['first', 'inner', 'inner', 'inner', 'last'] ], [55, 35, 7, 3]);
	for (let i = 0; i < format.length; i++) {
		name += randomizer.rollRandom(namedata.demonic[format[i]]);
	}
	return name;
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
	if (typeof name_type === 'undefined' || isEmpty(data)) {
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
	if (typeof token_parts[1] === 'undefined' || token_parts[1] === '' || token_parts[1] === 'random') {
		token_parts[1] = '';
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
	selectSurname,
	createName,
	registerNameType,
	nameTokenCallback
};
