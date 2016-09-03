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

	describe('findObject method', function () {
		
		it('should find the desired element from the desired table', function () {
			let sample_data = test_tables.find((v) => { return v.id === 'colonial_encounters_town'; });
			test_table = new random_table(sample_data);
			expect(test_table.findObject('Local priest')).to.eql( { "label": "Local priest",
	        "subtable": "actions_men" } );
	        expect(test_table.findObject('Arguing', 'actions_men')).to.eql( { "label": "Arguing" } );
		});
		
	});

});
