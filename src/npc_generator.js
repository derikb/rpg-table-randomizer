import TableRoller from './TableRoller.js';
import { isEmpty } from './r_helpers.js';
import NPC from './NPC_class.js';
import NPCSchema from './NPCSchema.js';

/**
 * Object store for registered schemas
 */
const Schemas = {};
/**
 * Add new schema to store.
 * @param {NPCSchema} schema
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
 */
const initializeNewNPC = function (schemaKey, tableRoller, generateId = true) {
    const schema = getSchemaByKey(schemaKey);
    if (!schema) {
        throw Error('Schema not found.');
    }
    if (!(tableRoller instanceof TableRoller)) {
        throw Error('Invalid tableRoller');
    }

    const fields = new Map();
    schema.fields.forEach((field) => {
        const key = field.key;
        if (!isEmpty(field.starting_value)) {
            fields.set(key, field.starting_value);
            return;
        }
        if (!isEmpty(field.source)) {
            if (field.type === 'array') {
                const value = [];
                const ct = (field.count) ? field.count : 1;
                for (let i = 0; i < ct; i++) {
                    value.push(tableRoller.convertToken(field.source));
                }
                fields.set(key, value);
            } else {
                fields.set(key, tableRoller.convertToken(field.source));
            }
            return;
        }
        fields.set(key, field.defaultEmpty);
    });
    return new NPC({
        schema: schemaKey,
        fields: fields,
        id: (generateId ? null : '')
    });
};

export {
    registerSchema,
    getAllSchemas,
    getSchemaByKey,
    initializeNewNPC
};
