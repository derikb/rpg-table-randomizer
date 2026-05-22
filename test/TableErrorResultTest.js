'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import TableErrorResult from '../src/TableErrorResult.js';

describe('TableErrorResult', function () {
    it('should unserialize an object to the class props', function () {
        const resultObj = new TableErrorResult({
            key: 'tkey',
            table: 'error',
            result: '',
            desc: ''
        });

        assert.strictEqual(resultObj.key, 'tkey');
        assert.strictEqual(resultObj.table, 'error');
        assert.strictEqual(resultObj.result, '');
        assert.strictEqual(resultObj.desc, '');
        assert.strictEqual(resultObj.isError, true);
    });

    it('should serialize a class to an object', function () {
        const resultObj = new TableErrorResult({
            key: 'tkey',
            table: 'error'
        });

        const serialized = resultObj.toJSON();
        assert.strictEqual(serialized.key, 'tkey');
        assert.strictEqual(serialized.table, 'error');
        assert.strictEqual(serialized.result, '');
        assert.strictEqual(serialized.desc, '');
        assert.strictEqual(serialized.className, 'TableErrorResult');
    });
});
