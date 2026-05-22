'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import DisplayOptions from '../src/DisplayOptions.js';
import RandomTableResult from '../src/RandomTableResult.js';
import RandomTableResultSet from '../src/RandomTableResultSet.js';
import TableErrorResult from '../src/TableErrorResult.js';

describe('RandomTableResultSet', function () {
    it('should unserialize an object to the class props', function () {
        const result1 = {
            table: 'default',
            result: 'blue'
        };
        const result2 = {
            table: 'Error',
            result: 'Ran out of room',
            className: 'TableErrorResult'
        };
        const result3 = {
            table: 'hue',
            result: 'Cerulean',
            desc: 'in some place',
            className: 'RandomTableResult'
        };
        const displayOptionsObj = {
            default: {
                table: 'default',
                hide_table: true,
                className: 'DisplayOptions'
            },
            hue: new DisplayOptions({
                table: 'hue',
                hide_table: false
            })
        };

        const resultSet = new RandomTableResultSet({
            key: 'tkey',
            title: 'colors',
            results: [
                result1,
                result2,
                result3
            ],
            displayOptions: displayOptionsObj
        });

        assert.strictEqual(resultSet.key, 'tkey');
        assert.strictEqual(resultSet.title, 'colors');
        assert.ok(resultSet.results[0] instanceof RandomTableResult);
        assert.ok(resultSet.results[1] instanceof TableErrorResult);
        assert.ok(resultSet.results[2] instanceof RandomTableResult);
        assert.ok(resultSet.displayOptions.get('default') instanceof DisplayOptions);
        assert.ok(resultSet.displayOptions.get('hue') instanceof DisplayOptions);
    });

    it('should return results for specific tables', function () {
        const result1 = new RandomTableResult({
            table: 'default',
            result: 'blue'
        });
        const result2 = new RandomTableResult({
            table: 'intensity',
            result: 'dark',
            desc: 'Powerful stuff'
        });
        const result3 = new TableErrorResult({
            table: 'Error',
            result: 'Ran out of room'
        });
        const displayOptionsMap = new Map();

        const resultSet = new RandomTableResultSet({
            title: 'colors',
            results: [
                result1,
                result2,
                result3
            ],
            displayOptions: displayOptionsMap
        });

        const actual = resultSet.findResultByTable('intensity');
        assert.strictEqual(actual, result2);

        assert.strictEqual(resultSet.findResultByTable('foo'), null);
    });

    it('should output empty string for no results', function () {
        const resultSet = new RandomTableResultSet({});
        assert.strictEqual(resultSet.niceString(), '');
    });

    it('should output a string from the set with no display options', function () {
        const result1 = new RandomTableResult({
            table: 'default',
            result: 'blue'
        });
        const result2 = new RandomTableResult({
            table: 'intensity',
            result: 'dark',
            desc: 'Powerful stuff'
        });
        const result3 = new TableErrorResult({
            table: 'Error',
            result: 'Ran out of room'
        });
        const displayOptionsMap = new Map();

        const resultSet = new RandomTableResultSet({
            title: 'colors',
            results: [
                result1,
                result2,
                result3
            ],
            displayOptions: displayOptionsMap
        });

        assert.strictEqual(resultSet.toString(), 'Blue\nIntensity: Dark\nPowerful stuff\nError: Ran out of room');
    });

    it('should output a string from the set with display options hide_table', function () {
        const opt1 = new DisplayOptions({
            table: 'default',
            hide_table: true,
            hide_result: false,
            hide_desc: true
        });
        const result1 = new RandomTableResult({
            table: 'default',
            result: 'blue',
            desc: 'the color'
        });
        const opt2 = new DisplayOptions({
            table: 'intensity',
            hide_table: false,
            hide_result: false,
            hide_desc: false
        });
        const result2 = new RandomTableResult({
            table: 'intensity',
            result: 'dark',
            desc: 'Powerful stuff'
        });
        const displayOptionsMap = new Map();
        displayOptionsMap.set('default', opt1);
        displayOptionsMap.set('intensity', opt2);

        const resultSet = new RandomTableResultSet({
            title: 'colors',
            results: [
                result1,
                result2
            ],
            displayOptions: displayOptionsMap
        });

        assert.strictEqual(resultSet.toString(), 'Blue\nIntensity: Dark\n(Powerful stuff)');
    });

    it('should output a string from the set with display options hide_result', function () {
        const opt1 = new DisplayOptions({
            table: 'default',
            hide_table: false,
            hide_result: false,
            hide_desc: true
        });
        const result1 = new RandomTableResult({
            table: 'default',
            result: 'blue',
            desc: 'the color'
        });
        const opt2 = new DisplayOptions({
            table: 'intensity',
            hide_table: false,
            hide_result: true,
            hide_desc: true
        });
        const result2 = new RandomTableResult({
            table: 'intensity',
            result: 'dark',
            desc: 'Powerful stuff'
        });
        const displayOptionsMap = new Map();
        displayOptionsMap.set('default', opt1);
        displayOptionsMap.set('intensity', opt2);

        const resultSet = new RandomTableResultSet({
            title: 'colors',
            results: [
                result1,
                result2
            ],
            displayOptions: displayOptionsMap
        });

        assert.strictEqual(resultSet.toString(), 'Default: Blue\nIntensity:');
    });

    it('should output a string from the set with display options hide_desc', function () {
        const opt1 = new DisplayOptions({
            table: 'default',
            hide_table: false,
            hide_result: false,
            hide_desc: false
        });
        const result1 = new RandomTableResult({
            table: 'default',
            result: 'blue',
            desc: 'the color'
        });
        const opt2 = new DisplayOptions({
            table: 'intensity',
            hide_table: false,
            hide_result: false,
            hide_desc: true
        });
        const result2 = new RandomTableResult({
            table: 'intensity',
            result: 'dark',
            desc: 'Powerful stuff'
        });
        const displayOptionsMap = new Map();
        displayOptionsMap.set('default', opt1);
        displayOptionsMap.set('intensity', opt2);

        const resultSet = new RandomTableResultSet({
            title: 'colors',
            results: [
                result1,
                result2
            ],
            displayOptions: displayOptionsMap
        });

        assert.strictEqual(resultSet.toString(), 'Default: Blue\n(the color)\nIntensity: Dark');
    });

    it('should output a string from the set with the simple option', function () {
        const opt1 = new DisplayOptions({
            table: 'default',
            hide_table: false,
            hide_result: false,
            hide_desc: false
        });
        const result1 = new RandomTableResult({
            table: 'default',
            result: 'blue',
            desc: 'the color'
        });
        const opt2 = new DisplayOptions({
            table: 'intensity',
            hide_table: false,
            hide_result: false,
            hide_desc: true
        });
        const result2 = new RandomTableResult({
            table: 'intensity',
            result: 'dark',
            desc: 'Powerful stuff'
        });
        const displayOptionsMap = new Map();
        displayOptionsMap.set('default', opt1);
        displayOptionsMap.set('intensity', opt2);

        const resultSet = new RandomTableResultSet({
            title: 'colors',
            results: [
                result1,
                result2
            ],
            displayOptions: displayOptionsMap
        });

        assert.strictEqual(resultSet.niceString(true), 'blue dark');
    });
});
