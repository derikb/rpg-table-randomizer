import { isEmpty } from './r_helpers.js';

/**
 * Specific field in NPC Schema.
 */
class NPCSchemaField {
    /**
     *
     * @property {String} key Identifying key
     * @property {String} label Readable label for field.
     * @property {String} type Type of data in field. Valid: string, text, array, number, modifier
     * @property {String} source Source of data for Randomizer in the form of a token (see Randomizer, ex: "name:french", "table:color", etc.)
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
        const returnObj = {};
        for (const property in this) {
            const value = this[property];
            if (isEmpty(value)) {
                continue;
            }
            returnObj[property] = value;
        }
        return returnObj;
    }
}

/**
 * Schema for creating NPCs.
 */
class NPCSchema {
    /**
     *
     * @property {String} key Identifying key
     * @property {String} name Name of field.
     * @property {NPCSchemaField[]} fields Data fields will be converted to NPCSchemaField if necessary)
     */
    constructor ({
        key = '',
        name = '',
        fields = []
    }) {
        this.key = key;
        this.name = name;
        this.fields = [];
        if (Array.isArray(fields)) {
            fields.forEach((obj) => {
                if (obj instanceof NPCSchemaField) {
                    this.fields.push(obj);
                    return;
                }
                this.fields.push(new NPCSchemaField(obj));
            });
        }
    }
}

export {
    NPCSchema,
    NPCSchemaField
};
