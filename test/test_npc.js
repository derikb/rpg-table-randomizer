'use strict';

const expect = require('chai').expect;
const randomizer = require('../src/randomizer.js');

const rpgnpc = require('../src/npc.js')(randomizer);
const schemas = require('../sample/schemas.js');

const RandomTable = require('../src/random_table.js');
const test_tables = require('./test.json');
const mission_tables = require('../sample/colonial_mission.json');

const tables = {};

test_tables.forEach((t) => {
	tables[t.key] = new RandomTable(t);
});

console.log('hjello');

randomizer.setTableKeyLookup(function(key){
	return tables[key] ? tables[key] : null;
});

const name = require('../src/random_name.js');
const namedata = require('../sample/names.json');
const namer = new name(randomizer, namedata);


describe('registerSchema', function () {
	it('should create a new npc constructor for the schema', function () {
		rpgnpc.registerSchema(schemas.colonial);
		expect(rpgnpc.NPC.colonial).to.be.a('function');
	});
});

describe('colonial npc constructor', function () {
	rpgnpc.registerSchema(schemas.colonial);
	
	console.log(rpgnpc.NPC);
	const n = new rpgnpc.NPC.colonial();
	
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
		// expect()
	});
});
