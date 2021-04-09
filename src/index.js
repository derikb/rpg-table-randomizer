import Randomizer from './randomizer.js';
import RandomTable from './random_table.js';
import normalizeData from './table_normalizer.js';
import * as r_helpers from './r_helpers.js';
//const namedata = require('../sample/names.json');
import RandomName from './random_name.js';
// const npc_gen = require('./npc.js')(randomizer);

module.exports = {
	Randomizer,
	RandomTable,
	normalizeData,
	RandomName,
	r_helpers,
};
