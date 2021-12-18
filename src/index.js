import TableRoller from './TableRoller.js';
import RandomTable from './random_table.js';
import normalizeData from './table_normalizer.js';
import * as r_helpers from './r_helpers.js';
import RandomName from './random_name.js';
import names from '../sample/names.js';
import * as npc_generator from './npc.js';
import { NPCSchema, NPCSchemaField } from './npc_schema.js';
import * as dice_roller from './dice_roller.js';

// Instantiate the TableRoller and set it up with the random name generator.
const tableRoller = new TableRoller({});
RandomName.setTableRoller(tableRoller);
RandomName.setNameData(names);
tableRoller.registerTokenType('name', RandomName.nameTokenCallback);

export default {
    tableRoller,
    RandomTable,
    normalizeData,
    RandomName,
    r_helpers,
    npc_generator,
    NPCSchema,
    NPCSchemaField,
    dice_roller
};
