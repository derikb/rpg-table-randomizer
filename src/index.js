'use strict';

const randomizer = require('./randomizer.js');
const random_table = require('./random_table.js');
const table_normalizer = require('./table_normalizer.js');
const random_name = require('./random_name.js');
const r_helpers = require('./r_helpers.js');

module.exports = {
	randomizer: randomizer,
	RandomTable: random_table,
	TableNormalizer: table_normalizer,
	RandomName: new random_name(randomizer),
	r_helpers: r_helpers
};

