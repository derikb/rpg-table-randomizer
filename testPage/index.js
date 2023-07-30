var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/dice_roller.js
var dice_roller_exports = {};
__export(dice_roller_exports, {
  DiceResult: () => DiceResult,
  DiceRoller: () => DiceRoller,
  default: () => dice_roller_default,
  getDiceResult: () => getDiceResult,
  rollDie: () => rollDie
});

// src/randomizer.js
var arraySum = function(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    const v = parseFloat(arr[i]);
    if (!isNaN(v)) {
      total += v;
    }
  }
  return total;
};
var randomInteger = function(min = 0, max = null) {
  if (max == null) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
};
var getWeightedRandom = function(values, weights) {
  let n = 0;
  const num = randomInteger(1, arraySum.call(this, weights));
  let i = 0;
  for (i; i < values.length; i++) {
    n = n + weights[i];
    if (n >= num) {
      break;
    }
  }
  return values[i];
};
var randomString = function(data) {
  const values = [];
  const weights = [];
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }
  data.forEach((entry) => {
    weights.push(1);
    values.push(entry);
  });
  return getWeightedRandom(values, weights);
};

// src/dice_roller.js
var DiceResult = class {
  constructor({
    die = "",
    value = 0
  }) {
    this.die = die;
    this.value = value;
  }
  toString() {
    return this.value;
  }
  toJSON() {
    return {
      className: "DiceResult",
      die: this.die,
      value: this.value
    };
  }
};
var DiceRoller = class {
  /**
   *
   * @param {Number} die Die type
   * @returns {Number}
   */
  getSingleDieResult(die) {
    return randomInteger(1, die);
  }
  /**
   * Apply a modifier to the number of dice retained.
   * @param {Number[]} rolls
   * @param {String} diemod Modifier to dice (drop/keep high/low count).
   * @returns
   */
  applyDieMod(rolls, diemod) {
    const m = diemod.match(/^([dklh]{2})([0-9]*)$/);
    if (m === null) {
      return rolls;
    }
    const count = !m[2] ? 1 : parseInt(m[2]);
    switch (m[1]) {
      case "dl":
        rolls.sort((a, b) => a - b);
        rolls.splice(0, count);
        return rolls;
      case "dh":
        rolls.sort((a, b) => b - a);
        rolls.splice(0, count);
        return rolls;
      case "kl":
        rolls.sort((a, b) => a - b);
        return rolls.slice(0, count);
      case "kh":
        rolls.sort((a, b) => b - a);
        return rolls.slice(0, count);
      default:
        return rolls;
    }
  }
  /**
   * Dice rolling simulator
   * @param {Number} [die=6] Die type
   * @param {Number} [number=1] Number of times to roll the die
   * @param {Number} [modifier=0] Numeric modifier to dice total
   * @param {String} [mod_op=+] Operator for the modifier (+,-,/,*)
   * @param {String} [diemod=''] Modifier to the dice (like keep/drop high/low die)
   * @returns {Number} Number rolled (die*number [mod_op][modifier])
   */
  _parseDiceNotation(die = 6, number = 1, modifier = 0, mod_op = "+", diemod = "") {
    modifier = parseInt(modifier, 10);
    die = parseInt(die, 10);
    if (number <= 0) {
      number = 1;
    } else {
      number = parseInt(number, 10);
    }
    let rolls = [];
    for (let i = 1; i <= number; i++) {
      rolls.push(this.getSingleDieResult(die));
    }
    if (diemod !== "") {
      rolls = this.applyDieMod(rolls, diemod);
    }
    let sum = 0;
    if (rolls.length > 0) {
      sum = rolls.reduce((total, cur) => {
        return total + cur;
      });
    }
    if (modifier === 0) {
      return sum;
    }
    switch (mod_op) {
      case "*":
        sum = sum * modifier;
        break;
      case "-":
        sum = sum - modifier;
        break;
      case "/":
        sum = sum / modifier;
        break;
      case "+":
      default:
        sum = sum + modifier;
        break;
    }
    return Math.round(sum);
  }
  /**
   * takes a string like '3d6+2', 'd6', '2d6', parses it, and puts it through roll
   * @params {String} string a die roll notation
   * @returns {Number} the result of the roll
   */
  rollDie(string = "") {
    string = string.trim();
    const m = string.match(/^([0-9]*)d([0-9]+)([dklh]{2}[0-9]*)*(?:([\+\-\*\/])([0-9]+))*$/);
    if (!m) {
      return "";
    }
    return this._parseDiceNotation(m[2], m[1], m[5], m[4], m[3]);
  }
  /**
   * Return a dice result.
   * @param {String} die Die roll notation.
   * @returns {DiceResult}
   */
  getDiceResult(die = "") {
    return new DiceResult({
      die,
      value: this.rollDie(die)
    });
  }
};
var rollDie = function(string = "") {
  const roller = new DiceRoller();
  return roller.rollDie(string);
};
var getDiceResult = function(die = "") {
  const roller = new DiceRoller();
  return new DiceResult({
    die,
    value: roller.rollDie(die)
  });
};
var dice_roller_default = DiceRoller;

// src/DisplayOptions.js
var DisplayOptions = class {
  /**
   *
   * @property {String} table Subtable name.
   * @property {Boolean} hide_table Hide the subtable name.
   * @property {Boolean} hide_result Hide the result.
   * @property {Boolean} hide_desc Hide the description field.
   */
  constructor({
    table = "",
    hide_table = false,
    hide_result = false,
    hide_desc = false
  }) {
    this.table = table;
    this.hide_table = hide_table === true || hide_table === "1" || hide_table === 1;
    this.hide_result = hide_result === true || hide_result === "1" || hide_result === 1;
    this.hide_desc = hide_desc === true || hide_desc === "1" || hide_desc === 1;
  }
  /**
   * Custom JSON handler to strip defaults.
   * @returns {Object}
   */
  toJSON() {
    const returnObj = {
      className: "DisplayOptions",
      table: this.table
    };
    if (this.hide_table) {
      returnObj.hide_table = true;
    }
    if (this.hide_result) {
      returnObj.hide_result = true;
    }
    if (this.hide_desc) {
      returnObj.hide_desc = true;
    }
    return returnObj;
  }
};

// src/npc_generator.js
var npc_generator_exports = {};
__export(npc_generator_exports, {
  applySchemaToNPC: () => applySchemaToNPC,
  getAllSchemas: () => getAllSchemas,
  getSchemaByKey: () => getSchemaByKey,
  initializeNewNPC: () => initializeNewNPC,
  registerSchema: () => registerSchema
});

// src/r_helpers.js
var isEmpty = function(obj) {
  if (obj === null || obj === void 0) {
    return true;
  }
  if (Array.isArray(obj) || isString(obj)) {
    return obj.length === 0;
  }
  if (obj instanceof Set || obj instanceof Map) {
    return obj.size === 0;
  }
  return Object.keys(obj).length === 0;
};
var isString = function(obj) {
  return toString.call(obj) === "[object String]";
};
var isObject = function(obj) {
  if (Array.isArray(obj) || obj instanceof Set || obj instanceof Map) {
    return false;
  }
  const type = typeof obj;
  return (type === "function" || type === "object") && !!obj;
};
var isUndefined = function(obj) {
  return obj === void 0;
};
var capitalize = function(string) {
  return isEmpty(string) ? string : string.charAt(0).toUpperCase() + string.slice(1);
};
var serializeValue = function(value) {
  if (value === null || typeof value === "undefined" || typeof value === "function") {
    return;
  }
  if (isString(value)) {
    return value;
  }
  if (typeof value === "number") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((el) => serializeValue(el));
  }
  if (typeof value.toJSON === "function") {
    return value.toJSON();
  }
  if (value instanceof Map) {
    const obj = {};
    value.forEach(function(val, key) {
      obj[key] = serializeValue(val);
    });
    return obj;
  }
  if (value instanceof Set) {
    return Array.from(value).map((el) => serializeValue(el));
  }
  return value;
};
var defaultToJSON = function() {
  const returnObj = {};
  for (const property in this) {
    const value = this[property];
    const value2 = serializeValue(value);
    if (typeof value2 === "undefined") {
      continue;
    }
    returnObj[property] = value2;
  }
  return returnObj;
};

// src/RandomTableEntry.js
var RandomTableEntry = class {
  /**
   *
   * @property {String} label Basic string label. Only required field. Can include tokens.
   * @property {Boolean} [print=true] Should the result be included in the output.
   * @property {String} [description] Extra description for the label.
   * @property {String[]} [subtable] Other tables to roll on.
   * @property {Number} [weight=1] Number to weight entry relative to other entries.
   */
  constructor({
    label = "",
    print = true,
    description = "",
    subtable = [],
    weight = 1
  }) {
    this.label = label;
    this.print = !(print === false || print === "0" || print === 0);
    this.description = description;
    this.weight = parseInt(weight, 10);
    if (this.weight <= 0) {
      this.weight = 1;
    }
    if (isString(subtable)) {
      this.subtable = [subtable];
    } else if (Array.isArray(subtable)) {
      this.subtable = subtable.map((el) => {
        return el.toString();
      });
    }
  }
  /**
   * Custom JSON handler because Map doesn't JSON stringify automatically.
   * @returns {Object}
   */
  toJSON() {
    const obj = defaultToJSON.call(this);
    obj.className = "RandomTableEntry";
    return obj;
  }
};

// src/RandomTable.js
var RandomTable = class {
  /**
   * The primary attributes of this table
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
   * @property {String[]} [macro] for tables that are only used to aggregate result from other tables, this array consists of table keys and optionsl subtables to be rolled on in order
   * @property {Map[DisplayOptions]} [display_opt] Display options for the subtables.
   * @property {Array} [dependencies] table keys that are needed to get full results from this table
   *
   * Note the Constructor args are not exactly the same as the properties. Some type changes are made to convert data.
   */
  constructor({
    id = 0,
    key = null,
    title = "",
    author = "",
    description = "",
    source = "",
    tags = [],
    sequence = [],
    tables = {},
    macro = [],
    dependencies = null,
    table = null,
    display_opt = []
  }) {
    this.id = id;
    this.key = key || this.id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.source = source;
    this.tags = tags;
    this.sequence = sequence;
    this.macro = macro;
    this.dependencies = dependencies;
    this._normalizeTables(tables, table);
    this.display_opt = /* @__PURE__ */ new Map();
    display_opt.forEach((data) => {
      const key2 = data.table || "";
      if (key2) {
        if (data instanceof DisplayOptions) {
          this.display_opt.set(key2, data);
          return;
        }
        const opt = new DisplayOptions(data);
        this.display_opt.set(key2, opt);
      }
    });
  }
  toString() {
    return this.title;
  }
  /**
   * Make sure table entries are all RandomTableEntry objects.
   * @param {Array} data
   * @returns RandomTableEntry[]
   */
  _normalizeTable(data) {
    const entries = [];
    data.forEach((d) => {
      if (isEmpty(d)) {
        return;
      }
      if (isString(d)) {
        entries.push(new RandomTableEntry({
          label: d
        }));
        return;
      }
      if (d instanceof RandomTableEntry) {
        entries.push(d);
        return;
      }
      if (isObject(d)) {
        entries.push(new RandomTableEntry(d));
      }
    });
    return entries;
  }
  /**
   * Normalize the tables/table constructor data.
   * @param {Object} tables
   * @param {Array} table
   * @returns
   */
  _normalizeTables(tables, table) {
    if (isEmpty(tables) && isEmpty(table)) {
      return;
    }
    this.tables = {};
    if (!isEmpty(table) && Array.isArray(table)) {
      this.tables.default = this._normalizeTable(table);
    }
    if (isObject(tables)) {
      const subtableNames = Object.keys(tables);
      subtableNames.forEach((name) => {
        const data = tables[name];
        if (!Array.isArray(data)) {
          return;
        }
        this.tables[name] = this._normalizeTable(data);
      });
    }
  }
  /**
   * Basic sequence of table rolls.
   * Either the start, the default sequence, the default table, or just the first one.
   * @param {String} start Subtable name to start with.
   * @returns {String[]}
   */
  getSequence(start = "") {
    if (start !== "") {
      return [start];
    }
    if (this.sequence.length === 0) {
      if (this.tables.default) {
        return ["default"];
      }
      return [this.subtableNames[0]];
    }
    if (this.sequence[0] === "rollall") {
      return this.subtableNames;
    }
    return this.sequence;
  }
  /**
   * All the subtable names.
   * @returns {String[]}
   */
  get subtableNames() {
    return Object.keys(this.tables);
  }
  /**
   * Get entries for a specific subtable.
   * @param {String} [name=default] Subtable name.
   * @returns {RandomTableEntry[]}
   */
  getSubtableEntries(name = "default") {
    return this.tables[name] || [];
  }
  /**
   * Get a random entry from a subtable.
   * @param {String} subtableName
   * @returns {RandomTableEntry|null}
   */
  getRandomEntry(subtableName) {
    const entries = this.getSubtableEntries(subtableName);
    if (entries.length === 0) {
      return null;
    }
    const values = [];
    const weights = [];
    entries.forEach((entry, k, l) => {
      weights.push(entry.weight);
      values.push(entry);
    });
    return getWeightedRandom(values, weights);
  }
  /**
   * Get an entry in case we only have the label and need other data from it
   * @param {String} label The item we are looking for
   * @param {String} [table=default] the table to search
   * @returns {RandomTableEntry|null}
   */
  findEntry(label, table = "default") {
    const t = this.tables[table];
    if (!t) {
      return null;
    }
    const entry = t.find((e) => {
      return e.label === label;
    });
    if (!entry) {
      return null;
    }
    return entry;
  }
  /**
   * Find the dependent tables to get full results for this table
   * @return {Array} table keys
   */
  findDependencies() {
    if (this.dependencies !== null) {
      return this.dependencies;
    }
    let dep = [];
    this.macro.forEach((macro) => {
      const parts = macro.split(":");
      if (parts.length > 0 && parts[0] !== "this") {
        dep.push(parts[0]);
      }
    });
    const tokenRegExp2 = /({{2}.+?}{2})/g;
    const tnames = Object.keys(this.tables);
    tnames.forEach((n) => {
      const table = this.tables[n];
      table.forEach((result) => {
        const tokens = result.label.match(tokenRegExp2);
        if (tokens !== null) {
          tokens.forEach((token) => {
            const parts = token.replace("{{", "").replace("}}", "").split(":");
            if (parts.length > 1 && parts[0] === "table" && parts[1] !== "this") {
              dep.push(parts[1]);
            }
          });
        }
      });
    });
    dep = dep.reduce((a, b) => {
      if (a.indexOf(b) < 0) {
        a.push(b);
      }
      return a;
    }, []);
    this.dependencies = dep;
    return dep;
  }
  /**
   * Custom JSON handler because Map doesn't JSON stringify automatically.
   * @returns {Object}
   */
  toJSON() {
    const obj = defaultToJSON.call(this);
    obj.className = "RandomTable";
    return obj;
  }
};

// src/RandomTableResult.js
var RandomTableResult = class {
  /**
   * @property {String} key Key for RandomTable.
   * @property {String} table Title of subtable.
   * @property {String} result Randomized result label.
   * @property {String} desc Extra result description.
   */
  constructor({
    key = "",
    table = "",
    result = "",
    desc = ""
  }) {
    this.key = key;
    this.table = table;
    this.result = result;
    this.desc = desc;
  }
  /**
   * Is this from the "default" table.
   */
  get isDefault() {
    return this.table === "default";
  }
  /**
   * Is this an error result.
   */
  get isError() {
    return false;
  }
  toString() {
    return this.result;
  }
  /**
   * Custom JSON handler to strip empty props.
   * @returns {Object}
   */
  toJSON() {
    const obj = defaultToJSON.call(this);
    obj.className = "RandomTableResult";
    return obj;
  }
};

// src/TableErrorResult.js
var TableErrorResult = class extends RandomTableResult {
  /**
   * Is this an error result.
   */
  get isError() {
    return true;
  }
  /**
   * Custom JSON handler to strip empty props.
   * @returns {Object}
   */
  toJSON() {
    const obj = super.toJSON();
    obj.className = "TableErrorResult";
    return obj;
  }
};

// src/RandomTableResultSet.js
var RandomTableResultSet = class {
  /**
   * @property {String} key RandomTable key
   * @property {String} title Title from the RandomTable parent
   * @property {RandomTableResult[]} results Randomized results.
   * @property {Map[DisplayOptions]|Object} displayOptions Display settings from the RandomTable parent.
   */
  constructor({
    key = "",
    title = "",
    results = [],
    displayOptions = /* @__PURE__ */ new Map()
  }) {
    this.key = key;
    this.title = title;
    this.results = [];
    results.forEach((r) => {
      this.addResult(r);
    });
    if (displayOptions instanceof Map) {
      this.displayOptions = displayOptions;
    } else {
      this.displayOptions = /* @__PURE__ */ new Map();
      Object.keys(displayOptions).forEach((key2) => {
        const data = displayOptions[key2];
        const tableName = data.table || "";
        if (tableName) {
          if (data instanceof DisplayOptions) {
            this.displayOptions.set(tableName, data);
            return;
          }
          this.displayOptions.set(tableName, new DisplayOptions(data));
        }
      });
    }
  }
  /**
   * Add a result to the set.
   * @param {RandomTableResult|TableErrorResult|object} data
   * @returns
   */
  addResult(data) {
    if (data instanceof RandomTableResult || data instanceof TableErrorResult) {
      this.results.push(data);
      return;
    }
    if (data.className === "TableErrorResult") {
      this.results.push(new TableErrorResult(data));
      return;
    }
    this.results.push(new RandomTableResult(data));
  }
  get isSimple() {
    return this.results.length === 1;
  }
  /**
   * Find the result for a specific table/subtable
   * @param {String} table The table to look for
   * @returns {RandomTableResult|null}
   */
  findResultByTable(table = "default") {
    const obj = this.results.find((v) => {
      return v.table === table;
    });
    return !obj ? null : obj;
  }
  /**
   * Output the set as a string.
   * @param {Boolean} simple Simplify the output (just the result labels)
   * @returns
   */
  niceString(simple = false) {
    if (this.results.length === 0) {
      return "";
    }
    if (simple) {
      return this.results.map((r) => {
        return r.toString();
      }).join(" ");
    }
    let output = "";
    this.results.forEach((result) => {
      if (result.isError) {
        output += `Error: ${result.result}
`;
        return;
      }
      const displayOpt = this.displayOptions.get(result.table);
      if (displayOpt) {
        if (!displayOpt.hide_table) {
          output += `${capitalize(result.table)}: `;
        }
        if (!displayOpt.hide_result) {
          output += `${capitalize(result.result)}
`;
        }
        if (!displayOpt.hide_desc) {
          if (result.desc !== "") {
            output += `(${result.desc})
`;
          }
        }
        return;
      }
      if (result.isDefault) {
        output += `${capitalize(result.result)}
`;
      } else {
        output += `${capitalize(result.table)}: ${capitalize(result.result)}
`;
      }
      if (result.desc !== "") {
        output += `${result.desc}
`;
      }
    });
    return output.trim();
  }
  /**
   * Simple base output of result set.
   */
  toString() {
    return this.niceString();
  }
  /**
   * Custom JSON handler because Map doesn't JSON stringify automatically.
   * @returns {Object}
   */
  toJSON() {
    const obj = defaultToJSON.call(this);
    obj.className = "RandomTableResultSet";
    return obj;
  }
};

// src/TableError.js
var TableError = class extends Error {
  constructor(message, key = "") {
    super(message);
    this.key = key;
    this.name = "TableError";
  }
};
var TableError_default = TableError;

// src/TableRoller.js
var tokenRegExp = /({{2}.+?}{2})/g;
var TableRoller = class {
  constructor({
    token_types = {}
  }) {
    this.token_types = {
      roll: this._defaultRollToken.bind(this),
      table: this._defaultTableToken.bind(this),
      oneof: this._defaultOneOfToken.bind(this)
    };
    Object.keys(token_types).forEach((token) => {
      this.token_types[token] = token_types[token];
    });
  }
  /**
   * Return an error result
   * @param {String} error Error message
   * @param {String} key RandomTable key where error occured.
   * @param {String} table Sub/table name if relevant.
   * @returns {TableErrorResult}
   */
  _getErrorResult(error = "", key = "", table = "") {
    return new TableErrorResult({
      key,
      table,
      result: error
    });
  }
  /**
   * Return a result set with an error.
   * @param {String} error Error message
   * @param {String} key RandomTable key where error occured.
   * @returns {RandomTableResultSet}
   */
  _getErrorResultSet(error = "", key = "") {
    return new RandomTableResultSet({
      key,
      results: [
        this._getErrorResult(error, key)
      ]
    });
  }
  /**
   * Get a result from a table/subtable in a RandomTable object
   * DANGER: you could theoretically put yourself in an endless loop if the data were poorly planned
   * Calling method try to catch RangeError to handle that possibility.
   * @param {RandomTable} rtable the RandomTable object
   * @param {String} table table to roll on
   * @returns {RandomTableResult[]}
   */
  _selectFromTable(rtable, table) {
    if (!(rtable instanceof RandomTable)) {
      return [this._getErrorResult("Invalid table.")];
    }
    let o = [];
    const entry = rtable.getRandomEntry(table);
    if (entry === null || !(entry instanceof RandomTableEntry)) {
      return [this._getErrorResult("Invalid subtable name.", rtable.key, table)];
    }
    if (entry.print) {
      const t_result = this.findToken(entry.label, rtable);
      o.push(new RandomTableResult({ key: rtable.key, table, result: t_result, desc: entry.description }));
    }
    if (entry.subtable.length === 0) {
      return o;
    }
    entry.subtable.forEach((subtableName) => {
      const subresult = this._selectFromTable(rtable, subtableName);
      o = o.concat(subresult);
    });
    return o;
  }
  /**
   * Get results array for macro setting of a table.
   * @param {RandomTable} rtable Table with macro set.
   * @returns {RandomTableResult[]}
   */
  _getTableMacroResult(rtable) {
    let results = [];
    try {
      rtable.macro.forEach((macroKey) => {
        const parts = macroKey.split(":");
        const tableKey = parts[0];
        const subtable = parts[1] || "";
        if (tableKey === rtable.key) {
          throw new TableError_default(`Macros can't self reference.`, rtable.key);
        }
        try {
          const mtable = this.getTableByKey(tableKey);
          const result = this.getTableResult(mtable, subtable);
          results = results.concat(result);
        } catch (e) {
          if (e instanceof TableError_default) {
            results.push(this._getErrorResult(e.message, rtable.key, tableKey));
          } else {
            throw e;
          }
        }
      });
    } catch (e) {
      if (e instanceof RangeError) {
        results.push(this._getErrorResult(e.message, rtable.key));
      } else {
        throw e;
      }
    }
    return results;
  }
  /**
   * Generate a result from a RandomTable object
   * @param {RandomTable} rtable the RandomTable
   * @param {String} [start=''] subtable to roll on
   * @return {RandomTableResult[]}
   */
  getTableResult(rtable, start = "") {
    if (!(rtable instanceof RandomTable)) {
      return [
        this._getErrorResult("No table found to roll on.")
      ];
    }
    let results = [];
    if (rtable.macro.length > 0) {
      return this._getTableMacroResult(rtable);
    }
    const sequence = rtable.getSequence(start);
    if (sequence.length === 0) {
      return results;
    }
    try {
      sequence.forEach((seqKey) => {
        const r = this._selectFromTable(rtable, seqKey);
        results = results.concat(r);
      });
    } catch (e) {
      if (e instanceof RangeError) {
        results.push(this._getErrorResult(e.message, rtable.key));
      } else {
        throw e;
      }
    }
    return results;
  }
  /**
   * Get result set from a table based on the key.
   * @param {String} tableKey
   * @param {String} table
   * @returns {RandomTableResultSet}
   */
  getTableResultSetByKey(tableKey, table = "") {
    try {
      const rtable = this.getTableByKey(tableKey);
      const results = this.getTableResult(rtable, table);
      return new RandomTableResultSet({
        key: rtable.key,
        title: rtable.title,
        results,
        displayOptions: rtable.display_opt
      });
    } catch (e) {
      if (e instanceof TableError_default) {
        return this._getErrorResultSet(e.message, e.key);
      } else {
        throw e;
      }
    }
  }
  /**
   * Get result set from a table based on the key.
   * @param {RandomTable} rtable Main table object.
   * @param {String} [table] Subtable
   * @returns {RandomTableResultSet}
   */
  getResultSetForTable(rtable, table = "") {
    if (!(rtable instanceof RandomTable)) {
      return this._getErrorResultSet(`Invalid table data.`);
    }
    const results = this.getTableResult(rtable, table);
    return new RandomTableResultSet({
      key: rtable.key,
      title: rtable.title,
      results,
      displayOptions: rtable.display_opt
    });
  }
  /**
   * Perform token replacement.  Only table and roll actions are accepted
   * @param {String} token A value passed from findToken containing a token(s) {{SOME OPERATION}} Tokens are {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{roll:1d6+2}} (etc) (i.e. {{table:colonial_occupations:laborer}} {{table:color}} also generate names with {{name:flemish}} (surname only) {{name:flemish:male}} {{name:dutch:female}}
   * @param {RandomTable|null} curtable RandomTable the string is from (needed for "this" tokens) or null
   * @returns {RandomTableResultSet|RandomTableResultSet[]|DiceResult|String|Any} The result of the token or else just the token (in case it was a mistake or at least to make the error clearer)
   */
  convertToken(token, curtable = null) {
    let parts = token.replace("{{", "").replace("}}", "").split(":");
    parts = parts.map((el) => {
      return el.trim();
    });
    if (parts.length === 0) {
      return token;
    }
    try {
      if (this.token_types[parts[0]]) {
        return this.token_types[parts[0]](parts, token, curtable);
      } else {
        return token;
      }
    } catch (e) {
      if (e instanceof RangeError) {
        return this._getErrorResultSet(e.message);
      } else {
        throw e;
      }
    }
  }
  /**
   * Look for tokens to perform replace action on them.
   * @param {String} entryLabel Usually a label from a RandomTableEntry
   * @param {RandomTable|null} curtable RandomTable the string is from (needed for "this" tokens) or null
   * @returns {String} String with tokens replaced (if applicable)
   */
  findToken(entryLabel, curtable = null) {
    if (isEmpty(entryLabel)) {
      return "";
    }
    const newstring = entryLabel.replace(tokenRegExp, (token) => {
      return this.convertToken(token, curtable).toString();
    });
    return newstring;
  }
  /**
   * Since tables are stored outside of this module, this function allows for the setting of a function which will be used to lookup a table by it's key
   * @param {Function} lookup a function that takes a table key and returns a RandomTable or null
   */
  setTableKeyLookup(lookup) {
    this._customGetTableByKey = lookup;
  }
  /**
   * Placeholder that should be replaced by a function outside this module
   * @param {String} key human readable table identifier
   * @return {null} nothing, when replaced this function should return a table object
   */
  _customGetTableByKey(key) {
    return null;
  }
  /**
   * Return a table based on it's key.
   * This requires calling setTableKeyLookup and setting a lookup method
   * That returns a RandomTable object or null.
   * @param {String} key human readable table identifier
   * @returns {RandomTable}
   * @throws {TableError}
   */
  getTableByKey(key) {
    if (!key) {
      throw new TableError_default("No table key.");
    }
    const table = this._customGetTableByKey(key);
    if (!table || !(table instanceof RandomTable)) {
      throw new TableError_default(`No table found for key: ${key}`, key);
    }
    return table;
  }
  /**
   * Add a token variable
   * @param {String} name Name of the token (used as first element).
   * @param {Function} process Function to return token replacement value function is passed the token_parts (token split by ":"),  original full_token, current table name
   */
  registerTokenType(name, process) {
    this.token_types[name] = process;
  }
  /**
   * Dice roll token.
   * @returns {DiceResult}
   */
  _defaultRollToken(token_parts, full_token = "", curtable = null) {
    return getDiceResult(token_parts[1]);
  }
  /**
   * Table token lookup in the form:
   * {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{table:SOMETABLE:SUBTABLE*2}} (roll subtable 2 times)
   * @param {String[]} token_parts Token split by :
   * @param {String} full_token Original token
   * @param {RandomTable|null} curtable Current table or null.
   * @returns {RandomTableResultSet|RandomTableResultSet[]} One or more result sets.
   */
  _defaultTableToken(token_parts, full_token, curtable = null) {
    if (isUndefined(token_parts[1])) {
      return full_token;
    }
    let multiplier = 1;
    if (token_parts[1].indexOf("*") !== -1) {
      const x = token_parts[1].split("*");
      token_parts[1] = x[0];
      multiplier = x[1];
    }
    let rtable = null;
    if (token_parts[1] === "this") {
      if (!curtable) {
        return full_token;
      }
      rtable = curtable;
    } else {
      try {
        rtable = this.getTableByKey(token_parts[1]);
      } catch (e) {
        if (e instanceof TableError_default) {
          return full_token;
        } else {
          throw e;
        }
      }
    }
    if (typeof token_parts[2] !== "undefined" && token_parts[2].indexOf("*") !== -1) {
      const x = token_parts[2].split("*");
      token_parts[2] = x[0];
      multiplier = x[1];
    }
    const subtable = isUndefined(token_parts[2]) ? "" : token_parts[2];
    const results = [];
    for (let i = 1; i <= multiplier; i++) {
      results.push(this.getResultSetForTable(rtable, subtable));
    }
    return results.length === 1 ? results[0] : results;
  }
  /**
   * Simple pick one of the options token:
   * {{oneof:dwarf|halfling|human pig|dog person}}
   * @param {String[]} token_parts Token split by :
   * @param {String} full_token Original token
   * @param {RandomTable|null} curtable Current table or null.
   * @returns {String} One of the options or empty.
   */
  _defaultOneOfToken(token_parts, full_token, curtable = null) {
    if (isUndefined(token_parts[1])) {
      return full_token;
    }
    const options = token_parts[1].split("|");
    if (options.length === 1) {
      return options.shift();
    }
    return randomString(options) || "";
  }
};
var TableRoller_default = TableRoller;

