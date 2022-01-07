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
    constructor({ key, name, author, fields }: {
        key?: string;
        name?: string;
        author?: string;
        fields?: any[];
    });
    key: string;
    name: string;
    author: string;
    fields: Map<any, any>;
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
import NPCSchemaField from "./NPCSchemaField.js";
