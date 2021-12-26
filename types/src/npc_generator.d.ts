/**
 * Add new schema to store.
 * @param {NPCSchema} schema
 */
export function registerSchema(schema: NPCSchema): void;
/**
 * Get all registered schemas.
 * @returns {NPCSchema[]}
 */
export function getAllSchemas(): NPCSchema[];
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
export function initializeNewNPC(schemaKey: string, tableRoller: TableRoller, generateId?: boolean): any;
import TableRoller from "./TableRoller.js";