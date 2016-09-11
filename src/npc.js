'use strict';

/**
 * npc_gen: pass in the randomizer so we can return an object that can use the shared randomizer instance
 * @return {Object} npc functions
 */
module.exports = function npc_gen (randomizer) {
	/**
	 * Model for Non-player characters (NPCs)
	 * Implements an NPC schema...?
	 */
	const NPC = {};
	
	NPC.base = function () { };
	/**
	 * Just a unique identifier that can be used for storage/retrieval
	 */
	NPC.base.prototype.id = 0;
	/**
	 * Name of the schema used for the NPC
	 */
	NPC.base.prototype.schema = '';
	/**
	 * The NPC's fields as set by the schema
	 */
	NPC.base.prototype.fields = {};
	/**
	 * Schema assigned helper functions
	 */
	NPC.base.prototype.helpers = {};
	/**
	 * set defaults on the fields
	 * usually this would involve calling random tables
	 */
	NPC.base.prototype.initialize = function () {
		const schema_fields = Schemas[this.schema].fields;
		const fields = Object.keys(this.fields);
		fields.forEach((f) => {
			if (schema_fields[f]) {
				if (schema_fields[f].default) {
					this.fields[f] = schema_fields[f].default;
					return;
				}
				if (schema_fields[f].source && schema_fields[f].source !== '') {
					// parse source into something randomizer can use...
					if (schema_fields[f].type === 'array') {
						let ct = (schema_fields[f].count) ? schema_fields[f].count : 1; //???
						for (let i=0; i < ct; i++) {
							this.fields[f].push(randomizer.convertToken(schema_fields[f].source));
						}
					} else {
						this.fields[f] = randomizer.convertToken(schema_fields[f].source);
					}
				}
			}
		});
		
		return 'initted';
	};
	
	/**
	 * Object store for registered schemas
	 */
	const Schemas = {};
	
	/**
	 * function to make a new NPC constructor
	 * constructor is added to NPC[schemaname]
	 * @param {Object} schema NPC schema object to base on the constructor
	 * @return {null} 
	 */
	const registerSchema = function (schema) {
		if (!schema.name || schema.name === 'base') {
			return null;
			// throw exception?
		}
		// store it for later reference
		Schemas[schema.name] = schema;
		// add this schema to the NPC object so we can use it as a constructor
		// this could overwrite is that ok?
		const base = NPC[schema.name] = function () {
			// in case we add something to NPC constructor that we need to call?
			// NPC.base.call(this);
		};
		base.prototype = new NPC.base();
		base.prototype.constructor = base;
		base.prototype.schema = schema.name;
		
		// initialize schema properties...
		const fields = Object.keys(schema.fields);
		fields.forEach((f) => {
			let default_ = null;
			switch (schema.fields[f].type) {
	    		case 'string':
	    		case 'text':
	    			default_ = '';
	    			break;
	    		case 'array':
	    			default_ = [];
	    			break;
	    		case 'number':
	    		case 'modifier':
	    			default_ = 0;
	    			break;
	    		case undefined:
	    			// ?
	    			break;
			}
			base.prototype.fields[f] = default_;
		});
		
		const helpers = Object.keys(schema.helpers);
		helpers.forEach((h) => {
			if (typeof schema.helpers[h] === 'function') {
				base.prototype.helpers[h] = schema.helpers[h];
			}
		});
	};
	
	// return the NPC object of constructors and the registerSchema function	
	return {
		NPC: NPC,
		registerSchema: registerSchema
	};
}
