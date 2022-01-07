/**
 * Class for NPCs
 * @param {String} id Some kind of indentifier.
 * @param {String} schema Key for a NPCSchema used for this NPC.
 * @param {Map<String, Any>} fields Field values indexed by NPCSchemaField key.
 */
export default class NPC {
    constructor({ id, schema, fields }: {
        id?: any;
        schema?: string;
        fields?: any;
    });
    id: any;
    schema: string;
    fields: any;
    _convertFieldValue(value: any): any;
    /**
     * Get field keys as array.
     * @returns {String[]}
     */
    getFieldKeys(): string[];
    /**
     * Get value by field key.
     * @param {String} key NPCSchemaField.key
     * @returns {RandomTableResultSet|RandomTableResultSet[]|DiceResult|String|Any}
     */
    getFieldValue(key: string): RandomTableResultSet | RandomTableResultSet[] | DiceResult | string | Any;
    /**
     * Custom JSON handler to strip empty props.
     * @returns {Object}
     */
    toJSON(): any;
}
import RandomTableResultSet from "./RandomTableResultSet.js";
import { DiceResult } from "./dice_roller.js";
