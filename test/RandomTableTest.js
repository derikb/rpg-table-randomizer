/* eslint-disable no-unused-expressions */
'use strict';

import { describe, it } from 'mocha';
import { expect } from 'chai';
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
        expect(rtable.tables.default.length).to.equal(3);
        expect(rtable.tables.default[2]).to.deep.equal(new RandomTableEntry({ label: 'yellow' }));
        expect(rtable.tables.secondary.length).to.equal(2);
        expect(rtable.tables.secondary[0]).to.deep.equal(new RandomTableEntry({ label: 'green' }));
        expect(rtable.tables.secondary[1]).to.deep.equal(new RandomTableEntry({ label: 'orange' }));
        expect(rtable.tables.tertiary).to.be.an('array');
        expect(rtable.tables.tertiary).to.be.empty;
        expect(rtable.tables.hues).to.be.undefined;
    });

    it('should return table names', function () {
        expect(rtable.subtableNames).to.have.members([
            'default',
            'secondary',
            'tertiary'
        ]);
    });

    it('should return subtable entries', function () {
        expect(rtable.getSubtableEntries()).to.deep.equal(rtable.tables.default);
        expect(rtable.getSubtableEntries('hues')).to.deep.equal([]);
        expect(rtable.getSubtableEntries('secondary')).to.deep.equal(rtable.tables.secondary);
    });

    it('should return a random entry from a subtable', function () {
        expect(rtable.getRandomEntry('hues')).to.be.null;
        expect(rtable.getRandomEntry('secondary')).to.be.oneOf([
            rtable.tables.secondary[0],
            rtable.tables.secondary[1]
        ]);
    });

    it('should return an entry from a subtable by label', function () {
        expect(rtable.findEntry('orange', 'hues')).to.be.null;
        expect(rtable.findEntry('orange', 'secondary')).to.equal(
            rtable.tables.secondary[1]
        );
        expect(rtable.findEntry('purple', 'secondary')).to.be.null;
    });

    it('should return the correct sequence of tables to roll', function () {
        expect(rtable.getSequence('someKey')).to.deep.equal(['someKey']);
        expect(rtable.getSequence()).to.deep.equal(['default']);

        rtable.sequence = ['rollall'];
        expect(rtable.getSequence()).to.deep.equal(['default', 'secondary', 'tertiary']);
        rtable.sequence = ['tertiary', 'other'];
        expect(rtable.getSequence()).to.deep.equal(['tertiary', 'other']);
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

        expect(rtable.findDependencies()).to.deep.equal([
            'pattern',
            'texture',
            'sample',
            'weather',
            'directions',
            'dragons'
        ]);
    });
});
