/**
 * Class for NPCs.
 * @param {String} id Some kind of indentifier.
 * @param {String} schema Key for a NPCSchema used for this NPC.
 * @param {Object} fields Field values indexed by NPCSchemaField key.
 */
export class NPC {
    constructor({ id, schema, fields }: {
        id?: string;
        schema?: string;
        fields?: {};
    });
    id: string;
    schema: string;
    fields: {};
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
 * @param {Randomizer} randomizer
 * @returns NPC
 */
export function initializeNewNPC(schemaKey: string, randomizer: Randomizer): NPC;
import { NPCSchema } from "./npc_schema.js";
import Randomizer from "./randomizer.js";
