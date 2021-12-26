import { defaultToJSON, isObject } from './r_helpers.js';
import { v4 as uuidv4 } from 'uuid/dist/esm-browser';

/**
 * Class for NPCs
 * @param {String} id Some kind of indentifier.
 * @param {String} schema Key for a NPCSchema used for this NPC.
 * @param {Map<String, Any>} fields Field values indexed by NPCSchemaField key.
 */
export default class NPC {
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
            // @todo do we convert result set objects to classes?
            // how?
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
