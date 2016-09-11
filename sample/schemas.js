/**
 * Sample schemas
 */
 
 module.exports = schemas = {};
 
 schemas.colonial = {
 	title: 'Colonial Campaign NPC',
 	name: 'colonial',
	author: 'Derik A Badman',
	fields: {
		name: { type: 'string', source: 'name:flemish:random' },
		occupation: { type: 'string', source: 'table:colonial_occupations' },
		appearance: { type: 'array', source: 'table:colonial_appearance', count: 2 },
		personality: { type: 'array', source: 'table:colonial_personality', count: 2 },
		goals: { type: 'string', source: 'table:colonial_goals' },
		reaction: { type: 'number', source: 'roll:2d6' },
		notes: { type: 'text' },
		group: { type: 'string' },
		con: { type: 'number', source: 'roll:3d6' }
	},
	helpers: {
		attribute_mod: function(attr) {
			return Math.floor( (attr - 10) / 2 );
		}
	}
 };
 