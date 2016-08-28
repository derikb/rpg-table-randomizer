'use strict';

const rpgrandomizer = require('../../rpg-table-randomizer');
const general_tables = require('./test.json');
const _ = require('underscore');

const fs = require('fs');
const path = require('path');

const tables = []; // store the tables here

//console.log( general_tables );

//parse json data into table object
general_tables.forEach((t) => {
	//console.log(t.title);
	tables.push( new rpgrandomizer.RandomTable(t) );
});


rpgrandomizer.randomizer.setTableTitleLookup(function(title){
	//console.log('table lookup custom '+title);
	let t = _.findWhere(tables, { key: title });
	if (typeof t === 'undefined') {
		t = _.findWhere(tables, { title: title });
	}
	if (typeof t === 'undefined') {
		return null;
	}
	return t;
});


rpgrandomizer.randomizer.registerTokenType('name', (token_parts, full_token, curtable) => {
	if (token_parts[1]) {
		return `${token_parts[1]}-y`;
	}
	return '';
});


tables.forEach((table) => {
	table.generateResult();
	console.log( table.niceString() );
});

/*
console.log( rpgrandomizer.randomizer.roll(6, 1, 3, '+'));


let tables = {};

fs.readFile('sample/general.json', 'utf8', (err, data) => {
	
	if (err !== null) {
		console.log(err);
		return;
	}
	//console.log(data);

	const j = JSON.parse(data);
	if (j.data) {
		//console.log( j );
		j.data.forEach((t) => {
			console.log(t.title);
			tables[t.title] = new rpgrandomizer.random_table(t);
			
		});
		console.log(tables.color);
		tables.color.generateResult();
		console.log( tables.color.get('result') );
	}

});
*/



//rpgrandomizer.random_table