'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import RandomTableEntry from '../src/RandomTableEntry.js';

describe('RandomTableEntry', function () {
    it('should serialize the class to an object', function () {
        const entry = new RandomTableEntry({
            label: 'Orc',
            print: false,
            description: 'Selling swords',
            subtable: [
                'occupation',
                'disposition'
            ],
            weight: 2
        });

        const serialized = entry.toJSON();
        assert.strictEqual(serialized.label, 'Orc');
        assert.strictEqual(serialized.print, false);
        assert.strictEqual(serialized.description, 'Selling swords');
        assert.deepStrictEqual(serialized.subtable, [
            'occupation',
            'disposition'
        ]);
        assert.strictEqual(serialized.weight, 2);
        assert.strictEqual(serialized.className, 'RandomTableEntry');
    });

    it('should unserialize an object to class with field objects', function () {
        const obj = {
            label: 'Orc',
            print: false,
            description: 'Selling swords',
            subtable: [
                'occupation',
                'disposition'
            ],
            weight: 2,
            className: 'RandomTableEntry'
        };

        const entry = new RandomTableEntry(obj);
        assert.strictEqual(entry.label, 'Orc');
        assert.strictEqual(entry.print, false);
        assert.strictEqual(entry.description, 'Selling swords');
        assert.deepStrictEqual(entry.subtable, [
            'occupation',
            'disposition'
        ]);
        assert.strictEqual(entry.weight, 2);
    });
});
