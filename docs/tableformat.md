# Random Table Import/Export Format

_If you want the easiest way, just read this first section on "Simple Table Creation."_

## RandomTable Properties

These are properties on the RandomTable object. Most are optional.

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
* @property {String[]} [macro] for tables that are only used to aggregate result from other tables, this array consists of table keys to be rolled on in order
* @property {Map[DisplayOptions]} [display_opt] Display options for the subtables.
* @property @deprecated {Object} [print] Backwards compatible. Key => Object data for display options.
* @property {Array} [dependencies] table keys that are needed to get full results from this table

At the most basic level `key`, `title`, and either `table` or `tables.default` need to be set for the RandomTable to be effective. If `table` is set its data will be moved to `tables.default` on initialization.

## Tokens

Any result (with either the simple or advanced format) in a table can use tokens to generate random numbers, results from other tables, name, or other custom results.

### Roll a number

`{{roll:3d6+1}}` in a result will generate a new random number every time that result comes up. The section after the semi-colon should accept any form of `[A Number or Blank]d[Another number][An arithmatic operator: +, -, *, or /][Another number]` such as `{{roll:d6}}` `{{roll:d6*2}}` `{{roll:2d10+10}}`.

### Roll on other tables

`{{table:color}}` in a result will generate a random color. Also available in a more general category are "direction", "ordinal", and "season".

`{{table:TABLE}}` and `{{table:TABLE:SUBTABLE}}` will generate a result on the named table/subtable (using the table key). This is dependent on setting `randomizer.setTableKeyLookup()` to access a data store of RandomTable objects.

To roll on subtables of the current table use `{{table:this:SUBTABLE_NAME}}`

### Generate a Name

`{{name:NAMETYPE:GENDER:STYLE}}` will insert a name into the table. `nametype` is required and should be one of the name lists (flemish, dutch, etc. from random_name.table_data.options) or "random". `gender` is optional and can be male, female, or random. If left blank, only a surname will be generated. `style` is optional and only accepts the value "first", in which case only a first name will be generated.

### Custom token

You can register your own tokens with `randomizer.registerTokenType()`


## Table Data

The `tables` property is an Object with properties for each subtable. All RandomTable objects will at least have a `default` table. Subtable names (i.e. the properties of the `tables` Object) are used for cross-referencing.

I've tried to build in an escalating scale of complexity. Simple tables can be formatted very simply, but complex tables require more complexity to the formatting.

I've tried to build in as much forgiveness as possible into the format.

### Simple unweighted table

A basic list of options with no extra information.

```
tables: {
	default: [
		"Orcs",
		"Kobolds",
		"Goblins"
	]
}
```

### Simple weighted table

```
tables: {
	default: [
		{ "label": "Orcs", "weight": 1 },
		{ "label": "Kobolds", "weight": 2 },
		{ "label": "Goblins", "weight": 6 }
	]
}
```

### Simple table and subtable using tokens

```
tables: {
	default: [
		{ "label": "{{roll:2d6}} Orcs", "weight": 1 },
		{ "label": "{{roll:4d6}} Kobolds", "weight": 2 },
		{ "label": "{{roll:1d4}} {{table:this:giant_types}} Giants", "weight": 6 }
	]
	giant_types: [
		'Cloud',
		'Hill',
		'Stone'
	]
}
```


### Complex Table with Subtables

The `subtable` property in a result can have a number of properties that effect how the result is displayed, weighted, or what further tables are selected from.

* @property {String} _label_ this is the human readable output from the table. If a the result is just a single string then it is assumed that string is the label
* @property {Number} _weight_ a numeric value to weight the result in comparison with the other results
* @property {String} _subtable_ the name of another subtable in the RandomTable object that should be rolled on when this result is retrieved
* @property {String} _description_ an elaboration on the label that can be used when outputting/displaying results
* @property {Boolean} _print_ should this result be included in various result outputs (good for use with the subtable property where you only want the result on the subtable to be displayed/output)

Here's an example using these various properties. The default table is rolled on first (it is weighted so in this case humanoids are most common). The result of the default table decides what subtable should be rolled on next. Some of the subtables then have further subtables to be rolled on (so the "human" subtable will often cause a roll on the "actions_human" subtable).

