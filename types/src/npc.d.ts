/**
 * Class for NPCs.
 * @param {String} id Some kind of indentifier.
 * @param {String} schema Key for a NPCSchema used for this NPC.
 * @param {Map<String, Any>} fields Field values indexed by NPCSchemaField key.
 */
export class NPC {
    constructor({ id, schema, fields }: {
        id?: any;
        schema?: string;
        fields?: any;
    });
    id: any;
    schema: string;
    fields: any;
    /**
     * Custom JSON handler to strip empty props.
     * @returns {Object}
     */
    toJSON(): any;
}
