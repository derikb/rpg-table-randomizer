'use strict';

const r_helpers = require('./r_helpers.js');

/**
 * Name generator...
 * @param {Object} randomizer an instance of randomizer module
 * @param {Object} namedata a lot of names divided by type. see /samples/names.json for formatting
 */
module.exports = function random_name (randomizer, namedata) {
	
	if (typeof namedata === 'undefined') {
		const namedata = { options: {} };
	}
	
	/**
	 * Generate a bunch of names, half male, half female
	 * @param {Number} [number=10] number of names in the list (half will be male, half will be female)
	 * @param {String} [name_type] type of name or else it will randomly select
	 * @param {Bool} [create=false] new names or just pick from list
	 * @return {Object} arrays of names inside male/female property
	 */
	const generateList = function (number, name_type, create) {
		const names = { male: [], female: [] };
		if (typeof create === 'undefined') { create = false; }
		if (typeof number === 'undefined') { number = 10; }
		if (typeof name_type === 'undefined' || name_type === '') {
			name_type = 'random';
		}
		
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
	const selectName = function (name_type, gender, style) {
		let name = '';
		
		if (typeof name_type === 'undefined' || name_type === '' || name_type === 'random') {
			// randomize a type...
			name_type = randomizer.rollRandom(Object.keys(namedata.options));
		}
		if (typeof gender === 'undefined' || gender === 'random') {
			// randomize a gender...
			gender = randomizer.rollRandom(['male', 'female']);
		}
		if (typeof style === 'undefined' || style !== 'first') {
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
				if (typeof namedata[name_type]['surname'] !== 'undefined' && style !== 'first') {
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
	const selectSurname = function (name_type) {
		let name = '';
		if (typeof name_type === 'undefined' || name_type === '' || name_type === 'random') {
			// randomize a type...
			name_type = randomizer.rollRandom(Object.keys(namedata.options));
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
	const createName = function (name_type, gender, style) {
		if (typeof name_type === 'undefined' || name_type === '' || name_type === 'random') {
			// randomize a type...
			name_type = randomizer.rollRandom(Object.keys(namedata.options));
		}
		if (typeof style === 'undefined') { style = ''; }
		if (!namedata[name_type]) { return ''; }
		if (typeof gender === 'undefined' || (gender !== 'male' && gender !== 'female')) { gender = ''; }
		
		const mkey = `${name_type}_${gender}`;
		let lastname = '';
		let thename = '';
		
		if (!markov.memory) {
			markov = new MarkovGenerator({ order: 3 });
		}
		
		if (!markov.memory[mkey]) {
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
		
		if (style !== 'first' && !r_helpers.isEmpty(namedata[name_type]['surname'])) {
			const skey = name_type + '_last';
			if (!markov.memory[skey]) {
				// console.log('learn surname '+skey);
				const namelist = namedata[name_type]['surname'];
				namelist.forEach((v) => {
					markov.learn(skey, v);
				});
			}
			lastname = markov.generate(skey);
		}
		
		thename = `${markov.generate(mkey)} ${lastname}`;
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
			return (leave_lower.indexOf(w) >= 0) ? w : `${r_helpers.capitalize(w)}`;
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
	const registerNameType = function (name_type, data, label) {
		if (typeof name_type === 'undefined' || label === '') {
			return false;
		}
		if (typeof label === 'undefined' || label === '') {
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
	 * Register the name token with the randomizer
	 */
	randomizer.registerTokenType('name', (token_parts, full_token, curtable) => {
		let string = '';
		// const n = this;
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
	});

	
	/**
	 * Adapted from http://blog.javascriptroom.com/2013/01/21/markov-chains/
	 */
	const MarkovGenerator = function (config) {
		if (typeof config === 'undefined') { config = {}; }
		/**
		 * the "memory" where the language parts go
		 */
		this.memory = {};
		/**
		 * If you want to delimit the generated parts
		 */
		this.separator = (config.separator) ? config.separator : '';
		/**
		 * How many... something... to something.... oh it's been too long I don't remember how this works...
		 */
		this.order = (config.order) ? config.order : 2;
		/**
		 * Feed text to memory
		 * @param {String} key key for the chain (so we can store multiple memories)
		 * @param {String} txt word or phrase
		 * @return {null} null
		 */
		this.learn = function (key, txt) {
			const mem = (this.memory[key]) ? this.memory[key] : {};
			// split up text then add the calculated parts to the memory for this ket
			this.breakText(txt, (key, value) => {
				// console.log(key);
				if (!mem[key]) {
					mem[key] = [];
				}
				mem[key].push(value);
				return mem;
			});
			this.memory[key] = mem;
		};
		/**
		 * Return a generated response
		 * @param {String} key key for the chain (so we can store multiples
		 * @param {Array} seed letters to start the response (?)
		 */
		this.generate = function (key, seed) {
			if (!seed) {
				seed = this.genInitial();
			}
			this.cur_key = key;
			return seed.concat(this.step(seed, [])).join(this.separator);
		};
		/**
		 * iterate through, calls self
		 * @param {Array} state array of most recent x(x=order) elements in chain
		 * @param {Array} ret the chain
		 * @return {Array}
		 */
		this.step = function (state, ret) {
			const nextAvailable = this.memory[this.cur_key][state] || [''];
			const next = this.getRandomValue(nextAvailable);
			// we don't have anywhere to go
			if (!next) {
				return ret;
			}
			ret.push(next);
			var nextState = state.slice(1);
			nextState.push(next);
			return this.step(nextState, ret);
		};
		/**
		 * Chunk the word or phrase
		 * @param {String} txt the text to chunk
		 * @param {Function} cb callback function
		 * @return {null} null
		 */
		this.breakText = function (txt, cb) {
			const parts = txt.split(this.separator);
			const prev = this.genInitial();
	 
			parts.forEach((v) => {
				v = v.toLowerCase();
				cb(prev, v);
				prev.shift();
				prev.push(v);
			});
			cb(prev, '');
		};
		/**
		 * Generate a starting array for the chain based on the order number
		 * @return {Array} just an empty array of length=order
		 */
		this.genInitial = function () {
			const ret = [];
			for (
				let i = 0;
				i < this.order;
				ret.push(''),
				i++
			);
			return ret;
		};
		/**
		 * Get a random array element
		 * @param {Array} arr an array
		 * @return {String|Object}	random value
		 */
		this.getRandomValue = function (arr) {
			return arr[Math.floor(Math.random() * arr.length)];
		};
	};
	
	/**
	 * Stores the Markov object
	 */
	let markov = new MarkovGenerator({ order: 3 });;
	
	
	return {
		generateList: generateList,
		selectName: selectName,
		selectSurname: selectSurname,
		createName: createName,
		capitalizeName: capitalizeName,
		holmesname: holmesname,
		demonname: demonname,
		registerNameType: registerNameType,
		namedata: namedata
	};
};
