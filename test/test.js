'use strict';

const rpgrandomizer = require('../../rpg-table-randomizer');
const general_tables = require('./test.json');
const _ = require('underscore');

const fs = require('fs');
const path = require('path');

const tables = []; // store the tables here


console.log( rpgrandomizer.randomizer.token_types );

/*
const iterate = (obj, cb) => {
	if (Array.isArray(obj)) {
		obj.forEach(cb.bind(this, v, k, obj));
	} else if (isObject(obj)) {
		let keys = Object.keys(obj);
		for (let k in keys) {
			cb.bind(this, obj[k], k, obj);
		}
	}
};
*/


let arr = [
	'red',
	'orange',
	'yellow',
];

let object = {
	red: {},
	orange: {},
	yellow: {}	
};

let length = 0;
console.log(this);


rpgrandomizer.r_helpers.iterate(arr, (v, k , l) => {
	console.log(this.length);
	console.log(v, k);
});
/*
_.each(this.get('tables'), function (v, k, l) {
			t_length++;
			t_tables++;
			if (Array.isArray(v)) {
				t_length = t_length + v.length;
			} else {
				for (const key in v) {
					if (v.hasOwnProperty(key)) { t_length++; }
				}
			}
		}, this);
*/


console.log( rpgrandomizer.r_helpers.isEmpty({ }) );
console.log( rpgrandomizer.r_helpers.isEmpty({ a: 2 }) );
console.log( rpgrandomizer.r_helpers.isEmpty('') );
console.log( rpgrandomizer.r_helpers.isEmpty('pants') );

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