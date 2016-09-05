# rpg-table-randomizer

## Synopsis

Module for randomization focused on tables used in roleplaying games.

This is model and logic only there is no ui and only the most limited of view data. No functions are provided for the organization or storage of table data. (I'm working on a webapp that will provide views, ui, and storage.)

## Code Example

A simple example setting up a very basic unweighted table (with no subtables), and then "rolling" on it:

```
const rpg-table-randomizer = require('rpg-table-randomizer');
const randomizer = rpg-table-randomizer.randomizer;
const RandomTable = rpg-table-randomizer.RandomTable;
const random_name = rpg-table-randomizer.random_name

const table_config = {
	key: 'colors',
	title: 'Random Color',
	table: [
		'Red',
		'Orange',
		'Yellow',
	]
};

const colortable = new RandomTable(table_config);

let result = randomizer.getTableResult(colortable);

// result equals one of the colors

let roll = randomizer.roll('2d4+1');

// roll equals a number between 3 and 9

let my_old_character_name = random_name.createName('dutch', 'male');

// my_old_character_name equals a male name from the dutch name list

let my_new_character_name = random_name.createName('flemish', 'female');

// my_new_character_name equals a female name based on flemish name syntax using Markov chain

```

Other more complicated (and useful) operations are possible. See below.

## Motivation

I wrote this as a backend for an app that would enable the storage, sharing, and use of random tables in a webapp that would be easy to use at the table while game mastering. I wanted a way to consolidate various random tables that I'd use more often if I didn't have to dig around to fine them.

I also really like have a quick way to get a bunch of names.

## Installation

This module was written for use in nodejs but uses browserify to create a module that can be used in browser. Babel is used to convert ES2015 features, but I haven't tested in most browsers.

-npm install
-browser install

There are no module requirements for production environment.

## API Reference

The module exposes a few objects and constructors.

### randomizer

This object is used for generating random results from tables. It can also provide random dice rolls.

#### roll (string)

* @params {String} string a die roll notation
* @returns {Number} the result of the roll

For random dice rolling operations.

```
randomizer.roll('d6'); // returns an integer between 1 and 6
randomizer.roll('d6/3'); // returns an integer between 1 and 3
randomizer.roll('d6*2'); // returns an integer between 2 and 12
randomizer.roll('d4+1'); // returns an integer between 2 and 5
randomizer.roll('d4-1'); // returns an integer between 0 and 3
randomizer.roll('2d8'); // returns an integer between 2 and 16
```

#### random (min, max)

- @param {Number} _min_ low end of range
- @param {Number} _[max]_ high end of range
- @return {Number} a random integer between min and max

Returns a random integer between min and max params. If max is omitted, then it returns an integer between 0 and min.

Example:

```
randomizer.random(1, 4); // an integer between 1 and 4
randomizer.random(6); // an integer between 0 and 6
```

#### getWeightedRandom (values, weights)

- @param {Array} _values_ array of values to randomly select from
- @param {Array} _weights_ array of weighted numbers to correspond to the values array
- @return {String|Number|Object} a randomly selected element from the values array

This is mostly used internally. Returns a randomly selected element from the values array, where the randomization is weighted based on the weights array.

```
//a classic bell curve reaction table
const values = [
	'Hostile',
	'Unfriendly',
	'Indifferent',
	'Talkative',
	'Helpful'
];
const weights = [
	1,
	9,
	16,
	9,
	1
];
randomizer.getWeightedRandom(values, weights); // returns a reaction from the value array

```

#### rollRandom (data)

- @param {Array|Object} _data_ An object or array of data
- @returns {String} the randomly selected Object property name, Array element, or value of the "label" property

This is mostly used internally. Takes a structured object or array of data and returns one of the element's value randomly based on weight property (if it's there).

```
const data = [
	{ label: "Hostile", weight: 1 },
	{ label: "Unfriendly", weight: 9 },
	{ label: "Indifferent", weight: 16 },
	{ label: "Talkative", weight: 9 },
	{ label: "Helpful", weight: 1 }
];
randomizer.rollRandom(data); // returns one of the reactions

```

#### getTableResult (rtable, start)

