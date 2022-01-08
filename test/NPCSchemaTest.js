'use strict';

import { expect } from 'chai';
import { describe, it } from 'mocha';

import NPCSchema from '../src/NPCSchema.js';
import NPCSchemaField from '../src/NPCSchemaField.js';

describe('NPCSchema', function () {
    it('should serialize the class to an object', function () {
        const fields = [
            new NPCSchemaField({
                key: 'one'
            }),
            {
                className: 'NPCSchemaField',
                key: 'two'
            }
        ];

        const schema = new NPCSchema({
            key: 'western',
            name: 'Western',
            author: 'Derik',
            fields
        });

        const serialized = schema.toJSON();
        expect(serialized.key).to.equal('western');
        expect(serialized.name).to.equal('Western');
        expect(serialized.author).to.equal('Derik');
        expect(serialized.className).to.equal('NPCSchema');

        expect(serialized.fields.one.className).to.equal('NPCSchemaField');
        expect(serialized.fields.two.className).to.equal('NPCSchemaField');
    });

    it('should unserialize an object to class with field objects', function () {
        const obj = {
            className: 'NPCSchema',
            key: 'western',
            name: 'Western',
            author: 'Derik',
            fields: {
                one: {
                    className: 'NPCSchemaField',
                    label: 'Secrets',
                    key: 'one'
                },
                two: new NPCSchemaField({
                    key: 'two',
                    label: 'Goals'
                })
            }
        };

        const schema = new NPCSchema(obj);
        expect(schema.key).to.equal('western');
        expect(schema.name).to.equal('Western');
        expect(schema.author).to.equal('Derik');

        expect(schema.getFieldKeys()).to.deep.equal(['one', 'two']);

        expect(schema.getFieldByKey('one')).to.be.instanceOf(NPCSchemaField);
        expect(schema.getFieldLabelByKey('one')).to.be.equal('Secrets');
        expect(schema.getFieldByKey('two')).to.be.instanceOf(NPCSchemaField);
        expect(schema.getFieldLabelByKey('two')).to.be.equal('Goals');
    });

    it('should unserialize an object to class with field array', function () {
        const obj = {
            className: 'NPCSchema',
            key: 'western',
            name: 'Western',
            author: 'Derik',
            fields: [
                {
                    className: 'NPCSchemaField',
                    label: 'Secrets',
                    key: 'one'
                }
            ]
        };

        const schema = new NPCSchema(obj);
        expect(schema.key).to.equal('western');
        expect(schema.name).to.equal('Western');
        expect(schema.author).to.equal('Derik');
        expect(schema.getFieldByKey('one')).to.be.instanceOf(NPCSchemaField);
        expect(schema.getFieldLabelByKey('one')).to.be.equal('Secrets');
    });
});
