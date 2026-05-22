'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import NPC from '../src/NPC.js';
import NPCSchema from '../src/NPCSchema.js';
import NPCSchemaField from '../src/NPCSchemaField.js';
import {
    registerSchema,
    getAllSchemas,
    getSchemaByKey,
    initializeNewNPC,
    applySchemaToNPC
} from '../src/npc_generator.js';
import TableRoller from '../src/TableRoller.js';

describe('npc_generator', function () {
    describe('register and get schemas', function () {
        it('should register and return a schema', function () {
            const schema = new NPCSchema({
                key: 'western',
                name: 'Western'
            });
            registerSchema(schema);

            assert.strictEqual(getSchemaByKey('western'), schema);
            assert.deepStrictEqual(getAllSchemas(), {
                western: schema
            });
        });

        it('should throw on invalid schema', function () {
            const schema = new NPCSchema({
                key: ''
            });
            assert.throws(() => { registerSchema(schema); }, { message: /Invalid schema/ });

            schema.key = 'base';
            assert.throws(() => { registerSchema(schema); }, { message: /Invalid schema/ });

            assert.throws(() => { registerSchema({}); }, { message: /Invalid schema/ });
        });
    });

    describe('initializeNewNPC', function () {
        it('should initialize a new npc and return it', (t) => {
            const schema = new NPCSchema({
                key: 'western',
                name: 'Western',
                fields: [
                    new NPCSchemaField({
                        key: 'goal_long',
                        source: 'goal:longterm'
                    }),
                    new NPCSchemaField({
                        key: 'goal_short',
                        source: 'goal:shortterm',
                        starting_value: 'money'
                    }),
                    new NPCSchemaField({
                        key: 'secrets',
                        source: 'secret:one',
                        count: 2,
                        type: 'array'
                    })
                ]
            });
            registerSchema(schema);
            const tableRoller = new TableRoller({});
            const convertTokenMock = t.mock.method(tableRoller, 'convertToken', (token) => {
                if (token === 'goal:longterm') return 'love';
                if (token === 'secret:one') return 'possessed';
            });

            const npc = initializeNewNPC('western', tableRoller, true);
            assert.strictEqual(convertTokenMock.mock.callCount(), 3);
            assert.ok(npc instanceof NPC);
            assert.deepStrictEqual(npc.getFieldKeys(), ['goal_long', 'goal_short', 'secrets']);
            assert.ok(npc.id.length > 0);
            assert.strictEqual(npc.getFieldValue('goal_long'), 'love');
            assert.strictEqual(npc.getFieldValue('goal_short'), 'money');
            assert.deepStrictEqual(npc.getFieldValue('secrets'), ['possessed', 'possessed']);
        });

        it('should throw on unknown schema', function () {
            const tableRoller = new TableRoller({});

            assert.throws(() => { return initializeNewNPC('bad', tableRoller); }, /Schema not found\./);
        });

        it('should throw on invalid TablRoller', function () {
            const tableRoller = {};

            assert.throws(() => { return initializeNewNPC('western', tableRoller); }, /Invalid tableRoller/);
        });
    });

    describe('applySchemaToNPC', function () {
        it('should apply schema to npc', (t) => {
            const schema = new NPCSchema({
                key: 'western',
                name: 'Western',
                fields: [
                    new NPCSchemaField({
                        key: 'goal_long',
                        source: 'goal:longterm',
                        type: 'result'
                    }),
                    new NPCSchemaField({
                        key: 'goal_short',
                        source: 'goal:shortterm',
                        starting_value: 'money'
                    }),
                    new NPCSchemaField({
                        key: 'secrets',
                        source: 'secret:one',
                        count: 2,
                        type: 'text'
                    }),
                    new NPCSchemaField({
                        key: 'strength',
                        source: 'roll:3d6',
                        type: 'number'
                    }),
                    new NPCSchemaField({
                        key: 'nothing',
                        source: '',
                        type: 'note'
                    })
                ]
            });
            const tableRoller = new TableRoller({});
            const convertTokenMock = t.mock.method(tableRoller, 'convertToken', (token) => {
                if (token === 'goal:longterm') return 'love';
                if (token === 'secret:one') return 'possessed';
                if (token === 'roll:3d6') return '15';
            });

            const npc = new NPC({ id: '123-567' });

            applySchemaToNPC(schema, tableRoller, npc);
            assert.strictEqual(convertTokenMock.mock.callCount(), 4);
            assert.strictEqual(npc.schema, 'western');
            assert.deepStrictEqual(npc.getFieldKeys(), ['goal_long', 'goal_short', 'secrets', 'strength', 'nothing']);
            assert.ok(npc.id.length > 0);
            assert.strictEqual(npc.getFieldValue('goal_long'), 'love');
            assert.strictEqual(npc.getFieldValue('goal_short'), 'money');
            assert.deepStrictEqual(npc.getFieldValue('secrets'), ['possessed', 'possessed']);
            assert.strictEqual(npc.getFieldValue('strength'), 15);
            assert.strictEqual(npc.getFieldValue('nothing'), null);
        });

        it('should throw for a variety of errors', function () {
            const tableRoller = new TableRoller({});
            const schema = new NPCSchema({
                key: 'western'
            });
            const npc = new NPC({ id: '123-567', schema: 'sci-fi' });
            assert.throws(() => {
                applySchemaToNPC(schema, tableRoller, npc);
            }, { message: /npc already has schema set\./ });

            assert.throws(() => {
                applySchemaToNPC(schema, {}, npc);
            }, { message: /Invalid tableRoller/ });

            assert.throws(() => {
                applySchemaToNPC({}, tableRoller, npc);
            }, { message: /schema object must be or inherit from NPCSchema class\./ });

            assert.throws(() => {
                applySchemaToNPC(schema, tableRoller, {});
            }, { message: /npc object must be or inherit from NPC class\./ });
        });
    });
});
