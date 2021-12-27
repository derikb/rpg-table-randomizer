import TableRoller from './TableRoller.js';
import RandomTable from './RandomTable.js';
import RandomTableEntry from './RandomTableEntry.js';
import RandomNameGenerator from './RandomNameGenerator.js';
import names from '../sample/names.js';
import * as npc_generator from './npc_generator.js';
import NPCSchema from './NPCSchema.js';
import NPCSchemaField from './NPCSchemaField.js';
import * as dice_roller from './dice_roller.js';
import RandomNameType from './RandomNameType.js';
import NPC from './NPC.js';

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
    RandomTableEntry,
    defaultNameGenerator,
    RandomNameGenerator,
    RandomNameType,
    npc_generator,
    NPC,
    NPCSchema,
    NPCSchemaField,
    dice_roller
};
