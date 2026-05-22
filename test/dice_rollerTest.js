'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { rollDie, DiceResult, getDiceResult, DiceRoller } from '../src/dice_roller.js';

describe('DiceResult', function () {
    it('should serialize and unserialize', function () {
        const result = new DiceResult({
            die: '2d6',
            value: 5
        });
        assert.strictEqual(result.die, '2d6');
        assert.strictEqual(result.value, 5);

        assert.deepStrictEqual(result.toJSON(), {
            die: '2d6',
            value: 5,
            className: 'DiceResult'
        });
    });
});

describe('rollDie', function () {
    it('should return value for the dice notation', function () {
        const actual = rollDie('1d6');
        assert.ok(actual >= 1 && actual <= 6);

        const actual2 = rollDie('1d6+1');
        assert.ok(actual2 >= 2 && actual2 <= 7);

        const actual3 = rollDie('1d6/2');
        assert.ok(actual3 >= 1 && actual3 <= 3);

        const actual4 = rollDie('2d2');
        assert.ok(actual4 >= 2 && actual4 <= 4);

        const actual5 = rollDie('1d6-1');
        assert.ok(actual5 >= 0 && actual5 <= 5);

        const actual6 = rollDie('  1d2  ');
        assert.ok(actual6 >= 1 && actual6 <= 2);

        const actual7 = rollDie('1d2*2');
        assert.ok(actual7 >= 2 && actual7 <= 4);

        const actual8 = rollDie('0d2');
        assert.ok(actual8 >= 1 && actual8 <= 2);
    });

    describe('die modifiers', function () {
        const roller = new DiceRoller();

        it('should drop lowest die', (t) => {
            let callIndex = 0;
            t.mock.method(roller, 'getSingleDieResult', () => [4, 2][callIndex++]);
            assert.strictEqual(roller.rollDie('2d6dl'), 4);
        });

        it('should drop highest die', (t) => {
            let callIndex = 0;
            t.mock.method(roller, 'getSingleDieResult', () => [4, 2][callIndex++]);
            assert.strictEqual(roller.rollDie('2d6dh'), 2);
        });

        it('should keep highest die', (t) => {
            let callIndex = 0;
            t.mock.method(roller, 'getSingleDieResult', () => [4, 2, 6][callIndex++]);
            assert.strictEqual(roller.rollDie('3d6kh'), 6);
        });

        it('should keep lowest die', (t) => {
            let callIndex = 0;
            t.mock.method(roller, 'getSingleDieResult', () => [4, 2, 6][callIndex++]);
            assert.strictEqual(roller.rollDie('3d6kl'), 2);
        });

        it('should keep two lowest dice', (t) => {
            let callIndex = 0;
            t.mock.method(roller, 'getSingleDieResult', () => [4, 2, 6][callIndex++]);
            assert.strictEqual(roller.rollDie('3d6kl2'), 6);
        });

        it('should handle invalid modifier', (t) => {
            let callIndex = 0;
            t.mock.method(roller, 'getSingleDieResult', () => [4, 2, 6][callIndex++]);
            assert.strictEqual(roller.rollDie('3d6dk'), 12);
        });

        it('should handle dropping all dice', (t) => {
            let callIndex = 0;
            t.mock.method(roller, 'getSingleDieResult', () => [4, 2][callIndex++]);
            assert.strictEqual(roller.rollDie('2d6dl2'), 0);
        });

        it('should handle dropping too many dice', (t) => {
            let callIndex = 0;
            t.mock.method(roller, 'getSingleDieResult', () => [4, 2][callIndex++]);
            assert.strictEqual(roller.rollDie('2d6dl5'), 0);
        });

        it('should handle keeping too many dice', (t) => {
            let callIndex = 0;
            t.mock.method(roller, 'getSingleDieResult', () => [4, 2][callIndex++]);
            assert.strictEqual(roller.rollDie('2d6kh5'), 6);
        });

        it('should handle invalid modifier parsing', function () {
            assert.deepStrictEqual(roller.applyDieMod([2, 4], 'aaa'), [2, 4]);
        });
    });

    it('should return empty for bad dice notation', function () {
        assert.strictEqual(rollDie('abc').length, 0);
        assert.strictEqual(rollDie('1').length, 0);
    });
});

describe('getDiceResult', function () {
    it('should return a DiceResult object from exported function', function () {
        const actual = getDiceResult('1d2');
        assert.ok(actual instanceof DiceResult);
        assert.strictEqual(actual.die, '1d2');
        assert.ok(actual.value >= 1 && actual.value <= 2);
    });

    it('should return a DiceResult object from class', (t) => {
        const roller = new DiceRoller();
        t.mock.method(roller, 'getSingleDieResult', () => 17);
        const actual = roller.getDiceResult('1d20');
        assert.ok(actual instanceof DiceResult);
        assert.strictEqual(actual.die, '1d20');
        assert.strictEqual(actual.value, 17);

        assert.strictEqual(actual.toString(), 17);
    });
});
