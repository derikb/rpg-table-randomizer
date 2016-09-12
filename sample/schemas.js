/**
 * Sample schemas
 */

module.exports = schemas = {};

schemas.colonial = {
	title: 'Colonial Campaign NPC',
	name: 'colonial',
	author: 'Derik A Badman',
	fields: [
		{ key: 'name', type: 'string', source: 'name:flemish:random' },
		{ key: 'occupation', type: 'string', source: 'table:colonial_occupations' },
		{ key: 'appearance', type: 'array', source: 'table:colonial_appearance', count: 2 },
		{ key: 'personality', type: 'array', source: 'table:colonial_personality', count: 2 },
		{ key: 'goals', type: 'string', source: 'table:colonial_goals' },
		{ key: 'reaction', type: 'number', source: 'roll:2d6' },
		{ key: 'notes', type: 'text' },
		{ key: 'group', type: 'string' },
		{ key: 'con', type: 'number', source: 'roll:3d6' },
		{ key: 'level', type: 'number', source: 'roll:1d3' },
		{ key: 'hp', type: 'number', source: function() { return `roll:${this.fields.level}d6${this.helpers.attribute_mod(this.fields.con)}`; } }
	],
	helpers: {
		attribute_mod: function(attr) {
			const abs = Math.floor((attr - 10) / 2);
			return (abs === 0) ? '' : (abs > 0) ? `+${abs}` : abs;
		}
	}
};
