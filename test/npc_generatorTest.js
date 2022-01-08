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
    });

    describe('applySchemaToNPC', function () {
        it('should apply schema to npc', function () {
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
            const tableRoller = new TableRoller({});
            const convertToken = stub(tableRoller, 'convertToken');
            convertToken.withArgs('goal:longterm').returns('love');
            convertToken.withArgs('secret:one').returns('possessed');

            const npc = new NPC({ id: '123-567' });

            applySchemaToNPC(schema, tableRoller, npc);
            expect(convertToken.callCount).to.equal(3);
            expect(npc.schema).to.equal('western');
            expect(npc.getFieldKeys()).to.deep.equal(['goal_long', 'goal_short', 'secrets']);
            expect(npc.id).to.not.be.empty;
            expect(npc.getFieldValue('goal_long')).to.equal('love');
            expect(npc.getFieldValue('goal_short')).to.equal('money');
            expect(npc.getFieldValue('secrets')).to.deep.equal(['possessed', 'possessed']);
        });
    });
});
