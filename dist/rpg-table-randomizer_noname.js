(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.rpg_table_randomizer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var randomizer = require('./randomizer.js');
var random_table = require('./random_table.js');
var table_normalizer = require('./table_normalizer.js');
var random_name = require('./random_name.js')(randomizer);
var r_helpers = require('./r_helpers.js');
var npc_gen = require('./npc.js')(randomizer);

module.exports = {
	randomizer: randomizer,
	RandomTable: random_table,
	TableNormalizer: table_normalizer,
	random_name: random_name,
	r_helpers: r_helpers,
	npc_generator: npc_gen
};

},{"./npc.js":2,"./r_helpers.js":3,"./random_name.js":4,"./random_table.js":5,"./randomizer.js":6,"./table_normalizer.js":7}],2:[function(require,module,exports){
'use strict';

/**
 * npc_gen: pass in the randomizer so we can return an object that can use the shared randomizer instance
 * @return {Object} npc functions
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function npc_gen(randomizer) {
	/**
  * Object to store NPC constructors.
  * each constructor (except the base one) is based on a schema
  */
	var NPC = {};
	/**
  * The base prototype for NPC constructors. From this schemas are used to make differing constructions
  */
	NPC.Base = function () {};
	/**
  * Just a unique identifier that can be used for storage/retrieval
  */
	NPC.Base.prototype.id = 0;
	/**
  * Name of the schema used for the NPC
  */
	NPC.Base.prototype.schema = '';
	/**
  * The NPC's fields as set by the schema
  */
	NPC.Base.prototype.fields = [];
	/**
  * Schema assigned helper functions
  */
	NPC.Base.prototype.helpers = {};
	/**
  * set defaults on the fields
  * usually this would involve calling random tables
  */
	NPC.Base.prototype.initialize = function () {
		var _this = this;

		var schema_fields = Schemas[this.schema].fields;
		var fields = Object.keys(this.fields);
		fields.forEach(function (f) {
			var sch = schema_fields.find(function (v) {
				return v.key === f;
			});
			if (sch) {
				if (sch.default) {
					_this.fields[f] = sch.default;
					return;
				}
				if (sch.source && sch.source !== '') {
					// parse source into something randomizer can use...
					var src_temp = void 0;
					if (sch.type === 'function') {
						var func = new Function(sch.source);
						src_temp = func.call(_this);
					} else {
						src_temp = sch.source;
					}
					// console.log(src_temp);
					if (sch.type === 'array') {
						var ct = sch.count ? sch.count : 1; // ???
						for (var i = 0; i < ct; i++) {
							_this.fields[f].push(randomizer.convertToken(src_temp));
						}
					} else {
						_this.fields[f] = randomizer.convertToken(src_temp);
					}
				}
			}
		});
	};
	/**
  * Take an empty object and set the fields
  * @todo should we account for id and schema too?
  * @param {Object} fields data for the fields
  */
	NPC.Base.prototype.set = function (fields) {
		var _this2 = this;

		if ((typeof fields === 'undefined' ? 'undefined' : _typeof(fields)) !== 'object') {
			return;
		}
		var props = Object.keys(fields);
		props.forEach(function (p) {
			if (_this2.fields[p]) {
				_this2.fields[p] = fields[p];
			}
		});
	};

	/**
  * Object store for registered schemas
  */
	var Schemas = {};

	/**
  * function to make a new NPC constructor
  * constructor is added to NPC[schema.key]
  * @param {Object} schema NPC schema object to base on the constructor
  * @return {null}
  */
	var registerSchema = function registerSchema(schema) {
		if (!schema.key || schema.key === 'base' || !Array.isArray(schema.fields)) {
			return null;
			// throw exception?
		}
		// store it for later reference
		Schemas[schema.key] = schema;
		// add this schema to the NPC object so we can use it as a constructor
		// this could overwrite is that ok?
		var Base = NPC[schema.key] = function () {
			// in case we add something to NPC constructor that we need to call?
			// NPC.Base.call(this);
		};
		Base.prototype = new NPC.Base();
		Base.prototype.constructor = Base;
		Base.prototype.schema = schema.key;
		Base.prototype.fields = [];
		Base.prototype.helpers = {};

		// initialize schema properties...
		schema.fields.forEach(function (f) {
			var default_ = null;
			switch (f.type) {
				case 'string':
				case 'text':
					default_ = '';
					break;
				case 'array':
					default_ = [];
					break;
				case 'number':
				case 'modifier':
					default_ = 0;
					break;
				case undefined:
					// ?
					break;
			}
			Base.prototype.fields[f.key] = default_;
		});

		if (!schema.helpers || _typeof(schema.helpers) !== 'object') {
			return;
		}
		var helpers = Object.keys(schema.helpers);
		helpers.forEach(function (h) {
			// if (typeof schema.helpers[h] === 'function') {
			//	Base.prototype.helpers[h] = schema.helpers[h];
			// }
			// create a function from the array
			Base.prototype.helpers[h] = new (Function.prototype.bind.apply(Function, [null].concat(_toConsumableArray(schema.helpers[h]))))();
		});
	};

	// return the NPC object of constructors and the registerSchema function
	return {
		NPC: NPC,
		registerSchema: registerSchema
	};
};

},{}],3:[function(require,module,exports){
'use strict';

/**
 * Is it empty (stolen from Underscore)
 * @param {Object|String|?} obj some type of things
 * @return {Boolean} is it empty?
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var isEmpty = function isEmpty(obj) {
  if (obj === null || obj === void 0) {
    return true;
  }
  if (Array.isArray(obj) || isString(obj)) {
    return obj.length === 0;
  }
  return Object.keys(obj).length === 0;
};
/**
 * Is it a String (stolen from Underscore)
 * @param {Object|String|?} obj some type of things
 * @return {Boolean} is it an string?
 */
var isString = function isString(obj) {
  return toString.call(obj) === '[object String]';
};
/**
 * Is it an Object (stolen from Underscore)
 * @param {Object|String|?} obj some type of things
 * @return {Boolean} is it an object?
 */
var isObject = function isObject(obj) {
  var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  return type === 'function' || type === 'object' && !!obj;
};
/**
 * Is a given variable undefined?
 * @param {Object|String|?} obj object to test
 * @return {Boolean} is it undefined
 */
var isUndefined = function isUndefined(obj) {
  return obj === void 0;
};
/**
 * Capitalize a string
 * @param {String} string a string
 * @return {String} string with first letter capitalized
 */
var capitalize = function capitalize(string) {
  return isEmpty(string) ? string : string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = {
  isEmpty: isEmpty,
  isString: isString,
  isObject: isObject,
  isUndefined: isUndefined,
  capitalize: capitalize
};

},{}],4:[function(require,module,exports){
'use strict';

var r_helpers = require('./r_helpers.js');

/**
 * Name generator...
 * @param {Object} randomizer an instance of randomizer module
 * @param {Object} namedata a lot of names divided by type. see /samples/names.json for formatting
 */
module.exports = function random_name(randomizer, namedata) {
	// if necessary inititalize the namedata object
	if (typeof namedata === 'undefined') {
		var _namedata = { options: {} };
	}

	/**
  * Generate a bunch of names, half male, half female
  * @param {Number} [number=10] number of names in the list (half will be male, half will be female)
  * @param {String} [name_type] type of name or else it will randomly select
  * @param {Bool} [create=false] new names or just pick from list
  * @return {Object} arrays of names inside male/female property
  */
	var generateList = function generateList(number, name_type, create) {
		var names = { male: [], female: [] };
		if (typeof create === 'undefined') {
			create = false;
		}
		if (typeof number === 'undefined') {
			number = 10;
		}
		if (typeof name_type === 'undefined' || name_type === '') {
			name_type = 'random';
		}

		for (var i = 1; i <= number; i++) {
			var gender = i <= Math.ceil(number / 2) ? 'male' : 'female';
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
	var selectName = function selectName(name_type, gender, style) {
		var name = '';

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
				if (style !== 'first' && typeof namedata[name_type]['surname'] !== 'undefined' && !r_helpers.isEmpty(namedata[name_type]['surname'])) {
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
	var selectSurname = function selectSurname(name_type) {
		var name = '';
		if (typeof name_type === 'undefined' || name_type === '' || name_type === 'random') {
			// randomize a type...
			name_type = randomizer.rollRandom(Object.keys(namedata.options));
		}
		if (typeof namedata[name_type]['surname'] === 'undefined' || r_helpers.isEmpty(namedata[name_type]['surname'])) {
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
	var createName = function createName(name_type, gender, style) {
		if (typeof name_type === 'undefined' || name_type === '' || name_type === 'random') {
			// randomize a type...
			name_type = randomizer.rollRandom(Object.keys(namedata.options));
		}
		if (typeof style === 'undefined') {
			style = '';
		}
		if (!namedata[name_type]) {
			return '';
		}
		if (typeof gender === 'undefined' || gender !== 'male' && gender !== 'female') {
			gender = randomizer.rollRandom(['male', 'female']);
		}

		var mkey = name_type + '_' + gender;
		var lastname = '';
		var thename = '';

		if (!markov.memory) {
			markov = new MarkovGenerator({ order: 3 });
		}

		if (!markov.memory[mkey]) {
			// console.log('learn '+mkey);
			var namelist = [];
			if (gender === '') {
				namelist = namedata[name_type]['male'];
				namelist = namelist.concat(namedata[name_type]['female']);
			} else {
				namelist = namedata[name_type][gender];
			}
			namelist.forEach(function (v) {
				markov.learn(mkey, v);
			});
		}

		if (style !== 'first' && !r_helpers.isEmpty(namedata[name_type]['surname'])) {
			(function () {
				var skey = name_type + '_last';
				if (!markov.memory[skey]) {
					// console.log('learn surname '+skey);
					var _namelist = namedata[name_type]['surname'];
					_namelist.forEach(function (v) {
						markov.learn(skey, v);
					});
				}
				lastname = markov.generate(skey);
			})();
		}

		thename = markov.generate(mkey) + ' ' + lastname;
		return capitalizeName(thename.trim());
	};
	/**
  * Capitalize names, account for multiword lastnames like "Van Hausen"
  * @param {String} name a name
  * @return {String} name capitalized
  */
	var capitalizeName = function capitalizeName(name) {
		var leave_lower = ['of', 'the', 'from', 'de', 'le', 'la'];
		// need to find spaces in name and capitalize letter after space
		var parts = name.split(' ');
		var upper_parts = parts.map(function (w) {
			return leave_lower.indexOf(w) >= 0 ? w : '' + r_helpers.capitalize(w);
		});
		return upper_parts.join(' ');
	};
	/**
  * Generate a Holmes name
  * @returns {String} name
  */
	var holmesname = function holmesname() {
		var name = '';
		var scount = randomizer.getWeightedRandom(namedata.holmesian_scount.values, namedata.holmesian_scount.weights);

		for (var i = 1; i <= scount; i++) {
			name += randomizer.rollRandom(namedata.holmesian_syllables); // array
			if (i < scount) {
				name += randomizer.getWeightedRandom(['', ' ', '-'], [3, 2, 2]);
			}
		}
		name = name.toLowerCase() + ' ' + randomizer.rollRandom(namedata.holmesian_title);

		name = randomizer.findToken(name);

		name = name.replace(/[\s\-]([a-z]{1})/g, function (match) {
			return match.toUpperCase();
		});
		return name;
	};
	/**
  * Demonic name
  * Taken from Jeff Rients, based on Goetia, as implemented here: http://www.random-generator.com/index.php?title=Goetic_Demon_Names
  * @return {String} a name
  */
	var demonname = function demonname() {
		var name = '';
		var format = randomizer.getWeightedRandom([['first', 'last'], ['first', 'inner', 'last'], ['first', 'inner', 'inner', 'last'], ['first', 'inner', 'inner', 'inner', 'last']], [55, 35, 7, 3]);
		for (var i = 0; i < format.length; i++) {
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
	var registerNameType = function registerNameType(name_type, data, label) {
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
	randomizer.registerTokenType('name', function (token_parts, full_token, curtable) {
		var string = '';
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
	var MarkovGenerator = function MarkovGenerator(config) {
		if (typeof config === 'undefined') {
			config = {};
		}
		/**
   * the "memory" where the language parts go
   */
		this.memory = {};
		/**
   * If you want to delimit the generated parts
   */
		this.separator = config.separator ? config.separator : '';
		/**
   * How many... something... to something.... oh it's been too long I don't remember how this works...
   */
		this.order = config.order ? config.order : 2;
		/**
   * Feed text to memory
   * @param {String} key key for the chain (so we can store multiple memories)
   * @param {String} txt word or phrase
   * @return {null} null
   */
		this.learn = function (key, txt) {
			var mem = this.memory[key] ? this.memory[key] : {};
			// split up text then add the calculated parts to the memory for this ket
			this.breakText(txt, function (key, value) {
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
			var nextAvailable = this.memory[this.cur_key][state] || [''];
			var next = this.getRandomValue(nextAvailable);
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
			var parts = txt.split(this.separator);
			var prev = this.genInitial();

			parts.forEach(function (v) {
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
			var ret = [];
			for (var i = 0; i < this.order; ret.push(''), i++) {}
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
	var markov = new MarkovGenerator({ order: 3 });

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

},{"./r_helpers.js":3}],5:[function(require,module,exports){
'use strict';

var r_helpers = require('./r_helpers.js');

/**
 * RandomTable: Model for tables used by Randomizer
 * @param {Object} config the tables non-default attributes
 */
var RandomTable = function RandomTable(config) {
	/**
  * The primary attributes of this table
  * @property {String} id id for the table, primary key for database if used
  * @property {String} key identifier for the table
  * @property {String} [title] title of the table
  * @property {String} [author] author of the table
  * @property {String} [description] description of the table
  * @property {String} [source] source of the table
  * @property {Array} [tags] subject tags
  * @property {String|Array} [sequence] tables to roll on. if array it can be an array of strings (table names) or objects (two properties table: the table to roll on and times: the number of times to roll)
  * @property {Array} [table] default table. array of strings or objects. removed after initialization.
  * @property {Object} [tables] a property for each subtables. if table property is not set then the first propery of this Object is used to start rolling
  * @property {Array} [macro] for tables that are only used to aggregate result from other tables, this array consists of table keys to be rolled on in order
  * @property {Object} [print] objects to describe what parts of a (sub)table should be displayed in the results
  * @property {Object} [print.default] how to display the default table's results
  * @property {Object} [print.default.hide_table] set to 1 will not show the table name
  * @property {Object} [print.default.hide_result] set to 1 will not show the result on that (sub)table
  * @property {Object} [print.default.hide_desc] set to 1 will not show any description for a result on that (sub)table
  * @property {Array} [result] current result array of objects
  */
	this.id = 0;
	this.key = '';
	this.title = '';
	this.author = '';
	this.description = '';
	this.source = '';
	this.tags = [];
	this.sequence = ''; // where to start rolling and if other tables should always be rolled on
	this.tables = {};
	this.macro = [];
	this.result = [];
	/**
  * Run on first construction
  * @param {Object} config data passed from the constructor
  */
	var initialize = function initialize(config) {
		for (var prop in config) {
			if (config.hasOwnProperty(prop)) {
				this[prop] = config[prop];
			}
		}
		// make sure this.tables.default is set instead of this.table
		// maybe we dont need this
		if (!r_helpers.isEmpty(this.table)) {
			var tables = this.tables;
			tables.default = this.table;
			this.tables = tables;
			delete this.table;
		}
		if (this.key === '') {
			this.key = this.id;
		}
	};
	/**
  * validate fields before saving
  * @param {Object} properties new attributes to save
  * @returns {Object} error information
  */
	this.validate = function (properties) {
		// console.log(attributes);
		var error = { fields: [], general: '' };

		if (properties.title === '') {
			error.fields.push({ field: 'title', message: 'Title cannot be blank' });
			error.general += 'Title cannot be blank. ';
		}

		if (r_helpers.isEmpty(properties.tables) && r_helpers.isEmpty(properties.macro)) {
			error.fields.push({ field: 'tables', message: 'Both Tables and Macro cannot be empty' });
			error.general += 'Both Tables and Macro cannot be empty. ';
		}

		if (!r_helpers.isEmpty(error.fields) || !r_helpers.isEmpty(error.general)) {
			return error;
		}
		return true;
	};
	/**
  * Show the results as a string
  * @todo make this nicer/clearer #23
  * Alternate: write a template to use in the views?
  * @param {Boolean} [simple=false] if true only output the first result label
  * @returns {String} the results
  */
	this.niceString = function (simple) {
		if (typeof simple === 'undefined') {
			simple = false;
		}
		var r = this.result; // array
		if (r_helpers.isString(r) || !Array.isArray(r) || r.length === 0) {
			return '';
		}

		if (simple) {
			return r[0]['result'];
		} // @todo maybe use shift() instead, if editing this array won't be a problem. (else we could clone it...

		var o = '';
		var print_opt = this.print ? this.print : {};
		r.forEach(function (v) {
			if (print_opt[v.table]) {
				if (!print_opt[v.table].hide_table || print_opt[v.table].hide_table === 0) {
					o += r_helpers.capitalize(v.table) + ': ';
				}
				if (!print_opt[v.table].hide_result || print_opt[v.table].hide_result === 0) {
					o += r_helpers.capitalize(v.result) + '\n';
				}
				if (!print_opt[v.table].hide_desc || print_opt[v.table].hide_desc === 0) {
					if (v.desc !== '') {
						o += v.desc + '\n';
					}
				}
			} else {
				if (v.table === 'default') {
					o += r_helpers.capitalize(v.result) + '\n';
				} else {
					o += r_helpers.capitalize(v.table) + ': ' + r_helpers.capitalize(v.result) + '\n';
				}
				if (v.desc !== '') {
					o += v.desc + '\n';
				}
			}
		});
		o = o.trim(); // trim off final linebreak
		return o;
	};
	/**
  * outputs the json data for the table (import/export)
  * @param {Boolean} [editmode=false] if false empty properties will be stripped out
  * @returns {Object} table attributes
  */
	this.outputObject = function (editmode) {
		if (typeof editmode === 'undefined') {
			editmode = false;
		}
		// clone the data, this will strip out any functions too.
		var att = JSON.parse(JSON.stringify(this));
		var props = Object.keys(att);
		props.forEach(function (k) {
			if (!editmode && r_helpers.isEmpty(att[k])) {
				delete att[k];
			}
		});
		// don't include results
		if (att.result && editmode) {
			att.result = [];
		} else if (att.result) {
			delete att.result;
		}
		delete att.id;
		return att;
	};
	/**
  * outputs the json data for the table (import/export)
  * @param {Boolean} [editmode=false] if false empty properties will be stripped out
  * @param {Boolean} [compress=false] if true JSON will not have indentation, etc.
  * @returns {String} table properties in JSON
  */
	this.outputCode = function (editmode, compress) {
		if (typeof editmode === 'undefined') {
			editmode = false;
		}
		if (typeof compress === 'undefined') {
			compress = false;
		}

		var obj = this.outputObject(editmode);

		if (compress) {
			return JSON.stringify(obj);
		}
		return JSON.stringify(obj, null, 2);
	};
	/**
  * Get an object result in case we only have the label and need other data from it
  * @param {String} label The item we are looking for
  * @param {String} [table=default] the table to search
  * @returns {Object} the object associated with the label or an empty one
  */
	this.findObject = function (label, table) {
		if (typeof table === 'undefined' || table === '') {
			table = 'default';
		}
		var t = this.tables[table];
		if (t[label]) {
			return t[label];
		}
		if (Array.isArray(t)) {
			var obj = t.find(function (v) {
				return v.label === label;
			});
			return typeof obj !== 'undefined' ? obj : {};
		}
		return {};
	};
	/**
   * find the result element for a specific table/subtable
   * only works if we have already generated a result
   * @param {String} table The table to look for
   * @returns {Object} result element for specified table (or empty)
   */
	this.findResultElem = function (table) {
		if (typeof table === 'undefined' || table === '') {
			table = 'default';
		}
		var obj = this.result.find(function (v) {
			return v.table === table;
		});
		return typeof obj !== 'undefined' ? obj : {};
	};

	/**
  * Initialize the table, set the data, normalize, etc.
  */
	initialize.call(this, config);
};

module.exports = RandomTable;

},{"./r_helpers.js":3}],6:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var r_helpers = require('./r_helpers.js');

/**
 * Randomizer - handles app randomization functions
 * Module exports a single instance of Randomizer...
 * @constructor
 */
var Randomizer = function Randomizer() {
	var _this4 = this;

	/**
  * Store the token types/processing
  */
	this.token_types = {};
	/**
  * Random integer between two numbers (stolen from underscorejs)
  * @param {Number} min mininum value
  * @param {Number} max maximum value
  * @return {Number} random value
  */
	this.random = function (min, max) {
		if (max == null) {
			max = min;
			min = 0;
		}
		return min + Math.floor(Math.random() * (max - min + 1));
	};
	/**
  * Sum an array
  * @param {Array} arr an array of numbers
  * @returns {Number} Total value of numbers in array
  */
	function arraySum(arr) {
		var total = 0;
		for (var i = 0; i < arr.length; i++) {
			var v = parseFloat(arr[i]);
			if (!isNaN(v)) {
				total += v;
			}
		}
		return total;
	};
	/**
  * Random value selection
  * @param {Array} values an array of strings from which to choose
  * @param {Array} weights a matching array of integers to weight the values (i.e. values and weights are in the same order)
  * @returns {String} the randomly selected Array element from values param
  */
	this.getWeightedRandom = function (values, weights) {
		var n = 0;
		var num = this.random(1, arraySum.call(this, weights));
		for (var i = 0; i < values.length; i++) {
			n = n + weights[i];
			if (n >= num) {
				break;
			}
		}
		return values[i];
	};
	/**
  * Random value selection, wrapper for getWeightedRandom that processes the data into values/weights arrays
  * @param {Object|Array} data An object or array of data
  * @returns {String} the randomly selected Object property name, Array element, or value of the "label" property
  */
	this.rollRandom = function (data) {
		var values = [];
		var weights = [];

		if (Array.isArray(data)) {
			data.forEach(function (v, k, l) {
				if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
					if (typeof v.weight !== 'undefined') {
						weights.push(v.weight);
					} else {
						weights.push(1);
					}
					values.push(v.label);
				} else if (typeof v === 'string') {
					// nothing
					weights.push(1);
					values.push(v);
				}
			});
		} else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data !== null) {
			var props = Object.keys(data);
			props.forEach(function (k) {
				var v = data[k];
				if (typeof v.weight !== 'undefined') {
					weights.push(v.weight);
				} else {
					weights.push(1);
				}
				values.push(k);
			});
		}
		return this.getWeightedRandom(values, weights);
	};
	/**
  * Dice rolling simulator
  * @param {Number} [die=6] Die type
  * @param {Number} [number=1] Number of times to roll the die
  * @param {Number} [modifier=0] Numeric modifier to dice total
  * @param {String} [mod_op=+] Operator for the modifier (+,-,/,*)
  * @returns {Number} Number rolled (die*number [mod_op][modifier])
  */
	function parseDiceNotation(die, number, modifier, mod_op) {
		modifier = typeof modifier === 'undefined' ? 0 : parseInt(modifier, 10);
		die = typeof die === 'undefined' ? 6 : parseInt(die, 10);
		mod_op = typeof mod_op === 'undefined' ? '+' : mod_op;

		if (typeof number === 'undefined' || number === 0) {
			number = 1;
		} else {
			number = parseInt(number, 10);
		}

		var sum = 0;
		for (var i = 1; i <= number; i++) {
			sum = sum + this.random(1, die);
		}
		if (modifier === 0) {
			return sum;
		}

		switch (mod_op) {
			case '*':
				sum = sum * modifier;
				break;
			case '-':
				sum = sum - modifier;
				break;
			case '/':
				sum = sum / modifier;
				break;
			case '+':
			default:
				sum = sum + modifier;
				break;
		}
		return Math.round(sum);
	};
	/**
  * Generate a result from a RandomTable object
  * @param {Object} rtable the RandomTable
  * @param {String} [start=''] subtable to roll on
  * @return {Array} array of object results { table: table that was rolled on, result: result string, desc: optional description string }
  */
	this.getTableResult = function (rtable, start) {
		var _this = this;

		if (!r_helpers.isObject(rtable)) {
			return [{ table: 'Error', result: 'No table found to roll on.', desc: '' }];
		}
		var result = [];
		if (typeof start === 'undefined') {
			start = '';
		}

		// if macro is set then we ignore a lot of stuff
		if (!r_helpers.isEmpty(rtable.macro)) {
			// iterate over the tables and get results
			rtable.macro.forEach(function (t) {
				var table = _this.getTableByKey(t);
				if (r_helpers.isEmpty(table)) {
					return;
				}
				_this.getTableResult(table);
				result.push({ table: t, result: table.niceString() });
			});
			rtable.result = result;
			return result;
		}

		// we look in the start table for what to roll if the start wasn't explicitly set in the call
		var sequence = start === '' ? rtable.sequence : start;

		if (sequence === 'rollall') {
			// roll all the tables in order
			sequence = Object.keys(rtable.tables);
		}

		if (sequence === '') {
			// if no start attribute
			// try for "default" table
			if (typeof rtable.tables['default'] !== 'undefined') {
				result = this.selectFromTable(rtable, 'default');
			} else {
				// select first item from tables
				var tables = Object.keys(rtable.tables);
				result = this.selectFromTable(rtable, tables[0]);
			}
		} else if (typeof sequence === 'string') {
			result = this.selectFromTable(rtable, sequence);
		} else {
			sequence.forEach(function (seq) {
				var r = '';
				if (r_helpers.isString(seq)) {
					r = _this.selectFromTable(rtable, seq);
					result = result.concat(r);
					return;
				}
				// its an object
				var table = seq.table ? seq.table : '';
				if (table === '') {
					return;
				}
				var times = typeof seq.times === 'number' ? seq.times : 1;
				for (var i = 1; i <= times; i++) {
					r = _this.selectFromTable(table);
					result = result.concat(r);
				}
			});
		}

		rtable.result = result;
		return result;
	};
	/**
  * Get a result from a table/subtable in a RandomTable object
  * DANGER: you could theoretically put yourself in an endless loop if the data were poorly planned
  * ...but at worst that would just crash the users browser since there's no server processing involved... (???)
  * @todo we'll have to fix for this with a node version
  * @param {Object} rtable the RandomTable object
  * @param {String} table table to roll on
  * @returns {Array} array of object results { table: table that was rolled on, result: result string, desc: optional description string }
  */
	this.selectFromTable = function (rtable, table) {
		var _this2 = this;

		if (!r_helpers.isObject(rtable)) {
			return [{ table: 'Error', result: 'No table found to roll on.', desc: '' }];
		}
		if (typeof table === 'undefined') {
			return [{ table: 'Error', result: 'No table found to roll on.', desc: '' }];
		}
		// console.log(table);
		var o = []; // output for sequence of rolls/selections
		var t = rtable.tables[table]; // the table/subtable
		var result = this.rollRandom(t); // the random string from the table (either the object property, a string value from an array, or the value property from a selected object)
		var r = ''; // the string result from the table
		var result_print = true; // are we going to show this result

		if (r_helpers.isUndefined(t[result])) {
			// table is an array
			// r = _.findWhere(t, { label: result });
			r = t.find(function (v) {
				return v.label === result;
			});
			if (r_helpers.isUndefined(r)) {
				// it's just an array of strings so we can stop here
				o.push({ table: table, result: result, desc: '' });
				return o;
			}
			result_print = typeof r['print'] === 'undefined' ? true : r['print'];
		} else {
			r = t[result];
			result_print = typeof t[result]['print'] === 'undefined' ? true : t[result]['print'];
		}
		// r is now the result object

		// if print==false we suppress the output from this table (good for top-level tables)
		if (result_print === true) {
			// add the description if there is one
			var desc = r_helpers.isString(r['description']) ? r['description'] : '';
			// replace any tokens
			var t_result = this.findToken(result, rtable.key);
			o.push({ table: table, result: t_result, desc: desc });
		}

		// are there subtables to roll on?
		var subtable = r.subtable;
		var r2 = ''; // subtable results
		if (typeof subtable === 'undefined') {
			// no subtables
			return o;
		} else if (r_helpers.isString(subtable)) {
			// subtables is a string reference to a table so we run this function again
			r2 = this.selectFromTable(rtable, subtable);
			o = o.concat(r2);
		} else if (Array.isArray(subtable)) {
			// subtables is an array, assume reference to other tables, roll on each in turn
			subtable.forEach(function (v) {
				r2 = _this2.selectFromTable(rtable, v);
				o = o.concat(r2);
			});
		} else if (r_helpers.isObject(subtable)) {
			// subtable is object assume embedded table(s)
			// loop over keys
			var k = Object.keys(subtable);
			k.forEach(function (kx) {
				var result = _this2.rollRandom(subtable[kx]);
				var desc = '';
				if (r_helpers.isUndefined(subtable[kx][result])) {
					// r2 = _.findWhere(subtable[kx], { label: result });
					r2 = subtable[kx].find(function (v) {
						return v.label === result;
					});
					if (r_helpers.isObject(r2)) {
						desc = r_helpers.isString(r2.description) ? r2.description : '';
					}
				} else {
					desc = r_helpers.isString(subtable[kx][result]['description']) ? subtable[kx][result]['description'] : '';
				}
				result = _this2.findToken(result, rtable.key);

				o.push({ table: kx, result: result, desc: desc });
			});
		}

		return o;
	};
	/**
  * Perform token replacement.  Only table and roll actions are accepted
  * @param {String} token A value passed from findToken containing a token(s) {{SOME OPERATION}} Tokens are {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{roll:1d6+2}} (etc) (i.e. {{table:colonial_occupations:laborer}} {{table:color}} also generate names with {{name:flemish}} (surname only) {{name:flemish:male}} {{name:dutch:female}}
  * @param {String} curtable key of the RandomTable the string is from (needed for "this" tokens)
  * @returns {String} The value with the token(s) replaced by the operation or else just the token (in case it was a mistake or at least to make the error clearer)
  */
	this.convertToken = function (token, curtable) {
		var parts = token.replace('{{', '').replace('}}', '').split(':');
		if (parts.length === 0) {
			return token;
		}

		// look for a token type we can run
		if (this.token_types[parts[0]]) {
			return this.token_types[parts[0]](parts, token, curtable);
		} else {
			return token;
		}
	};
	/**
  * Look for tokens to perform replace action in convertToken
  * @param {String} string usually a result from a RandomTable
  * @param {String} curtable key of the RandomTable the string is from (needed for "this" tokens)
  * @returns {String} String with tokens replaced (if applicable)
  */
	this.findToken = function (string, curtable) {
		var _this3 = this;

		if (r_helpers.isEmpty(string)) {
			return '';
		}
		if (typeof curtable === 'undefined') {
			curtable = '';
		}
		var regexp = new RegExp('({{2}.+?}{2})', 'g');
		var newstring = string.replace(regexp, function (token) {
			return _this3.convertToken(token, curtable);
		});
		return newstring;
	};
	/**
  * takes a string like '3d6+2', 'd6', '2d6', parses it, and puts it through roll
  * @params {String} string a die roll notation
  * @returns {Number} the result of the roll
  */
	this.roll = function (string) {
		string = typeof string === 'undefined' ? '' : string.trim();
		var m = string.match(/^([0-9]*)d([0-9]+)(?:([\+\-\*\/])([0-9]+))*$/);
		if (m) {
			if (typeof m[4] === 'undefined') {
				m[4] = 0;
			}
			if (m[1] !== '') {
				return parseDiceNotation.call(this, parseInt(m[2], 10), parseInt(m[1], 10), parseInt(m[4], 10), m[3]);
			} else {
				return parseDiceNotation.call(this, parseInt(m[2], 10), '1', parseInt(m[4], 10), m[3]);
			}
		}
		return '';
	};
	/**
  * Since tables are stored outside of this module, this function allows for the setting of a function which will be used to lookup a table by it's key
  * @param {Function} lookup a function that takes a table key and returns the table data object
  * @return {null} nothing
  */
	this.setTableKeyLookup = function (lookup) {
		this.getTableByKey = lookup;
	};
	/**
  * Placeholder that should be replaced by a function outside this module
  * @param {String} key human readable table identifier
  * @return {null} nothing, when replaced this function should return a table object
  */
	this.getTableByKey = function (key) {
		return null;
	};
	/**
  * Add a token variable
  * @param {String} name Name of the token (used as first element
  * @param {Function} process Function to return token replacement value function is passed the token_parts (token split by ":"),  original full_token, current table name
  */
	this.registerTokenType = function (name, process) {
		this.token_types[name] = process;
	};
	/**
  * Dice roll token.
  */
	this.registerTokenType('roll', function (token_parts, full_token, curtable) {
		return _this4.roll(token_parts[1]);
	});
	/**
  * Table token lookup in the form:
  * {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{table:SOMETABLE:SUBTABLE*2}} (roll subtable 2 times)
  */
	this.registerTokenType('table', function (token_parts, full_token, curtable) {
		var string = '';
		// console.log(token_parts);
		if (typeof token_parts[1] === 'undefined') {
			return full_token;
		}
		var multiplier = 1;
		if (token_parts[1].indexOf('*') !== -1) {
			var x = token_parts[1].split('*');
			token_parts[1] = x[0];
			multiplier = x[1];
		}

		// what table do we roll on
		var t = null;
		if (token_parts[1] === 'this') {
			// reroll on same table
			// console.log('this..'+curtable);
			t = _this4.getTableByKey(curtable);
			// console.log(t);
		} else {
			t = _this4.getTableByKey(token_parts[1]);
			// console.log(t);
		}
		if (t === null || (typeof t === 'undefined' ? 'undefined' : _typeof(t)) !== 'object') {
			return full_token;
		}
		if (typeof token_parts[2] !== 'undefined' && token_parts[2].indexOf('*') !== -1) {
			var _x = token_parts[2].split('*');
			token_parts[2] = _x[0];
			multiplier = _x[1];
		}
		var subtable = typeof token_parts[2] === 'undefined' ? '' : token_parts[2];

		for (var i = 1; i <= multiplier; i++) {
			_this4.getTableResult(t, subtable);
			string += t.niceString() + ', ';
		}
		string = string.trim();
		string = string.replace(/,$/, '');
		return string;
	});
};

module.exports = new Randomizer();

},{"./r_helpers.js":3}],7:[function(require,module,exports){
'use strict';

var r_helpers = require('./r_helpers');

/**
 * Take some data and normalize it into a config object for RandomTable
 * Module exports a constructor function
 */
var TableNormalizer = function TableNormalizer(data) {
	this.orig_data = typeof data !== 'undefined' ? data : ''; // save this for later if necessary
	this.normalized_data = {}; // normalized config object for RandomTable
	this.data_type = '';

	/**
  * Set the data
  * @param {String|Object|Array} data the data to normalize
  */
	this.setData = function (data) {
		this.orig_data = data;
	};
	/**
  * Decide what type of data it is so we can treat it appropriately.
  * @return {String} data_type
  */
	this.checkType = function () {
		var data = this.orig_data;
		if (r_helpers.isEmpty(data)) {
			this.data_type = '';
		} else if (r_helpers.isString(data)) {
			// html should start with a tag.... right?
			// @todo I'm sure there's a better way
			try {
				JSON.parse(data);
				this.data_type = 'json';
				return this.data_type;
			} catch (e) {
				// not json
			}
			if (data.substring(0, 1) === '<') {
				this.data_type = 'html';
				return this.data_type;
			}
			this.data_type = 'text';
		} else if (r_helpers.isObject(data)) {
			this.data_type = 'object';
		}
		return this.data_type;
	};
	/**
  * Try to parse HTML into table object data
  * @return {Array} table options
  */
	this.parseHtml = function () {
		var html = this.orig_data;
		// strip linebreaks cause we'll be making new ones based on the tags
		html = html.replace(/[\n\r]+/g, '');
		// add line breaks for specific end tags li tr p br
		// @todo really <tr> leaves you with some weird data.
		html = html.replace(/<\/(p|tr|li|div)>|<\/?br\/?>/g, '\n').replace(/\t/g, '');

		html = html.replace(/<\/?[^>]+>/g, '').replace(/[\n\r]+$/g, '');
		// console.log(html);
		var text = html.split(/[\n\r]+/g);
		// console.log(text);

		var ct = 0;

		text.forEach(function (v, k, l) {
			v = v.trim(); // trim spaces from ends
			// parse out the pre-post ## data (if it's there)
			var parse = v.match(/^(?:(?:[0-9]+\-)?([0-9]+)(##)?(?:\.\s*|:\s*|,\s*|\t+|\s*))?(.+?)(?:##(.+))?$/);

			if (parse) {
				l[k] = { label: parse[3].trim() };

				if (typeof parse[1] !== 'undefined') {
					var weight = 1;
					if (typeof parse[2] === 'undefined') {
						weight = parseFloat(parse[1]) - ct;
						if (weight < 1) {
							weight = 1;
						}
						ct = ct + weight;
					} else {
						weight = parseFloat(parse[1]);
					}
					if (weight > 1) {
						l[k].weight = weight;
					}
				} else {
					ct++;
				}

				if (typeof parse[4] !== 'undefined') {
					l[k].subtable = parse[4].trim();
				}
			} else {
				delete l[k];
			}
		});
		return text;
	};
	/**
  * Try to parse text into table data
  * @returns {Array} parsed table data
  */
	this.parseText = function () {
		var text = this.orig_data;
		// split it into an array of lines
		text = text.split(/[\n\r]+/g);

		var ct = 0; // the cumulative 'die' count we'll use to calculate the weight
		text.forEach(function (v, k, l) {
			v = v.trim();

			// parse numbers off front and subtables off back
			var parse = v.match(/^(?:(?:[0-9]+\-)?([0-9]+)(##)?(?:\.\s*|:\s*|,\s*|\t+|\s*))?(.+?)(?:##(.+))?$/);
			// console.log(parse);
			if (parse) {
				// console.log(parse);
				var label = parse[3].trim();
				label = label.replace(/^[-*]\s?/, '');
				l[k] = { label: label };

				if (typeof parse[1] !== 'undefined') {
					var weight = 1;
					if (typeof parse[2] === 'undefined') {
						weight = parseFloat(parse[1]) - ct;
						// console.log(weight);
						if (weight < 1) {
							weight = 1;
						}
						ct = ct + weight;
					} else {
						weight = parseFloat(parse[1]);
					}
					if (weight > 1) {
						l[k].weight = weight;
					}
				} else {
					ct++;
				}

				if (typeof parse[4] !== 'undefined') {
					l[k].subtable = parse[4].trim();
				}
			} else {
				delete l[k];
			}
		});
		return text;
	};
	/**
  * Parse markdown...?
  * @todo
  */
	this.parseMarkdown = function () {
		// deal with headers
		// deal with lists and sublists.

	};
	/**
  * Process the data and try to do something
  */
	this.normalizeData = function () {
		var type = this.checkType();
		if (type === '') {
			return false;
		}
		var parse_data = null;
		switch (type) {
			case 'html':
				this.normalized_data = this.parseHtml();
				break;
			case 'text':
				this.normalized_data = this.parseText();
				break;
			case 'json':
				parse_data = JSON.parse(this.orig_data);
				this.normalized_data = parse_data;
				break;
		}

		// ?
		return this.normalized_data;
	};
};

module.exports = TableNormalizer;

},{"./r_helpers":3}]},{},[1])(1)
});