'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import DisplayOptions from '../src/DisplayOptions.js';
import RandomTable from '../src/RandomTable.js';
import RandomTableResult from '../src/RandomTableResult.js';
import RandomTableResultSet from '../src/RandomTableResultSet.js';
import TableError from '../src/TableError.js';
import TableRoller from '../src/TableRoller.js';
import TableErrorResult from '../src/TableErrorResult.js';

const roller = new TableRoller({
    token_types: {
        food: function (token_parts, full_token = '', curtable = null) {
            return 'food token';
        },
        range_error: function (token_parts, full_token = '', curtable = null) {
            throw new RangeError('out of memory');
        }
    }
});

const colorTable = new RandomTable({
    key: 'colors',
    title: 'Color Wheel',
    tables: {
        primary: [
            'blue'
        ],
        secondary: [
            'green'
        ],
        mixed: [
            '{{table:this:primary}} {{table:this:secondary}}'
        ]
    },
    display_opt: [
        new DisplayOptions({ table: 'secondary' })
    ]
});

const complicatedTable = new RandomTable({
    key: 'complicated',
    tables: {
        sequence: [
            { subtable: ['foo', 'mark'], print: false }
        ],
        foo: [
            'bar'
        ],
        mark: [
            'down'
        ]
    },
    macro: ['colors:secondary', 'nonexistent']
});

const getTables = function (key) {
    switch (key) {
        case 'colors':
            return colorTable;
        case 'directions':

            break;
        default:
            return null;
    }
};
roller.setTableKeyLookup(getTables);

