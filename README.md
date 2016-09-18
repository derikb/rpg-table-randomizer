# rpg-table-randomizer

1. [Synopsis](#synopsis)
1. [Code Example](#code-example)
1. [Motivation](#motivation)
1. [Installation](#installation)
1. [API Reference](#api-reference)
  1. [randomizer](#randomizer)
  1. [RandomTable](#randomtable)
  1. [TableNormalizer](#tablenormalizer)
  1. [npc_generator](#npc_generator)
  1. [random_name](#random_name)
  1. [r_helpers](#r_helpers)
1. [Tests](#tests)
1. [Contributors](#contributors)
1. [License](#license)
  
  

## Synopsis

Module for randomization focused on tables used in roleplaying games.

This is model and logic only there is no ui and only the most limited of view data. No functions are provided for the organization or storage of table data. (I'm working on a webapp that will provide views, ui, and storage.)

## Code Example

A simple example setting up a very basic unweighted table (with no subtables), then "rolling" on it, and also generating a dice roll and two random names:

```
const rpg_table_randomizer = require('rpg-table-randomizer');
const randomizer = rpg_table_randomizer.randomizer;
const RandomTable = rpg_table_randomizer.RandomTable;
const random_name = rpg_table_randomizer.random_name

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

let my_old_character_name = random_name.selectName('dutch', 'male');

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

There are no module requirements for production environment.

### Node

Install the module via npm:

```
$ npm install --save rpg-table-randomizer
```

Require it where you want to use it:

```
const rpgrandomizer = require('rpg-table-randomizer');

```

### Browser

This will theoretically work.

There are two versions of the module packaged for browsers and each is also available in minified form:
* `dist/rpg-table-randomizer.js` and `dist/rpg-table-randomizer.min.js` offers the full module
* `dist/rpg-table-randomizer_noname.js` and `dist/rpg-table-randomizer_noname.min.js` offers the module without the random name data. This makes the file more than half as small, but if you want to use the random name generator you need to add name data using `random_name.registerNameType()`

#### Bower

```
$ bower install rpg-table-randomizer --save
```

#### Manually

Download the latest release from github. Load the `dist/rpg-table-randomizer.min.js` file in your html. For debugging purposes there is the source map file or the unminified version, all in the `dist/` directory.


## API Reference

The module exposes a few objects and constructors.

### randomizer

This object is used for generating random results from tables. It can also provide random dice rolls.

#### roll (string)

* @params {String} string a die roll notation
* @returns {Number} the result of the roll

For random dice rolling operations. It should accept any form of `[A Number or Blank]d[Another number][An arithmatic operator: +, -, *, or /][Another number]`

```
randomizer.roll('d6'); // returns an integer between 1 and 6
randomizer.roll('d6/3'); // returns an integer between 1 and 3
randomizer.roll('d6*2'); // returns an integer between 2 and 12
randomizer.roll('d4+1'); // returns an integer between 2 and 5
randomizer.roll('d4-1'); // returns an integer between 0 and 3
randomizer.roll('2d8'); // returns an integer between 2 and 16
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

#### setTableKeyLookup (lookup)

* @param {Function} _lookup_ a function that takes a table key and returns the table data object
* @return {null} nothing

Use this to set-up a way to retrieve RandomTable objects from a source. Necessary for cross-table tokens.

```
const table_retrieve = function (key) {
	// some method to find the table with the key of the key argument.
	// and set it to the var table
	return table;	
};

randomizer.setTableKeyLookup(table_retrieve);
```

#### getTableByKey (key)

* @param {String} key table key identifier
* @return {null} nothing, when replaced this function should return a table object

Used to access the function set with setTableKeyLookup(). Mostly used internally.

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

#### convertToken (string, curtable)

- @param {String} token A value passed from findToken containing a token(s) {{SOME OPERATION}} Tokens are {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{roll:1d6+2}} (etc) (i.e. {{table:colonial_occupations:laborer}} {{table:color}} also generate names with {{name:flemish}} (surname only) {{name:flemish:male}} {{name:dutch:female}} (This will also work without the enclosing braces.)
- @param {String} curtable key of the RandomTable the string is from (needed for "this" tokens)
- @returns {String} The value with the token(s) replaced by the operation or else just the token (in case it was a mistake or at least to make the error clearer)

Take a token and perform token replacement, returning the result as a string.


#### findToken (string, curtable)

- @param {String} string usually a result from a RandomTable
- @param {String} curtable name of the RandomTable the string is from (needed for "this" tokens)
- @returns {String} String with tokens replaced (if applicable)

In most cases it is not necessary to call this method directly, getTableResult() should be preferred.

Takes a result value, finds, and replaces any tokens in it.


### RandomTable

A constructor for generating random table objects that can be used by the randomizer. A great variety of options are available.

#### RandomTable (config)

* @property {String} id id for the table, primary key for database if used
* @property {String} key identifier for the table, used in table token lookups
* @property {String} title title of the table
* @property {String} [author] author of the table
* @property {String} [description] description of the table
* @property {String} [source] source of the table (as in the citation)
* @property {Array} [tags] subject tags
* @property {String|Array} [sequence] tables to roll on. if array it can be an array of strings (table names) or objects (two properties table: the table to roll on and times: the number of times to roll)
* @property {Array} [table] default table. array of strings or objects. removed after initialization and put in tables.default
* @property {Object} [tables] a property for each subtables. if sequence property is not set then the first property of this Object is used to start rolling
* @property {Object} [print] objects to describe what parts of a (sub)table should be displayed in the results
* @property {Object} [print.default] how to display the default table's results
* @property {Object} [print.default.hide_table] set to 1 will not show the table name
* @property {Object} [print.default.hide_result] set to 1 will not show the result on that (sub)table
* @property {Object} [print.default.hide_desc] set to 1 will not show any description for a result on that (sub)table
* @property {Array} [result] current result array of objects (don't set this on constructor, but you can access it later)

Constructs a new RandomTable object or instantiates and existing one from some data source.

For formatting the tables property see the [tableformat.md](tableformat.md) document.

#### validate (attributes)

* @param {Object} properties new attributes to save
* @returns {Boolean|Object} error information

In process attempt to validate data to make sure it is formatted right and contains the required properties...

#### niceString ()

* @param {Boolean} [simple=false] if true only output the first result label
* @returns {String} the results

Write out the results as a string, draws from the optional _print_ property.

Probably better off writing your own template to process the _results_ array.

#### outputObject (editmode)

* @param {Boolean} [editmode=false] if false empty properties will be stripped out
* @returns {Object} table properties

Outputs the json data for the table (import/export).

#### outputCode (editmode, compress)

* @param {Boolean} [editmode=false] if false empty properties will be stripped out
* @param {Boolean} [compress=false] if true JSON will not have indentation, etc.
* @returns {String} table properties in JSON

Outputs the json data for the table (import/export).

#### findObject (label, table)

* @param {String} label The item we are looking for
* @param {String} [table=default] the table to search
* @returns {Object} the object associated with the label or an empty one

Get an object result in case we only have the label and need other data from it.

#### findResultElem (table)

* @param {String} table The table to look for
* @returns {Object} result element for specified table (or empty)

Find the result element for a specific table/subtable. Only works if we have already generated a result.

### TableNormalizer

A constructor for parsing different types of content and formatting them for use in the RandomTable's tables property.

This is still in progress to a certain extent as I try to figure out easy ways for people to make RandomTable data from existing formats (like html, text lists, etc.).

#### TableNormalizer (data)

* @param {String|Object|Array} _data_ data to normalize

Constructor for the normalizer.

#### setData (data)

* @param {String|Object|Array} _data_ data to normalize

An alternate way to set the data to normalize.

#### checkType ()

* @return {String} data_type

Returns the type of data set via the constructor or setData()

#### normalizeData ()

* @return {Array|Object} normalized data for use in a RandomTable object

Tries to normalize the data for RandomTable usage... Probably the thing that will need the most tweaking over time.


### npc_generator

An object containing functions for the creation of Non-player characters based on custom schemas.

#### registerSchema (schema)

* @param {Object} schema NPC schema object to base on the constructor

This function takes the passed in `schema` (see [npcschema.md](npcschema.md) for the schema format) and makes a new constructor on the `npc_generator.NPC` object under the property `schema.key`.

#### NPC

An object whose properties are constructors for generating NPC objects.

##### NPC.Base

The prototype for all NPC objects/constructors. By itself does very little, but by updating its `prototype` you can add functionality to all NPC objects.

```
const lotfp = {
	key: 'lotfp',
	title: 'Lamentations of the Flame Princess NPC',
	fields: [
		{ key: 'personality', type: 'array', source: 'table:personality_traits', count: 2 },
		{ key: 'goals', type: 'string', source: 'table:npc_goals' },
		{ key: 'reaction', type: 'number', source: 'roll:2d6' },
		{ key: 'notes', type: 'text' },
		{ key: 'con', type: 'number', source: 'roll:3d6' },
		{ key: 'level', type: 'number', source: 'roll:1d3' },
	]
};

npc_generator.registerSchema(lotfp);

const npc = new NPC.lotfp(); // a new NPC object using the lotfp schema
npc.initialize(); // npc now has default values randomly set for its fields
```



### random_name

An object that can generate names of all sorts both from lists of names and via Markov chains.

#### generateList (number, name_type, create)

* @param {Number} _[number=10]_ number of names in the list (half will be male, half will be female)
* @param {String} _[name_type]_ type of name or else it will randomly select
* @param {Bool} _[create=false]_ new names or just pick from list
* @return {Object} arrays of names inside male/female property

This will give you a list of number/2 male names and number/2 female names. _name_type_ can be any of the keys in random_name.name_date.options If _create_ is set to true, a Markov chain will be used to create names based on the dataset (i.e. they should sound/look like the names in the list but (in most cases) be new/different).

```
const names = random_name.generateList('flemish', 6, true);
/*
	{
		male: [
			'Guntheodi Goossens',
			'Simon Van Rompuy',
			'Franco Vroomen'
		],
		female: [
			'Sita Vroom',
			'Iudith Vroom',
			'Enna Vermeulen'
		]
	}
*/
```

#### selectName (name_type, gender, style)

* @param {String} _[name_type=random]_ What name list/process to use
* @param {String} _[gender=random]_ male, female, random, ''
* @param {String} _[style]_ first=first name only, else full name
* @returns {String} a name

Returns a single name from one of the name lists.

```
const name = random_name.selectName('flemish', 'female'); // Benedicta Ambroos
const name2 = random_name.selectName('cornish', 'male'); // Carasek Godden

```
 
#### selectSurname (name_type)

* @param {String} _[name_type=random]_ what list/process to use
* @returns {String} a name

Just returns a surname from one of the lists.

#### createName (name_type, gender, surname)

* @param {String} _[name_type=random]_ what list/process to use
* @param {String} _[gender=random]_ male or female or randomly selected
* @param {String} _[style]_ first=first name only, else full name
* @returns {String} a name

Uses a Markov chain to generate a name in the style of the given name type/list.

Note: because of the way the generator works it will occasionally (or often depending on the data list) return names that are on the list already.

```
const name = random_name.createName('turkish', 'female'); // Merya
const name2 = random_name.createName('japanese', 'male'); // Hinobu

```

#### capitalizeName (name)

* @param {String} _name_ a name
* @return {String} name capitalized

This just capitalizes the first letter of any word in the given name. Used internally when creating names.

#### holmesname ()

* @returns {String} name

Returns a name adapted from the <a href="http://zenopusarchives.blogspot.com/2013/07/random-names-one-sheet.html">Zenopus Archives' Holmesian Name Generator</a>.

#### demonname ()

* @returns {String} name

Returns a demon name adapted from Jeff Rients, based on Goetia, as implemented here: <a href="http://www.random-generator.com/index.php?title=Goetic_Demon_Names">Goetic Demon Names</a>.

#### registerNameType (name_type, data, label)

* @param {String} name_type the shortname for the type
* @param {Object} data names
* @param {Array} data.male male names
* @param {Array} data.female female names
* @param {Array} data.surnames surnames
* @param {String} [label] descriptive name of type (defaults to just the name_type)
* @return {Boolean} success or failure

Add name data to the generator.

Note: you can overwrite existing name_types if you use an existing _name_type_

```
const new_names = {
	male: [
		'Urk',
		'Thruk',
		'Fang'
	],
	female: [
		'Sar',
		'Shelee',
		'Dove'
	],
	surnames: [
		'Tnk',
		'Oooo'
	]
}

random_name.registerNameType('caveman', new_names, 'Cave-Man');

random_name.selectName('caveman', 'female'); // Shelee Tnk

```

### r_helpers

A few helper functions that get used in the module... Mostly stuff I adapted from underscorejs so I wouldn't have to require their whole library.

I'm not going to document these now, but the methods are:
- isEmpty
- isString
- isObject
- isUndefined
- capitalize


## Tests

Tests are written for mocha/chai using the BDD expect style. They are all found in /test and be run with `npm test`

## Contributors

I'd be happy to accept feature requests, bug reports, and pull requests via the github repository. There is an eslint config file for style, which can be run on the code via `npm run eslint:src`

## License

GNU GENERAL PUBLIC LICENSE, Version 3