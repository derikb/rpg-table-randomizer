declare namespace _default {
    export { tableRoller };
    export { RandomTable };
    export { RandomTableEntry };
    export { defaultNameGenerator };
    export { RandomNameGenerator };
    export { RandomNameType };
    export { npc_generator };
    export { NPC };
    export { NPCSchema };
    export { NPCSchemaField };
    export { dice_roller };
}
export default _default;
declare const tableRoller: TableRoller;
import RandomTable from "./RandomTable.js";
import RandomTableEntry from "./RandomTableEntry.js";
declare const defaultNameGenerator: RandomNameGenerator;
import RandomNameGenerator from "./RandomNameGenerator.js";
import RandomNameType from "./RandomNameType.js";
import * as npc_generator from "./npc_generator.js";
import NPC from "./NPC.js";
import NPCSchema from "./NPCSchema.js";
import NPCSchemaField from "./NPCSchemaField.js";
import * as dice_roller from "./dice_roller.js";
import TableRoller from "./TableRoller.js";
