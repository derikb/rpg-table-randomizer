'use strict';

const expect = require('chai').expect;

const rpg_table_randomizer = require('../src/index.js');
const randomizer = rpg_table_randomizer.randomizer;
const npc_generator = rpg_table_randomizer.npc_generator;
const random_name = rpg_table_randomizer.random_name;
const RandomTable = rpg_table_randomizer.RandomTable;
const TableNormalizer = rpg_table_randomizer.TableNormalizer;
const r_helpers = rpg_table_randomizer.r_helpers;

const schemas = require('../sample/schemas.js');
const test_tables = require('./test.json');
const mission_tables = require('../sample/colonial_mission.json');

const tables = {};

test_tables.forEach((t) => {
	tables[t.key] = new RandomTable(t);
});


randomizer.setTableKeyLookup(function(key){
	return tables[key] ? tables[key] : null;
});

const name = require('../src/random_name.js');
const namedata = require('../sample/names.json');
const namer = new name(randomizer, namedata);

describe('registerSchema', function () {
	it('should create a new npc constructor for the schema', function () {
		npc_generator.registerSchema(schemas.colonial);
		expect(npc_generator.NPC.colonial).to.be.a('function');
	});
});

describe('colonial npc constructor', function () {
	npc_generator.registerSchema(schemas.colonial);
	
	console.log(npc_generator.NPC);
	const n = new npc_generator.NPC.colonial();
	
	it('should construct a colonial npc object', function () {
		expect(n).to.be.a('object');
		expect(n.schema).to.equal('colonial');
		expect(n.initialize).to.be.a('function');
		expect(n.helpers.attribute_mod(3)).to.equal(-4);
		expect(n.fields.personality).to.be.an('array');
	});
	
	it('should roll some random values for fields', function () {
		n.initialize();
		console.log(n.fields);
		expect(n.fields.con).to.be.a('number');
		expect(n.fields.con).to.be.within(3, 18);
		expect(n.fields.hp).to.be.a('number');
		expect(n.fields.goals).to.be.a('string');
	});
});
