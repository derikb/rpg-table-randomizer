# rpg-table-randomizer

1. [Synopsis](#synopsis)
1. [Code Example](#code-example)
1. [Motivation](#motivation)
1. [Installation](#installation)
1. [API Reference](#api-reference)
  1. [randomizer](#randomizer)
  2. [dice_roller](#dice_roller)
  3. [TableRoller](#TableRoller)
  4. [RandomTable](#RandomTable)
  5. [RandomTableEntry](#RandomTableEntry)
  6. [RandomTableResult](#RandomTableResult)
  7. [RandomTableResultSet](#RandomTableResultSet)
  8. [TableNormalizer](#tablenormalizer)
  9. [NPCSchema](#npcschema)
  10. [NPCSchemaField](#npcschemafield)
  11. [npc_generator](#npc_generator)
  12. [NPC](#npc)
  13. [RandomName](#RandomName)
  14. [r_helpers](#r_helpers)
2. [Contributors](#contributors)
3. [License](#license)



## Synopsis

Modules for randomization focused on tables used in roleplaying games.

These are models and logic only, there is no ui and only the most limited of view data. No functions are provided for the organization or storage of table data.

**If you were using pre-v1 release see the upgrading notes at the bottom of this file.**

## Code Example

A simple example setting up a very basic unweighted table (with no subtables), then "rolling" on it, and also generating a dice roll and two random names:

```
import TableRoller from '../src/TableRoller.js';
import RandomTable from '../src/RandomTable.js';

// Object to hold tables.
const testTables = {};

// Instantiate a table roller
const tableRoller = new TableRoller({});
// Set a really basic table lookup
// just looks for the key in the testTables Object.
tableRoller.setTableKeyLookup(function(key) {
	return testTables[key] || null;
});

// Really basic random table
const colortable = new RandomTable({
	key: 'colors',
	title: 'Random Color',
	table: [
		'Red',
		'Orange',
		'Yellow',
	]
});
// Add it to the tables object.
testTables[colortable.key] = colortable;

// Return random result set from the colors table.
const colorResult = tableRoller.getTableResultSetByKey('colors');
console.log(colorResult); // full result set
console.log(colorResult.niceString()); // In this case it would just be a color.

// Random roll
console.log(tableRoller.roll('2d4+1'));
```

Example using the name generator.

```
import RandomNameGenerator from '../src/RandomNameGenerator.js';
import RandomNameType from '../src/RandomNameType.js';
import names from '../sample/names.js';

// Format name data
const nameTypes = [];
names.forEach((data) => {
    nameTypes.push(new RandomNameType(data));
});
// Create a default name generator.
const defaultNameGenerator = new RandomNameGenerator({ namedata: nameTypes });

// List of 4 names of the Flemish type.
console.log(defaultNameGenerator.generateList(4, 'flemish'));
// Get a single French name from the female name list.
console.log(defaultNameGenerator.createName('french', 'female'));

```

Example of just the dice roller:

```
import { rollDie, getDiceResult } from '../src/dice_roller.js';

// just the number
console.log(rollDie('2d6+3));
// get a DiceResult object with the value and the die rolled
const result = getDiceResult('1d6');
console.log(result.value); // some number between 1 and 6
console.log(result.die); // '1d6'

```

Add the name token to a table roller:

```
import TableRoller from './TableRoller.js';
import RandomNameGenerator from './RandomNameGenerator.js';
import names from '../sample/names.js';

// Instantiate the TableRoller
const tableRoller = new TableRoller({});

// Format name data
const nameTypes = [];
names.forEach((data) => {
    nameTypes.push(new RandomNameType(data));
});
// Create a default name generator.
const defaultNameGenerator = new RandomNameGenerator({ namedata: nameTypes });
// Assign it to the name token of the table roller.
// Bind it to the name generator (else it won't work)
tableRoller.registerTokenType('name', defaultNameGenerator.nameTokenCallback.bind(defaultNameGenerator));

```

Other more complicated (and useful) operations are possible. See below.

## Motivation

I wrote this as a backend for an app that would enable the storage, sharing, and use of random tables in a webapp that would be easy to use at the table while game mastering. I wanted a way to consolidate various random tables that I'd use more often if I didn't have to dig around to fine them.

I also really like have a quick way to get a bunch of names.

## Installation

You should be able to use it in any modern browser or server side via node.

Install the module via npm:

```
$ npm install --save rpg-table-randomizer
```

The `src/index.js` will export a basic tableRoller and a default name generation setup as well as most of the classes/methods. Otherwise you'd probably want to figure out what parts you need and then run it through a js bundler.

Because of the included uuid library, you will need to run the library through a bundler of some kind if you are using the NPC class.


## Sample Data

The `sample` directory includes a few example data sources. A simple way to handle data is to create objects and then export them as a module. That way the data could also be bundled up with your js code. For more complicated or dynamic data you'd want to load it from a server or some other storage.

## API Reference

The module includes a number of classes and functions. In general files with CamelCasing are exporting a single class, while those with snake_case are exporting one or more functions.

### randomizer

Utility classes for random selection/generation. Mostly used internally by the other classes.

#### randomInteger (min, max)

* @param {Number} [min=0] mininum value
* @param {Number} [max=null] maximum value
* @returns {Number} random value


#### getWeightedRandom (values, weights)

- @param {Array} _values_ array of values to randomly select from
- @param {Array} _weights_ array of weighted numbers to correspond to the values array
- @return {String|Number|Object} a randomly selected element from the values array

Returns a randomly selected element from the values array, where the randomization is weighted based on the weights array.

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
getWeightedRandom(values, weights); // returns a reaction from the value array

```

#### randomString (data)

- @param {String[]} _data_ Array of strings to select from.
- @returns {String} the randomly selected string

Takes an array of strings and returns one of the strings randomly.

```
const data = [
	"Hostile",
	"Unfriendly",
	"Indifferent",
	"Talkative",
	"Helpful"
];
randomString(data); // returns one of the reactions

```

### dice_roller

Some simple dice like randomization functions.

#### rollDie (string)

* @params {String} string a die roll notation
* @returns {Number} the result of the roll

For random dice rolling operations. It should accept any form of `[A Number or Blank]d[Another number][An arithmatic operator: +, -, *, or /][Another number]`

```
rollDie('d6'); // returns an integer between 1 and 6
rollDie('d6/3'); // returns an integer between 1 and 3
rollDie('d6*2'); // returns an integer between 2 and 12
rollDie('d4+1'); // returns an integer between 2 and 5
rollDie('d4-1'); // returns an integer between 0 and 3
rollDie('2d8'); // returns an integer between 2 and 16
```

#### getDiceResult (string)

* @param {String} die Die roll notation.
* @returns {DiceResult}

Get a DiceResult object.


#### DiceResult

* @prop {String} die Die notation.
* @prop {Number} value Random roll for the die notation.


### TableRoller

A class used for generating random results from RandomTable objects. Also handling for tokens in the results.

#### getTableResultSetByKey (tableKey, table)

- @param {String} _tableKey_ Key of RandomTable to use.
- @param {String} _[table='']_ (sub)table to roll on
- @return {RandomTableResultSet}

This is one of two primary ways to generate results from the RandomTable objects (see also getResultSetForTable). This one takes a table key, looks up the table and then returns a result set.


#### getResultSetForTable (rtable, table)

- @param {RandomTable} _rtable_
- @param {String} _[table='']_ (sub)table to roll on
- @return {RandomTableResultSet}

This is one of two primary ways to generate results from the RandomTable objects. This one accepts a RandomTable and then returns a result set.


#### getTableResult (rtable, start)

- @param {RandomTable} _table_
- @param {String} _[start='']_ subtable to roll on
- @return {RandomTableResult[]}

Takes a RandomTable object and returns an array of results. If RandomTable.sequence is set, multiple results may be returned. Optionally a specific subtable can be selected to select from.

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

const result = tableRoller.getTableResult(colortable);
/*
 The return will be a RandomTableResult from the default table and a RandomTableResult from the shade table.
*/
```

#### setTableKeyLookup (lookup)

* @param {Function} _lookup_ a function that takes a table key and returns a RandomTable instance or null

Use this to set-up a way to retrieve RandomTable objects from a source. Necessary for cross-table tokens.

```
const table_retrieve = function (key) {
	// some method to find the table with the key of the key argument.
	// and set it to the var table
	return table;
};

tableRoller.setTableKeyLookup(table_retrieve);
```

#### getTableByKey (key)

* @param {String} key table key identifier
* @return {RandomTable}
* @throws {TableError}

Used to access the function set with setTableKeyLookup(). Mostly used internally.

Will throw TableError if key is empty or a RandomTable object is not found.

#### registerTokenType (name, process)

* @param {String} name Name of the token (used as first element of token)
* @param {Function} process Function to return token replacement value function is passed the token_parts (token split by ":"),  original full_token, current table

Register a custom token type for use in tables.

```
/**
 * @param {Array} token_parts Parts of token when brackets are removed and it is then split by the colon
 * @param {String} full_token Full original token. If the token fails generally just return the full_token back.
 * @param {RandomTable|null} current_table The table the currently processed entry/token came from (or null).
 * @returns {Any} Always return something that has a toString() method.
 */
const footoken = function (token_parts, full_token, current_table) {
	return token_parts[1] + ' with big red eyes';
}

tableRoller.registerTokenType('foo', footoken);

// now a table could have a value like: "You see an {{foo:orange}}" and it would return "You see an orange with big red eyes"

```

#### convertToken (string, curtable)

- @param {String} token A value passed from findToken containing a token(s) {{SOME OPERATION}} Tokens are {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{roll:1d6+2}} (etc) (i.e. {{table:colonial_occupations:laborer}} {{table:color}} also generate names with {{name:flemish}} (surname only) {{name:flemish:male}} {{name:dutch:female}} (This will also work without the enclosing braces.)
- @param {RandomTable|null} curtable RandomTable the string is from (needed for "this" tokens) or null
- @returns {RandomTableResultSet|RandomTableResultSet[]|DiceResult|String|Any} The result of the token or else just the token (in case it was a mistake or at least to make the error clearer)

Take a token and perform token replacement, returning the result as a string or the raw value.


#### findToken (entryLabel, curtable)

- @param {String} entryLabel Usually a Label from a RandomTableEntry
- @param {RandomTable|null} curtable RandomTable the string is from (needed for "this" tokens) or null
- @returns {String} String with tokens replaced (if applicable)

In most cases it is not necessary to call this method directly, getTableResult() should be preferred.

Takes a result value, finds, and replaces any tokens in it.

Unlike convertToken this will find multiple tokens in a string and will always return the original entryLabel with tokens replaced by strings (or the original token if an error occurs).


### RandomTable

A class for random table objects that can be used by the tableRoller. A great variety of options are available.

#### constructor (config)

* @property {String} id id for the table, primary key for database if used
* @property {String} key identifier for the table
* @property {String} [title] title of the table
* @property {String} [author] author of the table
* @property {String} [description] description of the table
* @property {String} [source] source of the table
* @property {String[]} [tags] subject tags
* @property {String[]} [sequence] tables to roll on as default.
* @property {String[]|Object[]} [table] default table. array of strings or objects. removed after initialization.
* @property {Object} [tables] a property for each subtables.
* @property {RandomTableEntries[]} tables[subtablename] Entries for subtables.
* @property {String[]} [macro] for tables that are only used to aggregate result from other tables, this array consists of table keys (and optional subtables) to be rolled on in order
* @property {Map[DisplayOptions]} [display_opt] Display options for the subtables.
* @property {Array} [dependencies] table keys that are needed to get full results from this table

Constructs a new RandomTable object or instantiates and existing one from some data source.

For formatting the tables property see the [tableformat.md](/docs/tableformat.md) document.

#### validate (attributes)

* @param {Object} properties new attributes to save
* @returns {Boolean|Object} error information

In process attempt to validate data to make sure it is formatted right and contains the required properties...

#### subtableNames

* @returns {String[]}

Return all subtable names.

#### getSubtableEntries (name)

* @returns {RandomTableEntry[]}

Return entries for a subtable

#### findEntry (label, table)

* @param {String} label The item we are looking for
* @param {String} [table=default] the table to search
* @returns {RandomTableEntry|null} Entry associated with the label or null.

Get an entry in case we only have the label and need other data from it.

Warning: if your label had tokens you need to base on the original token, not a replaced version.

#### findDependencies

* @returns {Array} array of table keys that the current table calls on (via tokens)

This method returns an array of table keys that the current table refers to in `{{table:SOMETABLE}}` tokens. Can be useful for making sure you have all the tables necessary to return full results from the current table. This will also look in the macros property.


### DisplayOptions

Display settings for subtables. Found in the Map RandomTable.display_opt or RandomTableResultSet.displayOptions

#### constructor (config)

* @property {String} table Subtable name.
* @property {Boolean} hide_table Hide the subtable name.
* @property {Boolean} hide_result Hide the result.
* @property {Boolean} hide_desc Hide the description field.

The three hide props will accept 0/1 in the constructor, but will convert to Boolean for the properties.



### RandomTableEntry

Entries for a RandomTable's (sub)tables.

#### constructor (config)

* @property {String} label Basic string label. Only required field. Can include tokens.
* @property {Boolean} [print=true] Should the result be included in the output.
* @property {String} [description] Extra description for the label.
* @property {String[]} [subtable] Other tables to roll on.
* @proparty {Number} [weight=1] Number to weight entry relative to other entries.

### RandomTableResult

A class for a result from a table.

When cast to string it will just output the result prop.

#### constructor (config)

* @property {String} table Subtable name (can be default or Error).
* @property {String} result Individual result label.
* @property {String} [desc] Extra description of result


#### isDefault

If it's the default (sub)table.

#### isError

If it's an error result, this will be an instance of the TableErrorResult class (which is otherwise identical to the parent class).

### RandomTableResultSet

A class for a set of results from a table.

Cast to a string will return niceString method.

#### constructor (config)

* @property {String} title Title of the RandomTable.
* @property {RandomTableResult[]} results Individual table results.
* @property {Map[DisplayOptions]} displayOptions This is the display_opt prop of RandomTable

#### addResult (data)

* @param {RandomTableResult|Object} data Either a result or the data to create one.

#### findResultByTable (table)

* @param {String} [table=default] A subtable name.
* @returns {RandomTableResult|null}

This gets the result for a specific subtable.

#### niceString ()

* @param {Boolean} [simple=false] if true only output the first result label
* @returns {String} the results

Write out the results as a string, draws from displayOptions property.

Probably better off writing your own template to process the _results_ array.



### TableNormalizer

Exported from table_normalizer.js

This is still in progress to a certain extent as I try to figure out easy ways for people to make RandomTable data from existing formats (like html, text lists, etc.).

#### normalizeData (data)

* @param {String|Object|Array} _data_ data to normalize
* @return {Array|Object} normalized data for use in a RandomTable object

Tries to normalize the data for RandomTable usage... Probably the thing that will need the most tweaking over time.


### NPCSchema

* @param {String} key Identifying key
* @param {String} name Name of schema.
* @param {Map<String, NPCSchemaField>} fields Data fields will be converted to NPCSchemaField if necessary

#### getFieldByKey (key)

* @param {String} key Identifying key
* @returns {NPCSchemaField|undefined}

#### getFieldLabelByKey (key)

* @param {String} key Identifying key
* @returns {String}

### NPCSchemaField

* @param {String} key Identifying key
* @param {String} type Type of data in field. Valid: string, text, array, number, modifier
* @param {String} source Source of data for TableRoller in the form of a token (see TableRoller, ex: "name:french", "table:color", etc.)
* @param {Number} count Number of entries for array types.
* @param {Array|String|Number} starting_value An optional starting value.


### npc_generator

Exported from npc_generator.js
An object containing functions for the creation of Non-player characters based on custom schemas.

#### registerSchema (NPCSchema)

* @param {NPCSchema} schema NPC schema instance

This function takes the passed in `NPCSchema` and adds it by key to the available schemas memory store.

#### getAllSchemas ()

* @returns {NPCSchema[]}

#### getSchemaByKey (key)

* @param {String} key Schema key.
* @returns {NPCSchema|null}

#### initializeNewNPC (schemaKey, TableRoller, generateId)

* @param {String} schemaKey Key for an NPCSchema
* @param {TableRoller} tableRoller
* @param {Boolean} [generateId=true] If true NPC will have a uuid assigned to its id property.
* @returns NPC

### NPC

An NPC class.

* @param {String} id Some kind of indentifier.
* @param {String} schema Key for a NPCSchema used for this NPC.
* @param {Map<String, Any>} fields Field values indexed by NPCSchemaField key.

Fields map can include RandomTableResultSet or DiceResult or just a string, depending on the source of the field.

Sample of making an NPC.

```
const ddSchema = new NPCSchema({
	key: 'dd',
	title: 'Basic D&D NPC',
	fields: [
		{ key: 'personality', type: 'array', source: 'table:personality_traits', count: 2 },
		{ key: 'goals', type: 'string', source: 'table:npc_goals' },
		{ key: 'reaction', type: 'number', source: 'roll:2d6' },
		{ key: 'notes', type: 'text' },
		{ key: 'con', type: 'number', source: 'roll:3d6' }
	]
};

npc_generator.registerSchema(ddSchema);

const npc = npc_generator.initializeNewNPC('dd', tableRoller); // a new NPC object using the dd schema, with its fields set to random values.
```

### RandomNameType

Class exports from RandomNameType.js

#### constructor (object)

* @param {String} key Key to identify uniquely in tokens and methods.
* @param {label} label Human readable label.
* @param {String[]} male Names.
* @param {String[]} female Names.
* @param {String[]} surname Names.

##### getAllPersonalNames ()

* @returns {String[]}

Return all the male and female names.

##### getPersonalNameList (gender)

* @param {String} gender Mixed, random, male, female
* @returns {String[]}

Return personal name list from type.
- `mixed` returns male and female name.
- `male` or `female` returns the specified one
- `random` return either the male or female list, but will only return an empty list if both are empty (i.e. if there is just a female list it won't randomly return the empty male list)

### RandomNameGenerator

Class exports from RandomNameGenerator.js


#### constructor (object)

* @param {RandomNameType[]} namedata
* @param {Number} [markovOrder=3] Markov generator settings.

Methods that can generate names of all sorts both from lists of names and via Markov chains.

In general:

- `name_type` can be set to any type set in your namedata (the default data includes types such as "flemish" or "japanese") as well as "random" (it will randomize from the available options) and "mixed" (this is like random but it will randomize separately for both personal and sur names).
- `gender` can be set to "male", "female", "random", or "mixed".
  - @todo I should handle non-binary names somehow, shouldn't I? One way is to create names and use the "mixed" option as that will generate a new name based on both the male and female names. Also setting the gender to random will randomize which list is selected from when not creating names.


#### getValidNameTypes ()

* @returns {String[]}

Get all name type keys registered for this generator.

#### generateList (number, name_type, create)

* @param {Number} _[number=10]_ number of names in the list (half will be male, half will be female)
* @param {String} _[name_type]_ type of name or else it will randomly select
* @param {Bool} _[create=false]_ new names or just pick from list
* @return {Object} arrays of names inside male/female property
* @throws {RandomNameError}

This will give you a list of number/2 male names and number/2 female names. _name_type_ can be any of the keys from RandomNameGenerator::getValidNameTypes. If _create_ is set to true, a Markov chain will be used to create names based on the dataset (i.e. they should sound/look like the names in the list but (in most cases) be new/different).

```
const names = randomNameGenerator.generateList('flemish', 6, true);
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

#### selectPersonalName (name_type, gender)

* @param {String} [name_type=random]
* @param {String} [gender=random]
* @returns {String}
* @throws {RandomNameError}

Select a personal name from one of the lists.

#### selectSurname (name_type)

* @param {String} [name_type=random]
* @returns {String}
* @throws {RandomNameError}

Select a surname from one of the lists.

#### selectName (name_type, gender, style)

* @param {String} _[name_type=random]_ What name list/process to use
* @param {String} _[gender=random]_ male, female, random, ''
* @param {String} _[style]_ first=first name only, else full name
* @returns {String} a name
* @throws {RandomNameError}

Returns a single name from one of the name lists.

```
const name = randomNameGenerator.selectName('flemish', 'female'); // Benedicta Ambroos
const name2 = randomNameGenerator.selectName('cornish', 'male'); // Carasek Godden

```

#### createPersonalName (name_type, gender)

* @param {String} [name_type=random]
* @param {String} [gender=random]
* @returns {String}
* @throws {RandomNameError}

Create a personal name using markov chains.

#### createSurname (name_type)

* @param {String} [name_type=random]
* @returns {String}
* @throws {RandomNameError}

Create a sur/last name using markov chains.

#### createName (name_type, gender, surname)

* @param {String} _[name_type=random]_ what list/process to use
* @param {String} _[gender=random]_ male or female or randomly selected
* @param {String} _[style]_ first=first name only, else full name
* @returns {String} a name
* @throws {RandomNameError}

Uses a Markov chain to generate a name in the style of the given name type/list.

Note: because of the way the generator works it will occasionally (or often depending on the data list) return names that are on the list already.

```
const name = randomNameGenerator.createName('turkish', 'female'); // Merya
const name2 = randomNameGenerator.createName('japanese', 'male'); // Hinobu

```

#### registerNameType (RandomNameType)

* @param {RandomNameType} type
* @throws {RandomNameError}

Add name data to the generator.

Note: you can overwrite existing name_types if you use an existing type key.

```
const newNames = new RandomNameType(
	key: 'new_names',
	label: 'Cave Names',
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
});

randomNameGenerator.registerNameType(newNames);

randomNameGenerator.selectName('new_names', 'female'); // Shelee Tnk

```

#### nameTokenCallback

This function can be use in a TableRoller to setup the "name" token.

```
const tableRoller = new TableRoller();
// Make sure the callback is bound to the generator.
tableRoller.registerTokenType('name', randomNameGenerator.nameTokenCallback.bind(randomNameGenerator));
```

### r_helpers

A few helper functions that get used in the module... Mostly stuff I adapted from underscorejs so I wouldn't have to require their whole library.

I'm not going to document these now, but the methods are:
- isEmpty
- isString
- isObject
- isUndefined
- capitalize
- defaultToJSON
  - This is a custom toJSON function for classes that handles Maps and converts them to objects.


## Upgrading to v1

There are a number of breaking changes in the v1 release. I think/hope these changes make things a little more consistent and versatile.

Here are at least some of the changes to note:

- More classes added and all existing classes have been moved to their own file/export (they are all in CamelCase).
- Dice functions have been revamped and moved to their own export (dice_roller.js) (The old roll method on the randomizer has been removed.)
- The random name generator is now a class (RandomNameGenerator) and no longer requires the old randomizer class. (This way you could have different name generators and give them different tokens for use in a TableRoller.)
- Name data is now used via the RandomNameType class. See index.js for how that works.
- The old Randomizer class is now TableRoller class. A number of lower level methods have been moved out of that class (to the randomizer.js file).
- The basic format for random table data should not have changed.
- NPCs will now generate their own UUID.
- A number of Error classes have been added, most of the time they will be thrown and caught internally (generator a TableErrorResult), but note there are places where a method may throw something specific (the docblocks should specify this).


## Contributors

I'd be happy to accept feature requests, bug reports, and pull requests via the github repository. There is an eslint config file for style, and tests (via mocha) are in the test directory.

The npm script `buildTest` will build a default export in `./testPage/index.js` that can be used in the testPage to confirm some functionality.

## License

GNU GENERAL PUBLIC LICENSE, Version 3
