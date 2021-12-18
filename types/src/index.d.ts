declare namespace _default {
    export { tableRoller };
    export { RandomTable };
    export { normalizeData };
    export { RandomName };
    export { r_helpers };
    export { npc_generator };
    export { NPCSchema };
    export { NPCSchemaField };
    export { dice_roller };
}
export default _default;
declare const tableRoller: TableRoller;
import RandomTable from "./random_table.js";
import normalizeData from "./table_normalizer.js";
import RandomName from "./random_name.js";
import * as r_helpers from "./r_helpers.js";
import * as npc_generator from "./npc.js";
import { NPCSchema } from "./npc_schema.js";
import { NPCSchemaField } from "./npc_schema.js";
import * as dice_roller from "./dice_roller.js";
import TableRoller from "./TableRoller.js";
