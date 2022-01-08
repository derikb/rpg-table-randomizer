import { defaultToJSON, isObject } from './r_helpers.js';
import NPCSchemaField from './NPCSchemaField.js';

/**
 * Schema for creating NPCs.
 */
export default class NPCSchema {
    /**
     * @property {String} key Identifying key
     * @property {String} name Name of schema.
     * @property {String} author Name of author.
     * @property {Map<String, NPCSchemaField>} fields Data fields will be converted to NPCSchemaField if necessary.
     */
    constructor ({
        key = '',
        name = '',
        author = '',
        fields = []
    }) {
        this.key = key;
        this.name = name;
        this.author = author;
        this.fields = new Map();
        if (Array.isArray(fields)) {
            fields.forEach((obj) => {
                this._convertField(obj);
            });
        } else {
            Object.keys(fields).forEach((key) => {
                this._convertField(fields[key]);
            });
        }
    }
    _convertField (value) {
        if (value instanceof NPCSchemaField) {
            this.fields.set(value.key, value);
            return;
        }
        if (isObject(value)) {
            const field = new NPCSchemaField(value);
            this.fields.set(field.key, field);
        }
    }
    /**
     * Get field keys as array.
     * @returns String[]
     */
    getFieldKeys () {
        return Array.from(this.fields.keys());
    }
    /**
     * Get a Field by the key.
     * @param {String} key
     * @returns {NPCSchemaField|undefined}
     */
    getFieldByKey (key) {
        return this.fields.get(key);
    }
    /**
     * Get field label by the key.
     * @param {String} key
     * @returns {String}
     */
    getFieldLabelByKey (key) {
        const field = this.getFieldByKey(key);
        if (!field) {
            return '';
        }
        return field.label;
    }
    /**
     * Custom JSON handler to strip empty props.
     * @returns {Object}
     */
    toJSON () {
        const obj = defaultToJSON.call(this);
        obj.className = 'NPCSchema';
        return obj;
    }
}
