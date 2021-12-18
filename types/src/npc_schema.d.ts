/**
 * Schema for creating NPCs.
 */
export class NPCSchema {
    /**
     * @property {String} key Identifying key
     * @property {String} name Name of schema.
     * @property {String} author Name of author.
     * @property {Map<String, NPCSchemaField>} fields Data fields will be converted to NPCSchemaField if necessary.
     */
    constructor({ key, name, author, fields }: {
        key?: string;
        name?: string;
        author?: string;
        fields?: any[];
    });
    key: string;
    name: string;
    author: string;
    fields: any;
    /**
     * Get a Field by the key.
     * @param {String} key
     * @returns {NPCSchemaField|undefined}
     */
    getFieldByKey(key: string): NPCSchemaField | undefined;
    /**
     * Get field label by the key.
     * @param {String} key
     * @returns {String}
     */
    getFieldLabelByKey(key: string): string;
    /**
     * Custom JSON handler to strip empty props.
     * @returns {Object}
     */
    toJSON(): any;
}
/**
 * Specific field in NPC Schema.
 */
export class NPCSchemaField {
    /**
     *
     * @property {String} key Identifying key
     * @property {String} label Readable label for field.
     * @property {String} type Type of data in field. Valid: string, text, array, number, modifier
     * @property {String} source Source of data for TableRoller in the form of a token (see TableRoller, ex: "name:french", "table:color", etc.)
     * @property {Number} count Number of entries for array types.
     * @property {Array|String|Number} starting_value An optional starting value.
     */
    constructor({ key, label, type, source, count, starting_value }: {
        key?: string;
        label?: string;
        type?: string;
        source?: string;
        count?: number;
        starting_value?: any;
    });
    key: string;
    label: string;
    type: string;
    source: string;
    count: number;
    starting_value: any;
    /**
     * Default value for this field by type if empty.
     */
    get defaultEmpty(): any[] | "" | 0;
    /**
     * Custom JSON handler to strip empty props.
     * @returns {Object}
     */
    toJSON(): any;
}
