'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
    randomInteger,
    getWeightedRandom,
    randomString
} from '../src/randomizer.js';

describe('randomInteger', function () {
    it('should return a number between min and max', function () {
        const actual = randomInteger(1, 4);
        assert.ok(typeof actual === 'number');
        assert.ok(actual >= 1);
        assert.ok(actual <= 4);
    });
});

describe('getWeightedRandom', function () {
    it('should return an element from the array', function () {
        const values = [
            'first',
            'second'
        ];
        const weights = [
            1,
            50
        ];
        const actual = getWeightedRandom(values, weights);
        assert.ok(values.includes(actual));
    });
});

describe('randomString', function () {
    it('should return an element from the array', function () {
        const values = [
            'first',
            'second'
        ];
        const actual = randomString(values);
        assert.ok(values.includes(actual));
    });
});
