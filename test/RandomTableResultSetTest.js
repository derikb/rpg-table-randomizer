'use strict';

import { describe, it } from 'mocha';
import { expect } from 'chai';

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
            title: 'colors',
            results: [
                result1,
                result2,
                result3
            ],
            displayOptions: displayOptionsObj
        });

        expect(resultSet.title).to.equal('colors');
        expect(resultSet.results[0]).to.be.instanceOf(RandomTableResult);
        expect(resultSet.results[1]).to.be.instanceOf(TableErrorResult);
        expect(resultSet.results[2]).to.be.instanceOf(RandomTableResult);
        expect(resultSet.displayOptions.get('default')).to.be.instanceOf(DisplayOptions);
        expect(resultSet.displayOptions.get('hue')).to.be.instanceOf(DisplayOptions);
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
        const result3 = new RandomTableResult({
            table: 'Error',
            result: 'Ran out of room',
            desc: 'in some place'
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

        expect(resultSet.toString()).to.equal('Blue\nIntensity: Dark\nPowerful stuff\nError: Ran out of room\nin some place');
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

        expect(resultSet.toString()).to.equal('Blue\nIntensity: Dark\n(Powerful stuff)');
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

        expect(resultSet.toString()).to.equal('Default: Blue\nIntensity:');
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

        expect(resultSet.toString()).to.equal('Default: Blue\n(the color)\nIntensity: Dark');
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

        expect(resultSet.niceString(true)).to.equal('blue dark');
    });
});
