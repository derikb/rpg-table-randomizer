/* eslint-disable no-unused-expressions */
'use strict';

import { describe, it } from 'mocha';
import { expect } from 'chai';
import { stub } from 'sinon';

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

            expect(getSchemaByKey('western')).to.equal(schema);
            expect(getAllSchemas()).to.deep.equal({
                western: schema
            });
        });

        it('should throw on invalid schema', function () {
            const schema = new NPCSchema({
                key: ''
            });
            expect(() => { registerSchema(schema); }).to.throw(Error, 'Invalid schema');

            schema.key = 'base';
            expect(() => { registerSchema(schema); }).to.throw(Error, 'Invalid schema');

            expect(() => { registerSchema({}); }).to.throw(Error, 'Invalid schema');
        });
    });

    describe('initializeNewNPC', function () {
        it('should initialize a new npc and return it', function () {
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
            const convertToken = stub(tableRoller, 'convertToken');
            convertToken.withArgs('goal:longterm').returns('love');
            convertToken.withArgs('secret:one').returns('possessed');

            const npc = initializeNewNPC('western', tableRoller, true);
            expect(convertToken.callCount).to.equal(3);
            expect(npc).to.be.instanceOf(NPC);
            expect(npc.getFieldKeys()).to.deep.equal(['goal_long', 'goal_short', 'secrets']);
            expect(npc.id).to.not.be.empty;
            expect(npc.getFieldValue('goal_long')).to.equal('love');
            expect(npc.getFieldValue('goal_short')).to.equal('money');
            expect(npc.getFieldValue('secrets')).to.deep.equal(['possessed', 'possessed']);
        });

        it('should throw on unknown schema', function () {
            const tableRoller = new TableRoller({});

            expect(() => { return initializeNewNPC('bad', tableRoller); }).to.throw('Schema not found.');
        });

        it('should throw on invalid TablRoller', function () {
            const tableRoller = {};

            expect(() => { return initializeNewNPC('western', tableRoller); }).to.throw('Invalid tableRoller');
        });
    });

    describe('applySchemaToNPC', function () {
        it('should apply schema to npc', function () {
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
            const convertToken = stub(tableRoller, 'convertToken');
            convertToken.withArgs('goal:longterm').returns('love');
            convertToken.withArgs('secret:one').returns('possessed');
            convertToken.withArgs('roll:3d6').returns('15');

            const npc = new NPC({ id: '123-567' });

            applySchemaToNPC(schema, tableRoller, npc);
            expect(convertToken.callCount).to.equal(4);
            expect(npc.schema).to.equal('western');
            expect(npc.getFieldKeys()).to.deep.equal(['goal_long', 'goal_short', 'secrets', 'strength', 'nothing']);
            expect(npc.id).to.not.be.empty;
            expect(npc.getFieldValue('goal_long')).to.equal('love');
            expect(npc.getFieldValue('goal_short')).to.equal('money');
            expect(npc.getFieldValue('secrets')).to.deep.equal(['possessed', 'possessed']);
            expect(npc.getFieldValue('strength')).to.equal(15);
            expect(npc.getFieldValue('nothing')).to.equal(null);
        });

        it('should throw for a variety of errors', function () {
            const tableRoller = new TableRoller({});
            const schema = new NPCSchema({
                key: 'western'
            });
            const npc = new NPC({ id: '123-567', schema: 'sci-fi' });
            expect(() => {
                applySchemaToNPC(schema, tableRoller, npc);
            }).to.throw(Error, 'npc already has schema set.');

            expect(() => {
                applySchemaToNPC(schema, {}, npc);
            }).to.throw(Error, 'Invalid tableRoller');

            expect(() => {
                applySchemaToNPC({}, tableRoller, npc);
            }).to.throw(Error, 'schema object must be or inherit from NPCSchema class.');

            expect(() => {
                applySchemaToNPC(schema, tableRoller, {});
            }).to.throw(Error, 'npc object must be or inherit from NPC class.');
        });
    });
});
