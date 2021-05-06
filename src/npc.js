import Randomizer from './randomizer.js';
import { NPCSchema } from './npc_schema.js';
import { isEmpty } from './r_helpers.js';

/**
 * Object store for registered schemas
 */
const Schemas = {};

/**
 * Class for NPCs.
 * @param {String} id Some kind of indentifier.
 * @param {String} schema Key for a NPCSchema used for this NPC.
 * @param {Object} fields Field values indexed by NPCSchemaField key.
 */
class NPC {
	constructor({
		id = '',
		schema = '',
		fields = {}
	}) {
		this.id = id;
		this.schema = schema;
		this.fields = fields;
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
const getSchemaByKey = function(key) {
	return Schemas[key] || null;
};

/**
 * Create a new NPC from a Schema.
 * @param {String} schemaKey Key for an NPCSchema
 * @param {Randomizer} randomizer
 * @returns NPC
 */
const initializeNewNPC = function(schemaKey, randomizer) {
	const schema = getSchemaByKey(schemaKey);
	if (!schema) {
		throw Error('Schema not found.');
	}
	if (!randomizer instanceof Randomizer) {
		throw Error('Invalid randomizer');
	}

	const npc = new NPC({});
	npc.schema = schemaKey;
	schema.fields.forEach((field) => {
		const key = field.key;
		if (!isEmpty(field.starting_value)) {
			npc.fields[key] = field.starting_value;
			return;
		}
		if (!isEmpty(field.source)) {
			if (field.type === 'array') {
				npc.fields[key] = [];
				const ct = (field.count) ? field.count : 1;
				for (let i = 0; i < ct; i++) {
					npc.fields[key].push(randomizer.convertToken(field.source));
				}
			} else {
				npc.fields[key] = randomizer.convertToken(field.source);
			}
			return;
		}
		npc.fields[key] = field.defaultEmpty;
	});
	return npc;
};


export {
	NPC,
	registerSchema,
	getSchemaByKey,
	initializeNewNPC
};
