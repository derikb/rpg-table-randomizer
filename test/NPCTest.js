'use strict';

import { expect } from 'chai';
import { describe, it } from 'mocha';

import NPC from '../src/NPC.js';
import RandomTableResultSet from '../src/RandomTableResultSet.js';
import RandomTableResult from '../src/RandomTableResult.js';
import TableErrorResult from '../src/TableErrorResult.js';
import { DiceResult } from '../src/dice_roller.js';

describe('NPC', function () {
    it('should serialize the class to an object', function () {
        const fieldMap = new Map();
        fieldMap.set('one', 'a string');
        fieldMap.set('two', new RandomTableResultSet({}));
        fieldMap.set('three', new RandomTableResult({}));
        fieldMap.set('four', new TableErrorResult({}));
        fieldMap.set('five', new DiceResult({}));

        const npc = new NPC({
            id: '123-abc-789',
            schema: 'ose',
            fields: fieldMap
        });

        const serialized = npc.toJSON();
        expect(serialized.id).to.equal('123-abc-789');
        expect(serialized.schema).to.equal('ose');
        expect(serialized.className).to.equal('NPC');
        expect(serialized.fields.one).to.equal('a string');
        expect(serialized.fields.two.className).to.equal('RandomTableResultSet');
        expect(serialized.fields.three.className).to.equal('RandomTableResult');
        expect(serialized.fields.four.className).to.equal('TableErrorResult');
        expect(serialized.fields.five.className).to.equal('DiceResult');
    });

    it('should unserialize an object to class', function () {
        const obj = {
            className: 'NPC',
            id: '123-abc-789',
            schema: 'ose',
            fields: {
                one: 'a string',
                two: {
                    className: 'RandomTableResultSet'
                },
                three: {
                    className: 'RandomTableResult'
                },
                four: {
                    className: 'TableErrorResult'
                },
                five: {
                    className: 'DiceResult'
                },
                six: null,
                seven: {
                    foo: 'bar'
                }
            }
        };

        const npc = new NPC(obj);
        expect(npc.id).to.equal('123-abc-789');
        expect(npc.schema).to.equal('ose');
        expect(npc.getFieldValue('one')).to.equal('a string');
        expect(npc.getFieldValue('two')).to.be.instanceOf(RandomTableResultSet);
        expect(npc.getFieldValue('three')).to.be.instanceOf(RandomTableResult);
        expect(npc.getFieldValue('four')).to.be.instanceOf(TableErrorResult);
        expect(npc.getFieldValue('five')).to.be.instanceOf(DiceResult);
        expect(npc.getFieldValue('six')).to.be.equal(null);
        expect(npc.getFieldValue('seven')).to.deep.property('foo', 'bar');
        expect(npc.getFieldKeys()).to.deep.equal([
            'one',
            'two',
            'three',
            'four',
            'five',
            'six',
            'seven'
        ]);
    });
});
