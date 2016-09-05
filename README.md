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

let roll = randomizer.parseDiceNotation('2d4+1');

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