
/**
 * Specific field in NPC Schema.
 */
class NPCSchemaField {
    /**
     *
     * @param {String} key Identifying key
     * @param {String} label Readable label for field.
     * @param {String} type Type of data in field. Valid: string, text, array, number, modifier
     * @param {String} source Source of data for Randomizer in the form of a token (see Randomizer, ex: "name:french", "table:color", etc.)
     * @param {Number} count Number of entries for array types.
     * @param {Array|String|Number} starting_value An optional starting value.
     */
    constructor({
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
    get defaultEmpty() {
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
}


/**
 * Schema for creating NPCs.
 */
class NPCSchema {
    /**
     *
     * @param {String} key Identifying key
     * @param {String} name Name of field.
     * @param {NPCSchemaField[]|obj[]} fields Data fields will be converted to NPCSchemaField if necessary)
     */
    constructor({
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
