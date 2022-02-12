import TableRoller from './TableRoller.js';
import { isEmpty } from './r_helpers.js';
import NPC from './NPC.js';
import NPCSchema from './NPCSchema.js';

/**
 * Object store for registered schemas
 */
const Schemas = {};
/**
 * Add new schema to store.
 * @param {NPCSchema} schema
 * @throws {Error} For invalid args.
 */
const registerSchema = function (schema) {
    if (!(schema instanceof NPCSchema) || !schema.key || schema.key === 'base') {
        throw Error('Invalid schema');
    }
    // store it for later reference
    Schemas[schema.key] = schema;
};
/**
 * Get all registered schemas.
 * @returns {NPCSchema[]}
 */
const getAllSchemas = function () {
    return Schemas;
};
/**
 * Get schema by key.
 * @param {String} key Schema key.
 * @returns {NPCSchema|null}
 */
const getSchemaByKey = function (key) {
    return Schemas[key] || null;
};
/**
 * Create a new NPC from a Schema.
 * @param {String} schemaKey Key for an NPCSchema
 * @param {TableRoller} tableRoller
 * @param {Boolean} generateId Should the npc get a uuid.
 * @returns NPC
 * @throws {Error} For invalid args.
 */
const initializeNewNPC = function (schemaKey, tableRoller, generateId = true) {
    const schema = getSchemaByKey(schemaKey);
    if (!schema) {
        throw Error('Schema not found.');
    }
    if (!(tableRoller instanceof TableRoller)) {
        throw Error('Invalid tableRoller');
    }

    const npc = new NPC({
        schema: schemaKey,
        id: (generateId ? null : '')
    });

    applySchemaToNPC(schema, tableRoller, npc);
    return npc;
};

const typeResult = function (field, result) {
    let value = null;
    if (field.isString() || field.isText() || field.isModifier()) {
        value = result.toString();
    } else if (field.isNumber()) {
        value = parseInt(result, 10);
    } else {
        value = result;
    }
    return value;
};

/**
 * Apply a schema to an NPC.
 * You could pass in children of NPC class here.
 * @param {NPCSchema} schema
 * @param {TableRoller} tableRoller
 * @param {NPC} npc With either blank schema or set to same key as schema arg
 * @throws {Error} For invalid args.
 */
const applySchemaToNPC = function (schema, tableRoller, npc) {
    if (!(npc instanceof NPC)) {
        throw Error('npc object must be or inherit from NPC class.');
    }
    if (!(schema instanceof NPCSchema)) {
        throw Error('schema object must be or inherit from NPCSchema class.');
    }
    if (!(tableRoller instanceof TableRoller)) {
        throw Error('Invalid tableRoller');
    }
    if (npc.schema === '') {
        npc.schema = schema.key;
    }
    if (npc.schema !== schema.key) {
        throw Error('npc already has schema set.');
    }
    schema.fields.forEach((field) => {
        const key = field.key;
        if (!isEmpty(field.starting_value)) {
            npc.setFieldValue(key, field.starting_value);
            return;
        }
        if (isEmpty(field.source)) {
            npc.setFieldValue(key, field.defaultEmpty);
            return;
        }
        if (field.isArray()) {
            const value = [];
            const ct = (field.count) ? field.count : 1;
            for (let i = 0; i < ct; i++) {
                const result = tableRoller.convertToken(field.source);
                value.push(typeResult(field, result));
            }
            npc.setFieldValue(key, value);
            return;
        }
        const result = tableRoller.convertToken(field.source);
        npc.setFieldValue(key, typeResult(field, result));
    });
};

export {
    registerSchema,
    getAllSchemas,
    getSchemaByKey,
    initializeNewNPC,
    applySchemaToNPC
};
