/**
 * Schema for creating NPCs.
 */
export class NPCSchema {
    /**
     *
     * @param {String} key Identifying key
     * @param {String} name Name of field.
     * @param {NPCSchemaField[]|obj[]} fields Data fields will be converted to NPCSchemaField if necessary)
     */
    constructor({ key, name, fields }: string);
    key: any;
    name: any;
    fields: any[];
}
/**
 * Specific field in NPC Schema.
 */
export class NPCSchemaField {
    /**
     *
     * @param {String} key Identifying key
     * @param {String} label Readable label for field.
     * @param {String} type Type of data in field. Valid: string, text, array, number, modifier
     * @param {String} source Source of data for Randomizer in the form of a token (see Randomizer, ex: "name:french", "table:color", etc.)
     * @param {Number} count Number of entries for array types.
     * @param {Array|String|Number} starting_value An optional starting value.
     */
    constructor({ key, label, type, source, count, starting_value }: string);
    key: any;
    label: any;
    type: any;
    source: any;
    count: any;
    starting_value: any;
    /**
     * Default value for this field by type if empty.
     */
    get defaultEmpty(): any[] | "" | 0;
}