describe('TableRoller', function () {
    describe('getTableByKey', function () {
        it('should return error for no table lookup', function () {
            const roller_error = new TableRoller({});
            assert.throws(() => { roller_error.getTableByKey(); }, { name: 'TableError', message: /No table key/ });
            assert.throws(() => { roller_error.getTableByKey('colors'); }, { name: 'TableError', message: /No table found/ });
        });
    });

    describe('_selectFromTable', function () {
        it('should return error on invalid subtable', function () {
            const errorResult = roller._selectFromTable(colorTable, 'shades')[0];
            assert.ok(errorResult instanceof TableErrorResult);
            assert.strictEqual(errorResult.key, colorTable.key);
            assert.strictEqual(errorResult.table, 'shades');
            assert.strictEqual(errorResult.result, 'Invalid subtable name.');
        });

        it('should return result for no subtables', function () {
            const result = roller._selectFromTable(colorTable, 'primary')[0];
            assert.strictEqual(result.table, 'primary');
            assert.strictEqual(result.result, 'blue');
        });

        it('should return result for subtables', function () {
            const results = roller._selectFromTable(complicatedTable, 'sequence');
            assert.strictEqual(results.length, 2);
            assert.strictEqual(results[0].table, 'foo');
            assert.strictEqual(results[0].result, 'bar');
            assert.strictEqual(results[1].table, 'mark');
            assert.strictEqual(results[1].result, 'down');
        });
    });

    describe('_getTableMacroResult', function () {
        it('should return result for macro list', function () {
            const results = roller._getTableMacroResult(complicatedTable);
            assert.strictEqual(results.length, 2);
            assert.strictEqual(results[0].table, 'secondary');
            assert.strictEqual(results[0].result, 'green');
            assert.strictEqual(results[1].table, 'nonexistent');
            assert.strictEqual(results[1].result, 'No table found for key: nonexistent');
        });

        it('should throw error for self reference', function () {
            const selfTable = new RandomTable({
                key: 'self',
                macro: ['colors', 'self']
            });
            assert.throws(() => { roller._getTableMacroResult(selfTable); }, { name: 'TableError', message: /self reference/ });
        });
    });

    describe('findToken', function () {
        it('should find dice tokens and convert them', function () {
            assert.strictEqual(roller.findToken('{{roll:1d1}}'), '1');

            assert.strictEqual(roller.findToken('from {{roll:1d1}} to {{roll:1d2/2}}'), 'from 1 to 1');
        });

        it('should return the token for unknown tokens', function () {
            assert.strictEqual(roller.findToken('{{foo:bar}}'), '{{foo:bar}}');
        });
    });

    describe('convertToken', function () {
        it('should convert tokens', function () {
            // table handler
            const actual = roller.convertToken('{{table:colors:primary}}');
            assert.ok(actual instanceof RandomTableResultSet);
            assert.strictEqual(actual.key, colorTable.key);
            assert.strictEqual(actual.results[0].result, 'blue');
            // custom token handler
            assert.strictEqual(roller.convertToken('{{food:appetizer}}'), 'food token');
        });

        it('should handle oneof token', function () {
            const actual = roller.convertToken('{{oneof:dwarf|elf}}');
            assert.ok(['dwarf', 'elf'].includes(actual));
        });

        it('should return token for empty token', function () {
            // empty token
            const token1 = '{{ }}';
            assert.strictEqual(roller.convertToken(token1), token1);
        });

        it('should return token for unknown token type', function () {
            // unknown token type
            const token2 = '{{foo:bar:gamma}}';
            assert.strictEqual(roller.convertToken(token2), token2);
        });

        it('should return Error ResultSet for thrown range error', function () {
            // Catch RangeError
            const errorResult = roller.convertToken('{{range_error:foo:bar}}');
            assert.ok(errorResult.results[0] instanceof TableErrorResult);
            assert.strictEqual(errorResult.results[0].result, 'out of memory');
        });
    });

    describe('getResultSetForTable', function () {
        it('should return error set on invalid table', function () {
            const errorResult = roller.getResultSetForTable('table_string');
            assert.ok(errorResult.results[0] instanceof TableErrorResult);
            assert.strictEqual(errorResult.results[0].result, 'Invalid table data.');
        });

        it('should return result set on valid table', function () {
            const resultSet = roller.getResultSetForTable(colorTable);
            assert.strictEqual(resultSet.title, 'Color Wheel');
            assert.ok(resultSet.displayOptions.get('secondary') instanceof DisplayOptions);
            assert.strictEqual(resultSet.results[0].table, 'primary');
            assert.strictEqual(resultSet.results[0].result, 'blue');
        });
    });

    describe('getTableResultSetByKey', function () {
        it('should return error result on bad table', function () {
            const errorResult = roller.getTableResultSetByKey('table_string');
            assert.ok(errorResult.results[0] instanceof TableErrorResult);
        });

        it('should return result set', function () {
            const resultSet = roller.getTableResultSetByKey('colors', 'primary');
            assert.strictEqual(resultSet.title, 'Color Wheel');
            assert.ok(resultSet.displayOptions.get('secondary') instanceof DisplayOptions);
            assert.strictEqual(resultSet.results[0].table, 'primary');
            assert.strictEqual(resultSet.results[0].result, 'blue');
        });
    });

    describe('getTableResult', function () {
        it('should handle macros in tables', (t) => {
            const resultSet = new RandomTableResult({ key: complicatedTable.key, table: 'macro' });
            t.mock.method(roller, '_getTableMacroResult', () => [resultSet]);

            assert.deepStrictEqual(roller.getTableResult(complicatedTable), [resultSet]);
        });

        it('should handle no starting table', (t) => {
            const resultSet = new RandomTableResultSet({ key: colorTable.key, title: 'colors' });
            t.mock.method(roller, '_selectFromTable', (table, subtable) => {
                if (table === colorTable && subtable === 'primary') return resultSet;
            });

            assert.strictEqual(roller.getTableResult(colorTable)[0], resultSet);
        });

        it('should handle with starting table', (t) => {
            const resultSet = new RandomTableResultSet({ key: colorTable.key, title: 'colors' });
            t.mock.method(roller, '_selectFromTable', (table, subtable) => {
                if (table === colorTable && subtable === 'secondary') return resultSet;
            });

            assert.strictEqual(roller.getTableResult(colorTable, 'secondary')[0], resultSet);
        });

        it('should handle with multitable sequence', (t) => {
            const resultSet = new RandomTableResultSet({ key: colorTable.key, title: 'colors' });
            const resultSet2 = new RandomTableResultSet({ key: colorTable.key, title: 'colors primary' });
            t.mock.method(roller, '_selectFromTable', (table, subtable) => {
                if (table === colorTable && subtable === 'secondary') return resultSet;
                if (table === colorTable && subtable === 'primary') return resultSet2;
            });

            colorTable.sequence = ['secondary', 'primary'];

            assert.deepStrictEqual(roller.getTableResult(colorTable), [resultSet, resultSet2]);

            colorTable.sequence = [];
        });
    });

    describe('_defaultOneOfToken', function () {
        it('should return token for no arguments', function () {
            assert.strictEqual(
                roller._defaultOneOfToken(['oneof'], '{{oneof:}}'),
                '{{oneof:}}'
            );
        });

        it('should return option if only one', function () {
            assert.strictEqual(
                roller._defaultOneOfToken(['oneof', 'bread'], '{{oneof:bread}}'),
                'bread'
            );
        });

        it('should return one of the options', function () {
            assert.ok(
                ['bread', 'water'].includes(
                    roller._defaultOneOfToken(['oneof', 'bread|water'], '{{oneof:bread}}')
                )
            );
        });
    });
});
