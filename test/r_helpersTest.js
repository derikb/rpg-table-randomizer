'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

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

        assert.strictEqual(
            JSON.stringify(testClass),
            '{"zero":"foo"}'
        );
    });

    it('should return a bare object handling various basic types', function () {
        const testClass = new TestClass();
        testClass.zero = 'foo'; // string
        testClass.one = 123; // number
        testClass.two = [1, 'two'];

        assert.strictEqual(
            JSON.stringify(testClass),
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

        assert.strictEqual(
            JSON.stringify(testClass),
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

        assert.strictEqual(
            JSON.stringify(testClass),
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

        assert.strictEqual(
            JSON.stringify(testClass),
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

        assert.strictEqual(
            JSON.stringify(testClass),
            '{"zero":"foo","one":{"one":1,"two":["array"]}}'
        );
    });
});

describe('isEmpty', function () {
    it('should return true', function () {
        assert.strictEqual(isEmpty(), true);
        assert.strictEqual(isEmpty(null), true);
        assert.strictEqual(isEmpty(''), true);
        assert.strictEqual(isEmpty([]), true);
        assert.strictEqual(isEmpty({}), true);
        assert.strictEqual(isEmpty(new Set()), true);
        assert.strictEqual(isEmpty(new Map()), true);
    });

    it('should return false', function () {
        assert.strictEqual(isEmpty('a'), false);
        assert.strictEqual(isEmpty(['a']), false);
        assert.strictEqual(isEmpty({ a: 'a' }), false);
        const set = new Set();
        set.add('a');
        assert.strictEqual(isEmpty(set), false);
        const map = new Map();
        map.set('a', 'b');
        assert.strictEqual(isEmpty(map), false);
    });
});

describe('isObject', function () {
    it('should return true', function () {
        assert.strictEqual(isObject({}), true);
        assert.strictEqual(isObject(new TestClass()), true);
    });

    it('should return false', function () {
        assert.strictEqual(isObject(), false);
        assert.strictEqual(isObject(null), false);
        assert.strictEqual(isObject(1), false);
        assert.strictEqual(isObject('a'), false);
        assert.strictEqual(isObject(['a']), false);
        const set = new Set();
        set.add('a');
        assert.strictEqual(isObject(set), false);
        const map = new Map();
        map.set('a', 'b');
        assert.strictEqual(isObject(map), false);
    });
});

describe('capitalize', function () {
    it('should capitalize a string', function () {
        assert.strictEqual(capitalize('hello dear.'), 'Hello dear.');
        assert.strictEqual(capitalize('Hello dear.'), 'Hello dear.');
        assert.strictEqual(capitalize(''), '');
    });
});
