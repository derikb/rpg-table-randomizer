'use strict';

const expect = require('chai').expect;

const randomizer = require('../src/randomizer.js');
const random_table = require('../src/random_table.js');
const table_normalizer = require('../src/table_normalizer.js');




describe('Normalizing text', function () {
	
	it('should process text separated by line breaks', function () {
		const text = `Red
		Orange
		Yellow`;
		const normalizer = new table_normalizer(text);
		normalizer.normalizeData();
		expect(normalizer.data_type).to.equal('text');
		expect(normalizer.normalized_data).to.be.an.array;
		expect(normalizer.normalized_data).to.have.lengthOf(3);
		expect(normalizer.normalized_data.shift()).to.have.property('label', 'Red');
		expect(normalizer.normalized_data.shift()).to.have.property('label', 'Orange');
		expect(normalizer.normalized_data.shift()).to.have.property('label', 'Yellow');
	});
	
	it('should process text separated by line breaks with weight ## at the front', function () {
		const text = `1##Red
		2##Orange
		3##Yellow`;
		const normalizer = new table_normalizer(text);
		normalizer.normalizeData();
		expect(normalizer.data_type).to.equal('text');
		expect(normalizer.normalized_data).to.be.an.array;
		expect(normalizer.normalized_data).to.have.lengthOf(3);
		expect(normalizer.normalized_data.shift()).to.have.all.keys({ label: 'Red' });
		expect(normalizer.normalized_data.shift()).to.have.all.keys({ label: 'Orange', weight: 2 });
		expect(normalizer.normalized_data.shift()).to.have.all.keys({ label: 'Yellow', weight: 3 });
	});
	
	it('should process text separated by line breaks with weight . at the front', function () {
		const text = `1. Red
		2-3. Orange
		4-6. Yellow`;
		const normalizer = new table_normalizer(text);
		normalizer.normalizeData();
		expect(normalizer.data_type).to.equal('text');
		expect(normalizer.normalized_data).to.be.an.array;
		expect(normalizer.normalized_data).to.have.lengthOf(3);
		expect(normalizer.normalized_data.shift()).to.have.all.keys({ label: 'Red' });
		expect(normalizer.normalized_data.shift()).to.have.all.keys({ label: 'Orange', weight: 2 });
		expect(normalizer.normalized_data.shift()).to.have.all.keys({ label: 'Yellow', weight: 3 });
	});
	
	it('should process text separated by line breaks with weight : at the front', function () {
		const text = `1-2: Red
		3: Orange
		4-6: Yellow`;
		const normalizer = new table_normalizer(text);
		normalizer.normalizeData();
		expect(normalizer.data_type).to.equal('text');
		expect(normalizer.normalized_data).to.be.an.array;
		expect(normalizer.normalized_data).to.have.lengthOf(3);
		expect(normalizer.normalized_data.shift()).to.have.all.keys({ label: 'Red', weight: 2 });
		expect(normalizer.normalized_data.shift()).to.have.all.keys({ label: 'Orange' });
		expect(normalizer.normalized_data.shift()).to.have.all.keys({ label: 'Yellow', weight: 3 });
	});
	
	it('should process text separated by line breaks with weight , or space at the front', function () {
		const text = `1-2, Red
		3	Orange
		4-6 Yellow`
		const normalizer = new table_normalizer(text);
		normalizer.normalizeData();
		expect(normalizer.data_type).to.equal('text');
		expect(normalizer.normalized_data).to.be.an.array;
		expect(normalizer.normalized_data).to.have.lengthOf(3);
		expect(normalizer.normalized_data.shift()).to.have.all.keys({ label: 'Red', weight: 2 });
		expect(normalizer.normalized_data.shift()).to.have.all.keys({ label: 'Orange' });
		expect(normalizer.normalized_data.shift()).to.have.all.keys({ label: 'Yellow', weight: 3 });
	});
	
	it('should process text separated by line breaks with weight and subtables', function () {
		const text = `1-2. Red##direction
		3: Orange##ordinal
		4-6 Yellow##season`
		const normalizer = new table_normalizer(text);
		normalizer.normalizeData();
		expect(normalizer.data_type).to.equal('text');
		expect(normalizer.normalized_data).to.be.an.array;
		expect(normalizer.normalized_data).to.have.lengthOf(3);
		expect(normalizer.normalized_data.shift()).to.have.all.keys({ label: 'Red', weight: 2, subtable: 'direction' });
		expect(normalizer.normalized_data.shift()).to.have.all.keys({ label: 'Orange', subtable: 'ordinal' });
		expect(normalizer.normalized_data.shift()).to.have.all.keys({ label: 'Yellow', weight: 3, subtable: 'season' });
	});

	
	it('should process text separated by line breaks with hyphen starters', function () {
		const text = `- Red
		- Orange
		- Yellow`;
		const normalizer = new table_normalizer(text);
		normalizer.normalizeData();
		expect(normalizer.data_type).to.equal('text');
		expect(normalizer.normalized_data).to.be.an.array;
		expect(normalizer.normalized_data).to.have.lengthOf(3);
		expect(normalizer.normalized_data.shift()).to.have.property('label', 'Red');
		expect(normalizer.normalized_data.shift()).to.have.property('label', 'Orange');
		expect(normalizer.normalized_data.shift()).to.have.property('label', 'Yellow');
	});
});


