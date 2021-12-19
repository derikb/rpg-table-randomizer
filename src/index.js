import TableRoller from './TableRoller.js';
import RandomTable from './random_table.js';
import normalizeData from './table_normalizer.js';
import * as r_helpers from './r_helpers.js';
import RandomNameGenerator from './RandomNameGenerator.js';
import names from '../sample/names.js';
import * as npc_generator from './npc.js';
import { NPCSchema, NPCSchemaField } from './npc_schema.js';
import * as dice_roller from './dice_roller.js';
import RandomNameType from './RandomNameType.js';

// Instantiate the TableRoller and set it up with the random name generator.
const tableRoller = new TableRoller({});

// Format name data
const nameTypes = [];
names.forEach((data) => {
    nameTypes.push(new RandomNameType(data));
});
// Create a default name generator.
const defaultNameGenerator = new RandomNameGenerator({ namedata: nameTypes });
// Assign it to the name token of the table roller.
tableRoller.registerTokenType('name', defaultNameGenerator.nameTokenCallback.bind(defaultNameGenerator));

export default {
    tableRoller,
    RandomTable,
    normalizeData,
    defaultNameGenerator,
    RandomNameGenerator,
    RandomNameType,
    r_helpers,
    npc_generator,
    NPCSchema,
    NPCSchemaField,
    dice_roller
};
