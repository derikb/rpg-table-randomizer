'use strict';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import RandomTableResult from '../src/RandomTableResult.js';

describe('RandomTableResult', function () {
    it('should unserialize an object to the class props', function () {
        const resultObj = new RandomTableResult({
            table: 'colors',
            result: 'blue',
            desc: 'a primary'
        });

        expect(resultObj.table).to.equal('colors');
        expect(resultObj.result).to.equal('blue');
        expect(resultObj.desc).to.equal('a primary');
        expect(resultObj.isError).to.equal(false);
    });

    it('should serialize a class to an object', function () {
        const resultObj = new RandomTableResult({
            table: 'colors',
            result: 'blue',
            desc: 'a primary'
        });

        const serialized = resultObj.toJSON();
        expect(serialized.table).to.equal('colors');
        expect(serialized.result).to.equal('blue');
        expect(serialized.desc).to.equal('a primary');
        expect(serialized.className).to.equal('RandomTableResult');
    });
});
