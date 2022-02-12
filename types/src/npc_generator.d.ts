/**
 * Add new schema to store.
 * @param {NPCSchema} schema
 * @throws {Error} For invalid args.
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
 * @throws {Error} For invalid args.
 */
export function initializeNewNPC(schemaKey: string, tableRoller: TableRoller, generateId?: boolean): NPC;
/**
 * Apply a schema to an NPC.
 * You could pass in children of NPC class here.
 * @param {NPCSchema} schema
 * @param {TableRoller} tableRoller
 * @param {NPC} npc With either blank schema or set to same key as schema arg
 * @throws {Error} For invalid args.
 */
export function applySchemaToNPC(schema: NPCSchema, tableRoller: TableRoller, npc: NPC): void;
import NPCSchema from "./NPCSchema.js";
import TableRoller from "./TableRoller.js";
import NPC from "./NPC.js";
