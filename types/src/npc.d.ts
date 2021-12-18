/**
 * Class for NPCs.
 * @param {String} id Some kind of indentifier.
 * @param {String} schema Key for a NPCSchema used for this NPC.
 * @param {Map<String, Any>} fields Field values indexed by NPCSchemaField key.
 */
export class NPC {
    constructor({ id, schema, fields }: {
        id?: any;
        schema?: string;
        fields?: any;
    });
    id: any;
    schema: string;
    fields: any;
    /**
     * Custom JSON handler to strip empty props.
     * @returns {Object}
     */
    toJSON(): any;
}
/**
 * Add new schema to store.
 * @param {NPCSchema} schema
 */
export function registerSchema(schema: NPCSchema): void;
/**
 * Get schema by key.
 * @param {String} key Schema key.
 * @returns {NPCSchema|null}
 */
export function getSchemaByKey(key: string): NPCSchema | null;
/**
 * Create a new NPC from a Schema.
 * @param {String} schemaKey Key for an NPCSchema
 * @param {TableRoller} tableRoller
 * @param {Boolean} generateId Should the npc get a uuid.
 * @returns NPC
 */
export function initializeNewNPC(schemaKey: string, tableRoller: TableRoller, generateId?: boolean): NPC;
import TableRoller from "./TableRoller.js";
