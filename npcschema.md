# NPC Schema

This document describes the format used for NPC Schemas. An NPC Schema provides a listing of fields and associated data for generating Non-Player Characters randomly, manually, or some combination of the two. Each field can have an associated data type and default source for that data, used to randomly generate a value for the field.

## Schema {Object}

The schema is a javascript object that can also be stored as JSON (for this reason functions are described in an unusual way in the schema, take note!)

### key {String}

The short title of the schema. It is used as a property on npc_generator.NPC so it should be a valid javascript property name. Avoid spaces, operators, quotes, etc. Best to stick to letters, numbers, and underscores.

### title {String}

Longer descriptive title of the schema.

### author {String}

Who wrote the schema.

### fields {Array}

An array of field objects. Note: The order of the fields can be important if some of your fields are based or adjusted by other fields. So, if you have a hit points field that is adjust by the constitution field, it is important that constitution is before hit points in the `fields` array.

#### field {Object}

* @property {String} _key_ the name for the field, avoid operators and quotes.
* @property {String} _type_ the data type of the string, either: string, number, array, or function
* @property {String} _source_ a source for generator the fields value, see below...
* @property {Number} _count_ for array types, this indicated how many elements should be generated in the array from the source

Sample fields objects:
```
{ key: 'name', type: 'string', source: 'name:flemish:random' },
{ key: 'occupation', type: 'string', source: 'table:colonial_occupations' },
{ key: 'appearance', type: 'array', source: 'table:colonial_appearance', count: 2 },
{ key: 'notes', type: 'text' },
{ key: 'con', type: 'number', source: 'roll:3d6' },
{ key: 'hp', type: 'function', source: 'return `roll:${this.fields.level}d6${this.helpers.attribute_mod(this.fields.con)}`;' }
```

The `source` property works similar to the tokens in the RandomTable objects. It can call on random die rolls, random results from RandomTable objects, other fields' values, or some combination of them.

```
// Examples of valid simple sources:

'roll:3d6'
'table:personality_traits' // assumes there is a personality_traits table
```

To generate a function type field the `source` property should contain the body of a function with no arguments. The function will be called with the scope of `this` set to the NPC object itself. In this way `this.fields.constitution`, for example, would refer to the current value of the constitution field of the NPC object. The returned value of the function will be evaluated as a potential token. This is also a place where the `helpers` functions (see below) will become useful and can be referenced as `this.helpers.HELPERNAME()` 

```
// this function will return a token (that will then be evaluated/rolled) in the form of '2d6+2' or '4d6-1' depending the the level and con field values
// this.helpers.attribute_mod is a helper function to calculate the ability modifier when give the raw ability score
'return `roll:${this.fields.level}d6${this.helpers.attribute_mod(this.fields.con)}`;'
``` 

If no `source` property is given a default blank/empty value with be assigned to the field ('', [], 0);

### helpers {Object}

This object contains helper functions for calculations relevant to the NPC. Its property names are the function names and the values are an array that describe the function.

#### helper {Array}

An array of any number of optional argument names followed by a function body.

Example `helpers` object:
```
helpers: {
	attribute_mod: [ // this helper can be called with this.helpers.attribute_mod()
		'attr', // the function takes one argument, a numeric attribute
		"const abs = Math.floor((attr - 10) / 2); return (abs === 0) ? '' : (abs > 0) ? `+${abs}` : abs;" // the function uses the numeric attribute to calculate a modifier
	]
}
```
