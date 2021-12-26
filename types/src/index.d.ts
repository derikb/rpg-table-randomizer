declare namespace _default {
    export { tableRoller };
    export { RandomTable };
    export { normalizeData };
    export { defaultNameGenerator };
    export { RandomNameGenerator };
    export { RandomNameType };
    export { r_helpers };
    export { npc_generator };
    export { NPCSchema };
    export { NPCSchemaField };
    export { dice_roller };
}
export default _default;
declare const tableRoller: TableRoller;
import normalizeData from "./table_normalizer.js";
declare const defaultNameGenerator: RandomNameGenerator;
import RandomNameGenerator from "./RandomNameGenerator.js";
import RandomNameType from "./RandomNameType.js";
import * as r_helpers from "./r_helpers.js";
import * as npc_generator from "./npc_generator.js";
import * as dice_roller from "./dice_roller.js";
import TableRoller from "./TableRoller.js";
