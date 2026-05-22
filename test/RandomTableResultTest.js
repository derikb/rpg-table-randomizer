'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import RandomTableResult from '../src/RandomTableResult.js';

describe('RandomTableResult', function () {
    it('should unserialize an object to the class props', function () {
        const resultObj = new RandomTableResult({
            key: 'tkey',
            table: 'colors',
            result: 'blue',
            desc: 'a primary'
        });

        assert.strictEqual(resultObj.key, 'tkey');
        assert.strictEqual(resultObj.table, 'colors');
        assert.strictEqual(resultObj.result, 'blue');
        assert.strictEqual(resultObj.desc, 'a primary');
        assert.strictEqual(resultObj.isError, false);
    });

    it('should serialize a class to an object', function () {
        const resultObj = new RandomTableResult({
            key: 'tkey',
            table: 'colors',
            result: 'blue',
            desc: 'a primary'
        });

        const serialized = resultObj.toJSON();
        assert.strictEqual(serialized.key, 'tkey');
        assert.strictEqual(serialized.table, 'colors');
        assert.strictEqual(serialized.result, 'blue');
        assert.strictEqual(serialized.desc, 'a primary');
        assert.strictEqual(serialized.className, 'RandomTableResult');
    });
});
