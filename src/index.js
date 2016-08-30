'use strict';

const randomizer = require('./randomizer.js');
const random_table = require('./random_table.js');
const table_normalizer = require('./table_normalizer.js');
const random_name = require('./random_name.js');
const r_helpers = require('./r_helpers.js');

// Registesr the name token for use in tables
/*
randomizer.registerTokenType('name', function (token_parts, full_token, curtable) {
	console.log('name token');
	
	const n = rpgrandomizer.RandomName;
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
*/

module.exports = {
	randomizer: randomizer,
	RandomTable: random_table,
	TableNormalizer: table_normalizer,
	RandomName: new random_name(randomizer),
	r_helpers: r_helpers
};