```
"tables": {
	"default": [
		{ label: "Trap/Trick", "subtable": "trap", "print": false, "weight": 1 },
		{ label: "Building/Lair", "subtable": "lair","print": false, "weight": 2 },
		{ label: "Animal/Monster", "subtable": "monster", "print": false, "weight": 3 },
		{ label: "Human(oid)", "subtable": "human", "print": false, "weight": 6 },
		{ label: "Natural", "subtable": "natural", "print": false, "weight": 2 },
		{ label: "Special", "subtable": "special", "print": false, "weight": 1 }
	],
	"trap": [
		{ label: "Spiderweb", "weight": 2 },
		{ label: "Tripwire", "weight": 2 },
		{ label: "Net trap", "weight": 3 },
		{ label: "Pit trap", "weight": 3 },
		{ label: "Snare", "weight": 3 },
		{ label: "Rocks from above", "weight": 1 }
	],
	"lair": [
		{ label: "Village", "weight": 1 },
		{ label: "Campsite", "weight": 2 },
		{ label: "Ruins", "weight": 1 },
		{ label: "Cave", "weight": 1 },
		{ label: "Tree lair", "weight": 2 },
		{ label: "Nest (ground)", "weight": 2 },
		{ label: "Nest (water)", "weight": 2 },
		{ label: "Altar/shrine", "weight": 1 },
		{ label: "Tower", "weight": 1 }
	],
	"monster": [
		{ label: "Insect swarm", "weight": 2 },
		{ label: "Frogs", "weight": 2 },
		{ label: "Alligators", "weight": 2 },
		{ label: "Giant Grasshoppers", "weight": 1 },
		{ label: "Spiders", "weight": 2 },
		{ label: "Fish", "weight": 2 },
		{ label: "Water Fowl", "weight": 2 },
		{ label: "Monkeys/Sloths", "weight": 1 },
		{ label: "Crabs/Crayfish", "weight": 2 },
		{ label: "Will-o-wisp", "weight": 1 },
		{ label: "Lizardmen/Snakemen", "weight": 1 },
	],
	"human": [
		{ label: "Militia", "weight": 1, "subtable": "human_actions" },
		{ label: "Local Tribespeople", "weight": 1, "subtable": "human_actions" },
		{ label: "Druid", "weight": 1 },
		{ label: "Cultist(s)", "weight": 1 },
		{ label: "Lost Child/Peasant", "weight": 1 },
		{ label: "NPC adventuring party", "weight": 1, "subtable": "human_actions" },
		{ label: "Mage", "weight": 1, "subtable": "human_actions" },
		{ label: "Bandit/Convict", "weight": 1, "subtable": "human_actions" }
	],
	"natural": [
		{ label: "Weather event", "weight": 1, "subtable": "weather_event" },
		{ label: "Fire", "weight": 1 },
		{ label: "Whirlpool", "weight": 1 },
		{ label: "Rapids", "weight": 1 },
		{ label: "Quicksand", "weight": 1 },
		{ label: "Heavy vines/brush", "weight": 1 },
		{ label: "Large Dead Tree", "weight": 1 }
	],
	"special": [
		{ label: "Magic Clearing", "weight": 1 },
		{ label: "Mushroom Circle", "weight": 1 },
		{ label: "Magic Pool", "weight": 1 },
		{ label: "Statue", "weight": 1 },
		{ label: "Grave(s)", "weight": 1 },
		{ label: "[Demon?]", "weight": 1 }
	],
	"human_actions": [
		{ label: "Hunting", "weight": 2 },
		{ label: "Foraging" },
		{ label: "Lost" },
		{ label: "Camping", "weight": 2 },
		{ label: "Searching for someone", "subtable": "human"  },
		{ label: "Searching for something" },
		{ label: "Travelling", "weight": 3 },
		{ label: "Fighting" },
		{ label: "Religious ceremony" },
		{ label: "Dying" },
		{ label: "Dead"  },
	],
	"weather_event": [
		{ label: "Light Fog/mist", "weight": 2 },
		{ label: "Heavy Fog/mist", "weight": 2 },
		{ label: "Light precipitation", "weight": 2 },
		{ label: "Heavy precipitation" },
		{ label: "Light Wind", "weight": 2 },
		{ label: "Heavy Wind" },
		{ label: "Thunder & Lightning" },
		{ label: "Heavy Clouds" },
		{ label: "Sun shower" },
		{ label: "Bright Sun" },
		{ label: "Major Weather event", "description": "Hurricane, tornado, blizzard, flood, etc." }
	]
}
```

### Macro Tables

If you want to generate a result from across a number of tables, you can create a macro table. By setting the `macro` property you can tell the randomizer to get a result from each table in the macro array.

```
{
	"key": "mission_generator",
	"title": "Mission generator",
	"author": "Derik Badman",
	"tags": [
		"mission",
	],
	"macro": [
		"mission_action",
		"mission_patron",
		"mission_antagonist",
		"mission_complication",
		"mission_reward"
	]
}
```

In this case, passing this table to ```randomizer.getTableResult()``` will generate a result array on the able with one element for each of the "mission_*" tables listed in the `macro` property.

```
[
	{ table: 'mission_action', result: 'Object: Person\nAction: Kill'},
	{ table: 'mission_patron', result: 'Guild Leader' },
	{ table: 'mission_antagonist', result: 'Settlement' },
	{ table: 'mission_complication', result: 'Object of mission is dead/destroyed' },
	{ table: 'mission_reward', result: 'Standing with a faction' }
]
```

If the `macro` property is set the `sequence` and `tables` properties will be ignored.
