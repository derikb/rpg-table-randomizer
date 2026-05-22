'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import DisplayOptions from '../src/DisplayOptions.js';

describe('DisplayOptions', function () {
    it('should serialize the class to an object (true options)', function () {
        const opts = new DisplayOptions({
            table: 'colors',
            hide_table: true,
            hide_result: 1,
            hide_desc: '1'
        });

        assert.strictEqual(opts.hide_table, true);
        assert.strictEqual(opts.hide_result, true);
        assert.strictEqual(opts.hide_desc, true);

        assert.deepStrictEqual(opts.toJSON(), {
            table: 'colors',
            hide_table: true,
            hide_result: true,
            hide_desc: true,
            className: 'DisplayOptions'
        });
    });

    it('should serialize the class to an object (false options)', function () {
        const opts = new DisplayOptions({
            table: 'colors',
            hide_table: false,
            hide_result: 0,
            hide_desc: 'no'
        });

        assert.strictEqual(opts.hide_table, false);
        assert.strictEqual(opts.hide_result, false);
        assert.strictEqual(opts.hide_desc, false);

        assert.deepStrictEqual(opts.toJSON(), {
            table: 'colors',
            className: 'DisplayOptions'
        });
    });
});
