'use strict';

const expect = require('chai').expect;

const randomizer = require('../src/randomizer.js');
//const random_table = require('../src/random_table.js');
const name = require('../src/random_name.js');
const namedata = require('../sample/names.json');
const namer = new name(randomizer, namedata);


describe('generateList function', function () {
	it('should return listCount number of names', function () {
		namer.listCount = 6;
		const list = namer.generateList();
		expect(list).to.have.property('male');
		expect(list).to.have.property('female');
		expect(list.male).to.have.lengthOf(3);
		expect(list.female).to.have.lengthOf(3);
	});
});

describe('holmesname function', function () {
	// ok its hard to test success other than it not just failing
	it('should return a name...', function () {
		expect(namer.holmesname()).to.be.string;
		expect(namer.holmesname()).to.be.have.length.above(1);
	});
	
});

describe('demonname function', function () {
	// ok its hard to test success other than it not just failing
	it('should return a name...', function () {
		expect(namer.demonname()).to.be.string;
		expect(namer.demonname()).to.be.have.length.above(1);
	});
	
});

describe('selectName function', function () {
	
	it('should return a female first name from the list', function () {
		const name = namer.selectName('flemish', 'female', 'first');
		expect(name).to.be.string;
		expect(name).to.match(/^\S+$/);
		expect(name).to.be.oneOf(namedata.flemish.female);
	});
	
	it('should return a female first and surname from the list', function () {
		const name = namer.selectName('flemish', 'female');
		expect(name).to.be.string;
		expect(name).to.match(/^\S+\s(\S+\s)?\S+$/);
		let names = name.split(' ');
		expect(names.shift()).to.be.oneOf(namedata.flemish.female);
		expect(names.join(' ').toLowerCase()).to.be.oneOf(namedata.flemish.surname.map((w) => { return w.toLowerCase(); }));
	});
	
	it('should return a male first name from the list', function () {
		const name = namer.selectName('flemish', 'male', 'first');
		expect(name).to.be.string;
		expect(name).to.match(/^\S+$/);
		expect(name).to.be.oneOf(namedata.flemish.male);
	});
	
	it('should return a male first and surname from the list', function () {
		const name = namer.selectName('flemish', 'male');
		expect(name).to.be.string;
		expect(name).to.match(/^\S+\s(\S+\s)?\S+$/);
		let names = name.split(' ');
		expect(names.shift()).to.be.oneOf(namedata.flemish.male);
		expect(names.join(' ').toLowerCase()).to.be.oneOf(namedata.flemish.surname.map((w) => { return w.toLowerCase(); }));
	});
	
});

describe('selectSurname function', function(){
	
	it('should return a surname', function () {
		const surname = namer.selectSurname('flemish');
		expect(surname).to.be.string;
		expect(surname).to.match(/^(\S+\s)?\S+$/);
		expect(surname.toLowerCase()).to.be.oneOf(namedata.flemish.surname.map((w) => { return w.toLowerCase(); }));
	});
	
});

describe('createName function', function () {
	
	it('should return a created name', function () {
		const name = namer.createName('flemish', 'female', false);
		expect(name).to.be.string;
		expect(name).to.be.have.length.above(1);
		expect(name).to.match(/^\S+$/);
	});
	
	it('should return a created name', function () {
		const name = namer.createName('flemish', 'female');
		expect(name).to.be.string;
		expect(name).to.be.have.length.above(1);
		expect(name).to.match(/^\S+$/);
	});
	
	it('should return a created name', function () {
		const name = namer.createName('flemish');
		expect(name).to.be.string;
		expect(name).to.be.have.length.above(1);
		expect(name).to.match(/^\S+$/);
	});
	
	it('should return a created name', function () {
		const name = namer.createName();
		expect(name).to.be.string;
		expect(name).to.be.have.length.above(1);
		expect(name).to.match(/^\S+$/);
	});
	
});

describe('capitalizeName function', function () {
	it('should return a capitalized single word name', function () {
		expect(namer.capitalizeName('dido')).to.equal('Dido');
	});
	
	it('should return a capitalized double word name', function () {
		expect(namer.capitalizeName('dido barclay')).to.equal('Dido Barclay');
	});
	
	it('should return a capitalized triple word name', function () {
		expect(namer.capitalizeName('dido de vroom')).to.equal('Dido De Vroom');
	});
});


describe('registerNameType function', function () {
	it('should set up the name_type in the data', function () {
		const data = {
			male: [],
			female: [],
			surname: []
		};
		namer.registerNameType('martian', data, 'Martian Exo');
		expect(namer.namedata.options).to.have.property('martian', 'Martian Exo');
		expect(namer.namedata.martian).to.eql(data);
	});
});

// @todo probably should write tests for the Markov functions
