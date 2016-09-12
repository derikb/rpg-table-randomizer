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
const npc_tables = require('../sample/npcs.json');
const test_tables = require('./test.json');
const mission_tables = require('../sample/colonial_mission.json');

const tables = {};

test_tables.forEach((t) => {
	tables[t.key] = new RandomTable(t);
});
npc_tables.forEach((t) => {
	tables[t.key] = new RandomTable(t);
});

randomizer.setTableKeyLookup(function(key){
	return tables[key] ? tables[key] : null;
});

const name = require('../src/random_name.js');
const namedata = require('../sample/names.json');
const namer = new name(randomizer, namedata);

describe('npc_generator module', function() {

	describe('registerSchema', function () {
		npc_generator.registerSchema(schemas.colonial);
		npc_generator.registerSchema(schemas.simple);
		
		it('should create a new npc constructor for the colonial schema', function () {
			expect(npc_generator.NPC.colonial).to.be.a('function');
			expect(npc_generator.NPC.colonial.prototype.schema).to.equal('colonial');
		});
		
		it('should create a new npc constructor for the simple schema', function () {
			expect(npc_generator.NPC.simple).to.be.a('function');
			expect(npc_generator.NPC.simple.prototype.schema).to.equal('simple');
		});
	});
	
	describe('simple npc constructor', function () {
		// npc_generator.registerSchema(schemas.simple);
		
		// console.log(npc_generator.NPC);
		const n = new npc_generator.NPC.simple();
		
		it('should construct a simple npc object', function () {
			expect(n).to.be.a('object');
			expect(n.schema).to.equal('simple');
			expect(n.initialize).to.be.a('function');
			expect(n.fields.personality).to.be.an('array');
		});
		
		it('should roll some random values for fields', function () {
			n.initialize();
			// console.log(n.fields);
			expect(n.fields.name).to.not.match(/^name:/);
			expect(n.fields.occupation).to.be.a('string');
			expect(n.fields.occupation).to.not.match(/^table:/);
			expect(n.fields.appearance).to.be.an('array');
			expect(n.fields.appearance[0]).to.not.match(/^table:/);
			expect(n.fields.appearance[1]).to.not.match(/^table:/);
			expect(n.fields.personality).to.be.an('array');
			expect(n.fields.personality[0]).to.not.match(/^table:/);
			expect(n.fields.personality[1]).to.not.match(/^table:/);
			expect(n.fields.goals).to.be.a('string');
			expect(n.fields.goals).to.not.match(/^table:/);
			expect(n.fields.reaction).to.be.a('number');
			expect(n.fields.reaction).to.be.within(2, 12);
			expect(n.fields.notes).to.be.a('string');
		});
	});
	
	
	describe('colonial npc constructor', function () {
		// npc_generator.registerSchema(schemas.colonial);
		
		// console.log(npc_generator.NPC);
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
			// console.log(n.fields);
			expect(n.fields.name).to.not.match(/^name:/);
			expect(n.fields.con).to.be.a('number');
			expect(n.fields.con).to.be.within(3, 18);
			expect(n.fields.hp).to.be.a('number');
			expect(n.fields.goals).to.be.a('string');
		});
		
		it('should add a method to all NPC constructors', function () {
			npc_generator.NPC.Base.prototype.tester = function() { return 'test'; }
			const bn = new npc_generator.NPC.Base();
			expect(bn.tester()).to.equal('test');
			expect(n.tester()).to.equal('test');
			
		});	
	});
	
});
