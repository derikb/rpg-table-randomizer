/* eslint-disable no-unused-expressions */
'use strict';

import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import { stub } from 'sinon';

import { rollDie, DiceResult, getDiceResult, DiceRoller } from '../src/dice_roller.js';

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

        const actual8 = rollDie('0d2');
        expect(actual8).to.be.within(1, 2);
    });

    describe('die modifiers', function () {
        const roller = new DiceRoller();
        let randomIntStub = null;

        beforeEach(function () {
            randomIntStub = stub(roller, 'getSingleDieResult');
        });
        afterEach(function () {
            randomIntStub.restore();
        });

        it('should drop lowest die', function () {
            randomIntStub
                .withArgs(6)
                .onCall(0)
                .returns(4)
                .onCall(1)
                .returns(2);
            expect(roller.rollDie('2d6dl')).to.equal(4);
        });

        it('should drop highest die', function () {
            randomIntStub
                .withArgs(6)
                .onCall(0)
                .returns(4)
                .onCall(1)
                .returns(2);
            expect(roller.rollDie('2d6dh')).to.equal(2);
        });

        it('should keep highest die', function () {
            randomIntStub
                .withArgs(6)
                .onCall(0)
                .returns(4)
                .onCall(1)
                .returns(2)
                .onCall(2)
                .returns(6);
            expect(roller.rollDie('3d6kh')).to.equal(6);
        });

        it('should keep lowest die', function () {
            randomIntStub
                .withArgs(6)
                .onCall(0)
                .returns(4)
                .onCall(1)
                .returns(2)
                .onCall(2)
                .returns(6);
            expect(roller.rollDie('3d6kl')).to.equal(2);
        });

        it('should keep two lowest dice', function () {
            randomIntStub
                .withArgs(6)
                .onCall(0)
                .returns(4)
                .onCall(1)
                .returns(2)
                .onCall(2)
                .returns(6);
            expect(roller.rollDie('3d6kl2')).to.equal(6);
        });

        it('should handle invalid modifier', function () {
            randomIntStub
                .withArgs(6)
                .onCall(0)
                .returns(4)
                .onCall(1)
                .returns(2)
                .onCall(2)
                .returns(6);
            expect(roller.rollDie('3d6dk')).to.equal(12);
        });

        it('should handle dropping all dice', function () {
            randomIntStub
                .withArgs(6)
                .onCall(0)
                .returns(4)
                .onCall(1)
                .returns(2);
            expect(roller.rollDie('2d6dl2')).to.equal(0);
        });

        it('should handle dropping too many dice', function () {
            randomIntStub
                .withArgs(6)
                .onCall(0)
                .returns(4)
                .onCall(1)
                .returns(2);
            expect(roller.rollDie('2d6dl5')).to.equal(0);
        });

        it('should handle keeping too many dice', function () {
            randomIntStub
                .withArgs(6)
                .onCall(0)
                .returns(4)
                .onCall(1)
                .returns(2);
            expect(roller.rollDie('2d6kh5')).to.equal(6);
        });

        it('should handle invalid modifier parsing', function () {
            expect(roller.applyDieMod([2, 4], 'aaa')).to.deep.equal([2, 4]);
        });
    });

    it('should return empty for bad dice notation', function () {
        expect(rollDie('abc')).to.be.empty;
        expect(rollDie('1')).to.be.empty;
    });
});

describe('getDiceResult', function () {
    it('should return a DiceResult object from exported function', function () {
        const actual = getDiceResult('1d2');
        expect(actual).to.be.instanceOf(DiceResult);
        expect(actual.die).to.equal('1d2');
        expect(actual.value).to.be.within(1, 2);
    });

    it('should return a DiceResult object from class', function () {
        const roller = new DiceRoller();
        const randomIntStub = stub(roller, 'getSingleDieResult');
        randomIntStub.withArgs(20).returns(17);
        const actual = roller.getDiceResult('1d20');
        expect(actual).to.be.instanceOf(DiceResult);
        expect(actual.die).to.equal('1d20');
        expect(actual.value).to.equal(17);

        expect(actual.toString()).to.equal(17);

        randomIntStub.restore();
    });
});
