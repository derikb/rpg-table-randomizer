'use strict';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import {
    randomInteger,
    getWeightedRandom,
    randomString
} from '../src/randomizer.js';

// const sinon = require('sinon');

describe('randomInteger', function () {
    it('should return a number between min and max', function () {
        const actual = randomInteger(1, 4);
        expect(actual).to.be.a('number');
        expect(actual).to.be.at.least(1);
        expect(actual).to.be.at.most(4);
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
        expect(actual).to.be.oneOf(values);
    });
});

describe('randomString', function () {
    it('should return an element from the array', function () {
        const values = [
            'first',
            'second'
        ];
        const actual = randomString(values);
        expect(actual).to.be.oneOf(values);
    });
});
