/**
 * A default export of most classes, as well as:
 * - A default name generator with all the name types in the sample included
 * - A default tableRoller with the name token set to use the above name generator
 */
import * as dice_roller from './dice_roller.js';
import DisplayOptions from './DisplayOptions.js';
import * as npc_generator from './npc_generator.js';
import NPC from './NPC.js';
import NPCSchema from './NPCSchema.js';
import NPCSchemaField from './NPCSchemaField.js';
import RandomNameError from './RandomNameError.js';
import RandomNameGenerator from './RandomNameGenerator.js';
import RandomNameType from './RandomNameType.js';
import RandomTable from './RandomTable.js';
import RandomTableEntry from './RandomTableEntry.js';
import RandomTableResult from './RandomTableResult.js';
import RandomTableResultSet from './RandomTableResultSet.js';
import TableError from './TableError.js';
import TableErrorResult from './TableErrorResult.js';
import TableRoller from './TableRoller.js';
import names from '../sample/names.js';

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

export {
    dice_roller,
    DisplayOptions,
    npc_generator,
    NPC,
    NPCSchema,
    NPCSchemaField,
    RandomNameError,
    RandomNameGenerator,
    RandomNameType,
    RandomTable,
    RandomTableEntry,
    RandomTableResult,
    RandomTableResultSet,
    TableError,
    TableErrorResult,
    TableRoller,
    defaultNameGenerator,
    tableRoller
};
