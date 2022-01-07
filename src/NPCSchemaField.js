import { defaultToJSON } from './r_helpers.js';

/**
 * Specific field in NPC Schema.
 */
export default class NPCSchemaField {
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
        const obj = defaultToJSON.call(this);
        obj.className = 'NPCSchemaField';
        return obj;
    }
}
