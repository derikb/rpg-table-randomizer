'use strict';

const randomizer = require('./randomizer.js');
const random_table = require('./random_table.js');
const table_normalizer = require('./table_normalizer.js');
const RandomName = require('./random_name.js');
const r_helpers = require('./r_helpers.js');
const namedata = require('../sample/names.json');

module.exports = {
	randomizer: randomizer,
	RandomTable: random_table,
	TableNormalizer: table_normalizer,
	random_name: new RandomName(randomizer, namedata),
	r_helpers: r_helpers
};

