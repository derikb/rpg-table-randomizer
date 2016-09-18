'use strict';

const expect = require('chai').expect;

const rpg_table_randomizer = require('../src/index.js');
const randomizer = rpg_table_randomizer.randomizer;
const npc_generator = rpg_table_randomizer.npc_generator;
const random_name = rpg_table_randomizer.random_name;
const RandomTable = rpg_table_randomizer.RandomTable;
const TableNormalizer = rpg_table_randomizer.TableNormalizer;
const r_helpers = rpg_table_randomizer.r_helpers;

const test_tables = require('./test.json');

/**
 * a table we will set for each test.
 */
let test_table = null;

describe('RandomTable module', function () {
	
	before(function () {
		test_table = null;
	});
	
	describe('basic config', function(){
		it('should set the basic config properties', function () {
			const config = test_tables.find((v) => { return v.key === 'directions'; });
			const test_table = new RandomTable(config);
			expect(test_table.key).to.equal(config.key);
			expect(test_table.table).to.be.undefined;
			expect(test_table.tables.default).to.equal(config.table);
		});
	});
	
	describe('niceString method', function () {
		it('should return a string...', function () {
			let sample_data = test_tables.find((v) => { return v.key === 'color2'; });
			test_table = new RandomTable(sample_data);
			randomizer.getTableResult(test_table);
			console.log(test_table.niceString());
			expect(test_table.niceString()).to.be.a.string;
			expect(test_table.niceString()).to.equal('Light\nBlue');
		});
	});
	
	
	describe('findObject method', function () {
		it('should find the desired element from the desired table', function () {
			let sample_data = test_tables.find((v) => { return v.key === 'colonial_encounters_town'; });
			test_table = new RandomTable(sample_data);
			expect(test_table.findObject('Local priest')).to.eql( { "label": "Local priest",
	        "subtable": "actions_men" } );
	        expect(test_table.findObject('Arguing', 'actions_men')).to.eql( { "label": "Arguing" } );
		});
	});
	
	
	describe('findResultElem method', function () {
		it('should return the result from the selected table', function () {
			let sample_data = test_tables.find((v) => { return v.key === 'color2'; });
			test_table = new RandomTable(sample_data);
			randomizer.getTableResult(test_table);
			const resultelem = test_table.findResultElem('value');
			expect(resultelem).to.have.property('result', 'Light');
			expect(resultelem).to.have.property('table', 'value');
		});
	});
	
	describe('outputObject function', function () {
		it('should return all non-function properties that are not empty', function () {
			let sample_data = test_tables.find((v) => { return v.key === 'color2'; });
			test_table = new RandomTable(sample_data);
			const output = test_table.outputObject();
			expect(output).to.be.object;
			expect(output).to.have.property('key', 'color2');
			expect(output).to.have.property('title', 'Colors 2');
			expect(output).to.have.property('sequence').and.include("value", "default");
			expect(output).to.have.property('tables').and.include.keys("value", "default");
			expect(output).to.not.have.property('description');
			expect(output).to.not.have.property('author');
			expect(output).to.not.have.property('source');
		});
		
		it('should return all non-function properties', function () {
			let sample_data = test_tables.find((v) => { return v.key === 'color2'; });
			test_table = new RandomTable(sample_data);
			const output = test_table.outputObject(true);
			expect(output).to.be.object;
			expect(output).to.have.property('key', 'color2');
			expect(output).to.have.property('title', 'Colors 2');
			expect(output).to.have.property('sequence').and.include("value", "default");
			expect(output).to.have.property('tables').and.include.keys("value", "default");
			expect(output).to.have.property('description', '');
			expect(output).to.have.property('author', '');
			expect(output).to.have.property('source', '');
		});
	});
	
	describe('outputCode function', function () {
		it('should return a json string of data', function () {
			let sample_data = test_tables.find((v) => { return v.key === 'color2'; });
			test_table = new RandomTable(sample_data);
			const output = test_table.outputCode(false, false);
			expect(output).to.be.a.string;
			expect(output).to.match(/\n/);
			expect(output).to.match(/\s{2}/);
		});
		
		it('should return a json string of data compressed (no linebreaks, spaces, etc)', function () {
			let sample_data = test_tables.find((v) => { return v.key === 'color2'; });
			test_table = new RandomTable(sample_data);
			const output = test_table.outputCode(false, true);
			expect(output).to.be.a.string;
			expect(output).to.not.match(/\n/);
			expect(output).to.not.match(/\s{2}/);
		});
	});
	
	describe('findDependencies method', function () {
		it('should return an array of tables', function () {
			let sample_data = test_tables.find((v) => { return v.key === 'colonial_encounters_town'; });
			test_table = new RandomTable(sample_data);
			expect(test_table.findDependencies()).to.have.members(['colonial_occupations', 'colonial_factions']);
			expect(test_table.dependencies).to.have.members(['colonial_occupations', 'colonial_factions']);
		});
		
		it('should return an array of tables', function () {
			let sample_data = test_tables.find((v) => { return v.key === 'colonial_companies'; });
			test_table = new RandomTable(sample_data);
			expect(test_table.findDependencies()).to.be.empty;
			expect(test_table.dependencies).to.be.empty;
		});		
	});
	
});
