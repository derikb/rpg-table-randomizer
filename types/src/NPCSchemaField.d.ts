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
    constructor({ key, label, type, source, count, starting_value }: {
        key?: string;
        label?: string;
        type?: "string";
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
    get defaultEmpty(): any[] | 0 | "";
    isString(): boolean;
    isText(): boolean;
    isNumber(): boolean;
    isModifier(): boolean;
    isNote(): boolean;
    isResult(): boolean;
    /**
     * Is this some sort of array type.
     * @returns {Boolean}
     */
    isArray(): boolean;
    /**
     * Custom JSON handler to strip empty props.
     * @returns {Object}
     */
    toJSON(): any;
}
