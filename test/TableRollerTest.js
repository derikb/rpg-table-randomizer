'use strict';

import { expect } from 'chai';
import { stub } from 'sinon';

import DisplayOptions from '../src/DisplayOptions.js';
import RandomTable from '../src/RandomTable.js';
import RandomTableEntry from '../src/RandomTableEntry.js';
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
    macro: ['colors', 'nonexistent']
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
            expect(() => { roller_error.getTableByKey(); }).to.throw(TableError, 'No table key');
            expect(() => { roller_error.getTableByKey('colors'); }).to.throw(TableError, 'No table found');
        });
    });

    describe('_selectFromTable', function () {
        it('should return error on invalid subtable', function () {
            const errorResult = roller._selectFromTable(colorTable, 'shades')[0];
            expect(errorResult).to.be.instanceOf(TableErrorResult);
            expect(errorResult).to.deep.include({
                table: 'shades',
                result: 'Invalid subtable name.'
            });
        });

        it('should return result for no subtables', function () {
            expect(roller._selectFromTable(colorTable, 'primary')[0]).to.deep.include({
                table: 'primary',
                result: 'blue'
            });
        });

        it('should return result for subtables', function () {
            const results = roller._selectFromTable(complicatedTable, 'sequence');
            expect(results.length).to.equal(2);
            expect(results[0]).to.deep.include({
                table: 'foo',
                result: 'bar'
            });
            expect(results[1]).to.deep.include({
                table: 'mark',
                result: 'down'
            });
        });
    });

    describe('_getTableMacroResult', function () {
        it('should return result for macro list', function () {
            const results = roller._getTableMacroResult(complicatedTable);
            expect(results.length).to.equal(2);
            expect(results[0]).to.deep.include({
                table: 'colors',
                result: 'Primary: Blue'
            });
            expect(results[1]).to.deep.include({
                table: 'nonexistent',
                result: 'Error: No table found for key: nonexistent'
            });
        });
    });

    describe('findToken', function () {
        it('should find dice tokens and convert them', function () {
            expect(roller.findToken('{{roll:1d1}}')).to.equal('1');

            expect(roller.findToken('from {{roll:1d1}} to {{roll:1d2/2}}')).to.equal('from 1 to 1');
        });

        it('should return the token for unknown tokens', function () {
            expect(roller.findToken('{{foo:bar}}')).to.equal('{{foo:bar}}');
        });
    });

    describe('convertToken', function () {
        it('should convert tokens', function () {
            // table handler
            const actual = roller.convertToken('{{table:colors:primary}}');
            expect(actual).to.be.instanceOf(RandomTableResultSet);
            expect(actual.results[0]).to.have.property('result', 'blue');
            // custom token handler
            expect(roller.convertToken('{{food:appetizer}}')).to.equal('food token');
        });

        it('should return token for empty token', function () {
            // empty token
            const token1 = '{{ }}';
            expect(roller.convertToken(token1)).to.equal(token1);
        });

        it('should return token for unknown token type', function () {
            // unknown token type
            const token2 = '{{foo:bar:gamma}}';
            expect(roller.convertToken(token2)).to.equal(token2);
        });

        it('should return Error ResultSet for thrown range error', function () {
            // Catch RangeError
            const errorResult = roller.convertToken('{{range_error:foo:bar}}');
            expect(errorResult.results[0]).to.be.instanceOf(TableErrorResult);
            expect(errorResult.results[0]).to.deep.include({
                result: 'out of memory'
            });
        });
    });

    describe('getResultSetForTable', function () {
        it('should return error set on invalid table', function () {
            const errorResult = roller.getResultSetForTable('table_string');
            expect(errorResult.results[0]).to.be.instanceOf(TableErrorResult);
            expect(errorResult.results[0]).to.deep.include({
                result: 'Invalid table data.'
            });
        });

        it('should return result set on valid table', function () {
            const resultSet = roller.getResultSetForTable(colorTable);
            expect(resultSet.title).to.equal('Color Wheel');
            expect(resultSet.displayOptions.get('secondary')).to.be.an.instanceOf(DisplayOptions);
            expect(resultSet.results[0]).to.deep.include({
                table: 'primary',
                result: 'blue'
            });
        });
    });

    describe('getTableResultSetByKey', function () {
        it('should return error result on bad table', function () {
            const errorResult = roller.getTableResultSetByKey('table_string');
            expect(errorResult.results[0]).to.be.instanceOf(TableErrorResult);
        });

        it('should return result set', function () {
            const resultSet = roller.getTableResultSetByKey('colors', 'primary');
            expect(resultSet.title).to.equal('Color Wheel');
            expect(resultSet.displayOptions.get('secondary')).to.be.an.instanceOf(DisplayOptions);
            expect(resultSet.results[0]).to.deep.include({
                table: 'primary',
                result: 'blue'
            });
        });
    });

    describe('getTableResult', function () {
        it('should handle macros in tables', function () {
            const macroStub = stub(roller, '_getTableMacroResult');
            const resultSet = new RandomTableResultSet({ title: 'macro set' });
            macroStub.returns(resultSet);

            expect(roller.getTableResult(complicatedTable)).to.equal(resultSet);

            macroStub.restore();
        });

        it('should handle no starting table', function () {
            const selectStub = stub(roller, '_selectFromTable');
            const resultSet = new RandomTableResultSet({ title: 'colors' });
            selectStub.withArgs(colorTable, 'primary').returns(resultSet);

            expect(roller.getTableResult(colorTable)[0]).to.equal(resultSet);

            selectStub.restore();
        });

        it('should handle with starting table', function () {
            const selectStub = stub(roller, '_selectFromTable');
            const resultSet = new RandomTableResultSet({ title: 'colors' });
            selectStub.withArgs(colorTable, 'secondary').returns(resultSet);

            expect(roller.getTableResult(colorTable, 'secondary')[0]).to.equal(resultSet);

            selectStub.restore();
        });

        it('should handle with multitable sequence', function () {
            const selectStub = stub(roller, '_selectFromTable');
            const resultSet = new RandomTableResultSet({ title: 'colors' });
            const resultSet2 = new RandomTableResultSet({ title: 'colors primary' });
            selectStub.withArgs(colorTable, 'secondary').returns(resultSet);
            selectStub.withArgs(colorTable, 'primary').returns(resultSet2);

            colorTable.sequence = ['secondary', 'primary'];

            expect(roller.getTableResult(colorTable)).to.deep.equal([resultSet, resultSet2]);

            colorTable.sequence = [];
            selectStub.restore();
        });
    });
});