describe('Normalizing html', function () {
	
	it('should process html lists', function () {
		const html = `<ul>
		<li>Red</li>
		<li>Orange</li>
		<li>Yellow</li>
		</ul>`;
		const normalizer = new table_normalizer(html);
		normalizer.normalizeData();
		expect(normalizer.data_type).to.equal('html');
		expect(normalizer.normalized_data).to.be.an.array;
		expect(normalizer.normalized_data).to.have.lengthOf(3);
		expect(normalizer.normalized_data.shift()).to.have.property('label', 'Red');
		expect(normalizer.normalized_data.shift()).to.have.property('label', 'Orange');
		expect(normalizer.normalized_data.shift()).to.have.property('label', 'Yellow');
	});
	
	it('should process html paragraphs', function () {
		const html = `<p> Red</p>
		<p>Orange </p>
		<p>Yellow</p>`;
		const normalizer = new table_normalizer(html);
		normalizer.normalizeData();
		expect(normalizer.data_type).to.equal('html');
		expect(normalizer.normalized_data).to.be.an.array;
		expect(normalizer.normalized_data).to.have.lengthOf(3);
		expect(normalizer.normalized_data.shift()).to.have.property('label', 'Red');
		expect(normalizer.normalized_data.shift()).to.have.property('label', 'Orange');
		expect(normalizer.normalized_data.shift()).to.have.property('label', 'Yellow');
	});
	
	it('should process html linebreaks', function () {
		const html = `<p> Red<br/>
		Orange<br/>
		Yellow</p>`;
		const normalizer = new table_normalizer(html);
		normalizer.normalizeData();
		expect(normalizer.data_type).to.equal('html');
		expect(normalizer.normalized_data).to.be.an.array;
		expect(normalizer.normalized_data).to.have.lengthOf(3);
		expect(normalizer.normalized_data.shift()).to.have.property('label', 'Red');
		expect(normalizer.normalized_data.shift()).to.have.property('label', 'Orange');
		expect(normalizer.normalized_data.shift()).to.have.property('label', 'Yellow');
	});
	
	it('should process text separated by line breaks with weight and subtables', function () {
		const html = `<ul><li>1-2. Red##direction</li>
		<li>3: Orange##ordinal</li>
		<li>4-6 Yellow##season</li>`
		const normalizer = new table_normalizer(html);
		normalizer.normalizeData();
		expect(normalizer.data_type).to.equal('html');
		expect(normalizer.normalized_data).to.be.an.array;
		expect(normalizer.normalized_data).to.have.lengthOf(3);
		expect(normalizer.normalized_data.shift()).to.have.all.keys({ label: 'Red', weight: 2, subtable: 'direction' });
		expect(normalizer.normalized_data.shift()).to.have.all.keys({ label: 'Orange', subtable: 'ordinal' });
		expect(normalizer.normalized_data.shift()).to.have.all.keys({ label: 'Yellow', weight: 3, subtable: 'season' });
	});
	
});


/*
const fs = require('fs');

let data = '{"label":"something"}';
normalizer.setData(data);
console.log( normalizer.checkType() );
console.log( normalizer.normalizeData() );

data = fs.readFileSync('./test/test_text_data.txt', 'utf8');
normalizer.setData(data);
console.log( normalizer.checkType() );
console.log( normalizer.normalizeData() );
console.log( normalizer.normalized_data.tables );

data = fs.readFileSync('./test/test_html_data.html', 'utf8');
normalizer.setData(data);
console.log( normalizer.checkType() );
console.log( normalizer.normalizeData() );
*/