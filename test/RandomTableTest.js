'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import RandomTable from '../src/RandomTable.js';
import RandomTableEntry from '../src/RandomTableEntry.js';

describe('RandomTable', function () {
    const rtable = new RandomTable({
        key: 'colors',
        tables: {
            secondary: [
                new RandomTableEntry({ label: 'green' }),
                { label: 'orange' },
                {}
            ],
            tertiary: [],
            hues: 'nope'
        },
        table: [
            'blue',
            'red',
            'yellow'
        ]
    });

    it('should normalize subtable data on creation', function () {
        assert.strictEqual(rtable.tables.default.length, 3);
        assert.deepStrictEqual(rtable.tables.default[2], new RandomTableEntry({ label: 'yellow' }));
        assert.strictEqual(rtable.tables.secondary.length, 2);
        assert.deepStrictEqual(rtable.tables.secondary[0], new RandomTableEntry({ label: 'green' }));
        assert.deepStrictEqual(rtable.tables.secondary[1], new RandomTableEntry({ label: 'orange' }));
        assert.ok(Array.isArray(rtable.tables.tertiary));
        assert.strictEqual(rtable.tables.tertiary.length, 0);
        assert.strictEqual(rtable.tables.hues, undefined);
    });

    it('should return table names', function () {
        assert.deepStrictEqual(
            [...rtable.subtableNames].sort(),
            ['default', 'secondary', 'tertiary'].sort()
        );
    });

    it('should return subtable entries', function () {
        assert.deepStrictEqual(rtable.getSubtableEntries(), rtable.tables.default);
        assert.deepStrictEqual(rtable.getSubtableEntries('hues'), []);
        assert.deepStrictEqual(rtable.getSubtableEntries('secondary'), rtable.tables.secondary);
    });

    it('should return a random entry from a subtable', function () {
        assert.strictEqual(rtable.getRandomEntry('hues'), null);
        const entry = rtable.getRandomEntry('secondary');
        assert.ok(entry === rtable.tables.secondary[0] || entry === rtable.tables.secondary[1]);
    });

    it('should return an entry from a subtable by label', function () {
        assert.strictEqual(rtable.findEntry('orange', 'hues'), null);
        assert.strictEqual(rtable.findEntry('orange', 'secondary'), rtable.tables.secondary[1]);
        assert.strictEqual(rtable.findEntry('purple', 'secondary'), null);
    });

    it('should return the correct sequence of tables to roll', function () {
        assert.deepStrictEqual(rtable.getSequence('someKey'), ['someKey']);
        assert.deepStrictEqual(rtable.getSequence(), ['default']);

        rtable.sequence = ['rollall'];
        assert.deepStrictEqual(rtable.getSequence(), ['default', 'secondary', 'tertiary']);
        rtable.sequence = ['tertiary', 'other'];
        assert.deepStrictEqual(rtable.getSequence(), ['tertiary', 'other']);
        rtable.sequence = [];
    });

    it('should return an array of other table dependencies', function () {
        rtable.tables.tertiary = [
            new RandomTableEntry({ label: 'dark {{table:this:primary}}' }),
            new RandomTableEntry({ label: 'dark {{name:flemish}}' }),
            new RandomTableEntry({ label: 'blue {{table:weather:rain}}' }),
            new RandomTableEntry({ label: 'blue {{table:weather:wind}}' }),
            new RandomTableEntry({ label: 'blue {{table:directions}} {{table:dragons}}' })
        ];
        rtable.macro = [
            'pattern',
            'pattern:plaid',
            'texture',
            'sample:colors'
        ];

        assert.deepStrictEqual(rtable.findDependencies(), [
            'pattern',
            'texture',
            'sample',
            'weather',
            'directions',
            'dragons'
        ]);
    });
});
