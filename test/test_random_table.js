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