- @param {Object} _table_ a RandomTable object
- @param {String} _[start='']_ subtable to roll on
- @return {Array} array of object results { table: table that was rolled on, result: result string, desc: optional description string }

This is the primary way to generate results from the RandomTable objects.

Takes a RandomTable object and returns an array of results. If RandomTable.sequence is set, multiple results may be returned. Optionally a specific subtable can be selected to select from. This is basically a wrapper for selectFromTable() that may, depending on the RandomTable's properties, concatenate multiple selectFromTable() results. 

```
const table_config = {
	key: 'colors',
	title: 'Random Color',
	sequence: [ 'shade', 'default' ],
	tables:
		default: [
			'Red',
			'Orange',
			'Yellow'
		],
		shade: [
			'Light',
			'Medium',
			'Dark'
		]
};
const colortable = new RandomTable(table_config);

const result = randomizer.getTableResult(colortable);
/*
 result will equal something like:
 [
 	{ table: 'shade', result: 'Light' },
 	{ table: 'color', result: 'Orange' }
 ]
*/
```

#### selectFromTable (rtable, table)

- @param {Object} rtable the RandomTable object
- @param {String} table table to roll on
- @returns {Array} array of object results { table: table that was rolled on, result: result string, desc: optional description string }

In most cases it is not necessary to call this method directly, getTableResult() should be preferred.
 
This returns the result for a single table in the RandomTable object.

```
const table_config = {
	key: 'colors',
	title: 'Random Color',
	sequence: [ 'shade', 'default' ],
	tables:
		default: [
			'Red',
			'Orange',
			'Yellow'
		],
		shade: [
			'Light',
			'Medium',
			'Dark'
		]
};
const colortable = new RandomTable(table_config);

const result = randomizer.selectFromTable(colortable, 'shade');
/*
 result will equal something like:
 [
 	{ table: 'shade', result: 'Light' },
 ]
*/
```

#### findToken (string, curtable)

- @param {String} string usually a result from a RandomTable
- @param {String} curtable name of the RandomTable the string is from (needed for "this" tokens)
- @returns {String} String with tokens replaced (if applicable)

In most cases it is not necessary to call this method directly, getTableResult() should be preferred.

Takes a result value, finds, and replaces any tokens in it.

#### setTableTitleLookup (lookup)

* @param {Function} lookup a function that takes a table name and returns the table data object
* @return {null} nothing

Use this to set-up a way to retrieve RandomTable objects from a source. Necessary for cross-table tokens.

```
const table_retrieve = function (title) {
	// some method to find the table with the title of the title argument.
	// and set it to the var table
	return table;	
};

randomizer.setTableTitleLookup(table_retrieve);
```

#### getTableByTitle (name)

* @param {String} name table name identifier
* @return {null} nothing, when replaced this function should return a table object

Used to access the function set with setTableTitleLookup(). Mostly used internally.

#### registerTokenType (name, process)

* @param {String} name Name of the token (used as first element of token)
* @param {Function} process Function to return token replacement value function is passed the token_parts (token split by ":"),  original full_token, current table name

Register a custom token type for use in tables.

```
const footoken = function (token_parts, full_token, current_table) {
	return token_parts[1] + ' with big red eyes';	
}

randomizer.registerTokenType('foo', footoken);

// now a table could have a value like: "You see an {{foo:orange}}" and it would return "You see an orange with big red eyes"

```

*More details soon*

### RandomTable

A constructor for generating random table objects that can be used by the randomizer. A great variety of options are available.

*More details soon*

### TableNormalizer

A constructor for parsing different types of content and formatting them for use in the RandomTable's tables property.

*More details soon*

### random_name

An object that can generate names of all sorts both from lists of names and via Markov chains.

*More details soon*

### r_helpers

A few helper functions that get used in the module... Mostly stuff I adapted from underscorejs so I wouldn't have to require their whole library.

## Tests

Tests are written for mocha/chai using the BDD expect style. They are all found in /test and be run with `npm test`

## Contributors

I'd be happy to accept feature requests, bug reports, and pull requests via the github repository. There is an eslint config file for style, which can be run on the code via `npm run eslint:src`

## License

GNU GENERAL PUBLIC LICENSE, Version 3