'use strict';

const expect = require('chai').expect;

const randomizer = require('../src/randomizer.js');
const random_table = require('../src/random_table.js');
const test_tables = require('./test.json');

/**
 * a table we will set for each test.
 */
let test_table = null;

describe('random_table module', function () {
	
	before(function () {
		test_table = null;
	});
	
	describe('basic config', function(){
		it('should set the basic config properties', function () {
			const config = test_tables.find((v) => { return v.id === 'directions'; });
			const test_table = new random_table(config);
			expect(test_table.id).to.equal(config.id);
			expect(test_table.key).to.equal(config.id);
			expect(test_table.table).to.be.undefined;
			expect(test_table.tables.default).to.equal(config.table);
		});
	});
	
	describe('niceString method', function () {
		it('should return a string...', function () {
			let sample_data = test_tables.find((v) => { return v.id === 'color2'; });
			test_table = new random_table(sample_data);
			randomizer.getTableResult(test_table);
			console.log(test_table.niceString());
			expect(test_table.niceString()).to.be.a.string;
			expect(test_table.niceString()).to.equal('Light\nBlue');
		});
	});
	
	
	describe('findObject method', function () {
		it('should find the desired element from the desired table', function () {
			let sample_data = test_tables.find((v) => { return v.id === 'colonial_encounters_town'; });
			test_table = new random_table(sample_data);
			expect(test_table.findObject('Local priest')).to.eql( { "label": "Local priest",
	        "subtable": "actions_men" } );
	        expect(test_table.findObject('Arguing', 'actions_men')).to.eql( { "label": "Arguing" } );
		});
	});
	
	
	describe('findResultElem method', function () {
		it('should return the result from the selected table', function () {
			let sample_data = test_tables.find((v) => { return v.id === 'color2'; });
			test_table = new random_table(sample_data);
			randomizer.getTableResult(test_table);
			const resultelem = test_table.findResultElem('value');
			expect(resultelem).to.have.property('result', 'Light');
			expect(resultelem).to.have.property('table', 'value');
		});
	});
	
	describe('outputObject function', function () {
		it('should return all non-function properties that are not empty', function () {
			let sample_data = test_tables.find((v) => { return v.id === 'color2'; });
			test_table = new random_table(sample_data);
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
			let sample_data = test_tables.find((v) => { return v.id === 'color2'; });
			test_table = new random_table(sample_data);
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
			let sample_data = test_tables.find((v) => { return v.id === 'color2'; });
			test_table = new random_table(sample_data);
			const output = test_table.outputCode(false, false);
			expect(output).to.be.a.string;
			expect(output).to.match(/\n/);
			expect(output).to.match(/\s{2}/);
		});
		
		it('should return a json string of data compressed (no linebreaks, spaces, etc)', function () {
			let sample_data = test_tables.find((v) => { return v.id === 'color2'; });
			test_table = new random_table(sample_data);
			const output = test_table.outputCode(false, true);
			expect(output).to.be.a.string;
			expect(output).to.not.match(/\n/);
			expect(output).to.not.match(/\s{2}/);
		});
	});	

});
