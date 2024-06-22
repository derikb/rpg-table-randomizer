import { defaultToJSON, isObject } from './r_helpers.js';
import { DiceResult } from './dice_roller.js';
import RandomTableResultSet from './RandomTableResultSet.js';
import RandomTableResult from './RandomTableResult.js';
import TableErrorResult from './TableErrorResult.js';
let crypto = null;
if (typeof window === 'undefined') {
    crypto = await import('crypto');
} else {
    crypto = window.crypto;
}

/**
 * Class for NPCs
 * @param {String} id Some kind of identifier.
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
            this.id = crypto.randomUUID();
        } else {
            this.id = id;
        }
        this.schema = schema;
        if (fields instanceof Map) {
            this.fields = fields;
        } else if (isObject(fields)) {
            this.fields = new Map();
            for (const [key, value] of Object.entries(fields)) {
                this.fields.set(key, this._convertFieldValue(value));
            }
        }
    }
    _convertFieldValue (value) {
        if (value === null || typeof value === 'undefined') {
            return null;
        }
        if (typeof value === 'string') {
            return value;
        }
        if (Array.isArray('value')) {
            return value.map((el) => {
                return this._convertFieldValue(el);
            });
        }
        if (value instanceof RandomTableResultSet ||
            value instanceof RandomTableResult ||
            value instanceof TableErrorResult ||
            value instanceof DiceResult) {
            return value;
        }
        switch (value.className) {
            case 'RandomTableResultSet':
                return new RandomTableResultSet(value);
            case 'RandomTableResult':
                return new RandomTableResult(value);
            case 'TableErrorResult':
                return new TableErrorResult(value);
            case 'DiceResult':
                return new DiceResult(value);
            default:
                return value;
        }
    }
    /**
     * Set field value.
     * @param {String} key Field key.
     * @param {Any} value Value for field.
     */
    setFieldValue (key, value) {
        this.fields.set(key, this._convertFieldValue(value));
    }
    /**
     * Get field keys as array.
     * @returns {String[]}
     */
    getFieldKeys () {
        return Array.from(this.fields.keys());
    }
    /**
     * Get value by field key.
     * @param {String} key NPCSchemaField.key
     * @returns {RandomTableResultSet|RandomTableResultSet[]|DiceResult|String|Any}
     */
    getFieldValue (key) {
        const value = this.fields.get(key);
        if (typeof value === 'undefined') {
            return null;
        }
        return value;
    }
    /**
     * Custom JSON handler to strip empty props.
     * @returns {Object}
     */
    toJSON () {
        const obj = defaultToJSON.call(this);
        obj.className = 'NPC';
        return obj;
    }
}
