'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

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
        assert.strictEqual(serialized.id, '123-abc-789');
        assert.strictEqual(serialized.schema, 'ose');
        assert.strictEqual(serialized.className, 'NPC');
        assert.strictEqual(serialized.fields.one, 'a string');
        assert.strictEqual(serialized.fields.two.className, 'RandomTableResultSet');
        assert.strictEqual(serialized.fields.three.className, 'RandomTableResult');
        assert.strictEqual(serialized.fields.four.className, 'TableErrorResult');
        assert.strictEqual(serialized.fields.five.className, 'DiceResult');
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
        assert.strictEqual(npc.id, '123-abc-789');
        assert.strictEqual(npc.schema, 'ose');
        assert.strictEqual(npc.getFieldValue('one'), 'a string');
        assert.ok(npc.getFieldValue('two') instanceof RandomTableResultSet);
        assert.ok(npc.getFieldValue('three') instanceof RandomTableResult);
        assert.ok(npc.getFieldValue('four') instanceof TableErrorResult);
        assert.ok(npc.getFieldValue('five') instanceof DiceResult);
        assert.strictEqual(npc.getFieldValue('six'), null);
        assert.strictEqual(npc.getFieldValue('seven').foo, 'bar');
        assert.deepStrictEqual(npc.getFieldKeys(), [
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
