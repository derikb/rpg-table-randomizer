'use strict';

const r_helpers = require('./r_helpers.js');
const namedata = require('../sample/names.json');

/**
 * Name generator...
 * @param {Object} randomizer an instance of randomizer module
 */
const RandomName = function (randomizer) {
	this.listCount = 10;
	this.markov = {};
	this.randomizer = randomizer;
	/**
	 * Generate a bunch of names
	 * @param {String} nametypes type of name
	 * @param {Bool} create new names or just pick from list
	 * @return {Array} list of name objects
	 */
	this.generateList = function (nametypes, create) {
		const names = {};
		if (typeof create === 'undefined') { create = false; }
		
		if (!Array.isArray(nametypes)) {
			nametypes = [nametypes];
		}
		
		nametypes.forEach((v) => {
			const a = { male: [], female: [] };
			const n = this.listCount;
			for (let i = 1; i <= n; i++) {
				const gender = (i <= Math.ceil(n / 2)) ? 'male' : 'female';
				if (create && v !== 'holmesian' && v !== 'demonic') {
					a[gender].push(this.createName(v, gender, true));
				} else {
					a[gender].push(this.generateName(v, gender));
				}
			}
			names[v] = a;
		});
		return names;
	};
	/**
	 * Generate a Holmes name
	 * @returns {String} name
	 */
	this.holmesname = function () {
		let name = '';
		const scount = this.randomizer.getWeightedRandom(namedata.holmesian_scount.values, namedata.holmesian_scount.weights);
	
		for (let i = 1; i <= scount; i++) {
			name += this.randomizer.rollRandom(namedata.holmesian_syllables); // array
			if (i < scount) {
				name += this.randomizer.getWeightedRandom(['', ' ', '-'], [3, 2, 2]);
			}
		}
		name = r_helpers.capitalize(name.toLowerCase());
		name += ' ' + this.randomizer.rollRandom(namedata.holmesian_title);
		
		name = this.randomizer.findToken(name);
		
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
	this.demonname = function () {
		let name = '';
		const format = this.randomizer.getWeightedRandom([ ['first', 'last'], ['first', 'inner', 'last'], ['first', 'inner', 'inner', 'last'], ['first', 'inner', 'inner', 'inner', 'last'] ], [55, 35, 7, 3]);
		for (let i = 0; i < format.length; i++) {
			name += this.randomizer.rollRandom(namedata.demonic[format[i]]);
		}
		return name;
	};
	/**
	 * Create a name
	 * @param {String} name_type What name list/process to use else random
	 * @param {String} gender male, female, random, ''
	 * @param {String} style first=first name only, else full name
	 * @returns {String} a name
	 */
	this.generateName = function (name_type, gender, style) {
		let name = '';
		
		if (typeof name_type === 'undefined' || name_type === '' || name_type === 'random') {
			// randomize a type...
			name_type = this.randomizer.rollRandom(Object.keys(namedata.options));
		}
		if (typeof gender === 'undefined' || gender === 'random') {
			// randomize a gender...
			gender = this.randomizer.rollRandom(['male', 'female']);
		}
		if (typeof style === 'undefined' || style !== 'first') {
			style = '';
		}
		
		switch (name_type) {
			case 'holmesian':
				name = this.holmesname();
				break;
			case 'demonic':
				name = this.demonname();
				break;
			case 'cornish':
			case 'flemish':
			case 'dutch':
			case 'turkish':
			default:
				name = r_helpers.capitalize(this.randomizer.rollRandom(namedata[name_type][gender]));
				if (typeof namedata[name_type]['surname'] !== 'undefined' && style !== 'first') {
					name += r_helpers.capitalize(' ' + this.randomizer.rollRandom(namedata[name_type]['surname']));
				}
				name = this.randomizer.findToken(name).trim();
				break;
		}
		return name;
	};
	/**
	 * Create a sur/last name only
	 * @param {String} name_type what list/process to use, else random
	 * @returns {String} a name
	 */
	this.generateSurname = function (name_type) {
		let name = '';
		if (typeof name_type === 'undefined' || name_type === '' || name_type === 'random') {
			// randomize a type...
			name_type = this.randomizer.rollRandom(Object.keys(namedata.options));
		}
		switch (name_type) {
			case 'holmesian':
				name = this.holmesname();
				break;
			case 'cornish':
			case 'flemish':
			case 'dutch':
			case 'turkish':
			default:
				name = r_helpers.capitalize(this.randomizer.rollRandom(namedata[name_type]['surname']));
				name = this.randomizer.findToken(name);
				break;
		}
		return name;
	};
	/**
	 * Create a name using Markov chains
	 * @param {String} name_type what list/process to use, else random
	 * @param {String} gender male or female or both
	 * @param {Boolean} surname include a surname or not
	 * @returns {String} a name
	 */
	this.createName = function (name_type, gender, surname) {
		if (typeof name_type === 'undefined') { return ''; }
		if (typeof surname === 'undefined') { surname = false; }
		if (!namedata[name_type]) { return ''; }
		if (typeof gender === 'undefined') { gender = ''; }
		
		const mkey = `${name_type}_${gender}`;
		let lastname = '';
		let thename = '';
		
		if (!this.markov.memory) {
			this.markov = new Markov({ order: 3 });
		}
		
		if (!this.markov.memory[mkey]) {
			// console.log('learn '+mkey);
			let namelist = [];
			if (gender === '') {
				namelist = namedata[name_type]['male'];
				namelist = namelist.concat(namedata[name_type]['female']);
			} else {
				namelist = namedata[name_type][gender];
			}
			namelist.forEach((v) => {
				this.markov.learn(mkey, v);
			});
		}
		
		if (surname) {
			const skey = name_type + '_last';
			if (!this.markov.memory[skey]) {
				// console.log('learn surname '+skey);
				if (namedata[name_type]['surname']) {
					const namelist = namedata[name_type]['surname'];
					namelist.forEach((v) => {
						this.markov.learn(skey, v);
					});
				} else {
					this.markov.memory[skey] = {};
				}
			}
			lastname = this.capitalizeName(this.markov.generate(skey));
		}
		
		thename = this.capitalizeName(this.markov.generate(mkey));
		if (lastname !== '') {
			thename += ` ${lastname}`;
		}
		return thename;
	};
	/**
	 * Capitalize names, account for multiword lastnames like "Van Hausen"
	 * Alternately could probably split on space, map array to capitalize and then join with space... would that be faster?
	 * @param {String} name a name
	 * @return {String} name capitalized
	 */
	this.capitalizeName = function (name) {
		// need to find spaces in name and capitalize letter after space
		name = name.replace(/\s([a-z])/mg, (match, p1) => { return ` ${p1.toUpperCase()}`; });
		return name.charAt(0).toUpperCase() + name.slice(1);
	};
	
	this.randomizer.registerTokenType('name', (token_parts, full_token, curtable) => {
		console.log('name token');
		let string = '';
		const n = this;
		if (typeof token_parts[1] === 'undefined' || token_parts[1] === '' || token_parts[1] === 'random') {
			parts[1] = '';
		}
		if (typeof token_parts[3] === 'undefined' || token_parts[3] !== 'first') {
			token_parts[3] = '';
		}
		if (typeof token_parts[2] === 'undefined') {
			string = n.generateSurname(token_parts[1]);
		} else if (token_parts[2] === 'male') {
			string = n.generateName(parts[1], 'male', token_parts[3]);
		} else if (token_parts[2] === 'female') {
			string = n.generateName(parts[1], 'female', token_parts[3]);
		} else if (token_parts[2] === 'random') {
			string = n.generateName(token_parts[1], 'random', token_parts[3]);
		}
		
		return string;
	});
};

/**
 * Adapted from http://blog.javascriptroom.com/2013/01/21/markov-chains/
 */
const Markov = function (config) {
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

module.exports = RandomName;
