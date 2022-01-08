/* eslint-disable no-unused-expressions */
'use strict';

import { expect } from 'chai';

import { rollDie, DiceResult, getDiceResult } from '../src/dice_roller.js';

describe('DiceResult', function () {
    it('should serialize and unserialize', function () {
        const result = new DiceResult({
            die: '2d6',
            value: 5
        });
        expect(result.die).to.equal('2d6');
        expect(result.value).to.equal(5);

        expect(result.toJSON()).to.deep.equal({
            die: '2d6',
            value: 5,
            className: 'DiceResult'
        });
    });
});

describe('rollDie', function () {
    it('should return value for the dice notation', function () {
        const actual = rollDie('1d6');
        expect(actual).to.be.within(1, 6);

        const actual2 = rollDie('1d6+1');
        expect(actual2).to.be.within(2, 7);

        const actual3 = rollDie('1d6/2');
        expect(actual3).to.be.within(1, 3);

        const actual4 = rollDie('2d2');
        expect(actual4).to.be.within(2, 4);

        const actual5 = rollDie('1d6-1');
        expect(actual5).to.be.within(0, 5);

        const actual6 = rollDie('  1d2  ');
        expect(actual6).to.be.within(1, 2);

        const actual7 = rollDie('1d2*2');
        expect(actual7).to.be.within(2, 4);
    });

    it('should return empty for bad dice notation', function () {
        expect(rollDie('abc')).to.be.empty;
        expect(rollDie('1')).to.be.empty;
    });
});

describe('getDiceResult', function () {
    it('should return a DiceResult object', function () {
        const actual = getDiceResult('1d2');
        expect(actual).to.be.instanceOf(DiceResult);
        expect(actual.die).to.equal('1d2');
        expect(actual.value).to.be.within(1, 2);
    });
});
