import Randomizer from './randomizer.js';
import RandomTable from './random_table.js';
import normalizeData from './table_normalizer.js';
import * as r_helpers from './r_helpers.js';
import RandomName from './random_name.js';
import names from '../sample/names.js';
import npc_generator from './npc.js';
import { NPCSchema, NPCSchemaField }  from './npc_schema.js';

// Instantiate the randomizer and set it up with the random name generator.
const randomizer = new Randomizer({});
RandomName.setRandomizer(randomizer);
RandomName.setNameData(names);
randomizer.registerTokenType('name', RandomName.nameTokenCallback);

export default {
	randomizer,
	RandomTable,
	normalizeData,
	RandomName,
	r_helpers,
	npc_generator,
	NPCSchema,
	NPCSchemaField
};