// node_modules/uuid/dist/esm-browser/rng.js
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}

// node_modules/uuid/dist/esm-browser/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

// node_modules/uuid/dist/esm-browser/native.js
var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native_default = {
  randomUUID
};

// node_modules/uuid/dist/esm-browser/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// src/NPC.js
var NPC = class {
  constructor({
    id = null,
    schema = "",
    fields = /* @__PURE__ */ new Map()
  }) {
    if (id === null) {
      this.id = v4_default();
    } else {
      this.id = id;
    }
    this.schema = schema;
    if (fields instanceof Map) {
      this.fields = fields;
    } else if (isObject(fields)) {
      this.fields = /* @__PURE__ */ new Map();
      for (const [key, value] of Object.entries(fields)) {
        this.fields.set(key, this._convertFieldValue(value));
      }
    }
  }
  _convertFieldValue(value) {
    if (value === null || typeof value === "undefined") {
      return null;
    }
    if (typeof value === "string") {
      return value;
    }
    if (Array.isArray("value")) {
      return value.map((el) => {
        return this._convertFieldValue(el);
      });
    }
    if (value instanceof RandomTableResultSet || value instanceof RandomTableResult || value instanceof TableErrorResult || value instanceof DiceResult) {
      return value;
    }
    switch (value.className) {
      case "RandomTableResultSet":
        return new RandomTableResultSet(value);
      case "RandomTableResult":
        return new RandomTableResult(value);
      case "TableErrorResult":
        return new TableErrorResult(value);
      case "DiceResult":
        return new DiceResult(value);
      default:
        return value;
    }
  }
  /**
   * Set field value.
   * @param {String} key Field key.
   * @param {Any} value Value for field.
   */
  setFieldValue(key, value) {
    this.fields.set(key, this._convertFieldValue(value));
  }
  /**
   * Get field keys as array.
   * @returns {String[]}
   */
  getFieldKeys() {
    return Array.from(this.fields.keys());
  }
  /**
   * Get value by field key.
   * @param {String} key NPCSchemaField.key
   * @returns {RandomTableResultSet|RandomTableResultSet[]|DiceResult|String|Any}
   */
  getFieldValue(key) {
    const value = this.fields.get(key);
    if (typeof value === "undefined") {
      return null;
    }
    return value;
  }
  /**
   * Custom JSON handler to strip empty props.
   * @returns {Object}
   */
  toJSON() {
    const obj = defaultToJSON.call(this);
    obj.className = "NPC";
    return obj;
  }
};

// src/NPCConstants.js
var NPCFieldTypeConst = Object.freeze({
  FIELD_TYPE_STRING: "string",
  FIELD_TYPE_TEXT: "text",
  FIELD_TYPE_NUMBER: "number",
  FIELD_TYPE_NOTE: "note",
  FIELD_TYPE_RESULTSET: "resultset",
  FIELD_TYPE_MODIFIER: "modifier"
});

// src/NPCSchemaField.js
var NPCSchemaField = class {
  /**
   *
   * @property {String} key Identifying key
   * @property {String} label Readable label for field.
   * @property {String} [type=string] Type of data in field. Valid: see NPCFieldTypeConst.
   * @property {String} [source=''] Source of data for TableRoller in the form of a token (see TableRoller, ex: "name:french", "table:color", etc.)
   * @property {Number} [count=1] Number of entries for array types.
   * @property {Array|String|Number} starting_value An optional starting value.
   */
  constructor({
    key = "",
    label = "",
    type = NPCFieldTypeConst.FIELD_TYPE_STRING,
    source = "",
    count = 1,
    starting_value = null
  }) {
    this.key = key;
    this.label = label;
    this.type = type.toLowerCase();
    this.source = source;
    this.count = count;
    if (!this.count || this.count <= 0) {
      this.count = 1;
    }
    if (starting_value !== null) {
      this.starting_value = starting_value;
    }
  }
  /**
   * Default value for this field by type if empty.
   */
  get defaultEmpty() {
    if (this.count > 1) {
      return [];
    }
    switch (this.type) {
      case NPCFieldTypeConst.FIELD_TYPE_STRING:
      case NPCFieldTypeConst.FIELD_TYPE_TEXT:
        return "";
      case NPCFieldTypeConst.FIELD_TYPE_NOTE:
      case NPCFieldTypeConst.FIELD_TYPE_RESULTSET:
        return null;
      case NPCFieldTypeConst.FIELD_TYPE_NUMBER:
      case NPCFieldTypeConst.FIELD_TYPE_MODIFIER:
        return 0;
      case "array":
        return [];
    }
    return null;
  }
  isString() {
    return this.type === NPCFieldTypeConst.FIELD_TYPE_STRING;
  }
  isText() {
    return this.type === NPCFieldTypeConst.FIELD_TYPE_TEXT;
  }
  isNumber() {
    return this.type === NPCFieldTypeConst.FIELD_TYPE_NUMBER;
  }
  isModifier() {
    return this.type === NPCFieldTypeConst.FIELD_TYPE_MODIFIER;
  }
  isNote() {
    return this.type === NPCFieldTypeConst.FIELD_TYPE_NOTE;
  }
  isResult() {
    return this.type === NPCFieldTypeConst.FIELD_TYPE_RESULTSET;
  }
  /**
   * Is this some sort of array type.
   * @returns {Boolean}
   */
  isArray() {
    if (this.type === "array") {
      return true;
    }
    return this.count > 1;
  }
  /**
   * Custom JSON handler to strip empty props.
   * @returns {Object}
   */
  toJSON() {
    const obj = defaultToJSON.call(this);
    obj.className = "NPCSchemaField";
    return obj;
  }
};

// src/NPCSchema.js
var NPCSchema = class {
  /**
   * @property {String} key Identifying key
   * @property {String} name Name of schema.
   * @property {String} author Name of author.
   * @property {Map<String, NPCSchemaField>} fields Data fields will be converted to NPCSchemaField if necessary.
   */
  constructor({
    key = "",
    name = "",
    author = "",
    fields = []
  }) {
    this.key = key;
    this.name = name;
    this.author = author;
    this.fields = /* @__PURE__ */ new Map();
    if (Array.isArray(fields)) {
      fields.forEach((obj) => {
        this._convertField(obj);
      });
    } else {
      Object.keys(fields).forEach((key2) => {
        this._convertField(fields[key2]);
      });
    }
  }
  _convertField(value) {
    if (value instanceof NPCSchemaField) {
      this.fields.set(value.key, value);
      return;
    }
    if (isObject(value)) {
      const field = new NPCSchemaField(value);
      this.fields.set(field.key, field);
    }
  }
  /**
   * Get field keys as array.
   * @returns String[]
   */
  getFieldKeys() {
    return Array.from(this.fields.keys());
  }
  /**
   * Get a Field by the key.
   * @param {String} key
   * @returns {NPCSchemaField|undefined}
   */
  getFieldByKey(key) {
    return this.fields.get(key);
  }
  /**
   * Get field label by the key.
   * @param {String} key
   * @returns {String}
   */
  getFieldLabelByKey(key) {
    const field = this.getFieldByKey(key);
    if (!field) {
      return "";
    }
    return field.label;
  }
  /**
   * Custom JSON handler to strip empty props.
   * @returns {Object}
   */
  toJSON() {
    const obj = defaultToJSON.call(this);
    obj.className = "NPCSchema";
    return obj;
  }
};

// src/npc_generator.js
var Schemas = {};
var registerSchema = function(schema) {
  if (!(schema instanceof NPCSchema) || !schema.key || schema.key === "base") {
    throw Error("Invalid schema");
  }
  Schemas[schema.key] = schema;
};
var getAllSchemas = function() {
  return Schemas;
};
var getSchemaByKey = function(key) {
  return Schemas[key] || null;
};
var initializeNewNPC = function(schemaKey, tableRoller2, generateId = true) {
  const schema = getSchemaByKey(schemaKey);
  if (!schema) {
    throw Error("Schema not found.");
  }
  if (!(tableRoller2 instanceof TableRoller_default)) {
    throw Error("Invalid tableRoller");
  }
  const npc = new NPC({
    schema: schemaKey,
    id: generateId ? null : ""
  });
  applySchemaToNPC(schema, tableRoller2, npc);
  return npc;
};
var typeResult = function(field, result) {
  let value = null;
  if (field.isString() || field.isText() || field.isModifier()) {
    value = result.toString();
  } else if (field.isNumber()) {
    value = parseInt(result, 10);
  } else {
    value = result;
  }
  return value;
};
var applySchemaToNPC = function(schema, tableRoller2, npc) {
  if (!(npc instanceof NPC)) {
    throw Error("npc object must be or inherit from NPC class.");
  }
  if (!(schema instanceof NPCSchema)) {
    throw Error("schema object must be or inherit from NPCSchema class.");
  }
  if (!(tableRoller2 instanceof TableRoller_default)) {
    throw Error("Invalid tableRoller");
  }
  if (npc.schema === "") {
    npc.schema = schema.key;
  }
  if (npc.schema !== schema.key) {
    throw Error("npc already has schema set.");
  }
  schema.fields.forEach((field) => {
    const key = field.key;
    if (!isEmpty(field.starting_value)) {
      npc.setFieldValue(key, field.starting_value);
      return;
    }
    if (isEmpty(field.source)) {
      npc.setFieldValue(key, field.defaultEmpty);
      return;
    }
    if (field.isArray()) {
      const value = [];
      const ct = field.count ? field.count : 1;
      for (let i = 0; i < ct; i++) {
        const result2 = tableRoller2.convertToken(field.source);
        value.push(typeResult(field, result2));
      }
      npc.setFieldValue(key, value);
      return;
    }
    const result = tableRoller2.convertToken(field.source);
    npc.setFieldValue(key, typeResult(field, result));
  });
};

// src/RandomNameError.js
var RandomNameError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "RandomNameError";
  }
};
var RandomNameError_default = RandomNameError;

// src/MarkovGenerator.js
var MarkovGenerator = class {
  /**
   *
   * @param {Object} memory the "memory" where the language parts go
   * @param {String} separator If you want to delimit the generated parts
   * @param {Number} order How many... something... to something.... oh it's been too long I don't remember how this works...
   */
  constructor({
    memory = {},
    separator = "",
    order = 2
  }) {
    this.memory = memory;
    this.separator = separator;
    this.order = order;
  }
  /**
   * Is the memory key already set.
   * @param {String} key
   */
  isMemoryKeySet(key) {
    return !!this.memory[key];
  }
  /**
   * Generate a starting array for the chain based on the order number
   * @return {Array} just an empty array of length=order
   */
  genInitial() {
    return Array(this.order).fill("");
  }
  /**
   * Get a random array element
   * @param {Array} arr an array
   * @return {String|Object} random value
   */
  getRandomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  /**
   * Chunk the word or phrase
   * @param {String} txt the text to chunk
   * @param {Function} cb callback function
   * @return {null} null
   */
  breakText(txt, cb) {
    const parts = txt.split(this.separator);
    const prev = this.genInitial();
    parts.forEach((v) => {
      v = v.toLowerCase();
      cb(prev, v);
      prev.shift();
      prev.push(v);
    });
    cb(prev, "");
  }
  /**
   * Feed text to memory
   * @param {String} key key for the chain (so we can store multiple memories)
   * @param {String} txt word or phrase
   * @return {null} null
   */
  learn(key, txt) {
    const mem = this.memory[key] ? this.memory[key] : {};
    this.breakText(txt, (key2, value) => {
      if (!mem[key2]) {
        mem[key2] = [];
      }
      mem[key2].push(value);
      return mem;
    });
    this.memory[key] = mem;
  }
  /**
   * Iterate through, calls self
   * @param {Array} state array of most recent x(x=order) elements in chain
   * @param {Array} ret the chain
   * @return {Array}
   */
  step(state, ret) {
    const nextAvailable = this.memory[this.cur_key][state] || [""];
    const next = this.getRandomValue(nextAvailable);
    if (!next) {
      return ret;
    }
    ret.push(next);
    const nextState = state.slice(1);
    nextState.push(next);
    return this.step(nextState, ret);
  }
  /**
   * Return a generated response
   * @param {String} key key for the chain (so we can store multiples
   * @param {Array} seed letters to start the response (?)
   */
  generate(key, seed) {
    if (!seed) {
      seed = this.genInitial();
    }
    this.cur_key = key;
    return seed.concat(this.step(seed, [])).join(this.separator);
  }
};
var MarkovGenerator_default = MarkovGenerator;

// src/RandomNameType.js
var RandomNameType = class {
  /**
   *
   * @param {String} key Key to identify uniquely in tokens and methods.
   * @param {String} label Human readable label.
   * @param {String[]} male Names.
   * @param {String[]} female Names.
   * @param {String[]} surname Names.
   */
  constructor({
    key = "",
    label = "",
    male = [],
    female = [],
    surname = []
  }) {
    this.key = key;
    this.label = label || key;
    this.male = Array.isArray(male) ? male : [];
    this.female = Array.isArray(female) ? female : [];
    this.surname = Array.isArray(surname) ? surname : [];
  }
  /**
   * Returns all personal names.
   * @returns {String[]}
   */
  getAllPersonalNames() {
    return Array.prototype.concat(this.male, this.female);
  }
  /**
   * Return a personal name list.
   * @param {String} gender Mixed, random, male, female
   * @returns {String[]}
   */
  getPersonalNameList(gender = "random") {
    if (gender === "mixed" || gender === "") {
      return this.getAllPersonalNames();
    }
    if (gender === "male") {
      return this.male;
    }
    if (gender === "female") {
      return this.female;
    }
    const randomList = [];
    if (this.male.length > 0) {
      randomList.push("male");
    }
    if (this.female.length > 0) {
      randomList.push("female");
    }
    if (randomList.length === 0) {
      return [];
    }
    gender = randomString(randomList);
    return this[gender];
  }
  /**
   * Custom JSON handler because Map doesn't JSON stringify automatically.
   * @returns {Object}
   */
  toJSON() {
    const obj = defaultToJSON.call(this);
    obj.className = "RandomNameType";
    return obj;
  }
};

// src/RandomNameGenerator.js
var capitalizeName = function(name) {
  if (!name) {
    return "";
  }
  const leave_lower = ["of", "the", "from", "de", "le", "la"];
  const parts = name.split(" ");
  const upper_parts = parts.map((w) => {
    return leave_lower.indexOf(w) >= 0 ? w : `${capitalize(w)}`;
  });
  return upper_parts.join(" ");
};
var RandomNameGenerator = class {
  /**
   * Random name generation.
   * @param {RandomNameType[]} namedata
   * @param {Number} [markovOrder=3] Markov generator settings.
   */
  constructor({
    namedata = [],
    markovOrder = 3
  }) {
    this.nameTypes = /* @__PURE__ */ new Map();
    if (Array.isArray(namedata)) {
      namedata.forEach((type) => {
        this.registerNameType(type);
      });
    }
    this._markov = new MarkovGenerator_default({ order: markovOrder });
  }
  /**
   * Add some name data
   * Note: you can overwrite existing name_types if you want
   * @param {RandomNameType} type
   * @throws {RandomNameError}
   */
  registerNameType(type) {
    if (!(type instanceof RandomNameType)) {
      throw new RandomNameError_default("Must be instance of RandomNameType");
    }
    if (!type.key) {
      throw new RandomNameError_default("RandomNameType must have key set.");
    }
    if (type.key === "random") {
      throw new RandomNameError_default(`RandomNameType key ${type.key} is reserved.`);
    }
    if (type.male.length === 0 && type.female.length === 0 && type.surname.length === 0) {
      throw new RandomNameError_default(`RandomNameType ${type.key} must include male, female, or surname lists.`);
    }
    this.nameTypes.set(type.key, type);
  }
  /**
   * Make sure namedata is set.
   * @param {String} name_type
   * @param {String} [subtype=''] Subtype like a gender or 'surname'
   * @throws RandomNameError
   */
  _validateNameType(name_type, subtype = "") {
    const type = this.nameTypes.get(name_type);
    if (!type) {
      throw new RandomNameError_default("Invalid name type.");
    }
    if (!subtype) {
      return;
    }
    if (!Array.isArray(type[subtype]) || type[subtype].length === 0) {
      throw new RandomNameError_default(`${name_type} type does not have subtype ${subtype}`);
    }
  }
  /**
   * Keys of the name types that are set.
   * @returns {String[]}
   */
  getValidNameTypes() {
    return Array.from(this.nameTypes.keys());
  }
  /**
   * Get a random name type from the available types.
   * @returns {String}
   */
  getRandomNameType() {
    return randomString(Array.from(this.nameTypes.keys())) || "";
  }
  /**
   * Get the name type
   * @param {String} name_type Name type key or random.
   * @returns {RandomNameType}
   * @throws {RandomNameError}
   */
  _getNameType(name_type) {
    if (name_type === "random") {
      name_type = this.getRandomNameType();
    }
    const nameType = this.nameTypes.get(name_type);
    if (!nameType) {
      throw new RandomNameError_default("Invalid name type.");
    }
    return nameType;
  }
  /**
   * Get a name list
   * @param {String} name_type
   * @param {String} subtype
   * @returns {String[]}
   */
  _getNameList(name_type = "random", subtype = "mixed") {
    const nameType = this._getNameType(name_type);
    if (subtype === "surname") {
      if (nameType.surname.length === 0) {
        throw new RandomNameError_default(`${name_type} type does not have subtype ${subtype}`);
      }
      return nameType.surname;
    }
    const list = nameType.getPersonalNameList(subtype);
    if (list.length === 0) {
      throw new RandomNameError_default(`${name_type} type does not have subtype ${subtype}`);
    }
    return list;
  }
  /**
   * Select a personal name from one of the lists.
   * @param {String} name_type what list/process to use, else random
   * @param {String} gender
   * @returns {String}
   * @throws {RandomNameError}
   */
  selectPersonalName(name_type = "random", gender = "random") {
    const nameList = this._getNameList(name_type, gender);
    return capitalizeName(randomString(nameList));
  }
  /**
   * Select a sur/last name only from one of the lists
   * @param {String} name_type what list/process to use, else random
   * @returns {String} a name
   * @throws {RandomNameError}
   */
  selectSurname(name_type = "random") {
    const nameList = this._getNameList(name_type, "surname");
    return capitalizeName(randomString(nameList));
  }
  /**
   * Select a name from one of the lists
   * @param {String} name_type What name list/process to use else random
   * @param {String} gender male, female, random, ''
   * @param {String} style first=first name only, else full name
   * @returns {String} a name
   * @throws {RandomNameError}
   */
  selectName(name_type = "random", gender = "random", style = "") {
    const nameType = this._getNameType(name_type);
    const personalNameList = nameType.getPersonalNameList(gender);
    if (personalNameList.length === 0) {
      throw new RandomNameError_default(`${nameType.key} does not have list for ${gender}`);
    }
    let name = capitalizeName(randomString(personalNameList));
    if (style !== "first" && nameType.surname.length > 0) {
      name += ` ${capitalizeName(randomString(nameType.surname))}`;
    }
    return name.trim();
  }
  /**
   * Create a personal name using markov chains.
   * @param {String} name_type what list/process to use, else random
   * @param {String} gender
   * @returns {String}
   * @throws {RandomNameError}
   */
  createPersonalName(name_type = "random", gender = "random") {
    const nameType = this._getNameType(name_type);
    const namelist = nameType.getPersonalNameList(gender);
    if (namelist.length === 0) {
      throw new RandomNameError_default("Starting name list is empty.");
    }
    const mkey = `${nameType.key}_${gender}`;
    if (!this._markov.isMemoryKeySet(mkey)) {
      namelist.forEach((v) => {
        this._markov.learn(mkey, v);
      });
    }
    return capitalizeName(this._markov.generate(mkey).trim());
  }
  /**
   * Create a sur/last name using markov chains.
   * @param {String} name_type what list/process to use, else random
   * @returns {String} a name
   * @throws {RandomNameError}
   */
  createSurName(name_type = "random") {
    const nameType = this._getNameType(name_type);
    const namelist = nameType.surname;
    if (namelist.length === 0) {
      throw new RandomNameError_default("Starting name list is empty.");
    }
    const skey = `${nameType.key}_surname`;
    if (!this._markov.isMemoryKeySet(skey)) {
      namelist.forEach((v) => {
        this._markov.learn(skey, v);
      });
    }
    return capitalizeName(this._markov.generate(skey).trim());
  }
  /**
   * Create a name using Markov chains
   * @param {String} [name_type=random] what list/process to use
   * @param {String} [gender=random] male or female or both
   * @param {String} style first=first name only, else full name
   * @returns {String} a name
   * @throws {RandomNameError}
   */
  createName(name_type = "random", gender = "random", style = "") {
    if (name_type === "random") {
      name_type = this.getRandomNameType();
    }
    let name = this.createPersonalName(name_type, gender);
    if (style !== "first") {
      name = `${name} ${this.createSurName(name_type)}`;
    }
    return name.trim();
  }
  /**
   * Generate a bunch of names, half male, half female
   * @param {Number} [number=10] number of names in the list (half will be male, half will be female)
   * @param {String} [name_type] type of name or else it will randomly select
   * @param {Bool} [create=false] new names or just pick from list
   * @return {Object} arrays of names inside male/female property
   * @throws {RandomNameError}
   */
  generateList(number = 10, name_type = "random", create = false) {
    const names = { male: [], female: [] };
    for (let i = 1; i <= number; i++) {
      const gender = i <= Math.ceil(number / 2) ? "male" : "female";
      if (create) {
        names[gender].push(this.createName(name_type, gender));
      } else {
        names[gender].push(this.selectName(name_type, gender));
      }
    }
    return names;
  }
  /**
   * Callback for the TableRoller to generate names from a token.
   * Token parts will be:
   * 0: "name" literally
   * 1: type of name (often a nationality/language/ethnicity/etc)
   * 2: gender ("male"/"female" for which name list to pick from, defaults to randomizing between them).
   * 3: style ("first" for a first name, else a full name will be returned)
   * @param {String[]} token_parts Parts of a token: 0 will be the action (name in most cases.)
   * @param {String} full_token Full token wrapped in double braces.
   * @param {RandomTable|null} curtable Current table token was found in (helpful if `this` token is found) or null
   * @returns {String}
   */
  nameTokenCallback(token_parts, full_token = "", curtable = null) {
    let string = "";
    if (!token_parts[1]) {
      token_parts[1] = "random";
    }
    if (!token_parts[3] || token_parts[3] !== "first") {
      token_parts[3] = "";
    }
    if (!token_parts[2]) {
      token_parts[2] = "random";
    }
    try {
      string = this.selectName(token_parts[1], token_parts[2], token_parts[3]);
    } catch (e) {
      if (e instanceof RandomNameError_default) {
        return "";
      } else {
        throw e;
      }
    }
    return string;
  }
};
var RandomNameGenerator_default = RandomNameGenerator;

