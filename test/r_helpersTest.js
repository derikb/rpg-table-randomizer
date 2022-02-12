/* eslint-disable no-unused-expressions */
'use strict';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import { defaultToJSON, isEmpty, isObject, capitalize } from '../src/r_helpers.js';

class TestClass {
    toJSON () {
        const obj = defaultToJSON.call(this);
        return obj;
    }
}

describe('defaultToJSON', function () {
    it('should return a bare object ignoring various types', function () {
        const testClass = new TestClass();
        testClass.zero = 'foo';
        testClass.one = undefined;
        testClass.two = null;
        testClass.three = function () {};

        expect(JSON.stringify(testClass)).to.equal(
            '{"zero":"foo"}'
        );
    });

    it('should return a bare object handling various basic types', function () {
        const testClass = new TestClass();
        testClass.zero = 'foo'; // string
        testClass.one = 123; // number
        testClass.two = [1, 'two'];

        expect(JSON.stringify(testClass)).to.equal(
            '{"zero":"foo","one":123,"two":[1,"two"]}'
        );
    });

    it('should return a bare object handling arrays with recursive handling', function () {
        const testClass = new TestClass();
        const testClass2 = new TestClass();
        testClass2.foo = ['bar'];
        testClass.zero = 'foo'; // string
        // Class in an array, recursive use of method
        testClass.one = [
            'two',
            testClass2
        ];

        expect(JSON.stringify(testClass)).to.equal(
            '{"zero":"foo","one":["two",{"foo":["bar"]}]}'
        );
    });

    it('should return a bare object handling a Map prop', function () {
        const testClass = new TestClass();
        testClass.zero = 'foo'; // string
        const testMap = new Map();
        testMap.set('one', 1);
        testMap.set('two', ['array']);
        testClass.one = testMap;

        expect(JSON.stringify(testClass)).to.equal(
            '{"zero":"foo","one":{"one":1,"two":["array"]}}'
        );
    });

    it('should return a bare object handling a Set prop', function () {
        const testClass = new TestClass();
        testClass.zero = 'foo'; // string
        const testSet = new Set();
        testSet.add(1);
        testSet.add(['array']);
        testClass.one = testSet;

        expect(JSON.stringify(testClass)).to.equal(
            '{"zero":"foo","one":[1,["array"]]}'
        );
    });

    it('should return a bare object handling a bare object prop', function () {
        const testClass = new TestClass();
        testClass.zero = 'foo'; // string
        const testObj = {
            one: 1,
            two: ['array']
        };
        testClass.one = testObj;

        expect(JSON.stringify(testClass)).to.equal(
            '{"zero":"foo","one":{"one":1,"two":["array"]}}'
        );
    });
});

describe('isEmpty', function () {
    it('should return true', function () {
        expect(isEmpty()).to.be.true;
        expect(isEmpty(null)).to.be.true;
        expect(isEmpty('')).to.be.true;
        expect(isEmpty([])).to.be.true;
        expect(isEmpty({})).to.be.true;
        expect(isEmpty(new Set())).to.be.true;
        expect(isEmpty(new Map())).to.be.true;
    });

    it('should return false', function () {
        expect(isEmpty('a')).to.be.false;
        expect(isEmpty(['a'])).to.be.false;
        expect(isEmpty({ a: 'a' })).to.be.false;
        const set = new Set();
        set.add('a');
        expect(isEmpty(set)).to.be.false;
        const map = new Map();
        map.set('a', 'b');
        expect(isEmpty(map)).to.be.false;
    });
});

describe('isObject', function () {
    it('should return true', function () {
        expect(isObject({})).to.be.true;
        expect(isObject(new TestClass())).to.be.true;
    });

    it('should return false', function () {
        expect(isObject()).to.be.false;
        expect(isObject(null)).to.be.false;
        expect(isObject(1)).to.be.false;
        expect(isObject('a')).to.be.false;
        expect(isObject(['a'])).to.be.false;
        const set = new Set();
        set.add('a');
        expect(isObject(set)).to.be.false;
        const map = new Map();
        map.set('a', 'b');
        expect(isObject(map)).to.be.false;
    });
});

describe('capitalize', function () {
    it('should capitalize a string', function () {
        expect(capitalize('hello dear.')).to.equal('Hello dear.');
        expect(capitalize('Hello dear.')).to.equal('Hello dear.');
        expect(capitalize('')).to.equal('');
    });
});
