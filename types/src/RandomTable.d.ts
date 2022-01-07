/**
 * RandomTable: Model for tables used by TableRoller
 */
export default class RandomTable {
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
    constructor({ id, key, title, author, description, source, tags, sequence, tables, macro, dependencies, table, display_opt }: {
        id?: number;
        key?: any;
        title?: string;
        author?: string;
        description?: string;
        source?: string;
        tags?: any[];
        sequence?: any[];
        tables?: {};
        macro?: any[];
        dependencies?: any;
        table?: any;
        display_opt?: any[];
    });
    id: number;
    key: any;
    title: string;
    author: string;
    description: string;
    source: string;
    tags: any[];
    sequence: any[];
    macro: any[];
    dependencies: any;
    display_opt: Map<any, any>;
    toString(): string;
    /**
     * Make sure table entries are all RandomTableEntry objects.
     * @param {Array} data
     * @returns RandomTableEntry[]
     */
    _normalizeTable(data: any[]): any[];
    /**
     * Normalize the tables/table constructor data.
     * @param {Object} tables
     * @param {Array} table
     * @returns
     */
    _normalizeTables(tables: any, table: any[]): void;
    tables: {};
    /**
     * Basic sequence of table rolls.
     * Either the start, the default sequence, the default table, or just the first one.
     * @param {String} start Subtable name to start with.
     * @returns {String[]}
     */
    getSequence(start?: string): string[];
    /**
     * All the subtable names.
     * @returns {String[]}
     */
    get subtableNames(): string[];
    /**
     * Get entries for a specific subtable.
     * @param {String} [name=default] Subtable name.
     * @returns {RandomTableEntry[]}
     */
    getSubtableEntries(name?: string): RandomTableEntry[];
    /**
     * Get a random entry from a subtable.
     * @param {String} subtableName
     * @returns {RandomTableEntry|null}
     */
    getRandomEntry(subtableName: string): RandomTableEntry | null;
    /**
     * Get an entry in case we only have the label and need other data from it
     * @param {String} label The item we are looking for
     * @param {String} [table=default] the table to search
     * @returns {RandomTableEntry|null}
     */
    findEntry(label: string, table?: string): RandomTableEntry | null;
    /**
     * Find the dependent tables to get full results for this table
     * @return {Array} table keys
     */
    findDependencies(): any[];
    /**
     * Custom JSON handler because Map doesn't JSON stringify automatically.
     * @returns {Object}
     */
    toJSON(): any;
}
import RandomTableEntry from "./RandomTableEntry.js";
