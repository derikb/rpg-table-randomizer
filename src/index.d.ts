declare namespace _default {
    export { randomizer };
    export { RandomTable };
    export { normalizeData };
    export { RandomName };
    export { r_helpers };
    export { npc_generator };
    export { NPCSchema };
    export { NPCSchemaField };
}
export default _default;
declare const randomizer: Randomizer;
import RandomTable from "./random_table.js";
import normalizeData from "./table_normalizer.js";
import RandomName from "./random_name.js";
import * as r_helpers from "./r_helpers.js";
import npc_generator from "./npc.js";
import { NPCSchema } from "./npc_schema.js";
import { NPCSchemaField } from "./npc_schema.js";
import Randomizer from "./randomizer.js";
