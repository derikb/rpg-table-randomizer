'use strict';

import { expect } from 'chai';
import { describe, it } from 'mocha';

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
        expect(serialized.label).to.equal('Orc');
        expect(serialized.print).to.equal(false);
        expect(serialized.description).to.equal('Selling swords');
        expect(serialized.subtable).to.deep.equal([
            'occupation',
            'disposition'
        ]);
        expect(serialized.weight).to.equal(2);
        expect(serialized.className).to.equal('RandomTableEntry');
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
        expect(entry.label).to.equal('Orc');
        expect(entry.print).to.equal(false);
        expect(entry.description).to.equal('Selling swords');
        expect(entry.subtable).to.deep.equal([
            'occupation',
            'disposition'
        ]);
        expect(entry.weight).to.equal(2);
    });
});
