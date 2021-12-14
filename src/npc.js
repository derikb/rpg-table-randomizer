import Randomizer from './randomizer.js';
import { isEmpty, defaultToJSON, isObject } from './r_helpers.js';
import { v4 as uuidv4 } from '../node_modules/uuid/dist/esm-browser/index.js';

/**
 * Object store for registered schemas
 */
const Schemas = {};

/**
 * Class for NPCs.
 * @param {String} id Some kind of indentifier.
 * @param {String} schema Key for a NPCSchema used for this NPC.
 * @param {Map<String, Any>} fields Field values indexed by NPCSchemaField key.
 */
class NPC {
    constructor ({
        id = null,
        schema = '',
        fields = new Map()
    }) {
        // if null, generate a uuid
        if (id === null) {
            this.id = uuidv4();
        } else {
            this.id = id;
        }
        this.schema = schema;
        if (fields instanceof Map) {
            this.fields = fields;
        } else if (isObject(fields)) {
            this.fields = new Map(Object.entries(fields));
        }
    }
    /**
     * Custom JSON handler to strip empty props.
     * @returns {Object}
     */
    toJSON () {
        return defaultToJSON.call(this);
    }
}

/**
 * Add new schema to store.
 * @param {NPCSchema} schema
 */
const registerSchema = function (schema) {
    if (!schema.key || schema.key === 'base') {
        throw Error('Invalid schema');
    }
    // store it for later reference
    Schemas[schema.key] = schema;
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
 * @param {Randomizer} randomizer
 * @param {Boolean} generateId Should the npc get a uuid.
 * @returns NPC
 */
const initializeNewNPC = function (schemaKey, randomizer, generateId = true) {
    const schema = getSchemaByKey(schemaKey);
    if (!schema) {
        throw Error('Schema not found.');
    }
    if (!(randomizer instanceof Randomizer)) {
        throw Error('Invalid randomizer');
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
                    value.push(randomizer.convertToken(field.source));
                }
                fields.set(key, value);
            } else {
                fields.set(key, randomizer.convertToken(field.source));
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
    NPC,
    registerSchema,
    getSchemaByKey,
    initializeNewNPC
};