// sample/names.js
var names_default = [
  {
    key: "cornish",
    label: "Cornish",
    male: [
      "Aedan",
      "Alan",
      "Anaoc",
      "Benesek",
      "Boult",
      "Branok",
      "Cadan",
      "Cador",
      "Carasek",
      "Carlyon",
      "Casvelyn",
      "Carne",
      "Clemow",
      "Colan",
      "Conan",
      "Corentyn",
      "Cubert",
      "Daveth",
      "Denzel",
      "Derrick",
      "Digory",
      "Dofagan",
      "Donyerth",
      "Edern",
      "Ennor",
      "Enyon",
      "Gawen",
      "Gerens",
      "Gorran",
      "Gurcant",
      "Gurcon",
      "Guriant",
      "Gryffyn",
      "Gwithyen",
      "Hammitt",
      "Hedrek",
      "Hedyn",
      "Hendra",
      "Howel",
      "Jacca",
      "Jago",
      "Jermyn",
      "Jory",
      "Jowan",
      "Keby",
      "Kenan",
      "Kenver",
      "Kenwyn",
      "Kernick",
      "Kevern",
      "Kitto",
      "Lanyon",
      "Lewyth",
      "Locryn",
      "Maban",
      "Madern",
      "Margh",
      "Massen",
      "Mawgan",
      "Medrod",
      "Melor",
      "Menadue",
      "Meriasek",
      "Merryn",
      "Morcum",
      "Myghal",
      "Nadelek",
      "Neythen",
      "Pasco",
      "Padern",
      "Pasco",
      "Peder",
      "Pedrek",
      "Penrice",
      "Perran",
      "Petrok",
      "Remfry",
      "Rowse",
      "Rewan",
      "Sithny",
      "Talan",
      "Talek",
      "Tomas",
      "Treyfusis",
      "Trelawney",
      "Tremayne",
      "Tresco",
      "Trethowan",
      "Teudar",
      "Treeve",
      "Trevelyan",
      "Tristan",
      "Tyack",
      "Ust",
      "Vyvyan",
      "Wella",
      "Wendron",
      "Yestin",
      "Ythel",
      "Zennor"
    ],
    female: [
      "Aedoc",
      "Arranza",
      "Anaguistl",
      "Bennath",
      "Berlewen",
      "Bersaba",
      "Beryan",
      "Blejan",
      "Bronnen",
      "Bryluen",
      "Caja",
      "Chesten",
      "Colenso",
      "Conwenna",
      "Crewenna",
      "Delen",
      "Demelza",
      "Derowen",
      "Ebrel",
      "Elestren",
      "Elowen",
      "Endellion",
      "Esyld",
      "Eva",
      "Ewella",
      "Hedra",
      "Jenna",
      "Genna",
      "Gloiucen",
      "Gunnoda",
      "Gwen",
      "Gwenna",
      "Gwennap",
      "Gwenneth",
      "Gwenno",
      "Gwenora",
      "Gwynne",
      "Ienipa",
      "Jena",
      "Jenifry",
      "Jowna",
      "Kayna",
      "Kelynen",
      "Kensa",
      "Kerensa",
      "Kerra",
      "Kew",
      "Lamorna",
      "Loveday",
      "Lowenna",
      "Mabryn",
      "Medguistl",
      "Mellyn",
      "Melwyn",
      "Melyor",
      "Meraud",
      "Merryn",
      "Morenwyn",
      "Morva",
      "Morvoren",
      "Morwenna",
      "Newlyna",
      "Onwen",
      "Pasca",
      "Rosen",
      "Rosenwyn",
      "Rosevear",
      "Senara",
      "Sidwella",
      "Sowena",
      "Steren",
      "Talwyn",
      "Tamsin",
      "Tanguistl",
      "Tecca",
      "Tegen",
      "Tressa",
      "Ursell",
      "Wenna",
      "Ygerna",
      "Ysella"
    ],
    surname: [
      "Ahearn",
      "Andrewartha",
      "Angove",
      "Anning",
      "Annear",
      "Arthur",
      "Baragwaneth",
      "Bastian",
      "Bell",
      "Berryman",
      "Blamey",
      "Boden",
      "Bolitho",
      "Bonython",
      "Bosanko",
      "Bray",
      "Brock",
      "Burrows",
      "Cass",
      "Causley",
      "Collis",
      "Chegwidden",
      "Chynoweth",
      "Climo",
      "Clews",
      "Colenso",
      "Colley",
      "Connor",
      "Couch",
      "Craddick",
      "Crago",
      "Crocker",
      "Curnow",
      "Deane",
      "Dobell",
      "Drew",
      "Eddy",
      "Endean",
      "Ellery",
      "Ellis",
      "Elliott",
      "Evans",
      "Faull",
      "Fenton",
      "Frayne",
      "Fry",
      "Gay",
      "Geake",
      "Gee",
      "Glasson",
      "Godden",
      "Goldsworthy",
      "Goninan",
      "Goss",
      "Grose",
      "Grigg",
      "Gundry",
      "Hain",
      "Hale",
      "Hancock",
      "Hannaford",
      "Hart",
      "Hannah",
      "Harvey",
      "Hawke",
      "Hellyer",
      "Hendry",
      "Hocking",
      "Hoskins",
      "Hutchens",
      "Inch",
      "Isbel",
      "Jago",
      "James",
      "Jewell",
      "Johns",
      "Joliffe",
      "Jolly",
      "Jory",
      "Julian",
      "Keast",
      "Keen",
      "Kemp",
      "Kent",
      "Kersey",
      "Kinsey",
      "Kirby",
      "Kitto",
      "Laity",
      "Lander",
      "Lowry",
      "Lean",
      "Leggo",
      "Lock",
      "Lyon",
      "May",
      "Mayne",
      "Menadue",
      "Moon",
      "Moyle",
      "Mundey",
      "Nance",
      "Nankervis",
      "Negus",
      "Nicholls",
      "Odgers",
      "Oates",
      "Olver",
      "Pascoe",
      "Pawley",
      "Perrin",
      "Phillips",
      "Prowse",
      "Quick",
      "Rickard",
      "Roach",
      "Roberts",
      "Rodgers",
      "Rodda",
      "Rouse",
      "Sara",
      "Sanders",
      "Skewes",
      "Symons",
      "Stevens",
      "Tangye",
      "Teague",
      "Terrill",
      "Thorne",
      "Tonkin",
      "Truscott",
      "Tyack",
      "Uren",
      "Veale",
      "Vivian",
      "Vosper",
      "Voss",
      "Warren",
      "Warne"
    ]
  },
  {
    key: "flemish",
    label: "Flemish",
    male: [
      "Adam",
      "Adolf",
      "Aio",
      "Albern",
      "Alem",
      "Alting",
      "Andree",
      "Anno",
      "Arnold",
      "Ato",
      "Baderic",
      "Baldric",
      "Bartold",
      "Benno",
      "Bern",
      "Bero",
      "Baldwin",
      "Bono",
      "Brio",
      "Conrad",
      "Constantin",
      "Dagmar",
      "Dietmar",
      "Diggo",
      "Ebberich",
      "Ecco",
      "Egmund",
      "Ello",
      "Emeric",
      "Eric",
      "Eoban",
      "Etto",
      "Falko",
      "Fastrad",
      "Finn",
      "Folmar",
      "Franco",
      "Gaiko",
      "Gerald",
      "Getti",
      "Gregorio",
      "Gunther",
      "Henryk",
      "Herman",
      "Hiddo",
      "Hige",
      "Hubert",
      "Iger",
      "Immo",
      "Io",
      "Isaac",
      "Iwain",
      "Jalo",
      "Johannes",
      "Knut",
      "Kraft",
      "Laurentius",
      "Lela",
      "Liopold",
      "Limmo",
      "Ludbert",
      "Manno",
      "Martino",
      "Mauricius",
      "Meiner",
      "Menfrid",
      "Meno",
      "Nandino",
      "Norbert",
      "Odric",
      "Oleman",
      "Otto",
      "Pappo",
      "Paio",
      "Petrus",
      "Rainer",
      "Rette",
      "Richard",
      "Robbert",
      "Rupert",
      "Rutger",
      "Salomon",
      "Saxan",
      "Selo",
      "Sibert",
      "Sicco",
      "Simon",
      "Stefan",
      "Tammo",
      "Tete",
      "Theodi",
      "Tibbe",
      "Tiego",
      "Udo",
      "Waldo",
      "Walther",
      "Wana",
      "Waszo",
      "Wenzo",
      "Wilbrand",
      "Willem",
      "Windelmar",
      "Wolber"
    ],
    female: [
      "Adela",
      "Agatha",
      "Agnes",
      "Aia",
      "Alda",
      "Aldwi",
      "Ama",
      "Ava",
      "Benedicta",
      "Betta",
      "Berta",
      "Dida",
      "Enna",
      "Erlinda",
      "Ermina",
      "Evergerd",
      "Fida",
      "Fokka",
      "Gela",
      "Gertrude",
      "Ghisela",
      "Gutha",
      "Heiga",
      "Helena",
      "Hema",
      "Hera",
      "Ide",
      "Ige",
      "Imma",
      "Iudith",
      "Laurentia",
      "Ligef",
      "Luva",
      "Machtild",
      "Maga",
      "Megina",
      "Menika",
      "Murina",
      "Notha",
      "Oda",
      "Ogiva",
      "Olge",
      "Oza",
      "Sita",
      "Sophia",
      "Suvi",
      "Susanne",
      "Tetta",
      "Tiada",
      "Uda",
      "Wela",
      "Yolande"
    ],
    surname: [
      "Claes",
      "de Vroom",
      "Franke",
      "Goossens",
      "Joossens",
      "Maes",
      "Merckx",
      "Mertens",
      "Peeters",
      "Slootmaekers",
      "Tillens",
      "Vandroogenbroeck",
      "Van Rompuy",
      "Vermeulen",
      "Vervloet",
      "Vroom",
      "Vroomen"
    ]
  },
  {
    key: "dutch",
    label: "Dutch",
    male: [
      "Aart",
      "Abe",
      "Abraham",
      "Ad",
      "Adam",
      "Ade",
      "Adelbert",
      "Adolf",
      "Adriaan",
      "Adrianus",
      "Albert",
      "Aldert",
      "Alex",
      "Alexander",
      "Alfons",
      "Alfred",
      "Aloysius",
      "Alwin",
      "Ambroos",
      "Andreas",
      "Andries",
      "Anton",
      "Antonie",
      "Antonius",
      "Antoon",
      "Arend",
      "Arie",
      "Arjan",
      "Arnoud",
      "Arthur",
      "Augustijn",
      "Augustus",
      "Bart",
      "Bartel",
      "Bartholomeus",
      "Bas",
      "Bastiaan",
      "Ben",
      "Benedictus",
      "Benjamin",
      "Bernhard",
      "Bert",
      "Bob",
      "Bonifaas",
      "Boudewijn",
      "Braam",
      "Bram",
      "Brecht",
      "Broos",
      "Cas",
      "Casper",
      "Cees",
      "Chris",
      "Christiaan",
      "Christoffel",
      "Cobus",
      "Constantijn",
      "Coos",
      "Cornelis",
      "Cornelius",
      "Corn\xE9",
      "Daan",
      "Damiaan",
      "Damian",
      "Dani\xEBl",
      "David",
      "Dennis",
      "Dick",
      "Diede",
      "Diederick",
      "Diederik",
      "Dirk",
      "Dominicus",
      "Ed",
      "Eduard",
      "Edwin",
      "Egbert",
      "Elbert",
      "Elia",
      "Elian",
      "Emerens",
      "Erik",
      "Ernst",
      "Erwin",
      "Esm\xE9",
      "Ewoud",
      "Ewout",
      "Faas",
      "Fabian",
      "Felix",
      "Femme",
      "Ferdi",
      "Ferdinand",
      "Filibert",
      "Filip",
      "Filippus",
      "Flip",
      "Floor",
      "Floris",
      "Fons",
      "Franciscus",
      "Frank",
      "Frans",
      "Fred",
      "Frederik",
      "Freek",
      "Frits",
      "Funs",
      "Funske",
      "Gabri\xEBl",
      "Geert",
      "Gerard",
      "Gerben",
      "Gerd",
      "Gerhard",
      "Gerlach",
      "Gerlof",
      "Gerolf",
      "Gerolt",
      "Gerrit",
      "Gerry",
      "Gert",
      "Gijs",
      "Gijsbert",
      "Gilbert",
      "Gillis",
      "Godfried",
      "Gustaaf",
      "Guus",
      "Hannes",
      "Hans",
      "Harm",
      "Heiko",
      "Hein",
      "Hendrik",
      "Henk",
      "Hennie",
      "Henny",
      "Henricus",
      "Herman",
      "Hermanus",
      "Hieronymus",
      "Hubert",
      "Hubertus",
      "Hubrecht",
      "Hugo",
      "Huub",
      "Ignaas",
      "Inge",
      "Ivo",
      "Iza\xE4k",
      "Jaap",
      "Jacob",
      "Jacobus",
      "Jakob",
      "Jan",
      "Jasper",
      "Jef",
      "Jelle",
      "Jeroen",
      "Jesse",
      "Job",
      "Jochem",
      "Jodocus",
      "Joep",
      "Joeri",
      "Johan",
      "Johannes",
      "Jonas",
      "Jonathan",
      "Joop",
      "Joord",
      "Joos",
      "Joost",
      "Jordaan",
      "Joris",
      "Jos",
      "Josephus",
      "Jozef",
      "Jozua",
      "Jo\xEBl",
      "Judocus",
      "Jurgen",
      "Jurriaan",
      "Justus",
      "Kai",
      "Karel",
      "Kasper",
      "Kees",
      "Kerneels",
      "Kevin",
      "Klaas",
      "Kobe",
      "Kobus",
      "Koen",
      "Koenraad",
      "Koert",
      "Koos",
      "Lambert",
      "Lammert",
      "Lars",
      "Lau",
      "Laurens",
      "Leo",
      "Leonard",
      "Leopold",
      "Levi",
      "Lex",
      "Lieven",
      "Lievin",
      "Lodewijk",
      "Louis",
      "Lourens",
      "Lowie",
      "Lucas",
      "Ludger",
      "Ludo",
      "Ludolf",
      "Luuk",
      "Maarten",
      "Maas",
      "Maikel",
      "Manfred",
      "Mannes",
      "Marcel",
      "Marco",
      "Marijn",
      "Marinus",
      "Marius",
      "Mark",
      "Marnix",
      "Marten",
      "Martijn",
      "Matthias",
      "Matthijs",
      "Maurits",
      "Max",
      "Maximiliaan",
      "Mees",
      "Meindert",
      "Meine",
      "Meino",
      "Meint",
      "Melchior",
      "Menno",
      "Michael",
      "Micha\xEBl",
      "Michel",
      "Michiel",
      "Mick",
      "Milan",
      "Minke",
      "Mozes",
      "Nick",
      "Nico",
      "Nicolaas",
      "Niek",
      "Niels",
      "Nikolaas",
      "Norbert",
      "Olaf",
      "Olivier",
      "Otto",
      "Pascal",
      "Paul",
      "Pauwel",
      "Pepijn",
      "Peter",
      "Petrus",
      "Philip",
      "Pier",
      "Piet",
      "Pieter",
      "Pim",
      "Puck",
      "Quinten",
      "Quirijn",
      "Radboud",
      "Raf",
      "Rafa\xEBl",
      "Rein",
      "Reinier",
      "Reinout",
      "Rembrandt",
      "Rens",
      "Richard",
      "Rien",
      "Rik",
      "Rob",
      "Robbe",
      "Robert",
      "Robin",
      "Robrecht",
      "Rochus",
      "Rodolf",
      "Roel",
      "Roeland",
      "Roelof",
      "Rogier",
      "Roy",
      "Ruben",
      "Rudolf",
      "Rupert",
      "Rutger",
      "Ruud",
      "Sander",
      "Sebastiaan",
      "Sem",
      "Servaas",
      "Siem",
      "Siemen",
      "Sieuwerd",
      "Simon",
      "Sjaak",
      "Sjakie",
      "Sjef",
      "Sjoerd",
      "Sjors",
      "Staas",
      "Stef",
      "Stefan",
      "Stefanus",
      "Steffen",
      "Sten",
      "Stephan",
      "Steven",
      "Stijn",
      "Sven",
      "Teun",
      "Teunis",
      "Theo",
      "Theodoor",
      "Theodorus",
      "Theofilus",
      "Theun",
      "Theunis",
      "Thijmen",
      "Thijs",
      "Thomas",
      "Tiede",
      "Ties",
      "Tijmen",
      "Tijn",
      "Tim",
      "Timon",
      "Timotheus",
      "Tjaard",
      "Tjeerd",
      "Tom",
      "Ton",
      "Toon",
      "Tuur",
      "Tygo",
      "Valentijn",
      "Vincent",
      "Wendel",
      "Wendelin",
      "Werner",
      "Wessel",
      "Wibo",
      "Wiebe",
      "Wil",
      "Wilbert",
      "Willem",
      "Willy",
      "Wim",
      "Wob",
      "Wouter",
      "Wubbe",
      "Xander",
      "Yorick",
      "Yvo",
      "Zef"
    ],
    female: [
      "Adelheid",
      "Agnes",
      "Albertina",
      "Aldegonda",
      "Aleid",
      "Aleida",
      "Alexandra",
      "Alida",
      "Amalia",
      "Amanda",
      "Amber",
      "Amelia",
      "Angela",
      "Angelien",
      "Angelina",
      "Angelique",
      "Anika",
      "Anita",
      "Anke",
      "Anna",
      "Annabel",
      "Anne",
      "Anneke",
      "Annelien",
      "Annelies",
      "Anneliese",
      "Annemarie",
      "Annika",
      "Anouk",
      "Ans",
      "Antje",
      "Antonia",
      "Ariane",
      "Augusta",
      "Beatrix",
      "Bente",
      "Betje",
      "Brechtje",
      "Brigitta",
      "Carla",
      "Carola",
      "Carolien",
      "Caroline",
      "Catharina",
      "Cato",
      "Cecilia",
      "Chantal",
      "Charlotte",
      "Christina",
      "Christine",
      "Cilla",
      "Claudia",
      "Coba",
      "Cokkie",
      "Cornelia",
      "Corrie",
      "C\xE9cile",
      "Daphne",
      "Debora",
      "Denise",
      "Diana",
      "Diantha",
      "Dora",
      "Dorothea",
      "Drika",
      "Edith",
      "Eleonora",
      "Elisabeth",
      "Elise",
      "Elke",
      "Ellen",
      "Elly",
      "Elma",
      "Els",
      "Else",
      "Elsje",
      "Emma",
      "Emmy",
      "Esm\xE9e",
      "Esther",
      "Eva",
      "Evelien",
      "Eveline",
      "Febe",
      "Felicia",
      "Feline",
      "Femke",
      "Filomena",
      "Fleur",
      "Fleurette",
      "Floortje",
      "Florina",
      "Gabri\xEBlle",
      "Geertje",
      "Geertruida",
      "Gemma",
      "Georgina",
      "Gerarda",
      "Gerda",
      "Gerdina",
      "Gertie",
      "Gertrude",
      "Gertruida",
      "Gilberta",
      "Gisela",
      "Godelieve",
      "Greet",
      "Greetje",
      "Griet",
      "Gusta",
      "Hadewych",
      "Hanna",
      "Hannah",
      "Hanne",
      "Hannie",
      "Hedy",
      "Heike",
      "Heintje",
      "Heleen",
      "Heleentje",
      "Helena",
      "Helma",
      "Hendrika",
      "Hendrikje",
      "Hendrina",
      "Henrietta",
      "Henriette",
      "Henri\xEBtte",
      "Hilda",
      "Hilde",
      "Ida",
      "Ilse",
      "Ima",
      "Ina",
      "Irena",
      "Iris",
      "Isa",
      "Isabella",
      "Isabelle",
      "Jacintha",
      "Jacoba",
      "Jacobina",
      "Jacobine",
      "Jacomina",
      "Jana",
      "Janna",
      "Janneke",
      "Jantine",
      "Jantje",
      "Jasmijn",
      "Jeltje",
      "Jeltsje",
      "Jennigje",
      "Jet",
      "Jetta",
      "Jette",
      "Jo",
      "Johanna",
      "Johanneke",
      "Jolanda",
      "Jozefien",
      "Julia",
      "Juliana",
      "Justine",
      "Karin",
      "Katelijn",
      "Katelijne",
      "Katinka",
      "Katja",
      "Katrien",
      "Katrijn",
      "Katrina",
      "Klasina",
      "Klazina",
      "Kunigonde",
      "Lara",
      "Laura",
      "Laurie",
      "Lea",
      "Lieke",
      "Lien",
      "Lies",
      "Liesbeth",
      "Liese",
      "Liesje",
      "Lieve",
      "Lijsbeth",
      "Linda",
      "Lisa",
      "Lisanne",
      "Liselot",
      "Loes",
      "Lotte",
      "Louisa",
      "Louise",
      "Luus",
      "Lysanne",
      "Maaike",
      "Maartje",
      "Machteld",
      "Madelief",
      "Magda",
      "Magdalena",
      "Manon",
      "Margareta",
      "Margaretha",
      "Margreet",
      "Margriet",
      "Maria",
      "Marianne",
      "Marieke",
      "Marijke",
      "Marijse",
      "Marike",
      "Marilou",
      "Marina",
      "Mariska",
      "Marita",
      "Mari\xEBtte",
      "Marja",
      "Marjan",
      "Marjolein",
      "Marjolijn",
      "Marleen",
      "Marlies",
      "Marloes",
      "Martina",
      "Martine",
      "Mathilde",
      "Maud",
      "Mechteld",
      "Meike",
      "Meintje",
      "Melanie",
      "Melissa",
      "Mia",
      "Michelle",
      "Mieke",
      "Mien",
      "Miep",
      "Mies",
      "Mina",
      "Mirjam",
      "Mirthe",
      "Myrthe",
      "Nes",
      "Neske",
      "Nicole",
      "Nicolet",
      "Nicoline",
      "Noor",
      "Noortje",
      "Nora",
      "Paula",
      "Paulien",
      "Petra",
      "Petronella",
      "Pietronella",
      "Prisca",
      "Rachel",
      "Rebekka",
      "Renate",
      "Ren\xE9e",
      "Ria",
      "Rika",
      "Rina",
      "Roos",
      "Roosje",
      "Rosa",
      "Rosanne",
      "Sabien",
      "Samantha",
      "Sandra",
      "Sanne",
      "Sara",
      "Saskia",
      "Silke",
      "Sofie",
      "Sophie",
      "Stefana",
      "Stefanie",
      "Sterre",
      "Stien",
      "Susanna",
      "Tamara",
      "Teuna",
      "Thera",
      "Theresia",
      "Thirza",
      "Thyrza",
      "Til",
      "Tina",
      "Tineke",
      "Trees",
      "Trijntje",
      "Trudie",
      "Trudy",
      "Truus",
      "Ursula",
      "Vanessa",
      "Veer",
      "Veerke",
      "Vera",
      "Wilhelmina",
      "Willemijn",
      "Willemina",
      "Wilma",
      "Xandra",
      "Yvonne",
      "Zo\xEB"
    ],
    surname: [
      "Aafjes",
      "Aaij",
      "Aakster",
      "Aaldenberg",
      "Aalders",
      "Aalfs",
      "Aalmers",
      "Aaltink",
      "Aarden",
      "Aarens",
      "Aarle",
      "Aarse",
      "Aarts",
      "Aartsen",
      "Aartsma",
      "Abbes",
      "Abbing",
      "Abbingh",
      "Abbink",
      "Abel",
      "Abelen",
      "Abels",
      "Aben",
      "Abraham",
      "Abrahams",
      "Abram",
      "Abrams",
      "Abspoel",
      "Abt",
      "Achilles",
      "Achterberg",
      "Achterkamp",
      "Achterop",
      "Acker",
      "Addens",
      "Addicks",
      "Addiks",
      "Adema",
      "Admiraal",
      "Adolfs",
      "Adriaans",
      "Adriaansen",
      "Adrichem",
      "Aerssens",
      "Agema",
      "Agterop",
      "Agthoven",
      "Ahlers",
      "Aikema",
      "Akker",
      "Akkerman",
      "Akkermans",
      "Akkersdijk",
      "Alberda",
      "Alberdink",
      "Alberink",
      "Albers",
      "Albersnagel",
      "Alberts",
      "Albring",
      "Albronda",
      "Aldenberg",
      "Aldenkamp",
      "Alderliesten",
      "Alders",
      "Aldershof",
      "Alferdinck",
      "Alferink",
      "Alfons",
      "Aling",
      "Alink",
      "Alkema",
      "Alles",
      "Alma",
      "Altena",
      "Althaus",
      "Althuis",
      "Alting",
      "Altink",
      "Amsing",
      "Ananias",
      "Andela",
      "Andries",
      "Andriessen",
      "Andringa",
      "Angenent",
      "Anholts",
      "Anker",
      "Anneijes",
      "Annevelink",
      "Antema",
      "Antonis",
      "Antonise",
      "Antonisen",
      "Antuma",
      "Aperlo",
      "Appeldoorn",
      "Appelhof",
      "Appelo",
      "Apperlo",
      "Arbeid",
      "Arbeider",
      "Arbeit",
      "Arendonk",
      "Arends",
      "Arendse",
      "Arendsen",
      "Arents",
      "Arentz",
      "Ariesen",
      "Arissen",
      "Arkema",
      "Arkes",
      "Arntz",
      "Arntzen",
      "Arntzenius",
      "Artz",
      "Asjes",
      "Askes",
      "Asselman",
      "Assenberg",
      "Assendorp",
      "Assies",
      "Assink",
      "Atses",
      "Atsma",
      "Aukema",
      "Aukes",
      "Averesch",
      "Aveskamp",
      "Baaiman",
      "Baak",
      "Baanders",
      "Baardwijk",
      "Baars",
      "Baarsma",
      "Baart",
      "Baas",
      "Baasch",
      "Baker",
      "Bakhuizen",
      "Bakker",
      "Banner",
      "Barends",
      "Benscoter",
      "Beringer",
      "Beulen",
      "Beulens",
      "Beullens",
      "Beumers",
      "Bezuidenhout",
      "Boer",
      "Boerefijn",
      "Boon",
      "Bootsma",
      "Borst",
      "Bosch",
      "Bouwmeester",
      "Braband",
      "Brams",
      "Brinkerhoff",
      "Bul",
      "Bulle",
      "Bullens",
      "Carl",
      "Carman",
      "Ceelen",
      "Claasen",
      "Claes",
      "Clark",
      "Cloet",
      "Cloeten",
      "Coeman",
      "Coemans",
      "Coenen",
      "Colijn",
      "Coolen",
      "Couman",
      "Coumans",
      "Crusan",
      "Cuijper",
      "Cuijpers",
      "Cuyper",
      "Cuypers",
      "Daalman",
      "Daalmans",
      "Daelman",
      "Daelmans",
      "Dahl",
      "Dahlman",
      "Dahlmans",
      "Daube",
      "De Cloet",
      "De Groot",
      "De Haven",
      "De Jonckheer",
      "De Jonker",
      "De Klerk",
      "De Kloet",
      "De Snaaijer",
      "De Snaijer",
      "De Veen",
      "De Ven",
      "De Vroom",
      "De Vroome",
      "De Wit",
      "De With",
      "De Witt",
      "De Witte",
      "Derichs",
      "Dierickx",
      "Dirchs",
      "Dircks",
      "Dircksens",
      "Dirckx",
      "Diriks",
      "Dirix",
      "Dirks",
      "Dirkse",
      "Dirksen",
      "Dirkx",
      "Drees",
      "Dreese",
      "Dreesen",
      "Dreesens",
      "Dreessen",
      "Dreessens",
      "Dreyer",
      "Dries",
      "Driessen",
      "Dykstra",
      "Eerkens",
      "Eikenboom",
      "Elzinga",
      "Erckens",
      "Erkens",
      "Evers",
      "Flipse",
      "Flipsen",
      "Fortuin",
      "Fortuyn",
      "Franke",
      "Geelen",
      "Geelens",
      "Geels",
      "Gelen",
      "Gelens",
      "Goossens",
      "Haak",
      "Haanraads",
      "Haanraadts",
      "Haanraats",
      "Haanrath",
      "Haas",
      "Haenraats",
      "Haenraets",
      "Hanraets",
      "Hansen",
      "Hase",
      "Haumann",
      "Heeren",
      "Heijman",
      "Heijmans",
      "Heiman",
      "Heimans",
      "Hendriks",
      "Hendrikx",
      "Hendrix",
      "Herbert",
      "Herberts",
      "Herman",
      "Herrema",
      "Heyman",
      "Heymans",
      "Hoedemaeker",
      "Hoedemaekers",
      "Hoedemaker",
      "Hoedemakers",
      "Hofwegen",
      "Holst",
      "Holt",
      "Holtman",
      "Houben",
      "Houtkooper",
      "Houtman",
      "Hummel",
      "Jacobs",
      "Jacobse",
      "Jacobson",
      "Jans",
      "Jansen",
      "Jansens",
      "Jansing",
      "Jansingh",
      "Jansink",
      "Janssen",
      "Janssens",
      "Janz",
      "Janzen",
      "Joncker",
      "Jonckers",
      "Jonckersen",
      "Jonckheer",
      "Jonker",
      "Jonkers",
      "Joossens",
      "Joosten",
      "Kappel",
      "Karl",
      "Kikkert",
      "King",
      "Klein",
      "Klerk",
      "Klerken",
      "Klerks",
      "Klerkse",
      "Klerkx",
      "Klerx",
      "Kloet",
      "Kloeten",
      "Kloeter",
      "Koeman",
      "Koemans",
      "Kolen",
      "Kolijn",
      "Kollen",
      "Koning",
      "Kool",
      "Koole",
      "Koolen",
      "Kools",
      "Kouman",
      "Koumans",
      "Krantz",
      "Kranz",
      "Krusen",
      "Kuijpers",
      "Kuiper",
      "Kuipers",
      "Langbroek",
      "Lauwens",
      "Lauwers",
      "Leeuwenhoek",
      "Lucas",
      "Lucassen",
      "Lyon",
      "Maas",
      "Maes",
      "Maessen",
      "Marquering",
      "Marqueringh",
      "Marquerink",
      "Mas",
      "Meeuwe",
      "Meeuwes",
      "Meeuwessen",
      "Meeuweszen",
      "Meeuwis",
      "Meeuwissen",
      "Meeuwsen",
      "Meisner",
      "Meissner",
      "Merckx",
      "Mertens",
      "Michel",
      "Miller",
      "Mohren",
      "Moore",
      "Mooren",
      "Mulder",
      "Muyskens",
      "Nagel",
      "Nelissen",
      "Nifterick",
      "Nifterik",
      "Niftrik",
      "Offermans",
      "Ogterop",
      "Oomen",
      "Oorschot",
      "Otten",
      "Pander",
      "Panders",
      "Paulis",
      "Paulissen",
      "Peerenboom",
      "Peeters",
      "Pender",
      "Peter",
      "Peters",
      "Peusen",
      "Philips",
      "Prinsen",
      "Rademaker",
      "Rademakers",
      "Ramaaker",
      "Ramaker",
      "Ramakers",
      "Ramecker",
      "Rameckers",
      "Rask",
      "Raske",
      "Reijnder",
      "Reijnders",
      "Reinder",
      "Reinders",
      "Reynder",
      "Reynders",
      "Richard",
      "Rietveld",
      "Rijnder",
      "Rijnders",
      "Robert",
      "Roggeveen",
      "Roijacker",
      "Roijackers",
      "Roijakker",
      "Roijakkers",
      "Romeijn",
      "Romeijnders",
      "Romeijnsen",
      "Romijn",
      "Romijnders",
      "Romijnsen",
      "Rompa",
      "Rooiakker",
      "Rooiakkers",
      "Rooijakker",
      "Rooijakkers",
      "Roosa",
      "Roosevelt",
      "Rutten",
      "Ryskamp",
      "Samson",
      "Sanna",
      "Schenck",
      "Schermer",
      "Schneider",
      "Schneiders",
      "Schneijder",
      "Schneijders",
      "Schoonenburg",
      "Schoonraad",
      "Schoorel",
      "Schoorl",
      "Schorel",
      "Schrijnemakers",
      "Schuyler",
      "Schwarzenberg",
      "Seeger",
      "Seegers",
      "Seelen",
      "Segers",
      "Segher",
      "Seghers",
      "Severijns",
      "Severins",
      "Sevriens",
      "Silje",
      "Simon",
      "Simonis",
      "Slootmaekers",
      "Smeets",
      "Smets",
      "Smit",
      "Smits",
      "Snaaijer",
      "Snaijer",
      "Sneiders",
      "Sneijder",
      "Sneijders",
      "Sneijer",
      "Sneijers",
      "Snell",
      "Snider",
      "Sniders",
      "Snijder",
      "Snijders",
      "Snyder",
      "Snyders",
      "Specht",
      "Spijker",
      "Ter Avest",
      "Teunissen",
      "Theunissen",
      "Tholberg",
      "Thomas",
      "Tillens",
      "Tunison",
      "Tunneson",
      "Van Aalsburg",
      "Van Aalst",
      "Van Aarle",
      "Van Achteren",
      "Van Achthoven",
      "Van Adrichem",
      "Van Aggelen",
      "Van Agteren",
      "Van Agthoven",
      "Van Akkeren",
      "Van Aller",
      "Van Alphen",
      "Van Alst",
      "Van Altena",
      "Van Althuis",
      "Van Amelsvoort",
      "Van Amersvoort",
      "Van Amstel",
      "Van Andel",
      "Van Andringa",
      "Van Ankeren",
      "Van Antwerp",
      "Van Antwerpen",
      "Van Apeldoorn",
      "Van Arendonk",
      "Van As",
      "Van Asch",
      "Van Assen",
      "Van Baarle",
      "Van Bokhoven",
      "Van Breda",
      "Van Bueren",
      "Van Buggenum",
      "Van Buiren",
      "Van Buren",
      "Van Can",
      "Van Cann",
      "Van Canne",
      "Van Daal",
      "Van Daalen",
      "Van Dael",
      "Van Daele",
      "Van Dale",
      "Van Dalen",
      "Van De Laar",
      "Van De Vliert",
      "Van Den Akker",
      "Van Den Andel",
      "Van Denend",
      "Van Der Aart",
      "Van Der As",
      "Van Der Beek",
      "Van Der Berg",
      "Van Der Hout",
      "Van Der Laar",
      "Van Der See",
      "Van Der Stoep",
      "Van Der Veen",
      "Van Der Ven",
      "Van Der Venn",
      "Van Der Venne",
      "Van Der Vennen",
      "Van Der Zee",
      "Van Donk",
      "Van Haanraads",
      "Van Haanraats",
      "Van Haanrade",
      "Van Haanrath",
      "Van Haenraats",
      "Van Haenraets",
      "Van Hanraets",
      "Van Hassel",
      "Van Hautem",
      "Van Hautum",
      "Van Heel",
      "Van Herten",
      "Van Hofwegen",
      "Van Horn",
      "Van Hout",
      "Van Houte",
      "Van Houtem",
      "Van Houten",
      "Van Houttum",
      "Van Houtum",
      "Van Kan",
      "Van Kann",
      "Van Kanne",
      "Van Laar",
      "Van Laren",
      "Van Leeuwenhoeck",
      "Van Leeuwenhoek",
      "Van Middelburg",
      "Van Middlesworth",
      "Van Nifterick",
      "Van Nifterik",
      "Van Niftrik",
      "Van Ogtrop",
      "Van Oirschot",
      "Van Oirschotten",
      "Van Oorschot",
      "Van Ophoven",
      "Van Peij",
      "Van Pey",
      "Van Rompa",
      "Van Rompaeij",
      "Van Rompaey",
      "Van Rompaij",
      "Van Rompay",
      "Van Rompaye",
      "Van Rompu",
      "Van Rompuy",
      "Van Rossem",
      "Van Rossum",
      "Van Rumpade",
      "Van Schoorel",
      "Van Schoorl",
      "Vandale",
      "Vandroogenbroeck",
      "Vann",
      "Vroom"
    ]
  },
  {
    key: "japanese",
    label: "Japanese",
    female: [
      "ai",
      "aiko",
      "aimi",
      "aina",
      "airi",
      "akane",
      "akemi",
      "aki",
      "akiko",
      "akira",
      "ami",
      "aoi",
      "asuka",
      "atsuko",
      "aya",
      "ayaka",
      "ayako",
      "ayame",
      "ayane",
      "ayano",
      "chika",
      "chikako",
      "chinatsu",
      "chiyo",
      "chiyoko",
      "cho",
      "chou",
      "chouko",
      "emi",
      "etsuko",
      "hana",
      "hanako",
      "haru",
      "haruka",
      "haruko",
      "haruna",
      "hikari",
      "hikaru",
      "hina",
      "hinata",
      "hiroko",
      "hitomi",
      "honoka",
      "hoshi",
      "hoshiko",
      "hotaru",
      "izumi",
      "junko",
      "kaede",
      "kanon",
      "kaori",
      "kaoru",
      "kasumi",
      "kazue",
      "kazuko",
      "keiko",
      "kiku",
      "kimiko",
      "kiyoko",
      "kohaku",
      "koharu",
      "kokoro",
      "kotone",
      "kumiko",
      "kyo",
      "kyou",
      "mai",
      "makoto",
      "mami",
      "manami",
      "mao",
      "mariko",
      "masami",
      "masuyo",
      "mayu",
      "megumi",
      "mei",
      "michi",
      "michiko",
      "midori",
      "mika",
      "miki",
      "miku",
      "minako",
      "minato",
      "mio",
      "misaki",
      "mitsuko",
      "miu",
      "miyako",
      "miyu",
      "mizuki",
      "moe",
      "momoka",
      "momoko",
      "moriko",
      "nana",
      "nanami",
      "naoko",
      "naomi",
      "natsuki",
      "natsuko",
      "natsumi",
      "noa",
      "noriko",
      "ran",
      "rei",
      "ren",
      "riko",
      "rin",
      "rina",
      "rio",
      "sachiko",
      "saki",
      "sakura",
      "sakurako",
      "satomi",
      "sayuri",
      "setsuko",
      "shinju",
      "shinobu",
      "shiori",
      "shizuka",
      "shun",
      "sora",
      "sumiko",
      "suzu",
      "suzume",
      "takako",
      "takara",
      "tamiko",
      "tomiko",
      "tomoko",
      "tomomi",
      "tsubaki",
      "tsubame",
      "tsubasa",
      "tsukiko",
      "ume",
      "umeko",
      "wakana",
      "yasu",
      "yoko",
      "yoshi",
      "yoshiko",
      "youko",
      "yua",
      "yui",
      "yuina",
      "yuki",
      "yukiko",
      "yuko",
      "yumi",
      "yumiko",
      "yuri",
      "yuu",
      "yuuka",
      "yuuki",
      "yuuko",
      "yuuna",
      "yuzuki"
    ],
    male: [
      "akio",
      "akira",
      "aoi",
      "arata",
      "ayumu",
      "daichi",
      "daiki",
      "daisuke",
      "goro",
      "gorou",
      "hachiro",
      "hachirou",
      "haru",
      "haruki",
      "haruto",
      "hayate",
      "hayato",
      "hibiki",
      "hideaki",
      "hideki",
      "hideyoshi",
      "hikaru",
      "hinata",
      "hiraku",
      "hiroshi",
      "hiroto",
      "hotaka",
      "ichiro",
      "ichirou",
      "isamu",
      "itsuki",
      "jiro",
      "jirou",
      "juro",
      "jurou",
      "kaede",
      "kaito",
      "kaoru",
      "katashi",
      "katsu",
      "katsuo",
      "katsuro",
      "katsurou",
      "kazuki",
      "kazuo",
      "ken",
      "ken'ichi",
      "kenji",
      "kenshin",
      "kenta",
      "kichiro",
      "kichirou",
      "kiyoshi",
      "kohaku",
      "kouki",
      "kouta",
      "kuro",
      "kurou",
      "kyo",
      "kyou",
      "makoto",
      "masaru",
      "michi",
      "minoru",
      "naoki",
      "noboru",
      "nobu",
      "noburu",
      "nobuyuki",
      "nori",
      "osamu",
      "ren",
      "riku",
      "rikuto",
      "rokuro",
      "rokurou",
      "ryo",
      "ryoichi",
      "ryota",
      "ryou",
      "ryouichi",
      "ryouta",
      "ryuu",
      "ryuunosuke",
      "saburo",
      "saburou",
      "shichiro",
      "shichirou",
      "shin",
      "shinobu",
      "shiori",
      "shiro",
      "shirou",
      "sho",
      "shota",
      "shou",
      "shouta",
      "shun",
      "sora",
      "sota",
      "souma",
      "souta",
      "susumu",
      "taichi",
      "taiki",
      "takahiro",
      "takashi",
      "takehiko",
      "takeshi",
      "takuma",
      "takumi",
      "taro",
      "tarou",
      "tsubasa",
      "yamato",
      "yasu",
      "yori",
      "yoshi",
      "yoshiro",
      "yoshirou",
      "youta",
      "yuki",
      "yuu",
      "yuudai",
      "yuuki",
      "yuuma",
      "yuuta",
      "yuuto"
    ],
    surname: [
      "akiyama",
      "fujimoto",
      "fujioka",
      "fukui",
      "hamasaki",
      "hashimoto",
      "hayashi",
      "himura",
      "hisakawa",
      "honda",
      "inoue",
      "ito",
      "kagome",
      "kato",
      "kawaguchi",
      "kimura",
      "kita",
      "kobayashi",
      "koizumi",
      "kurosawa",
      "maki",
      "matsumoto",
      "matsuoka",
      "matsushita",
      "minami",
      "miyamoto",
      "mizushima",
      "mori",
      "moto",
      "nakahara",
      "nakamura",
      "nakano",
      "nishimura",
      "oshiro",
      "saito",
      "sato",
      "shizuka",
      "suzuki",
      "tachibana",
      "takahashi",
      "takenaka",
      "tanaka",
      "tsukino",
      "tsukuda",
      "ueda",
      "ueno",
      "wakahisa",
      "watanabe",
      "yamada",
      "yamaguchi",
      "yamamoto",
      "yamauchi",
      "yoshida",
      "yukimura"
    ]
  },
  {
    key: "turkish",
    label: "Turkish",
    male: [
      "abdullah",
      "adem",
      "adnan",
      "ahmed",
      "ahmet",
      "ali",
      "alim",
      "alp",
      "altan",
      "arda",
      "arslan",
      "asil",
      "aslan",
      "ata",
      "atilla",
      "attila",
      "ayberk",
      "aydin",
      "ayta\xE7",
      "aziz",
      "bahadir",
      "bari\u015F",
      "bayram",
      "behram",
      "berat",
      "berk",
      "berkant",
      "berker",
      "bilge",
      "bora",
      "bu\u011Fra",
      "b\xFClent",
      "bulut",
      "b\xFCnyamin",
      "burak",
      "bur\xE7in",
      "\xE7a\u011Fatay",
      "can",
      "cem",
      "cemal",
      "cemil",
      "cengiz",
      "cenk",
      "\xE7etin",
      "cihan",
      "cihangir",
      "co\u015Fkun",
      "cumhur",
      "demir",
      "deniz",
      "derya",
      "devrim",
      "diren\xE7",
      "doruk",
      "duygu",
      "ediz",
      "egemen",
      "ekrem",
      "elvan",
      "emin",
      "emir",
      "emirhan",
      "emre",
      "ender",
      "enes",
      "engin",
      "enis",
      "enver",
      "erdem",
      "eren",
      "erkin",
      "erol",
      "eser",
      "evren",
      "fahri",
      "fatih",
      "feridun",
      "ferit",
      "fikri",
      "firat",
      "fuat",
      "galip",
      "g\xF6ker",
      "g\xFCrsel",
      "hakan",
      "halil",
      "halim",
      "haluk",
      "harun",
      "hasan",
      "hayati",
      "haydar",
      "hayri",
      "hikmet",
      "h\xFCseyin",
      "h\xFCsn\xFC",
      "ibrahim",
      "ihsan",
      "ilhami",
      "ilhan",
      "ilkay",
      "ilker",
      "ilkin",
      "isa",
      "iskender",
      "ismail",
      "ismet",
      "izzet",
      "kaan",
      "kadir",
      "kadri",
      "ka\u011Fan",
      "kasim",
      "kemal",
      "kerem",
      "kerim",
      "kivan\xE7",
      "koray",
      "kudret",
      "kuzey",
      "levent",
      "mahmut",
      "mahzun",
      "mazhar",
      "mehmed",
      "mehmet",
      "mert",
      "mesud",
      "mesut",
      "metin",
      "m\xFCcahit",
      "muhammed",
      "muhammet",
      "m\xFCmtaz",
      "murat",
      "musa",
      "mustafa",
      "nur",
      "\xF6mer",
      "onur",
      "orhan",
      "osman",
      "ozan",
      "\xF6zg\xFCr",
      "ramazan",
      "recep",
      "ridvan",
      "riza",
      "rizvan",
      "sabah",
      "sabri",
      "\u015Fahin",
      "sava\u015F",
      "\u015Fehzade",
      "sel\xE2hattin",
      "selahattin",
      "selim",
      "semih",
      "\u015Femsettin",
      "serhan",
      "serhat",
      "serkan",
      "soner",
      "\u015Fukri",
      "s\xFCleyman",
      "tahir",
      "tal\xE2t",
      "taner",
      "tarik",
      "taylan",
      "tayyip",
      "temel",
      "timur",
      "tolga",
      "toygar",
      "tun\xE7",
      "tuncay",
      "turgay",
      "tutku",
      "ufuk",
      "u\u011Fur",
      "ulvi",
      "\xFCmit",
      "umut",
      "utku",
      "vahit",
      "volkan",
      "ya\u011Fmur",
      "yahya",
      "yakup",
      "yal\xE7in",
      "yavuz",
      "yi\u011Fit",
      "yildirim",
      "yilmaz",
      "yunus",
      "yusuf",
      "zeki"
    ],
    female: [
      "adalet",
      "arzu",
      "asli",
      "asuman",
      "aydan",
      "ayg\xFCl",
      "ayg\xFCn",
      "ayla",
      "aylin",
      "aynur",
      "ay\u015Fe",
      "aysel",
      "aysu",
      "aysun",
      "ayta\xE7",
      "azra",
      "bahar",
      "banu",
      "ba\u015Fak",
      "behiye",
      "belgin",
      "berna",
      "berrak",
      "beste",
      "beyza",
      "bihter",
      "bilge",
      "bur\xE7in",
      "burcu",
      "\xE7a\u011Fla",
      "\xE7a\u011Fri",
      "canan",
      "ceren",
      "damla",
      "deniz",
      "derya",
      "didem",
      "dilan",
      "dilara",
      "dilay",
      "dilek",
      "duygu",
      "ebru",
      "ece",
      "ecrin",
      "eda",
      "ekin",
      "elif",
      "elmas",
      "elvan",
      "emel",
      "emine",
      "enise",
      "esen",
      "eser",
      "esin",
      "esra",
      "evren",
      "eyl\xFCl",
      "fatma",
      "fato\u015F",
      "feray",
      "feriha",
      "fidan",
      "fikriye",
      "filiz",
      "funda",
      "fusun",
      "gamze",
      "gaye",
      "gizem",
      "gonca",
      "g\xF6zde",
      "g\xFCl",
      "g\xFClay",
      "g\xFClbahar",
      "g\xFClden",
      "g\xFClistan",
      "g\xFClizar",
      "g\xFClten",
      "g\xFCnay",
      "handan",
      "hande",
      "hatice",
      "havva",
      "hazan",
      "h\xFClya",
      "ilkay",
      "ilknur",
      "ipek",
      "irem",
      "irmak",
      "kader",
      "kadriye",
      "kelebek",
      "kiraz",
      "lale",
      "latife",
      "leyla",
      "makbule",
      "mehtap",
      "melek",
      "meltem",
      "meryem",
      "m\xFCge",
      "nadiye",
      "naz",
      "nazli",
      "nehir",
      "nergis",
      "nermin",
      "nesrin",
      "nil\xFCfer",
      "nimet",
      "nur",
      "nuray",
      "nurg\xFCl",
      "nurten",
      "\xF6zge",
      "\xF6zg\xFCr",
      "\xF6zlem",
      "pembe",
      "pinar",
      "reyhan",
      "sabah",
      "sabriye",
      "safiye",
      "\u015Fahnaz",
      "sanem",
      "\u015Febnem",
      "seda",
      "sedef",
      "\u015Fehrazad",
      "\u015Fehrazat",
      "semiha",
      "\u015Fenay",
      "\u015Fermin",
      "serpil",
      "sevda",
      "sevgi",
      "sevil",
      "sevin\xE7",
      "sidika",
      "sila",
      "simge",
      "\u015Firin",
      "su",
      "\u015Fukriye",
      "\u015Fule",
      "tuba",
      "tu\u011Fba",
      "t\xFClay",
      "tutku",
      "\xFClk\xFC",
      "ulviye",
      "umut",
      "ya\u011Fmur",
      "yasemin",
      "ye\u015Fim",
      "yeter",
      "yildiz",
      "yonca",
      "zehra",
      "zekiye",
      "zeynep",
      "ziynet"
    ],
    surname: [
      "aksoy",
      "albaf",
      "arap",
      "aslan",
      "avci",
      "badem",
      "balik",
      "bardak\xE7i",
      "bari\u015F",
      "binici",
      "burakgazi",
      "de\u011Firmenci",
      "demir",
      "demirci",
      "ekmek\xE7i",
      "karga",
      "kartal",
      "katirci",
      "ko\xE7",
      "k\xFC\xE7\xFCk",
      "kundak\xE7i",
      "macar",
      "marangoz",
      "mataraci",
      "peynirci",
      "sadik",
      "solak",
      "teke",
      "terzi",
      "tilki",
      "tiryaki",
      "uzun",
      "yilmaz"
    ]
  },
  {
    key: "native american",
    label: "Native American",
    female: [
      "abedabun",
      "abequa",
      "abeque",
      "abey",
      "abeytu",
      "abeytzi",
      "adoette",
      "adsila",
      "aiyana",
      "alameda",
      "alaqua",
      "alawa",
      "aleshanee",
      "algoma",
      "alsoomse",
      "altsoba",
      "amadahy",
      "amitola",
      "anaba",
      "anemy",
      "angeni",
      "angpetu",
      "angwusnasomtaqa",
      "ankti",
      "anna",
      "aponi",
      "aquene",
      "atepa",
      "awanatu",
      "awenasa",
      "awendela",
      "awinita",
      "ayasha",
      "ayashe",
      "ayita",
      "bena",
      "bly",
      "catori",
      "cha'kwaina",
      "chapa",
      "chapawee",
      "cha'risa",
      "chenoa",
      "chepi",
      "chilam",
      "chimalis",
      "chitsa",
      "chochmingwu",
      "cholena",
      "chosovi",
      "chosposi",
      "chu'mana",
      "chumani",
      "chu'si",
      "cocheta",
      "dena",
      "doba",
      "doli",
      "donoma",
      "dowanhowee",
      "dyani",
      "ehawee",
      "elu",
      "enola",
      "etenia",
      "eyota",
      "fala",
      "flo",
      "gaho",
      "galilahi",
      "genesee",
      "hachi",
      "haiwee",
      "hakidonmuya",
      "haloke",
      "halona",
      "hantaywee",
      "hateya",
      "hausis",
      "hausisse",
      "hehewuti",
      "helki",
      "honovi",
      "huata",
      "humita",
      "hurit",
      "huyana",
      "imala",
      "isi",
      "istas",
      "ituha",
      "izusa",
      "kachina",
      "kai",
      "kakawangwa",
      "kaliska",
      "kanti",
      "kasa",
      "kay",
      "keegsquaw",
      "keezheekoni",
      "kewanee",
      "kimama",
      "kimi",
      "kimimela",
      "kineks",
      "kiwidinok",
      "koko",
      "kokyangwuti",
      "kuwanlelenta",
      "kuwanyamtiwa",
      "kuwanyauma",
      "kwanita",
      "lenmana",
      "leotie",
      "litonya",
      "lomahongva",
      "lomasi",
      "lulu",
      "luyu",
      "macha",
      "magaskawee",
      "magena",
      "mahal",
      "mai",
      "maka",
      "makawee",
      "makkitotosimew",
      "malia",
      "malila",
      "manaba",
      "mansi",
      "mapiya",
      "maralah",
      "mausi",
      "meda",
      "meli",
      "memdi",
      "meoquanee",
      "miakoda",
      "migina",
      "migisi",
      "mika",
      "mimiteh",
      "minal",
      "mitena",
      "muna",
      "nadie",
      "nahimana",
      "namid",
      "nara",
      "nascha",
      "nashota",
      "nata",
      "nijlon",
      "nina",
      "ninovan",
      "nita",
      "nittawosew",
      "nituna",
      "nokomis",
      "nova",
      "nukpana",
      "numees",
      "nuna",
      "nuttah",
      "odahingum",
      "odina",
      "ogin",
      "ojinjintka",
      "olathe",
      "ominotago",
      "omusa",
      "onawa",
      "onida",
      "ootadabun",
      "opa",
      "orenda",
      "pakwa",
      "pamuy",
      "papina",
      "pati",
      "pauwau",
      "pavati",
      "pazi",
      "pelipa",
      "peta",
      "petah",
      "petunia",
      "polikwaptiwa",
      "poloma",
      "posala",
      "powaqa",
      "ptaysanwee",
      "pules",
      "quanah",
      "rozene",
      "sahkyo",
      "salali",
      "sapata",
      "shada",
      "sheshebens",
      "shuman",
      "sihu",
      "sikya",
      "sinopa",
      "sipatu",
      "sisika",
      "sitala",
      "snana",
      "sokanon",
      "sokw",
      "sonoma",
      "sooleawa",
      "soyala",
      "stinka",
      "suleta",
      "suni",
      "sunki",
      "taa",
      "tablita",
      "tadewi",
      "tahki",
      "taima",
      "taini",
      "taipa",
      "takala",
      "tala",
      "talulah",
      "tama",
      "tansy",
      "tayanita",
      "tehya",
      "tiponi",
      "tis-see-woo-na-tis",
      "tiva",
      "tolikna",
      "totsi",
      "tusa",
      "tuuwa",
      "tuwa",
      "una",
      "unega",
      "urika",
      "usdi",
      "utina",
      "wachiwi",
      "waki",
      "waneta",
      "wapun",
      "wawetseka",
      "weayaya",
      "wenona",
      "wicapiwakan",
      "wichahpi",
      "wikimak",
      "winema",
      "winona",
      "wuti",
      "wyanet",
      "wyome",
      "yamka",
      "yanaba",
      "yatokya",
      "yenene",
      "yepa",
      "yoki",
      "yona",
      "yutu",
      "zaltana",
      "zihna",
      "ziracuny",
      "zitkala",
      "zonta"
    ],
    male: [
      "abooksigun",
      "abukcheech",
      "achachak",
      "achak",
      "adahy",
      "adoeette",
      "ahanu",
      "ahiga",
      "ahmik",
      "ahote",
      "ahtunowhiho",
      "akando",
      "akecheta",
      "akule",
      "alo",
      "anakausuen",
      "anoki",
      "apenimon",
      "apiatan",
      "apisi",
      "aponivi",
      "aranck",
      "ashkii",
      "askook",
      "askuwheteau",
      "ata'halne",
      "atohi",
      "atsadi",
      "atsidi",
      "avonaco",
      "awan",
      "ayawamat",
      "bemossed",
      "beshkno",
      "bidziil",
      "bilagaana",
      "bimisi",
      "bodaway",
      "cha'akmongwi",
      "chankoowashtay",
      "chansomps",
      "chapa",
      "chas chunk a",
      "chatan",
      "cha'tima",
      "chavatangakwunua",
      "chayton",
      "chesmu",
      "cheveyo",
      "chochmo",
      "chochokpi",
      "chochuschuvio",
      "chogan",
      "choovio",
      "choviohoya",
      "chowilawu",
      "chu'a",
      "chuchip",
      "chunta",
      "ciqala",
      "cochise",
      "dakota",
      "dakotah",
      "degotoga",
      "delsin",
      "demothi",
      "dichali",
      "diwali",
      "dohate",
      "dohosan",
      "dustu",
      "dyami",
      "elan",
      "elki",
      "elsu",
      "eluwilussit",
      "enapay",
      "enkoodabaoo",
      "enyeto",
      "etchemin",
      "etlelooaat",
      "etu",
      "ezhno",
      "gaagii",
      "gad",
      "gawonii",
      "gomda",
      "gosheven",
      "guyapi",
      "hahkethomemah",
      "hahnee",
      "hakan",
      "halian",
      "hania",
      "hanska",
      "harkahome",
      "hassun",
      "hastiin",
      "hawiovi",
      "he lush ka",
      "heammawihio",
      "helaku",
      "helki",
      "heskovizenako",
      "hesutu",
      "hevataneo",
      "hevovitastamiutsto",
      "hiamovi",
      "hinto",
      "hohnihohkaiyohos",
      "hok'ee",
      "holata",
      "honani",
      "honaw",
      "honiahaka",
      "honon",
      "honovi",
      "hotah",
      "hototo",
      "hotuaekhaashtait",
      "howahkan",
      "howi",
      "huritt",
      "igasho",
      "iiniwa",
      "illanipi",
      "inteus",
      "istaqa",
      "istu",
      "ituha",
      "iye",
      "jacy",
      "jolon",
      "kachada",
      "kaga",
      "kajika",
      "kangee",
      "kanuna",
      "kele",
      "keme",
      "kesegowaase",
      "kestejoo",
      "kilchii",
      "kitchi",
      "kiyiya",
      "klah",
      "knoton",
      "kohana",
      "kohkahycumest",
      "koi",
      "kolichiyaw",
      "kosumi",
      "kotori",
      "kuckunniwi",
      "kuruk",
      "kusinut",
      "kwahu",
      "kwatoko",
      "lallo",
      "langundo",
      "lansa",
      "lapu",
      "len",
      "lena",
      "lenno",
      "leyti",
      "lise",
      "liwanu",
      "lokni",
      "lonan",
      "lonato",
      "lootah",
      "lusio",
      "machakw",
      "machk",
      "mahkah",
      "mahpee",
      "makkapitew",
      "makya",
      "mammedaty",
      "mantotohpa",
      "masichuvio",
      "maska",
      "matchitehew",
      "matchitisiw",
      "mato",
      "matoskah",
      "matunaagd",
      "matwau",
      "mazablaska",
      "megedagik",
      "mekledoodum",
      "meturato",
      "micco",
      "mika",
      "mikasi",
      "milap",
      "minco",
      "mingan",
      "minninnewah",
      "misu",
      "mochni",
      "mohe",
      "mojag",
      "mokatavatah",
      "moketavato",
      "moketaveto",
      "moketoveto",
      "moki",
      "mokovaoto",
      "molimo",
      "mongwau",
      "motavato",
      "motega",
      "muata",
      "mukki",
      "muraco",
      "naalnish",
      "naalyehe ya sidahi",
      "nahcomence",
      "nahiossi",
      "nakai",
      "napayshni",
      "nashashuk",
      "nashoba",
      "nastas",
      "nawat",
      "nawkaw",
      "nayati",
      "nayavu",
      "neeheeoeewootis",
      "neka",
      "nigan",
      "niichaad",
      "nikan",
      "nikiti",
      "nitis",
      "nixkamich",
      "niyol",
      "nodin",
      "nokosi",
      "nootau",
      "nosh",
      "noshi",
      "notaku",
      "nukpana",
      "ocumwhowurst",
      "ocunnowhurst",
      "odakotah",
      "ogaleesha",
      "ogima",
      "ogleesha",
      "ohanko",
      "ohanzee",
      "ohcumgache",
      "ohitekah",
      "ohiyesa",
      "okhmhaka",
      "omawnakw",
      "onacona",
      "osceola",
      "otaktay",
      "otetiani",
      "otoahhastis",
      "otoahnacto",
      "ouray",
      "pachu'a",
      "paco",
      "pahana",
      "pallaton",
      "pannoowau",
      "pat",
      "patamon",
      "patwin",
      "pay",
      "payat",
      "payatt",
      "paytah",
      "peopeo",
      "pezi",
      "pimne",
      "pitalesharo",
      "powwaw",
      "qaletaqa",
      "qochata",
      "quanah",
      "rowtag",
      "sahale",
      "sahkonteic",
      "sakima",
      "samoset",
      "sani",
      "satanta",
      "segenam",
      "setangya",
      "setimika",
      "sewati",
      "shappa",
      "shilah",
      "shiriki",
      "shiye",
      "shizhe'e",
      "shoemowetochawcawe",
      "sicheii",
      "sike",
      "sik'is",
      "sikyahonaw",
      "sikyatavo",
      "sipatu",
      "siwili",
      "skah",
      "songaa",
      "sowi'ngwa",
      "sucki",
      "sunukkuhkau",
      "tadi",
      "tadzi",
      "tahkeome",
      "tahmelapachme",
      "taima",
      "takoda",
      "tangakwunu",
      "tapco",
      "tashunka",
      "tasunke",
      "tatankaptecila",
      "tatonga",
      "tawa",
      "teetonka",
      "teluhci",
      "telutci",
      "tihkoosue",
      "t'iis",
      "tocho",
      "togquos",
      "tohopka",
      "tokala",
      "tooantuh",
      "tse",
      "tsiishch'ili",
      "tsiyi",
      "tuari",
      "tuketu",
      "tumu",
      "tupi",
      "tyee",
      "unaduti",
      "uzumati",
      "vaiveahtoish",
      "viho",
      "vipponah",
      "vohkinne",
      "voistitoevitz",
      "voisttitoevetz",
      "vokivocummast",
      "waban",
      "wahanassatta",
      "wahchinksapa",
      "wahchintonka",
      "wahkan",
      "wahkoowah",
      "wakiza",
      "wamblee",
      "wambleesha",
      "wambliwaste",
      "wanageeska",
      "wanahton",
      "wanikiy",
      "wapi",
      "waquini",
      "weayaya",
      "wematin",
      "wemilat",
      "wicasa",
      "wikvaya",
      "wilu",
      "wohehiv",
      "wokaihwokomas",
      "wuliton",
      "wuyi",
      "wynono",
      "yaholo",
      "yahto",
      "yancy",
      "yanisin",
      "yas",
      "yiska",
      "yuma"
    ],
    surname: []
  },
  {
    key: "french",
    label: "French",
    male: [
      "Abel",
      "Abraham",
      "Achille",
      "Adam",
      "Ad\xE9lard",
      "Adolphe",
      "Adrien",
      "Aim\xE9",
      "Alain",
      "Alan",
      "Alban",
      "Albert",
      "Albin",
      "Alcide",
      "Ald\xE9ric",
      "Aldric",
      "Alex",
      "Alexandre",
      "Alexis",
      "Alfred",
      "Alphonse",
      "Amable",
      "Amand",
      "Amaury",
      "Ambroise",
      "Am\xE9d\xE9e",
      "Amour",
      "Anatole",
      "Andr\xE9",
      "Anselme",
      "Anthelme",
      "Antoine",
      "Antonin",
      "Apollinaire",
      "Ariel",
      "Aristide",
      "Armand",
      "Armel",
      "Arnaud",
      "Ars\xE8ne",
      "Arthur",
      "Aubert",
      "Aubin",
      "Auguste",
      "Augustin",
      "Aur\xE8le",
      "Aur\xE9lien",
      "Babylas",
      "Baptiste",
      "Barnab\xE9",
      "Barth\xE9l\xE9my",
      "Basile",
      "Bastien",
      "Baudouin",
      "Benjamin",
      "Beno\xEEt",
      "B\xE9renger",
      "Bernard",
      "Bertrand",
      "Blaise",
      "Boniface",
      "Brice",
      "Bruno",
      "Calixte",
      "Camille",
      "Candide",
      "Casimir",
      "C\xE9dric",
      "C\xE9leste",
      "C\xE9lestin",
      "C\xE9saire",
      "C\xE9sar",
      "Charles",
      "Charlot",
      "Christian",
      "Christophe",
      "Clair",
      "Claude",
      "Cl\xE9ment",
      "Clovis",
      "C\xF4me",
      "Constant",
      "Constantin",
      "Corentin",
      "Corin",
      "Corneille",
      "Cosme",
      "Cyprien",
      "Cyril",
      "Cyrille",
      "Damien",
      "Dan",
      "Daniel",
      "David",
      "Deniel",
      "Denis",
      "D\xE9odat",
      "D\xE9sir\xE9",
      "Didier",
      "Dieudonn\xE9",
      "Dimitri",
      "Diodore",
      "Dominique",
      "Donat",
      "Donatien",
      "Dorian",
      "Edgar",
      "Edgard",
      "Edm\xE9",
      "Edmond",
      "\xC9douard",
      "\xC9lie",
      "\xC9loi",
      "Elouan",
      "\xC9meric",
      "\xC9mile",
      "\xC9milien",
      "Emmanuel",
      "Enzo",
      "\xC9ric",
      "Ernest",
      "Erwan",
      "Erwann",
      "Ethan",
      "\xC9tienne",
      "Eug\xE8ne",
      "Eustache",
      "\xC9variste",
      "\xC9vrard",
      "Fabien",
      "Fabrice",
      "F\xE9licien",
      "F\xE9lix",
      "Ferdinand",
      "Fernand",
      "Fiacre",
      "Firmin",
      "Flavien",
      "Florence",
      "Florent",
      "Florentin",
      "Florian",
      "Francis",
      "Francisque",
      "Franck",
      "Fran\xE7ois",
      "Frank",
      "Fra\xF1sez",
      "Fred",
      "Fr\xE9d\xE9ric",
      "Fulbert",
      "Gabin",
      "Gabriel",
      "Ga\xEBl",
      "Ga\xE9tan",
      "Ga\xEBtan",
      "Gaspard",
      "Gaston",
      "Gaubert",
      "Gaultier",
      "Gauthier",
      "Gautier",
      "Geoffrey",
      "Geoffroy",
      "Georges",
      "G\xE9rald",
      "G\xE9rard",
      "G\xE9raud",
      "Germain",
      "Gervais",
      "Ghislain",
      "Ghyslain",
      "Gilbert",
      "Gilles",
      "Godefroy",
      "Gratien",
      "Gr\xE9goire",
      "Guillaume",
      "Gustave",
      "Guy",
      "Gwena\xEBl",
      "Gwenneg",
      "Gwilherm",
      "Hadrien",
      "Hector",
      "Henri",
      "Herbert",
      "Hercule",
      "Herv\xE9",
      "Hilaire",
      "Hippolyte",
      "Honor\xE9",
      "Horace",
      "Hubert",
      "Hugues",
      "Humbert",
      "Hyacinthe",
      "Ignace",
      "Ir\xE9n\xE9e",
      "Isidore",
      "Jacky",
      "Jacques",
      "Jasmin",
      "Jason",
      "Jean",
      "Jean-baptiste",
      "Jean-marie",
      "Jeannot",
      "J\xE9r\xE9mie",
      "J\xE9r\xF4me",
      "Jess\xE9",
      "Joachim",
      "Jocelyn",
      "Jodoc",
      "Jo\xEBl",
      "Joffrey",
      "Jonathan",
      "Joseph",
      "Josse",
      "Josselin",
      "Josu\xE9",
      "Jourdain",
      "Judica\xEBl",
      "Judikael",
      "Judoc",
      "Jules",
      "Julien",
      "Juste",
      "Justin",
      "Kevin",
      "Kilian",
      "Killian",
      "Kylian",
      "Lambert",
      "Laurent",
      "Laurentin",
      "Lazare",
      "L\xE9andre",
      "L\xE9o",
      "L\xE9on",
      "L\xE9onard",
      "L\xE9once",
      "L\xE9onide",
      "L\xE9opold",
      "Lilian",
      "Lionel",
      "Loan",
      "Loann",
      "Lo\xEFc",
      "Lothaire",
      "Lou",
      "Louis",
      "Loup",
      "Luc",
      "Lucas",
      "Lucien",
      "Lucr\xE8ce",
      "Ludovic",
      "Ma\xEBl",
      "Mael",
      "Manu",
      "Manuel",
      "Marc",
      "Marcel",
      "Marcelin",
      "Marcellin",
      "Marin",
      "Marius",
      "Martin",
      "Mat\xE9o",
      "Math\xE9o",
      "Mathias",
      "Mathieu",
      "Mathis",
      "Mathys",
      "Matthias",
      "Matthieu",
      "Maurice",
      "Maxence",
      "Maxime",
      "Maximilien",
      "Micha\xEBl",
      "Michel",
      "Micka\xEBl",
      "Modeste",
      "Mo\xEFse",
      "Morgan",
      "Napol\xE9on",
      "Narcisse",
      "Nathan",
      "Nathana\xEBl",
      "Nazaire",
      "Nic\xE9phore",
      "Nicod\xE8me",
      "Nicolas",
      "No\xE9",
      "No\xEBl",
      "Norbert",
      "Octave",
      "Odilon",
      "Olivier",
      "On\xE9sime",
      "Oscar",
      "Padrig",
      "Paol",
      "Pascal",
      "Patrice",
      "Patrick",
      "Paul",
      "Per",
      "Perig",
      "Pharamond",
      "Philbert",
      "Philibert",
      "Philippe",
      "Pierre",
      "Pierrick",
      "Placide",
      "Pons",
      "Prosper",
      "Prudence",
      "Quentin",
      "Rainier",
      "Raoul",
      "Rapha\xEBl",
      "Raymond",
      "R\xE9gis",
      "R\xE9mi",
      "R\xE9my",
      "Renard",
      "Renaud",
      "Ren\xE9",
      "Reynaud",
      "Richard",
      "Robert",
      "Roch",
      "Rodolph",
      "Rodolphe",
      "Rodrigue",
      "Roger",
      "Roland",
      "Romain",
      "Roparzh",
      "Rosaire",
      "Ruben",
      "Sacha",
      "Salomon",
      "Samson",
      "Samuel",
      "Sasha",
      "S\xE9bastien",
      "S\xE9raphin",
      "Serge",
      "S\xE9v\xE8re",
      "S\xE9verin",
      "Simon",
      "Sixte",
      "St\xE9phane",
      "Sylvain",
      "Sylvestre",
      "T\xE9lesphore",
      "Th\xE9o",
      "Th\xE9odore",
      "Th\xE9ophile",
      "Th\xE9otime",
      "Thibault",
      "Thierry",
      "Thomas",
      "Timoth\xE9",
      "Timoth\xE9e",
      "Toussaint",
      "Tristan",
      "Ulysse",
      "Urbain",
      "Vaast",
      "Valentin",
      "Val\xE8re",
      "Val\xE9rian",
      "Val\xE9ry",
      "Vespasien",
      "Victor",
      "Vincent",
      "Vivien",
      "Winoc",
      "Xavier",
      "Yanick",
      "Yann",
      "Yannic",
      "Yannick",
      "Yezekael",
      "Yves",
      "Yvon",
      "Zacharie"
    ],
    female: [
      "Ad\xE9la\xEFde",
      "Adeline",
      "Agathe",
      "Agla\xE9",
      "Agn\xE8s",
      "Aim\xE9e",
      "Alberte",
      "Albertine",
      "Albine",
      "Alex",
      "Alexandra",
      "Alexandrie",
      "Alexandrine",
      "Alexia",
      "Alexis",
      "Alice",
      "Aline",
      "Alison",
      "Alix",
      "Alphonsine",
      "Amandine",
      "Amarante",
      "Ambre",
      "Am\xE9lie",
      "Amour",
      "Ana\xEFs",
      "Anastasie",
      "Andr\xE9e",
      "Ang\xE8le",
      "Angeline",
      "Ang\xE9lique",
      "Anna",
      "Annabelle",
      "Anne",
      "Annette",
      "Annick",
      "Annie",
      "Anouk",
      "Antoinette",
      "Apolline",
      "Ariane",
      "Arianne",
      "Ariel",
      "Arielle",
      "Arlette",
      "Armelle",
      "Arnaude",
      "Astrid",
      "Astride",
      "Ath\xE9na\xEFs",
      "Aude",
      "Augustine",
      "Aur\xE9lie",
      "Aurore",
      "Avril",
      "Axelle",
      "Babette",
      "Barbara",
      "B\xE9atrice",
      "B\xE9n\xE9dicte",
      "Benjamine",
      "Beno\xEEte",
      "B\xE9reng\xE8re",
      "B\xE9r\xE9nice",
      "Bernadette",
      "Bernardine",
      "Berthe",
      "Bertille",
      "Blanche",
      "Blandine",
      "Brigitte",
      "Camille",
      "Candide",
      "Capucine",
      "Carine",
      "Carole",
      "Caroline",
      "Cassandra",
      "Catherine",
      "C\xE9cile",
      "C\xE9leste",
      "C\xE9lestine",
      "C\xE9line",
      "Cerise",
      "Chantal",
      "Charline",
      "Charlotte",
      "Chlo\xE9",
      "Christelle",
      "Christiane",
      "Christine",
      "Claire",
      "Clarisse",
      "Claude",
      "Claudette",
      "Claudie",
      "Claudine",
      "Cl\xE9mence",
      "Cl\xE9mentine",
      "Clo\xE9",
      "Clothilde",
      "Clotilde",
      "Colette",
      "Coline",
      "Colombe",
      "Constance",
      "Coralie",
      "Corinne",
      "Corn\xE9lie",
      "Cosette",
      "Cun\xE9gonde",
      "Cyrielle",
      "Cyrille",
      "Dani\xE8le",
      "Danielle",
      "Daphn\xE9",
      "Daphn\xE9e",
      "D\xE9bora",
      "D\xE9lia",
      "Delphine",
      "Denise",
      "D\xE9sir\xE9e",
      "Diane",
      "Dianne",
      "Dieudonn\xE9e",
      "Dominique",
      "Domitille",
      "Donatienne",
      "Doriane",
      "Doroth\xE9e",
      "\xC9dith",
      "Edm\xE9e",
      "Edmonde",
      "Edwige",
      "El\xE9onore",
      "\xC9liane",
      "\xC9lisabeth",
      "\xC9lise",
      "\xC9lodie",
      "\xC9lo\xEFse",
      "Elvire",
      "\xC9meline",
      "\xC9milie",
      "\xC9milienne",
      "Emma",
      "Emmanuelle",
      "Ernestine",
      "Estelle",
      "Esther",
      "\xC9tiennette",
      "Eug\xE9nie",
      "Eulalie",
      "Euphrasie",
      "\xC8ve",
      "Eveline",
      "\xC9velyne",
      "Fabienne",
      "Fanny",
      "Faustine",
      "F\xE9licie",
      "F\xE9licienne",
      "F\xE9licit\xE9",
      "Fernande",
      "Fifi",
      "Flavie",
      "Flavienne",
      "Fleur",
      "Fleurette",
      "Flore",
      "Florence",
      "Florentine",
      "Florette",
      "Floriane",
      "Florianne",
      "Florine",
      "France",
      "Francette",
      "Francine",
      "Francis",
      "Fran\xE7oise",
      "Fra\xF1seza",
      "Fr\xE9d\xE9rique",
      "Gabrielle",
      "Ga\xEBlle",
      "Ga\xE9tane",
      "Ga\xEBtane",
      "Genevi\xE8ve",
      "Georgette",
      "Georgine",
      "G\xE9raldine",
      "Germaine",
      "Gervaise",
      "Ghislaine",
      "Ghyslaine",
      "Gigi",
      "Gilberte",
      "Ginette",
      "Gis\xE8le",
      "Giselle",
      "Gueni\xE8vre",
      "Gwena\xEBlle",
      "Gwendoline",
      "Hannah",
      "Hayd\xE9e",
      "H\xE9l\xE8ne",
      "H\xE9lo\xEFse",
      "Henriette",
      "Hermine",
      "Honorine",
      "Hortense",
      "Huguette",
      "Hyacinthe",
      "In\xE8s",
      "Ir\xE8ne",
      "Iris",
      "Isabel",
      "Isabelle",
      "Isaure",
      "Jacinthe",
      "Jacqueline",
      "Jacquette",
      "Jade",
      "Janine",
      "Jasmine",
      "Jeanette",
      "Jeanine",
      "Jeanne",
      "Jeannette",
      "Jeannine",
      "Jessica",
      "Joanne",
      "Joceline",
      "Jocelyn",
      "Jocelyne",
      "Jo\xEBlle",
      "Johanne",
      "Jos\xE9e",
      "Jos\xE8phe",
      "Jos\xE9phine",
      "Josette",
      "Josiane",
      "Josseline",
      "Judith",
      "Juliane",
      "Julie",
      "Julienne",
      "Juliette",
      "Justine",
      "Karine",
      "Katarin",
      "Katell",
      "Laetitia",
      "Lara",
      "Laure",
      "Laurence",
      "Laurentine",
      "Laurette",
      "Laurine",
      "L\xE9a",
      "L\xE9one",
      "L\xE9onide",
      "L\xE9onie",
      "L\xE9onne",
      "L\xE9ontine",
      "L\xE9opoldine",
      "Lili",
      "Lilian",
      "Liliane",
      "Lilianne",
      "Lilou",
      "Linda",
      "Line",
      "Lise",
      "Lisette",
      "Livie",
      "Loane",
      "Lorette",
      "Lou",
      "Louane",
      "Louise",
      "Louisette",
      "Louna",
      "Luce",
      "Lucette",
      "Lucie",
      "Lucienne",
      "Lucile",
      "Lucille",
      "Lucinde",
      "Lucr\xE8ce",
      "Ludivine",
      "Lydie",
      "Lylou",
      "Madeleine",
      "Madeline",
      "Maela",
      "Ma\xEBlle",
      "Ma\xEBlys",
      "Maeva",
      "Magali",
      "Magalie",
      "Mahaut",
      "Ma\xEFa",
      "Mailys",
      "Manon",
      "Manu",
      "Marceline",
      "Marcelle",
      "Marcellette",
      "Marcelline",
      "Margaux",
      "Margot",
      "Marguerite",
      "Mari",
      "Marianne",
      "Marie",
      "Marielle",
      "Mariette",
      "Maril\xE8ne",
      "Marilou",
      "Marine",
      "Marion",
      "Marise",
      "Marjolaine",
      "Marl\xE8ne",
      "Marthe",
      "Martine",
      "Maryvonne",
      "Mathilde",
      "Maximilienne",
      "Maylis",
      "M\xE9lanie",
      "M\xE9lina",
      "M\xE9line",
      "M\xE9lisande",
      "M\xE9lissa",
      "M\xE9lodie",
      "M\xE9lody",
      "Mich\xE8le",
      "Micheline",
      "Michelle",
      "Mirabelle",
      "Mireille",
      "Modeste",
      "Modestine",
      "Monique",
      "Morgan",
      "Morgane",
      "Muriel",
      "Murielle",
      "Myl\xE8ne",
      "Myriam",
      "Nad\xE8ge",
      "Nadia",
      "Nadine",
      "Narcisse",
      "Natacha",
      "Nathalie",
      "Nicole",
      "Nicolette",
      "Nina",
      "Ninette",
      "Ninon",
      "No\xE8le",
      "Noella",
      "No\xEBlle",
      "No\xE9mie",
      "Nolwenn",
      "Oanez",
      "Oc\xE9ane",
      "Odette",
      "Odile",
      "Olivie",
      "Olympe",
      "Oph\xE9lie",
      "Oriane",
      "Orianne",
      "Osanne",
      "Pascale",
      "Pascaline",
      "Paule",
      "Paulette",
      "Pauline",
      "P\xE9n\xE9lope",
      "Perle",
      "Perrine",
      "P\xE9tronille",
      "Philippine",
      "Philom\xE8ne",
      "Pierrette",
      "Placide",
      "Priscilla",
      "Priscille",
      "Prudence",
      "Prune",
      "Rachel",
      "Rapha\xEBlle",
      "Raymonde",
      "R\xE9becca",
      "R\xE9gine",
      "Reine",
      "Ren\xE9e",
      "Roberte",
      "Rolande",
      "Romaine",
      "Romane",
      "Rosalie",
      "Rose",
      "Roselle",
      "Rosemonde",
      "Rosette",
      "Rosine",
      "Roxane",
      "Roxanne",
      "Rozenn",
      "Sabine",
      "Sacha",
      "Salom\xE9",
      "Sandra",
      "Sandrine",
      "Sara",
      "Sarah",
      "Sasha",
      "Scholastique",
      "S\xE9bastienne",
      "S\xE9gol\xE8ne",
      "S\xE9phora",
      "S\xE9raphine",
      "Sergine",
      "S\xE9v\xE9rine",
      "S\xE9verine",
      "Sibylle",
      "Sidonie",
      "Simone",
      "Sixtine",
      "Solange",
      "Sol\xE8ne",
      "Sophie",
      "Soraya",
      "St\xE9phanie",
      "Suzanne",
      "Suzette",
      "Sybille",
      "Sylvaine",
      "Sylviane",
      "Sylvianne",
      "Sylvie",
      "Tatienne",
      "Th\xE9r\xE8se",
      "Tiphaine",
      "Tiphanie",
      "Toinette",
      "Valentine",
      "Val\xE9riane",
      "Val\xE9rie",
      "V\xE9r\xE8ne",
      "V\xE9ronique",
      "Victoire",
      "Victorine",
      "Vienne",
      "Violette",
      "Virginie",
      "Viviane",
      "Vivianne",
      "Vivienne",
      "Wanda",
      "Yanick",
      "Yannic",
      "Yannick",
      "Yolande",
      "Yseult",
      "Yvette",
      "Yvonne",
      "Z\xE9na\xEFde",
      "Z\xE9phyrine",
      "Zo\xE9"
    ],
    surname: [
      "Abel",
      "Abraham",
      "Adam",
      "Albert",
      "Allard",
      "Andr\xE9",
      "Archambault",
      "Arthur",
      "Augustin",
      "Babin",
      "Babineaux",
      "Barre",
      "Baudin",
      "Beauch\xEAne",
      "Beaufort",
      "Beaulieu",
      "Beaumont",
      "B\xE9langer",
      "Bellamy",
      "Bellerose",
      "Belmont",
      "Belrose",
      "B\xE9ranger",
      "Berger",
      "B\xE9ringer",
      "Bernard",
      "Bertrand",
      "Blaise",
      "Blanc",
      "Blanchard",
      "Blanchet",
      "Blanchett",
      "Boivin",
      "Bonfils",
      "Bonheur",
      "Bonhomme",
      "Bonnaire",
      "Bonnay",
      "Bonnet",
      "Borde",
      "Bouchard",
      "Boucher",
      "Bourdillon",
      "Bourreau",
      "Bret",
      "Brisbois",
      "Brodeur",
      "Bureau",
      "Caron",
      "Chaput",
      "Charbonneau",
      "Charpentier",
      "Charron",
      "Chastain",
      "Chevalier",
      "Chevrolet",
      "Cloutier",
      "Colbert",
      "Comtois",
      "Coste",
      "C\xF4t\xE9",
      "Courtemanche",
      "Cousineau",
      "Couture",
      "Daniau",
      "Daniel",
      "D'aramitz",
      "Daviau",
      "David",
      "Deforest",
      "Degarmo",
      "Delacroix",
      "Deniau",
      "Deniaud",
      "Deniel",
      "Denis",
      "Dennel",
      "Deschamps",
      "Descoteaux",
      "Desjardins",
      "Desroches",
      "Desrosiers",
      "Droit",
      "Dubois",
      "Duchamps",
      "Dufort",
      "Dufour",
      "Duguay",
      "Dupond",
      "Dupont",
      "Durand",
      "Durant",
      "Duval",
      "\xC9mile",
      "Eustis",
      "Fabian",
      "Fabre",
      "Fabron",
      "Faucher",
      "Faucheux",
      "Faure",
      "Favager",
      "Favre",
      "Favreau",
      "Fay",
      "F\xE9lix",
      "Firmin",
      "Fontaine",
      "Forest",
      "Forestier",
      "Fortier",
      "Foss",
      "Fournier",
      "Fran\xE7ois",
      "Gage",
      "Gagne",
      "Gagnier",
      "Gagnon",
      "Garcon",
      "Gardinier",
      "Germain",
      "G\xE9roux",
      "Giles",
      "Girard",
      "Giroux",
      "Gosse",
      "Gosselin",
      "Granger",
      "Gros",
      "Gu\xE9rin",
      "Guillory",
      "Hardy",
      "Harman",
      "H\xE9bert",
      "Herbert",
      "Herriot",
      "Jacques",
      "Janvier",
      "Jordan",
      "Joubert",
      "Labelle",
      "Lachance",
      "Lachapelle",
      "Lamar",
      "Lambert",
      "Lane",
      "Langlais",
      "Langlois",
      "Lapointe",
      "Larue",
      "Laurent",
      "Lavigne",
      "Lavoie",
      "Leandres",
      "Lebeau",
      "Leblanc",
      "Leclair",
      "Leclerc",
      "L\xE9cuyer",
      "Lefebvre",
      "Lef\xE8vre",
      "Lefurgey",
      "Legrand",
      "Lemaire",
      "L\xE9mieux",
      "Leon",
      "Leroy",
      "Lesauvage",
      "Lestrange",
      "L\xE9v\xEAque",
      "L\xE9vesque",
      "Linville",
      "Lucas",
      "Lyon",
      "Lyon",
      "Ma\xE7on",
      "Marchand",
      "Marie",
      "Marion",
      "Martel",
      "Martel",
      "Martin",
      "Masson",
      "Masson",
      "Mathieu",
      "Mercier",
      "Merle",
      "Michaud",
      "Michel",
      "Monet",
      "Monette",
      "Montagne",
      "Moreau",
      "Morel",
      "Moulin",
      "Mullins",
      "Nicolas",
      "Noel",
      "Oliver",
      "Olivier",
      "Page",
      "Paget",
      "Palomer",
      "Pan",
      "Pape",
      "Paquet",
      "Paquet",
      "Parent",
      "Paris",
      "Parris",
      "Pascal",
      "Patenaude",
      "Paternoster",
      "Paul",
      "Pelletier",
      "Perrault",
      "Perreault",
      "Perrot",
      "Petit",
      "Pettigrew",
      "Pierre",
      "Plamondon",
      "Plourde",
      "Poingdestre",
      "Poirier",
      "Porcher",
      "Poulin",
      "Proulx",
      "Renaud",
      "Rey",
      "Reyer",
      "Richard",
      "Richelieu",
      "Robert",
      "Roche",
      "Rome",
      "Romilly",
      "Rose",
      "Rousseau",
      "Roux",
      "Roy",
      "Royer",
      "Salmon",
      "Salomon",
      "Salvage",
      "Samson",
      "Samuel",
      "Sargent",
      "Sarkozi",
      "Sarkozy",
      "Sartre",
      "Sault",
      "Sauvage",
      "Sauvageau",
      "Sauvageon",
      "Sauvageot",
      "Sauveterre",
      "Savatier",
      "Segal",
      "Sergeant",
      "S\xE9verin",
      "Simon",
      "Soucy",
      "Tailler",
      "Tasse",
      "Thayer",
      "Thibault",
      "Thomas",
      "Tobias",
      "Tolbert",
      "Traver",
      "Travere",
      "Travers",
      "Traverse",
      "Travert",
      "Tremblay",
      "Tremble",
      "Victor",
      "Victors",
      "Villeneuve",
      "Vincent",
      "Vipond",
      "Voclain"
    ]
  },
  {
    key: "mexican",
    label: "Mexican (Spanish)",
    male: [
      "Aar\xF3n",
      "Abel",
      "Abilio",
      "Abraham",
      "Adalberto",
      "Ad\xE1n",
      "Adelardo",
      "Adolfito",
      "Adolfo",
      "Adri\xE1n",
      "Agapito",
      "Agust\xEDn",
      "Aitor",
      "Albano",
      "Alberto",
      "Albino",
      "Alcides",
      "Ale",
      "Alejandro",
      "Alejo",
      "\xC1lex",
      "Alexis",
      "Alfonso",
      "Alfredo",
      "Alonso",
      "\xC1lvaro",
      "Amado",
      "Amador",
      "Amancio",
      "Amando",
      "Amaro",
      "Ambrosio",
      "Am\xE9rico",
      "Ameyalli",
      "Am\xEDlcar",
      "Amor",
      "Anacleto",
      "Anastacio",
      "Anastasio",
      "Andr\xE9s",
      "Andr\xE9s Felipe",
      "\xC1ngel",
      "Angelino",
      "An\xEDbal",
      "Anselmo",
      "Antelmo",
      "Antonio",
      "Apolinar",
      "Ariel",
      "Ar\xEDstides",
      "Armando",
      "Arsenio",
      "Artemio",
      "Arturo",
      "Asdr\xFAbal",
      "Atanasio",
      "Atilio",
      "Augusto",
      "Aureliano",
      "Aurelio",
      "Balam",
      "Balbino",
      "Baldo",
      "Baldomero",
      "Balduino",
      "Baltasar",
      "Bartolom\xE9",
      "Basilio",
      "Baudelio",
      "Bautista",
      "Benigno",
      "Benito",
      "Benjam\xEDn",
      "Bermudo",
      "Bernab\xE9",
      "Bernardino",
      "Bernardo",
      "Berto",
      "Blas",
      "Bol\xEDvar",
      "Bonifacio",
      "Borja",
      "Brayan",
      "Bruno",
      "Buenaventura",
      "Calisto",
      "Calixto",
      "Camilo",
      "Cande",
      "Candelario",
      "C\xE1ndido",
      "Carlito",
      "Carlitos",
      "Carlos",
      "Carmelo",
      "Casimiro",
      "Cayetano",
      "Cebri\xE1n",
      "Cecilio",
      "Ceferino",
      "Celestino",
      "Celino",
      "Celio",
      "Celso",
      "C\xE9sar",
      "Che",
      "Chema",
      "Chucho",
      "Chus",
      "Chuy",
      "Cipriano",
      "Cir\xEDaco",
      "Ciriaco",
      "Cirino",
      "Ciro",
      "Citlali",
      "Citlalli",
      "Claudio",
      "Clemente",
      "Cleto",
      "Cl\xEDmaco",
      "Conrado",
      "Constantino",
      "Cornelio",
      "Cosme",
      "Cris\xF3stomo",
      "Cristi\xE1n",
      "Cristian",
      "Crist\xF3bal",
      "Cruz",
      "Cuauht\xE9moc",
      "Curro",
      "Custodio",
      "Dami\xE1n",
      "Dan",
      "Dani",
      "Daniel",
      "Danilo",
      "Dar\xEDo",
      "David",
      "Demetrio",
      "Desiderio",
      "Diego",
      "Dimas",
      "Dionisio",
      "Domingo",
      "Donato",
      "Duilio",
      "Eberardo",
      "Edelmiro",
      "\xC9dgar",
      "Edgardo",
      "Edmundo",
      "Edu",
      "Eduardo",
      "Efra\xEDn",
      "Ehecatl",
      "Eladio",
      "Eleuterio",
      "El\xEDas",
      "Eligio",
      "Eliseo",
      "Eloy",
      "Elpidio",
      "Emigdio",
      "Emiliano",
      "Emilio",
      "Enrique",
      "Epifanio",
      "Erasmo",
      "Eric",
      "Ernesto",
      "Espiridi\xF3n",
      "Estanislao",
      "Esteban",
      "Eugenio",
      "Eulogio",
      "Eusebio",
      "Eustaquio",
      "Eutimio",
      "Eutropio",
      "Evaristo",
      "Ezequiel",
      "Fabi\xE1n",
      "Fabio",
      "Fabricio",
      "Facundo",
      "Faustino",
      "Fausto",
      "Federico",
      "Feliciano",
      "Felipe",
      "F\xE9lix",
      "Ferm\xEDn",
      "Fernando",
      "Fidel",
      "Filem\xF3n",
      "Fito",
      "Flavio",
      "Florencio",
      "Florentino",
      "Flori\xE1n",
      "Floro",
      "Fortunato",
      "Fran",
      "Francisco",
      "Francisco Javier",
      "Fulgencio",
      "Gabino",
      "Gabriel",
      "Gael",
      "Galo",
      "Gaspar",
      "Gast\xF3n",
      "Geraldo",
      "Gerardo",
      "Germ\xE1n",
      "Ger\xF3nimo",
      "Gervasio",
      "Gil",
      "Gilberto",
      "Gin\xE9s",
      "Glauco",
      "Godofredo",
      "Gonzalo",
      "Goyo",
      "Graciano",
      "Gregorio",
      "Grimaldo",
      "Guadalupe",
      "Gualberto",
      "Gualterio",
      "Guillermo",
      "Guiomar",
      "Gustavo",
      "Gutierre",
      "Haroldo",
      "H\xE9ctor",
      "Heliodoro",
      "Heraclio",
      "Herberto",
      "Heriberto",
      "Hermenegildo",
      "Herminio",
      "Hern\xE1n",
      "Hernando",
      "Hilario",
      "Hip\xF3lito",
      "Horacio",
      "Hugo",
      "Humberto",
      "Ib\xE1n",
      "Ignacio",
      "Ildefonso",
      "\xCD\xF1igo",
      "Inocencio",
      "Isaac",
      "Isa\xEDas",
      "Isidoro",
      "Isidro",
      "Ismael",
      "Israel",
      "Iv\xE1n",
      "Izan",
      "Jacinto",
      "Jacobo",
      "Jafet",
      "Jaime",
      "Jair",
      "Javi",
      "Javier",
      "Jenaro",
      "Jerem\xEDas",
      "Jer\xF3nimo",
      "Jes\xFAs",
      "Jimeno",
      "Joaqu\xEDn",
      "Joaquin",
      "Joel",
      "Jonatan",
      "Jord\xE1n",
      "Jorge",
      "Jose",
      "Jos\xE9",
      "Jos\xE9 \xC1ngel",
      "Jos\xE9 Antonio",
      "Jos\xE9 Luis",
      "Jos\xE9 Manuel",
      "Jos\xE9 Mari",
      "Jos\xE9 Mar\xEDa",
      "Josepe",
      "Josu\xE9",
      "Juan",
      "Juan Bautista",
      "Juan Carlos",
      "Juancho",
      "Juanfran",
      "Juan Francisco",
      "Juanito",
      "Juan Jos\xE9",
      "Juanma",
      "Juan Manuel",
      "Juan Pablo",
      "Juantxo",
      "Juli\xE1n",
      "Julio",
      "Julio C\xE9sar",
      "Justino",
      "Justo",
      "Kevin",
      "Kike",
      "Kiko",
      "Ladislao",
      "Lalo",
      "L\xE1zaro",
      "Leandro",
      "Leocadio",
      "Le\xF3n",
      "Leonardo",
      "Leoncio",
      "Leonel",
      "Leopoldo",
      "Liberato",
      "Lino",
      "Lisandro",
      "Lope",
      "Lorenzo",
      "Loreto",
      "Lucas",
      "Lucho",
      "Luciano",
      "Lucio",
      "Luis",
      "Luis \xC1ngel",
      "Luisito",
      "Lupe",
      "Macario",
      "Maikel",
      "Manolo",
      "Manu",
      "Manuel",
      "Marcelino",
      "Marcelo",
      "Marcial",
      "Marciano",
      "Marcio",
      "Marco",
      "Marcos",
      "Mar\xEDa",
      "Mariano",
      "Marino",
      "Mario",
      "Mart\xEDn",
      "Mateo",
      "Mat\xEDas",
      "Mauricio",
      "Maxi",
      "Maximiano",
      "Maximiliano",
      "Maximino",
      "M\xE1ximo",
      "Melchor",
      "Metztli",
      "Meztli",
      "Miguel",
      "Miguel \xC1ngel",
      "Miguelito",
      "Modesto",
      "Mois\xE9s",
      "Moncho",
      "Moreno",
      "Nacho",
      "Nacio",
      "Nando",
      "Narciso",
      "Natalio",
      "Natanael",
      "Nataniel",
      "Nazaret",
      "Nazario",
      "Neizan",
      "Nereo",
      "N\xE9stor",
      "Nicanor",
      "Nico",
      "Nicodemo",
      "Nicol\xE1s",
      "Nilo",
      "No\xE9",
      "Norberto",
      "Octavio",
      "Odalis",
      "Olegario",
      "Omar",
      "Onofre",
      "Orfeo",
      "\xD3scar",
      "Osvaldo",
      "Ovidio",
      "Pablo",
      "Paco",
      "Pancho",
      "P\xE1nfilo",
      "Paquito",
      "Pascual",
      "Pastor",
      "Patricio",
      "Paulino",
      "Pedro",
      "Pelayo",
      "Pepe",
      "Pepito",
      "P\xEDo",
      "Pl\xE1cido",
      "Plinio",
      "Poncio",
      "Porfirio",
      "Primitivo",
      "Pr\xF3spero",
      "Prudencio",
      "Quique",
      "Quirino",
      "Rafa",
      "Rafael",
      "Raimundo",
      "Rainerio",
      "Ramiro",
      "Ram\xF3n",
      "Ra\xFAl",
      "Raymundo",
      "R\xE9gulo",
      "Reinaldo",
      "Remigio",
      "Renato",
      "Ren\xE9",
      "Renzo",
      "Reyes",
      "Reynaldo",
      "Ricardo",
      "Rico",
      "Roberto",
      "Rodolfito",
      "Rodolfo",
      "Rodrigo",
      "Rogelio",
      "Rolando",
      "Rold\xE1n",
      "Rom\xE1n",
      "R\xF3mulo",
      "Roque",
      "Rosario",
      "Rosendo",
      "Rub\xE9n",
      "Rufino",
      "Ruperto",
      "Ruy",
      "Sabas",
      "Salom\xF3n",
      "Salvador",
      "Samu",
      "Samuel",
      "Sancho",
      "Sandalio",
      "Santi",
      "Santiago",
      "Santos",
      "Saturnino",
      "Sa\xFAl",
      "Sebasti\xE1n",
      "Segismundo",
      "Sergio",
      "Seve",
      "Severiano",
      "Severino",
      "Severo",
      "Sigfrido",
      "Silvestre",
      "Silvio",
      "Sim\xF3n",
      "S\xF3crates",
      "Sofronio",
      "Sosimo",
      "T\xE1cito",
      "Tadeo",
      "Telesforo",
      "Telmo",
      "Teo",
      "Teobaldo",
      "Teodoro",
      "Teodosio",
      "Te\xF3dulo",
      "Te\xF3filo",
      "Tercero",
      "Tiburcio",
      "Timoteo",
      "Tito",
      "Tlaloc",
      "Tom\xE1s",
      "Toni",
      "To\xF1o",
      "Toribio",
      "Trinidad",
      "Trist\xE1n",
      "Tulio",
      "Ulises",
      "Urbano",
      "Valente",
      "Valent\xEDn",
      "Valerio",
      "Valero",
      "Vasco",
      "Vencesl\xE1s",
      "Vicente",
      "V\xEDctor",
      "Victoriano",
      "Victorino",
      "Vidal",
      "Vinicio",
      "Virgilio",
      "Vito",
      "W\xE1lter",
      "Wilfredo",
      "Xavier",
      "Xochipilli",
      "Yago",
      "Yair",
      "Yaxkin",
      "Yolotl",
      "Yolotli",
      "Yunuen",
      "Zacar\xEDas"
    ],
    female: [
      "Abiga\xEDl",
      "Abril",
      "Adela",
      "Adelaida",
      "Adelia",
      "Adelina",
      "Adelita",
      "Adora",
      "Adoraci\xF3n",
      "Adriana",
      "\xC1frica",
      "Agata",
      "\xC1gueda",
      "Agustina",
      "Ainara",
      "Ainoa",
      "Aitana",
      "Alba",
      "Albina",
      "Ale",
      "Alejandra",
      "Alexandra",
      "Alexis",
      "Alicia",
      "Alma",
      "Almudena",
      "Alondra",
      "Amada",
      "Amalia",
      "Amanda",
      "Amaranta",
      "Amarilis",
      "Amaya",
      "\xC1mbar",
      "Amelia",
      "Am\xE9rica",
      "Ameyalli",
      "Amor",
      "Amparo",
      "Ana",
      "Anabel",
      "Ana Bel\xE9n",
      "Ana Mar\xEDa",
      "Ana Sof\xEDa",
      "Anastacia",
      "Anastasia",
      "Andrea",
      "\xC1ngela",
      "\xC1ngeles",
      "Ang\xE9lica",
      "Angelina",
      "Angelita",
      "Ani",
      "Anita",
      "Anselma",
      "Antonia",
      "Antonieta",
      "Anunciaci\xF3n",
      "Apolonia",
      "Araceli",
      "Aracelis",
      "Aracely",
      "Ar\xE1nzazu",
      "Arcelia",
      "Ariadna",
      "Ariel",
      "Armida",
      "Aroa",
      "Ascensi\xF3n",
      "Asun",
      "Asunci\xF3n",
      "Aura",
      "\xC1urea",
      "Aurelia",
      "Aurora",
      "Azahar",
      "Azahara",
      "Azeneth",
      "Azucena",
      "Balbina",
      "B\xE1rbara",
      "Beatriz",
      "Bego\xF1a",
      "Bel\xE9n",
      "Benigna",
      "Benita",
      "Bernarda",
      "Bernardita",
      "Berta",
      "Betania",
      "Bethania",
      "Bibiana",
      "Bienvenida",
      "Blanca",
      "Br\xEDgida",
      "Brunilda",
      "Calista",
      "Calixta",
      "Camila",
      "Cande",
      "Candela",
      "Candelaria",
      "Candelas",
      "C\xE1ndida",
      "Caridad",
      "Carina",
      "Carla",
      "Carlota",
      "Carmela",
      "Carmelita",
      "Carmen",
      "Carmina",
      "Carolina",
      "Casandra",
      "Catalina",
      "Cayetana",
      "Cecilia",
      "Celestina",
      "Celia",
      "Charo",
      "Chelo",
      "Chita",
      "Chus",
      "Cintia",
      "Citlali",
      "Citlalli",
      "Clara",
      "Clarisa",
      "Claudia",
      "Clementina",
      "Cloe",
      "Clotilde",
      "Concepci\xF3n",
      "Concha",
      "Conchita",
      "Constanza",
      "Consuela",
      "Consuelo",
      "Coral",
      "Corona",
      "Crescencia",
      "Cristal",
      "Cristina",
      "Cruz",
      "Cruzita",
      "Custodia",
      "Dafne",
      "Dalia",
      "Dalila",
      "Daniela",
      "D\xE9bora",
      "Delfina",
      "Delia",
      "Desideria",
      "Diana",
      "Dionisia",
      "Divina",
      "Dolores",
      "Dominga",
      "Domitila",
      "Dora",
      "Dorita",
      "Dorotea",
      "Dulce",
      "Edelmira",
      "Elba",
      "Elena",
      "Eli",
      "Eliana",
      "Eligia",
      "Elisa",
      "Elisabet",
      "Elodia",
      "Elo\xEDsa",
      "Elvira",
      "Ema",
      "Emelina",
      "Emigdia",
      "Emilia",
      "Emiliana",
      "Emma",
      "Emperatriz",
      "Encarna",
      "Encarnaci\xF3n",
      "Encarnita",
      "Eneida",
      "Ercilia",
      "Esmeralda",
      "Esperanza",
      "Estefan\xEDa",
      "Estela",
      "Ester",
      "Esther",
      "Estrella",
      "Etelvina",
      "Eufemia",
      "Eugenia",
      "Eulalia",
      "Eulogia",
      "Eusebia",
      "Eva",
      "Eva Mar\xEDa",
      "Evangelina",
      "Evelia",
      "Evita",
      "Fabiana",
      "Fabiola",
      "Fanny",
      "F\xE1tima",
      "Febe",
      "Felicia",
      "Feliciana",
      "Felicidad",
      "Felipa",
      "Felisa",
      "Fernanda",
      "Fidela",
      "Fidelia",
      "Filomena",
      "Flavia",
      "Flor",
      "Flora",
      "Florencia",
      "Florentina",
      "Florina",
      "Florinda",
      "Fortunata",
      "Fran",
      "Francisca",
      "Gabriela",
      "Gala",
      "Gema",
      "Genoveva",
      "Georgina",
      "Gertrudis",
      "Gilberta",
      "Gisela",
      "Gloria",
      "Gracia",
      "Graciana",
      "Graciela",
      "Gregoria",
      "Griselda",
      "Guadalupe",
      "Guiomar",
      "Hayd\xE9e",
      "Herminia",
      "Hilaria",
      "Hilda",
      "Hortensia",
      "Ic\xEDar",
      "Ignacia",
      "Ileana",
      "Imelda",
      "In\xE9s",
      "\xCDngrid",
      "Inma",
      "Inmaculada",
      "Irene",
      "Iris",
      "Irma",
      "Isa",
      "Isabel",
      "Isabela",
      "Isaura",
      "Isidora",
      "Itzel",
      "Itziar",
      "Ixchel",
      "Jacinta",
      "Javiera",
      "Jenifer",
      "Jennifer",
      "Jenny",
      "Jesenia",
      "Jessenia",
      "Jessica",
      "Jesusa",
      "Jimena",
      "Joaquina",
      "Johana",
      "Jordana",
      "Jos\xE9",
      "Josefa",
      "Josefina",
      "Jovita",
      "Juana",
      "Juanita",
      "Judit",
      "Judith",
      "Julia",
      "Juliana",
      "Julieta",
      "Justa",
      "Justina",
      "Lady",
      "Lara",
      "Laura",
      "Laurita",
      "Leandra",
      "Leire",
      "Leocadia",
      "Leonor",
      "Leticia",
      "Leyre",
      "Lidia",
      "Ligia",
      "Lilia",
      "Liliana",
      "Lina",
      "Loida",
      "Lola",
      "Lolita",
      "Lorena",
      "Lorenza",
      "Loreto",
      "Lourdes",
      "Luc\xEDa",
      "Luciana",
      "Lucila",
      "Luisa",
      "Luisina",
      "Luisita",
      "Luna",
      "Lupe",
      "Lupita",
      "Luz",
      "Macarena",
      "Macaria",
      "Mafalda",
      "Magdalena",
      "Maite",
      "Malena",
      "Malinalli",
      "Mamen",
      "Manola",
      "Manu",
      "Manuela",
      "Manuelita",
      "Mar",
      "Marcela",
      "Marcelina",
      "Marcia",
      "Margarita",
      "Mar\xEDa",
      "Mar\xEDa \xC1ngeles",
      "Mar\xEDa Bel\xE9n",
      "Mar\xEDa Carmen",
      "Mar\xEDa Cristina",
      "Mar\xEDa de Jes\xFAs",
      "Mar\xEDa del Carmen",
      "Mar\xEDa de los \xC1ngeles",
      "Mar\xEDa Dolores",
      "Mar\xEDa Fernanda",
      "Mar\xEDa Guadalupe",
      "Mar\xEDa Jes\xFAs",
      "Mar\xEDa Jos\xE9",
      "Mar\xEDa Luisa",
      "Mar\xEDa Manuela",
      "Mariana",
      "Marianela",
      "Marianita",
      "Mar\xEDa Pilar",
      "Mar\xEDa Teresa",
      "Maribel",
      "Maricela",
      "Maricruz",
      "Marina",
      "Marisa",
      "Marisela",
      "Marisol",
      "Maristela",
      "Marita",
      "Maritza",
      "Marta",
      "Martina",
      "Martirio",
      "Martita",
      "Matilde",
      "Maura",
      "Maxi",
      "M\xE1xima",
      "Mayra",
      "Mayte",
      "Melania",
      "Melisa",
      "Mercedes",
      "Merche",
      "Metztli",
      "Meztli",
      "Micaela",
      "Miguela",
      "Milagros",
      "Mireia",
      "Mireya",
      "Miriam",
      "Mirta",
      "Modesta",
      "M\xF3nica",
      "Morena",
      "Nadia",
      "Narcisa",
      "Natalia",
      "Natividad",
      "Nayara",
      "Nayeli",
      "Nazaret",
      "N\xE9lida",
      "Nereida",
      "Nicolasa",
      "Nicte",
      "Nidia",
      "Nieve",
      "Nieves",
      "Nilda",
      "Noa",
      "Noelia",
      "Noem\xED",
      "Nohemi",
      "Nuria",
      "Nydia",
      "Obdulia",
      "Octavia",
      "Odalis",
      "Odalys",
      "Ofelia",
      "Olalla",
      "Olga",
      "Olimpia",
      "Olivia",
      "Oriana",
      "Otilia",
      "Ovidia",
      "Paca",
      "Pac\xEDfica",
      "Palmira",
      "Paloma",
      "Paola",
      "Paquita",
      "Pascuala",
      "Pastora",
      "Patricia",
      "Paula",
      "Paulina",
      "Paz",
      "Pepita",
      "Perla",
      "Perlita",
      "Perpetua",
      "Petrona",
      "P\xEDa",
      "Piedad",
      "Pilar",
      "Pili",
      "Pl\xE1cida",
      "Primitiva",
      "Priscila",
      "Prudencia",
      "Purificaci\xF3n",
      "Quetzalli",
      "Rafaela",
      "Ramona",
      "Raquel",
      "Rayen",
      "Rebeca",
      "Regina",
      "Reina",
      "Remedios",
      "Renata",
      "Reyes",
      "Reyna",
      "Ricarda",
      "Rita",
      "Roberta",
      "Robertina",
      "Roc\xEDo",
      "Rosa",
      "Rosal\xEDa",
      "Rosalina",
      "Rosalinda",
      "Rosalva",
      "Rosa Mar\xEDa",
      "Rosario",
      "Rosaura",
      "Rosenda",
      "Rosita",
      "Roxana",
      "Rufina",
      "Ruperta",
      "Rut",
      "Ruth",
      "Sabina",
      "Sacnicte",
      "Sacnite",
      "Salom\xE9",
      "Salud",
      "Samanta",
      "Sancha",
      "Sandra",
      "Sara",
      "Sarita",
      "Saturnina",
      "Sebastiana",
      "Selena",
      "Serafina",
      "Silvia",
      "Socorro",
      "Sof\xEDa",
      "Sol",
      "Soledad",
      "Sonia",
      "Soraya",
      "Susana",
      "Susanita",
      "Tamara",
      "Tania",
      "Tatiana",
      "Tecla",
      "Teo",
      "Teodora",
      "Te\xF3fila",
      "Tere",
      "Teresa",
      "Teresita",
      "Tlalli",
      "Tomasa",
      "Tonalli",
      "Triana",
      "Trini",
      "Trinidad",
      "Urbana",
      "\xDArsula",
      "Valentina",
      "Valeria",
      "Vanesa",
      "Varinia",
      "Vera",
      "Ver\xF3nica",
      "Vicenta",
      "Victoria",
      "Vilma",
      "Violeta",
      "Virginia",
      "Visitaci\xF3n",
      "Viviana",
      "Ximena",
      "Xiomara",
      "X\xF3chilt",
      "Xochiquetzal",
      "X\xF3chitl",
      "Xochitl",
      "Yadira",
      "Yaiza",
      "Yamila",
      "Yamil\xE9",
      "Yamilet",
      "Yamileth",
      "Yaretzi",
      "Yaritza",
      "Yasmina",
      "Yenifer",
      "Yenny",
      "Yesenia",
      "Y\xE9sica",
      "Yessenia",
      "Y\xE9ssica",
      "Yolanda",
      "Yolotl",
      "Yolotli",
      "Yoselin",
      "Ysabel",
      "Yunuen",
      "Zaira",
      "Zoraida"
    ],
    surname: [
      "Abarca",
      "Abascal",
      "Abel",
      "Abraham",
      "Acosta",
      "Agua",
      "Aguado",
      "Aguilar",
      "Aiza",
      "Alamilla",
      "Alfaro",
      "Alonso",
      "Alvarado",
      "\xC1lvarez",
      "Amador",
      "Andr\xE9s",
      "Antonio",
      "Ant\xFAnez",
      "Aquino",
      "Araujo",
      "Araya",
      "Arce",
      "Arechavaleta",
      "Arenas",
      "Arias",
      "Aritza",
      "Armando",
      "Arreola",
      "Arriola",
      "As\xEDs",
      "Asturias",
      "Banderas",
      "Barros",
      "Basurto",
      "Bautista",
      "Bello",
      "Belmonte",
      "Ben\xEDtez",
      "Berm\xFAdez",
      "Blanco",
      "Bol\xEDvar",
      "Borja",
      "Bosque",
      "Bustillo",
      "Busto",
      "Bustos",
      "Caballero",
      "Cabello",
      "Cabrera",
      "Calvo",
      "Campana",
      "Campo",
      "Campos",
      "Cano",
      "Cant\xFA",
      "Capilla",
      "Cardoso",
      "Cardozo",
      "Caro",
      "Carrasco",
      "Casal",
      "Casales",
      "Castellano",
      "Castilla",
      "Castillo",
      "Castro",
      "Catal\xE1n",
      "Cervantes",
      "Chavarr\xEDa",
      "Chaves",
      "Ch\xE1vez",
      "Col\xF3n",
      "Contreras",
      "Cort\xE9s",
      "Cortez",
      "Crespo",
      "Cruz",
      "Cu\xE9llar",
      "Cuesta",
      "Cuevas",
      "Dal\xED",
      "De la Cruz",
      "Dela Cruz",
      "De la Fuente",
      "Del Bosque",
      "De Le\xF3n",
      "Delgado",
      "Del Olmo",
      "Del R\xEDo",
      "De Santiago",
      "D\xEDaz",
      "D\xEDez",
      "Dom\xEDnguez",
      "Duarte",
      "Dur\xE1n",
      "Echevarr\xEDa",
      "Echeverr\xEDa",
      "Elizondo",
      "Escamilla",
      "Esc\xE1rcega",
      "Escarr\xE0",
      "Esparza",
      "Espina",
      "Espino",
      "Espinosa",
      "Espinoza",
      "Esteban",
      "Est\xE9vez",
      "Estrada",
      "Exp\xF3sito",
      "Feliciano",
      "F\xE9lix",
      "Fern\xE1ndez",
      "Ferro",
      "Fierro",
      "Figueroa",
      "Flores",
      "Fonseca",
      "Fontana",
      "Franco",
      "Fuentes",
      "Gallego",
      "Gallo",
      "Garc\xEDa",
      "Garrido",
      "Garza",
      "Gaspar",
      "Gil",
      "Gim\xE9nez",
      "G\xF3mez",
      "Gonzales",
      "Gonz\xE1lez",
      "Guadarrama",
      "Guerra",
      "Guerrero",
      "Guti\xE9rrez",
      "Gutierrez",
      "Guzm\xE1n",
      "Hern\xE1ndez",
      "Herrera",
      "Herrero",
      "Hidalgo",
      "Hierro",
      "Holgu\xEDn",
      "Huerta",
      "Ib\xE1\xF1ez",
      "Ibarra",
      "Iglesias",
      "\xCD\xF1iguez",
      "I\xF1\xEDguez",
      "Jim\xE9nez",
      "Ju\xE1rez",
      "Le\xF3n",
      "Le\xF3n",
      "Lobo",
      "L\xF3pez",
      "Lopez",
      "Lorenzo",
      "Losa",
      "Loyola",
      "Lozano",
      "Lucas",
      "Luna",
      "Machado",
      "Mac\xEDas",
      "Magro",
      "Maldonado",
      "Maradona",
      "Mar\xEDa",
      "Mar\xEDn",
      "Marino",
      "M\xE1rquez",
      "Mart\xEDn",
      "Mart\xEDnez",
      "Martinez",
      "Mata",
      "Matos",
      "Medina",
      "Mel\xE9ndez",
      "M\xE9ndez",
      "Mendoza",
      "Men\xE9ndez",
      "Merlo",
      "Mingo",
      "Molina",
      "Monta\xF1a",
      "Montero",
      "Mora",
      "Morales",
      "Moralez",
      "Moreno",
      "Mu\xF1oz",
      "Narv\xE1ez",
      "Navarro",
      "Nieto",
      "Nieves",
      "Noguera",
      "N\xFA\xF1ez",
      "Obando",
      "Ochoa",
      "Ojeda",
      "Oleastro",
      "Olgu\xEDn",
      "Olmo",
      "Olmos",
      "Oquendo",
      "Orellana",
      "Ortega",
      "Ortiz",
      "Otero",
      "Padilla",
      "Palencia",
      "Palomo",
      "Pantoja",
      "Pardo",
      "Paredes",
      "Pascual",
      "Pastor",
      "Pav\xEDa",
      "Paz",
      "Pel\xE1ez",
      "Pe\xF1a",
      "P\xE9rez",
      "Perez",
      "Pinto",
      "Porras",
      "Prieto",
      "Puerta",
      "Quesada",
      "Quijada",
      "Quijano",
      "Qui\xF1ones",
      "Quintana",
      "Quir\xF3s",
      "Quixada",
      "Quixano",
      "Ram\xEDrez",
      "Ramos",
      "Rana",
      "Redondo",
      "Rend\xF3n",
      "Rey",
      "Reyes",
      "R\xEDos",
      "Rivas",
      "Rivera",
      "Rivero",
      "Robledo",
      "Robles",
      "Rodr\xEDguez",
      "Rodriquez",
      "Rojas",
      "Rojo",
      "Rold\xE1n",
      "Romero",
      "Rosales",
      "Rosario",
      "Rubio",
      "Ruiz",
      "Sala",
      "Salamanca",
      "Salcedo",
      "Salinas",
      "S\xE1nchez",
      "Sanchez",
      "Sandoval",
      "San Nicol\xE1s",
      "Santana",
      "Santiago",
      "Santos",
      "Sanz",
      "Sastre",
      "Sep\xFAlveda",
      "Serrano",
      "Sierra",
      "Silva",
      "Sim\xF3n",
      "Sosa",
      "Soto",
      "Su\xE1rez",
      "Suero",
      "Tapia",
      "Terrazas",
      "Toledano",
      "Torres",
      "Tos",
      "Travieso",
      "Trujillo",
      "Ure\xF1a",
      "Valdez",
      "Valencia",
      "Valiente",
      "Varela",
      "Vargas",
      "V\xE1squez",
      "V\xE1zquez",
      "Vega",
      "Vela",
      "Velasco",
      "Vel\xE1squez",
      "Vel\xE1zquez",
      "Ventura",
      "Vicario",
      "Vicente",
      "Vidal",
      "Villa",
      "Villalobos",
      "Villanueva",
      "Villar",
      "Villaverde",
      "Viteri",
      "Ybarra",
      "Zamorano",
      "Zapatero",
      "Zavala"
    ]
  },
  {
    key: "italian",
    label: "Italian",
    male: [
      "Abbondio",
      "Abele",
      "Abramo",
      "Achille",
      "Adalberto",
      "Adamo",
      "Adelardo",
      "Adelmo",
      "Ademaro",
      "Adolfo",
      "Adone",
      "Adriano",
      "Agapito",
      "Agatino",
      "Agostino",
      "Albano",
      "Alberico",
      "Alberto",
      "Albino",
      "Alcide",
      "Aldo",
      "Ale",
      "Alessandro",
      "Alessio",
      "Alex",
      "Alfeo",
      "Alfio",
      "Alfonso",
      "Alfredo",
      "Aloisio",
      "Alvise",
      "Amadeo",
      "Amato",
      "Amatore",
      "Ambrogino",
      "Ambrogio",
      "Amedeo",
      "Amerigo",
      "Amilcare",
      "Amleto",
      "Amore",
      "Ampelio",
      "Anacleto",
      "Anastasio",
      "Andrea",
      "Angelino",
      "Angelo",
      "Angiolo",
      "Annibale",
      "Annunziato",
      "Ansaldo",
      "Anselmo",
      "Antelmo",
      "Antioco",
      "Antonello",
      "Antonino",
      "Antonio",
      "Antonio Pio",
      "Arcangelo",
      "Ardito",
      "Arduino",
      "Aristide",
      "Armando",
      "Arnaldo",
      "Arnoldo",
      "Arnolfo",
      "Aroldo",
      "Aronne",
      "Arrigo",
      "Arsenio",
      "Artemio",
      "Arturo",
      "Ascanio",
      "Atanasio",
      "Attilio",
      "Augusto",
      "Aureliano",
      "Aurelio",
      "Balbino",
      "Baldassare",
      "Baldo",
      "Baldovino",
      "Barnaba",
      "Bartolo",
      "Bartolomeo",
      "Basilio",
      "Battista",
      "Benedetto",
      "Beniamino",
      "Benigno",
      "Benito",
      "Benvenuto",
      "Beppe",
      "Berardo",
      "Bernardino",
      "Bernardo",
      "Berto",
      "Bertoldo",
      "Bertrando",
      "Bettino",
      "Biaggio",
      "Biagino",
      "Biagio",
      "Bonaccorso",
      "Bonaventura",
      "Bonifacio",
      "Brunello",
      "Bruno",
      "Caio",
      "Callisto",
      "Calogero",
      "Camillo",
      "Candido",
      "Carlo",
      "Carmelo",
      "Carmine",
      "Casimiro",
      "Cassio",
      "Catello",
      "Cecilio",
      "Celeste",
      "Celestino",
      "Celino",
      "Celio",
      "Celso",
      "Cesare",
      "Cesarino",
      "Cipriano",
      "Ciriaco",
      "Cirillo",
      "Cirino",
      "Ciro",
      "Claudio",
      "Clemente",
      "Cleto",
      "Colombano",
      "Colombo",
      "Concetto",
      "Consalvo",
      "Cornelio",
      "Corradino",
      "Corrado",
      "Cosimo",
      "Cosma",
      "Cosmo",
      "Costantino",
      "Costanzo",
      "Crescenzo",
      "Cristiano",
      "Cristoforo",
      "Damiano",
      "Daniele",
      "Danilo",
      "Dante",
      "Dario",
      "Davide",
      "Demetrio",
      "Desiderio",
      "Diego",
      "Dino",
      "Diodato",
      "Dionisio",
      "Domenico",
      "Donatello",
      "Donato",
      "Doriano",
      "Duilio",
      "Durante",
      "Edgardo",
      "Edmondo",
      "Edoardo",
      "Efisio",
      "Egidio",
      "Eleuterio",
      "Elia",
      "Eligio",
      "Elio",
      "Eliodoro",
      "Eliseo",
      "Elmo",
      "Elpidio",
      "Elvio",
      "Emanuele",
      "Emidio",
      "Emiliano",
      "Emilio",
      "Emmanuele",
      "Enea",
      "Ennio",
      "Enrico",
      "Enzo",
      "Epifanio",
      "Eraldo",
      "Erasmo",
      "Ercole",
      "Ermacora",
      "Ermanno",
      "Ermenegildo",
      "Ermes",
      "Ermete",
      "Erminio",
      "Ernesto",
      "Ettore",
      "Eugenio",
      "Eusebio",
      "Eustachio",
      "Eustorgio",
      "Eutimio",
      "Evangelista",
      "Evaristo",
      "Ezio",
      "Fabiano",
      "Fabio",
      "Fabrizio",
      "Faustino",
      "Fausto",
      "Fedele",
      "Federico",
      "Federigo",
      "Felice",
      "Feliciano",
      "Ferdinando",
      "Ferruccio",
      "Filadelfo",
      "Filiberto",
      "Filippo",
      "Fiore",
      "Fiorenzo",
      "Fiorino",
      "Firmino",
      "Flaviano",
      "Flavio",
      "Floriano",
      "Floro",
      "Fortunato",
      "Francesco",
      "Francesco Pio",
      "Franco",
      "Frediano",
      "Fredo",
      "Fulgenzio",
      "Fulvio",
      "Gabriele",
      "Gaetano",
      "Galeazzo",
      "Galileo",
      "Gallo",
      "Gaspare",
      "Gasparo",
      "Gastone",
      "Gavino",
      "Generoso",
      "Genesio",
      "Gennarino",
      "Gennaro",
      "Gerardo",
      "Geremia",
      "Germano",
      "Gerolamo",
      "Gervasio",
      "Gherardo",
      "Giacinto",
      "Giacobbe",
      "Giacomo",
      "Giambattista",
      "Giampaolo",
      "Giampiero",
      "Gian",
      "Giancarlo",
      "Gianfranco",
      "Gianluca",
      "Gianluigi",
      "Gianmarco",
      "Gianmaria",
      "Gianni",
      "Giannino",
      "Gianpaolo",
      "Gianpiero",
      "Gigi",
      "Gilberto",
      "Gildo",
      "Gino",
      "Gi\xF2",
      "Gioacchino",
      "Gioachino",
      "Gioele",
      "Giona",
      "Gionata",
      "Giordano",
      "Giorgino",
      "Giorgio",
      "Giosu\xE8",
      "Giotto",
      "Giovanbattista",
      "Giovanni",
      "Giraldo",
      "Girolamo",
      "Giuliano",
      "Giulio",
      "Giuseppe",
      "Giusi",
      "Giustino",
      "Giusto",
      "Glauco",
      "Goffredo",
      "Graziano",
      "Gregorio",
      "Grimaldo",
      "Gualberto",
      "Gualtiero",
      "Guerino",
      "Guglielmo",
      "Guido",
      "Gustavo",
      "Iacopo",
      "Igino",
      "Ignazio",
      "Igor",
      "Ilario",
      "Innocenzo",
      "Ippolito",
      "Ireneo",
      "Isacco",
      "Isaia",
      "Isidoro",
      "Ismaele",
      "Italo",
      "Ivan",
      "Ivano",
      "Ivo",
      "Jacopo",
      "Joele",
      "Ladislao",
      "Lamberto",
      "Lando",
      "Lapo",
      "Lauro",
      "Lazzaro",
      "Leandro",
      "Lelio",
      "Leoluca",
      "Leonardo",
      "Leone",
      "Leonida",
      "Leonzio",
      "Leopoldo",
      "Liberato",
      "Liberatore",
      "Liborio",
      "Lino",
      "Lino",
      "Livio",
      "Lodovico",
      "Lorenzo",
      "Loreto",
      "Loris",
      "Lotario",
      "Luca",
      "Luciano",
      "Lucilio",
      "Lucio",
      "Ludovico",
      "Luigi",
      "Luigino",
      "Manfredi",
      "Manfredo",
      "Manlio",
      "Manuel",
      "Manuele",
      "Marcellino",
      "Marcello",
      "Marciano",
      "Marco",
      "Maria",
      "Mariano",
      "Marino",
      "Mario",
      "Martino",
      "Marzio",
      "Massimiliano",
      "Massimo",
      "Matteo",
      "Mattia",
      "Maurizio",
      "Mauro",
      "Melchiorre",
      "Mercurio",
      "Michelangelo",
      "Michele",
      "Mirco",
      "Mirko",
      "Modesto",
      "Moreno",
      "Mos\xE8",
      "Naldo",
      "Nando",
      "Napoleone",
      "Narciso",
      "Natale",
      "Natalino",
      "Natanaele",
      "Nazario",
      "Nazzareno",
      "Nello",
      "Nereo",
      "Nerio",
      "Nero",
      "Nestore",
      "Nevio",
      "Niccol\xF2",
      "Nico",
      "Nicodemo",
      "Nicola",
      "Nicolao",
      "Nicolino",
      "Nicol\xF2",
      "Nicomede",
      "Nicostrato",
      "Nilo",
      "Nino",
      "No\xE8",
      "Norberto",
      "Nunzio",
      "Oddo",
      "Odoacre",
      "Olindo",
      "Oliviero",
      "Omar",
      "Onofrio",
      "Orazio",
      "Oreste",
      "Orfeo",
      "Orlando",
      "Orsino",
      "Orso",
      "Oscar",
      "Osvaldo",
      "Otello",
      "Ottaviano",
      "Ottavio",
      "Ottone",
      "Ottorino",
      "Ovidio",
      "Palmiro",
      "Pancrazio",
      "Panfilo",
      "Pantaleone",
      "Paolino",
      "Paolo",
      "Paride",
      "Pasquale",
      "Pasqualino",
      "Patrizio",
      "Pellegrino",
      "Peppe",
      "Peppi",
      "Peppino",
      "Pier",
      "Pierino",
      "Pierluigi",
      "Piero",
      "Pierpaolo",
      "Pietro",
      "Pino",
      "Pio",
      "Pippo",
      "Placido",
      "Plinio",
      "Pompeo",
      "Ponzio",
      "Porfirio",
      "Primo",
      "Prospero",
      "Prudenzio",
      "Quintino",
      "Quinto",
      "Quirino",
      "Raffaele",
      "Raffaello",
      "Raimondo",
      "Raniero",
      "Raoul",
      "Raul",
      "Remigio",
      "Remo",
      "Renato",
      "Renzo",
      "Riccardo",
      "Rico",
      "Rinaldo",
      "Rino",
      "Roberto",
      "Rocco",
      "Rodolfo",
      "Rodrigo",
      "Rolando",
      "Romano",
      "Romeo",
      "Romolo",
      "Romualdo",
      "Rosario",
      "Ruben",
      "Rufino",
      "Ruggero",
      "Ruggiero",
      "Sabino",
      "Salvatore",
      "Salvio",
      "Salvo",
      "Samuele",
      "Sandro",
      "Sansone",
      "Sante",
      "Santi",
      "Santino",
      "Santo",
      "Saturnino",
      "Saverio",
      "Savino",
      "Savio",
      "Scevola",
      "Scipione",
      "Sebastiano",
      "Serafino",
      "Sergio",
      "Sesto",
      "Settimio",
      "Settimo",
      "Severino",
      "Severo",
      "Sigfrido",
      "Sigismondo",
      "Silvano",
      "Silverio",
      "Silvestro",
      "Silvino",
      "Silvio",
      "Simone",
      "Sisto",
      "Stanislao",
      "Stefano",
      "Tacito",
      "Taddeo",
      "Tammaro",
      "Tancredi",
      "Teo",
      "Teobaldo",
      "Teodoro",
      "Teodosio",
      "Teofilo",
      "Terenzio",
      "Terzo",
      "Timoteo",
      "Tino",
      "Tito",
      "Tiziano",
      "Tobia",
      "Tomaso",
      "Tommaso",
      "Tonino",
      "Tonio",
      "Tore",
      "Tullio",
      "Uberto",
      "Ugo",
      "Ulderico",
      "Ulisse",
      "Umberto",
      "Urbano",
      "Valente",
      "Valentino",
      "Valeriano",
      "Valerio",
      "Valter",
      "Vanni",
      "Vasco",
      "Venceslao",
      "Vespasiano",
      "Vico",
      "Vilfredo",
      "Vincenzo",
      "Vinicio",
      "Virgilio",
      "Virginio",
      "Vitale",
      "Vitaliano",
      "Vito",
      "Vittore",
      "Vittorino",
      "Vittorio",
      "Viviano",
      "Walter",
      "Zaccaria",
      "Zeno"
    ],
    female: [
      "Ada",
      "Addolorata",
      "Adelaide",
      "Adele",
      "Adelina",
      "Adelma",
      "Adriana",
      "Afra",
      "Agata",
      "Agnese",
      "Agostina",
      "Agrippina",
      "Alba",
      "Alberta",
      "Albertina",
      "Albina",
      "Alda",
      "Ale",
      "Alessa",
      "Alessandra",
      "Alessia",
      "Alex",
      "Alexandra",
      "Alfonsina",
      "Alfreda",
      "Alice",
      "Alina",
      "Allegra",
      "Alma",
      "Amalia",
      "Amanda",
      "Amaranta",
      "Ambra",
      "Amedea",
      "Amelia",
      "Amore",
      "Anastasia",
      "Andreina",
      "Angela",
      "Angelica",
      "Angelina",
      "Angiola",
      "Anna",
      "Annabella",
      "Annachiara",
      "Annalisa",
      "Anna Maria",
      "Annamaria",
      "Annetta",
      "Annunciata",
      "Annunziata",
      "Anselma",
      "Antonella",
      "Antonia",
      "Antonietta",
      "Antonina",
      "Apollonia",
      "Arianna",
      "Armida",
      "Asia",
      "Assunta",
      "Augusta",
      "Aura",
      "Aurelia",
      "Aureliana",
      "Aurora",
      "Ave",
      "Azzurra",
      "Balbina",
      "Barbara",
      "Bartolomea",
      "Beatrice",
      "Benedetta",
      "Benigna",
      "Berenice",
      "Bernardetta",
      "Bernardina",
      "Berta",
      "Bettina",
      "Bianca",
      "Biancamaria",
      "Bibiana",
      "Bice",
      "Brigida",
      "Bruna",
      "Brunella",
      "Brunilda",
      "Calogera",
      "Camilla",
      "Carla",
      "Carlotta",
      "Carmela",
      "Carmen",
      "Carmina",
      "Carola",
      "Carolina",
      "Caterina",
      "Catia",
      "Cecilia",
      "Celeste",
      "Celestina",
      "Cesarina",
      "Chiara",
      "Chiarina",
      "Cinzia",
      "Clara",
      "Claretta",
      "Clarissa",
      "Claudia",
      "Clelia",
      "Clementina",
      "Clio",
      "Cloe",
      "Clotilde",
      "Colomba",
      "Colombina",
      "Concetta",
      "Concettina",
      "Consolata",
      "Corinna",
      "Cornelia",
      "Corona",
      "Cosima",
      "Costanza",
      "Cristiana",
      "Cristina",
      "Crocetta",
      "Crocifissa",
      "Dafne",
      "Dalila",
      "Damiana",
      "Dania",
      "Daniela",
      "Danila",
      "Daria",
      "Debora",
      "Delfina",
      "Delia",
      "Demetra",
      "Desideria",
      "Diana",
      "Diletta",
      "Dina",
      "Dina",
      "Dionisia",
      "Domenica",
      "Domitilla",
      "Donata",
      "Donatella",
      "Dora",
      "Doretta",
      "Dorotea",
      "Edda",
      "Edmonda",
      "Edvige",
      "Elda",
      "Elena",
      "Eleonora",
      "Elettra",
      "Eliana",
      "Elisa",
      "Elisabetta",
      "Eloisa",
      "Elsa",
      "Elvia",
      "Elvira",
      "Emanuela",
      "Emilia",
      "Emiliana",
      "Emma",
      "Enrica",
      "Enrichetta",
      "Erica",
      "Erika",
      "Ermelinda",
      "Ermenegilda",
      "Erminia",
      "Ernesta",
      "Ernestina",
      "Ersilia",
      "Ester",
      "Eufemia",
      "Eugenia",
      "Eulalia",
      "Eva",
      "Evangelista",
      "Evelina",
      "Fabia",
      "Fabiana",
      "Fabiola",
      "Fabrizia",
      "Fausta",
      "Faustina",
      "Febe",
      "Federica",
      "Fedora",
      "Felicia",
      "Feliciana",
      "Felicita",
      "Ferdinanda",
      "Fernanda",
      "Fiamma",
      "Fiammetta",
      "Filippa",
      "Filomena",
      "Fina",
      "Fioralba",
      "Fiore",
      "Fiorella",
      "Fiorenza",
      "Flavia",
      "Flaviana",
      "Flora",
      "Floriana",
      "Fortunata",
      "Franca",
      "Francesca",
      "Francesca Pia",
      "Fulvia",
      "Gabriella",
      "Gaetana",
      "Gaia",
      "Galilea",
      "Gelsomina",
      "Geltrude",
      "Gemma",
      "Genoveffa",
      "Gerarda",
      "Germana",
      "Gessica",
      "Gia",
      "Giacinta",
      "Giacoma",
      "Giacomina",
      "Giada",
      "Gianna",
      "Giannina",
      "Gilberta",
      "Gilda",
      "Gina",
      "Ginevra",
      "Gi\xF2",
      "Gioconda",
      "Gioia",
      "Giorgia",
      "Giorgina",
      "Giosetta",
      "Giovanna",
      "Giovannetta",
      "Gisella",
      "Giuditta",
      "Giulia",
      "Giuliana",
      "Giulietta",
      "Giuseppa",
      "Giuseppina",
      "Giusi",
      "Giustina",
      "Giusy",
      "Gloria",
      "Grazia",
      "Graziana",
      "Graziella",
      "Gregoria",
      "Greta",
      "Ida",
      "Ilaria",
      "Ilary",
      "Ilda",
      "Ileana",
      "Ilenia",
      "Imelda",
      "Imma",
      "Immacolata",
      "Ines",
      "Iolanda",
      "Ippolita",
      "Irene",
      "Iris",
      "Irma",
      "Isa",
      "Isabella",
      "Isidora",
      "Isotta",
      "Itala",
      "Italia",
      "Ivana",
      "Jessica",
      "Jolanda",
      "Katia",
      "Katiuscia",
      "Lara",
      "Laura",
      "Lauretta",
      "Lavinia",
      "Lea",
      "Leandra",
      "Leda",
      "Lelia",
      "Lena",
      "Leonarda",
      "Leonora",
      "Letizia",
      "Lia",
      "Lia",
      "Liana",
      "Liboria",
      "Lidia",
      "Lilia",
      "Liliana",
      "Lina",
      "Linda",
      "Lisa",
      "Livia",
      "Liviana",
      "Loredana",
      "Lorena",
      "Lorenza",
      "Loreta",
      "Loreto",
      "Loretta",
      "Lorita",
      "Luana",
      "Luce",
      "Lucetta",
      "Lucia",
      "Luciana",
      "Lucilla",
      "Lucrezia",
      "Ludovica",
      "Luigia",
      "Luigina",
      "Luisa",
      "Luisella",
      "Luna",
      "Maddalena",
      "Mafalda",
      "Malvina",
      "Manuela",
      "Mara",
      "Marcella",
      "Marcellina",
      "Margherita",
      "Maria",
      "Maria Chiara",
      "Maria Francesca",
      "Maria Grazia",
      "Mariangela",
      "Marianna",
      "Maria Pia",
      "Mariapia",
      "Mariasole",
      "Maria Vittoria",
      "Marica",
      "Mariella",
      "Marietta",
      "Marika",
      "Marilena",
      "Marina",
      "Marinella",
      "Marisa",
      "Maristella",
      "Marta",
      "Martina",
      "Marzia",
      "Matilde",
      "Mattea",
      "Maura",
      "Maurizia",
      "Melania",
      "Mia",
      "Micaela",
      "Michela",
      "Michelangela",
      "Michelina",
      "Micol",
      "Milena",
      "Mirabella",
      "Mirella",
      "Miriam",
      "Miriana",
      "Mirta",
      "Monica",
      "Morena",
      "Nadia",
      "Narcisa",
      "Natalia",
      "Natalina",
      "Nella",
      "Nerina",
      "Nicoletta",
      "Nicolina",
      "Nina",
      "Ninfa",
      "Nives",
      "Noemi",
      "Nora",
      "Norina",
      "Norma",
      "Novella",
      "Nunzia",
      "Nunziatina",
      "Ofelia",
      "Olga",
      "Olimpia",
      "Olivia",
      "Ondina",
      "Oria",
      "Oriana",
      "Orietta",
      "Orlanda",
      "Ornella",
      "Orsina",
      "Orsola",
      "Osanna",
      "Ottavia",
      "Palmira",
      "Paola",
      "Paolina",
      "Pasqualina",
      "Patrizia",
      "Perla",
      "Petronilla",
      "Pia",
      "Piera",
      "Pierina",
      "Pietra",
      "Pietrina",
      "Pina",
      "Placida",
      "Polissena",
      "Priscilla",
      "Rachele",
      "Raffaella",
      "Raimonda",
      "Rebecca",
      "Regina",
      "Renata",
      "Renza",
      "Riccarda",
      "Rina",
      "Rita",
      "Roberta",
      "Robertina",
      "Romana",
      "Romilda",
      "Romina",
      "Romola",
      "Rosa",
      "Rosalba",
      "Rosalia",
      "Rosalinda",
      "Rosangela",
      "Rosanna",
      "Rosaria",
      "Rosario",
      "Rosella",
      "Rosetta",
      "Rosina",
      "Rossa",
      "Rossana",
      "Rossella",
      "Rubina",
      "Sabina",
      "Sabrina",
      "Salom\xE8",
      "Salvatrice",
      "Samanta",
      "Samantha",
      "Samuela",
      "Sandra",
      "Santa",
      "Santina",
      "Santuzza",
      "Sara",
      "Saveria",
      "Savina",
      "Scilla",
      "Sebastiana",
      "Selvaggia",
      "Serafina",
      "Serena",
      "Severina",
      "Sibilla",
      "Silvana",
      "Silvestra",
      "Silvia",
      "Simona",
      "Simonetta",
      "Siria",
      "Sofia",
      "Sole",
      "Sonia",
      "Stefania",
      "Stella",
      "Susanna",
      "Sveva",
      "Taide",
      "Tamara",
      "Tania",
      "Tatiana",
      "Tecla",
      "Teo",
      "Teodora",
      "Teofila",
      "Teresa",
      "Tina",
      "Tiziana",
      "Tonina",
      "Tullia",
      "Valentina",
      "Valeria",
      "Vanda",
      "Vanessa",
      "Vanna",
      "Velia",
      "Venera",
      "Vera",
      "Veronica",
      "Vincenza",
      "Viola",
      "Violante",
      "Violetta",
      "Virginia",
      "Virna",
      "Vita",
      "Vitalia",
      "Vittoria",
      "Viviana",
      "Ylenia",
      "Zaira",
      "Zita",
      "Zoe"
    ],
    surname: [
      "Abano",
      "Abatangelo",
      "Abatantuono",
      "Abate",
      "Abategiovanni",
      "Abatescianni",
      "Abb\xE0",
      "Abbadelli",
      "Abbandonato",
      "Abbascia",
      "Abbatangelo",
      "Abbatantuono",
      "Abbate",
      "Abbatelli",
      "Abbaticchio",
      "Abbiati",
      "Abelli",
      "Abrami",
      "Abramo",
      "Acardi",
      "Accardi",
      "Accardo",
      "Acciai",
      "Acciaio",
      "Acciaioli",
      "Acconci",
      "Acconcio",
      "Accorsi",
      "Accorso",
      "Accursio",
      "Acerbi",
      "Acone",
      "Acqua",
      "Acquafredda",
      "Acquarone",
      "Acquati",
      "Adami",
      "Adamo",
      "Adamoli",
      "Addario",
      "Adelardi",
      "Adesso",
      "Adimari",
      "Adriatico",
      "Affini",
      "Africani",
      "Africano",
      "Agani",
      "Aggio",
      "Agli",
      "Agnelli",
      "Agnellini",
      "Agnusdei",
      "Agosti",
      "Agostini",
      "Agresta",
      "Agricola",
      "Aiello",
      "Aiolfi",
      "Airaldi",
      "Air\xF2",
      "Aita",
      "Ajello",
      "Alagona",
      "Alamanni",
      "Albanesi",
      "Albani",
      "Albano",
      "Alberghi",
      "Alberghini",
      "Alberici",
      "Alberighi",
      "Albero",
      "Albini",
      "Albricci",
      "Albrici",
      "Aldebrandi",
      "Alderisi",
      "Alduino",
      "Alemagna",
      "Aleppo",
      "Alesci",
      "Alescio",
      "Alesi",
      "Alesini",
      "Alesio",
      "Alessandri",
      "Alessi",
      "Alfero",
      "Aliberti",
      "Alinari",
      "Aliprandi",
      "Allegri",
      "Allegro",
      "Al\xF2",
      "Aloi",
      "Aloia",
      "Aloisi",
      "Altamura",
      "Altimari",
      "Altoviti",
      "Alunni",
      "Amadei",
      "Amadori",
      "Amalberti",
      "Amantea",
      "Amato",
      "Amatore",
      "Ambrogi",
      "Ambrosi",
      "Amerighi",
      "Amoretto",
      "Angioli",
      "Ansaldi",
      "Anselmetti",
      "Anselmi",
      "Anselmo",
      "Antonelli",
      "Antonini",
      "Antonino",
      "Aquila",
      "Aquino",
      "Arbore",
      "Ardiccioni",
      "Ardizzone",
      "Ardovini",
      "Arena",
      "Arlotti",
      "Armando",
      "Armani",
      "Armati",
      "Arnolfi",
      "Arnoni",
      "Arrighetti",
      "Arrighi",
      "Arrigucci",
      "Avellino",
      "Azzar\xE0",
      "Baggi",
      "Baggio",
      "Baglio",
      "Bagni",
      "Bagnoli",
      "Balboni",
      "Baldi",
      "Baldini",
      "Baldinotti",
      "Baldovini",
      "Ballerini",
      "Bandini",
      "Bandoni",
      "Barbieri",
      "Barone",
      "Barsotti",
      "Bartalotti",
      "Bartolomei",
      "Bartolomeo",
      "Barzetti",
      "Basile",
      "Bassanelli",
      "Bassani",
      "Bassi",
      "Basso",
      "Battaglia",
      "Bazzoli",
      "Bellandi",
      "Bellandini",
      "Bellincioni",
      "Bellini",
      "Bello",
      "Bellomi",
      "Bellomo",
      "Belloni",
      "Belluomo",
      "Belmonte",
      "Bencivenni",
      "Benedetti",
      "Benenati",
      "Benetton",
      "Benini",
      "Benvenuti",
      "Berardi",
      "Bergamaschi",
      "Berlusconi",
      "Bernardi",
      "Berti",
      "Bertolini",
      "Biagi",
      "Biancardi",
      "Bianchi",
      "Bianco",
      "Bicchieri",
      "Biondi",
      "Biondo",
      "Boerio",
      "Bologna",
      "Bonaccorsi",
      "Bonaccorso",
      "Bonaventura",
      "Bondesan",
      "Bonomo",
      "Borghi",
      "Borgia",
      "Borgnino",
      "Borgogni",
      "Bosco",
      "Bove",
      "Boveri",
      "Brambilla",
      "Breda",
      "Brioschi",
      "Brivio",
      "Brunetti",
      "Bruno",
      "Buffone",
      "Bulgarelli",
      "Bulgari",
      "Buonarroti",
      "Buono",
      "Busto",
      "Caiazzo",
      "Caito",
      "Caivano",
      "Calabrese",
      "Calligaris",
      "Calvo",
      "Campana",
      "Campo",
      "Cant\xF9",
      "Capello",
      "Capello",
      "Capitani",
      "Carbone",
      "Carboni",
      "Carideo",
      "Carlevaro",
      "Carnevale",
      "Caro",
      "Carrara",
      "Caruso",
      "Casale",
      "Cassano",
      "Catalano",
      "Cattaneo",
      "Cavalcante",
      "Cavallo",
      "Cingolani",
      "Cino",
      "Cipriani",
      "Cisternino",
      "Clemente",
      "Coiro",
      "Cola",
      "Colombera",
      "Colombo",
      "Columbo",
      "Como",
      "Como",
      "Confortola",
      "Conti",
      "Coppola",
      "Corleone",
      "Corna",
      "Corr\xE0",
      "Corti",
      "Corvi",
      "Costa",
      "Costantini",
      "Costanzo",
      "Cracchiolo",
      "Cremaschi",
      "Cremona",
      "Cremonesi",
      "Crespi",
      "Crespo",
      "Croce",
      "Crocetti",
      "Cucinotta",
      "Cuocco",
      "Cuoco",
      "D'Agostino",
      "D'Ambrosio",
      "Damiani",
      "D'Amore",
      "D'Angelo",
      "D'Antonio",
      "DeAngelis",
      "DeCampo",
      "DeFelice",
      "DeFilippis",
      "DeFiore",
      "DeLaurentis",
      "DeLorenzo",
      "DeLuca",
      "DePalma",
      "DeRege",
      "DeSantis",
      "DeVitis",
      "DeVito",
      "DiAntonio",
      "DiCaprio",
      "DiMercurio",
      "DiNapoli",
      "Dinapoli",
      "Dioli",
      "DiPasqua",
      "DiPietro",
      "DiStefano",
      "Donati",
      "D'Onofrio",
      "D'Ovidio",
      "Drago",
      "Durante",
      "Elena",
      "Episcopo",
      "Ermacora",
      "Esposito",
      "Evangelista",
      "Fabbri",
      "Fabbro",
      "Falco",
      "Faraldo",
      "Farina",
      "Farro",
      "Fattore",
      "Fausti",
      "Fava",
      "Favero",
      "Fermi",
      "Ferrara",
      "Ferrari",
      "Ferraro",
      "Ferrero",
      "Ferri",
      "Ferro",
      "Fierro",
      "Filippi",
      "Fini",
      "Fiore",
      "Fiscella",
      "Fonda",
      "Fontana",
      "Fortunato",
      "Franco",
      "Franzese",
      "Furlan",
      "Fusco",
      "Gabrielli",
      "Gagliardi",
      "Galli",
      "Gallo",
      "Ganza",
      "Garbo",
      "Garfagnini",
      "Garofalo",
      "Gaspari",
      "Gatti",
      "Genovese",
      "Gentile",
      "Germano",
      "Giannino",
      "Gimondi",
      "Giordano",
      "Gismondi",
      "Giugovaz",
      "Giuliani",
      "Giunta",
      "Goretti",
      "Gori",
      "Grassi",
      "Grasso",
      "Greco",
      "Grillo",
      "Grimaldi",
      "Gronchi",
      "Grossi",
      "Grosso",
      "Guarneri",
      "Guerra",
      "Guerriero",
      "Guidi",
      "Guttuso",
      "Innocenti",
      "Labriola",
      "Lagan\xE0",
      "Lagomarsino",
      "Lagorio",
      "Laguardia",
      "Lama",
      "Lamberti",
      "Lamon",
      "Landi",
      "Lando",
      "Landolfi",
      "Laterza",
      "Laurito",
      "Lazzari",
      "Lecce",
      "Leccese",
      "Leggi\xE8ri",
      "Lemmi",
      "Leonardi",
      "Leone",
      "Leoni",
      "Lippi",
      "Locatelli",
      "Lombardi",
      "Lombardo",
      "Longo",
      "Lupo",
      "Luzzatto",
      "Maestri",
      "Magro",
      "Maiella",
      "Mancini",
      "Manco",
      "Mancuso",
      "Manfredi",
      "Manfredonia",
      "Mantovani",
      "Marchegiano",
      "Marchesi",
      "Marchetti",
      "Marchi",
      "Marchioni",
      "Marco",
      "Marconi",
      "Mari",
      "Maria",
      "Mariani",
      "Marini",
      "Marino",
      "Marmo",
      "Martelli",
      "Martinelli",
      "Martini",
      "Martino",
      "Masi",
      "Masin",
      "Mazza",
      "Merlo",
      "Messana",
      "Messina",
      "Micheli",
      "Milani",
      "Milano",
      "Modugno",
      "Mondadori",
      "Mondo",
      "Montagna",
      "Montana",
      "Montanari",
      "Monte",
      "Monti",
      "Morandi",
      "Morelli",
      "Morello",
      "Moretti",
      "Morra",
      "Moschella",
      "Mosconi",
      "Motta",
      "Muggia",
      "Muraro",
      "Mussolini",
      "Naggi",
      "Naggia",
      "Naldi",
      "Nana",
      "Nani",
      "Nanni",
      "Nannini",
      "Napoleoni",
      "Napoletani",
      "Napoli",
      "Napoliello",
      "Nardi",
      "Nardo",
      "Nardovino",
      "Nasato",
      "Nascimbene",
      "Nascimbeni",
      "Natale",
      "Nave",
      "Nazario",
      "Necchi",
      "Negri",
      "Negrini",
      "Nelli",
      "Nenci",
      "Nepi",
      "Neri",
      "Neroni",
      "Nervetti",
      "Nervi",
      "Nespola",
      "Nespoli",
      "Nicastro",
      "Nicchi",
      "Nicodemo",
      "Nicolai",
      "Nicolosi",
      "Nicosia",
      "Nicotera",
      "Nieddu",
      "Nieri",
      "Nigro",
      "Nisi",
      "Nizzola",
      "Noschese",
      "Notaro",
      "Oberti",
      "Oberto",
      "Ongaro",
      "Orlando",
      "Orsini",
      "Pace",
      "Padovan",
      "Padovano",
      "Pagani",
      "Pagano",
      "Palazzo",
      "Palladino",
      "Palmisano",
      "Palumbo",
      "Panza",
      "Parisi",
      "Parma",
      "Parodi",
      "Parri",
      "Parrino",
      "Passerini",
      "Pastore",
      "Paternoster",
      "Pavesi",
      "Pavia",
      "Pavone",
      "Pavoni",
      "Pecora",
      "Pedrotti",
      "Pellegrini",
      "Pellegrino",
      "Perugia",
      "Pesaresi",
      "Pesaro",
      "Pesce",
      "Petri",
      "Piazza",
      "Picasso",
      "Piccirillo",
      "Piccoli",
      "Pierno",
      "Pietri",
      "Pini",
      "Pinto",
      "Piovene",
      "Piraino",
      "Pisani",
      "Pittaluga",
      "Poggi",
      "Poggio",
      "Poletti",
      "Pontecorvo",
      "Portelli",
      "Porto",
      "Portoghese",
      "Potenza",
      "Pozzi",
      "Profeta",
      "Prosdocimi",
      "Provenza",
      "Provenzano",
      "Pugliese",
      "Quaranta",
      "Quattrocchi",
      "Ragno",
      "Raimondi",
      "Rais",
      "Rana",
      "Raneri",
      "Rao",
      "Rapallino",
      "Ratti",
      "Ravenna",
      "R\xE9",
      "Ricchetti",
      "Ricci",
      "Riggi",
      "Righi",
      "Rinaldi",
      "Riva",
      "Rizzi",
      "Rizzo",
      "Robustelli",
      "Rocca",
      "Rocchi",
      "Rocco",
      "Roma",
      "Romagna",
      "Romagnoli",
      "Romano",
      "Romano",
      "Roncalli",
      "Ronchi",
      "Rosa",
      "Rossi",
      "Rossini",
      "Rotolo",
      "Rovigatti",
      "Ruggeri",
      "Ruggiero",
      "Russo",
      "Rustici",
      "Ruzzier",
      "Sabbadin",
      "Sacco",
      "Sala",
      "Salucci",
      "Salvaggi",
      "Salvatici",
      "Salvi",
      "Sanna",
      "Sansone",
      "Santini",
      "Santo",
      "Santoro",
      "Sapienti",
      "Sarno",
      "Sarti",
      "Sartini",
      "Sarto",
      "Sartor",
      "Sartore",
      "Savona",
      "Scarpa",
      "Scarsi",
      "Scavo",
      "Sciacca",
      "Sciacchitano",
      "Sciarra",
      "Scola",
      "Scordato",
      "Scotti",
      "Sebastiani",
      "Segreti",
      "Selvaggio",
      "Serafin",
      "Serafini",
      "Serpico",
      "Serra",
      "Sessa",
      "Sgro",
      "Siena",
      "Silvestri",
      "Sinagra",
      "Sinagra",
      "Soldati",
      "Somma",
      "Sordi",
      "Soriano",
      "Sorrentino",
      "Spada",
      "Span\xF2",
      "Sparacello",
      "Speziale",
      "Spini",
      "Stabile",
      "Stablum",
      "Stilo",
      "Tafani",
      "Tamaro",
      "Tamboia",
      "Tanzi",
      "Tarantino",
      "Taverna",
      "Tedesco",
      "Terranova",
      "Terzi",
      "Tessaro",
      "Testa",
      "Tiraboschi",
      "Tivoli",
      "Todaro",
      "Toloni",
      "Tornincasa",
      "Toselli",
      "Tosetti",
      "Tosi",
      "Tosto",
      "Trapani",
      "Traversa",
      "Traversi",
      "Traversini",
      "Traverso",
      "Trucco",
      "Tumicelli",
      "Turati",
      "Turchi",
      "Uberti",
      "Uccello",
      "Uggeri",
      "Ughi",
      "Ungaretti",
      "Ungaro",
      "Vacca",
      "Vaccaro",
      "Valenti",
      "Valentini",
      "Valerio",
      "Varano",
      "Ventimiglia",
      "Ventura",
      "Verona",
      "Veronesi",
      "Vescovi",
      "Vespa",
      "Vestri",
      "Vicario",
      "Vico",
      "Vigo",
      "Villa",
      "Vinci",
      "Vinci",
      "Viola",
      "Vitale",
      "Vitali",
      "Voltolini",
      "Zanetti",
      "Zangari",
      "Zappa",
      "Zeni",
      "Zini",
      "Zino",
      "Zunino"
    ]
  }
];

// src/index.js
var tableRoller = new TableRoller_default({});
var nameTypes = [];
names_default.forEach((data) => {
  nameTypes.push(new RandomNameType(data));
});
var defaultNameGenerator = new RandomNameGenerator_default({ namedata: nameTypes });
tableRoller.registerTokenType("name", defaultNameGenerator.nameTokenCallback.bind(defaultNameGenerator));
export {
  DisplayOptions,
  NPC,
  NPCSchema,
  NPCSchemaField,
  RandomNameError_default as RandomNameError,
  RandomNameGenerator_default as RandomNameGenerator,
  RandomNameType,
  RandomTable,
  RandomTableEntry,
  RandomTableResult,
  RandomTableResultSet,
  TableError_default as TableError,
  TableErrorResult,
  TableRoller_default as TableRoller,
  defaultNameGenerator,
  dice_roller_exports as dice_roller,
  npc_generator_exports as npc_generator,
  tableRoller
};
