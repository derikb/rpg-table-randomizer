import { defaultToJSON } from './r_helpers.js';

/**
 * Specific field in NPC Schema.
 */
class NPCSchemaField {
    /**
     *
     * @property {String} key Identifying key
     * @property {String} label Readable label for field.
     * @property {String} type Type of data in field. Valid: string, text, array, number, modifier
     * @property {String} source Source of data for TableRoller in the form of a token (see TableRoller, ex: "name:french", "table:color", etc.)
     * @property {Number} count Number of entries for array types.
     * @property {Array|String|Number} starting_value An optional starting value.
     */
    constructor ({
        key = '',
        label = '',
        type = 'string',
        source = '',
        count = 1,
        starting_value = null
    }) {
        this.key = key;
        this.label = label;
        this.type = type;
        this.source = source;
        this.count = count;
        if (starting_value !== null) {
            this.starting_value = starting_value;
        }
    }
    /**
     * Default value for this field by type if empty.
     */
    get defaultEmpty () {
        switch (this.type) {
            case 'string':
            case 'text':
                return '';
            case 'array':
                return [];
            case 'number':
            case 'modifier':
                return 0;
        }
        return null;
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
 * Schema for creating NPCs.
 */
class NPCSchema {
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
                if (obj instanceof NPCSchemaField) {
                    this.fields.set(obj.key, obj);
                    return;
                }
                const field = new NPCSchemaField(obj);
                this.fields.set(field.key, field);
            });
        }
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
        return defaultToJSON.call(this);
    }
}

export {
    NPCSchema,
    NPCSchemaField
};
