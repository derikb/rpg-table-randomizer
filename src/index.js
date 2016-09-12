'use strict';

const randomizer = require('./randomizer.js');
const random_table = require('./random_table.js');
const table_normalizer = require('./table_normalizer.js');
const r_helpers = require('./r_helpers.js');
const namedata = require('../sample/names.json');
const random_name = require('./random_name.js')(randomizer, namedata);
const npc_gen = require('./npc.js')(randomizer);

module.exports = {
	randomizer: randomizer,
	RandomTable: random_table,
	TableNormalizer: table_normalizer,
	random_name: random_name,
	r_helpers: r_helpers,
	npc_generator: npc_gen
};
