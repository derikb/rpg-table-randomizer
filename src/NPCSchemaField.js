import { defaultToJSON } from './r_helpers.js';
import { NPCFieldTypeConst } from './NPCConstants.js';

/**
 * Specific field in NPC Schema.
 */
export default class NPCSchemaField {
    /**
     *
     * @property {String} key Identifying key
     * @property {String} label Readable label for field.
     * @property {String} [type=string] Type of data in field. Valid: see NPCFieldTypeConst.
     * @property {String} [source=''] Source of data for TableRoller in the form of a token (see TableRoller, ex: "name:french", "table:color", etc.)
     * @property {Number} [count=1] Number of entries for array types.
     * @property {Array|String|Number} starting_value An optional starting value.
     */
    constructor ({
        key = '',
        label = '',
        type = NPCFieldTypeConst.FIELD_TYPE_STRING,
        source = '',
        count = 1,
        starting_value = null
    }) {
        this.key = key;
        this.label = label;
        this.type = type.toLowerCase();
        this.source = source;
        this.count = count;
        if (!this.count || this.count <= 0) {
            this.count = 1;
        }
        if (starting_value !== null) {
            this.starting_value = starting_value;
        }
    }
    /**
     * Default value for this field by type if empty.
     */
    get defaultEmpty () {
        if (this.count > 1) {
            return [];
        }
        switch (this.type) {
            case NPCFieldTypeConst.FIELD_TYPE_STRING:
            case NPCFieldTypeConst.FIELD_TYPE_TEXT:
                return '';
            case NPCFieldTypeConst.FIELD_TYPE_NOTE:
            case NPCFieldTypeConst.FIELD_TYPE_RESULTSET:
                return null;
            case NPCFieldTypeConst.FIELD_TYPE_NUMBER:
            case NPCFieldTypeConst.FIELD_TYPE_MODIFIER:
                return 0;
            // backwards compatible, prefer use of count with specific type
            case 'array':
                return [];
        }
        return null;
    }
    isString () {
        return this.type === NPCFieldTypeConst.FIELD_TYPE_STRING;
    }
    isText () {
        return this.type === NPCFieldTypeConst.FIELD_TYPE_TEXT;
    }
    isNumber () {
        return this.type === NPCFieldTypeConst.FIELD_TYPE_NUMBER;
    }
    isModifier () {
        return this.type === NPCFieldTypeConst.FIELD_TYPE_MODIFIER;
    }
    isNote () {
        return this.type === NPCFieldTypeConst.FIELD_TYPE_NOTE;
    }
    isResult () {
        return this.type === NPCFieldTypeConst.FIELD_TYPE_RESULTSET;
    }
    /**
     * Is this some sort of array type.
     * @returns {Boolean}
     */
    isArray () {
        // backwards compatible, prefer specific type and setting count to > 1
        if (this.type === 'array') {
            return true;
        }
        return this.count > 1;
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
