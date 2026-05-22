'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

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
        assert.strictEqual(serialized.key, 'western');
        assert.strictEqual(serialized.name, 'Western');
        assert.strictEqual(serialized.author, 'Derik');
        assert.strictEqual(serialized.className, 'NPCSchema');

        assert.strictEqual(serialized.fields.one.className, 'NPCSchemaField');
        assert.strictEqual(serialized.fields.two.className, 'NPCSchemaField');
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
        assert.strictEqual(schema.key, 'western');
        assert.strictEqual(schema.name, 'Western');
        assert.strictEqual(schema.author, 'Derik');

        assert.deepStrictEqual(schema.getFieldKeys(), ['one', 'two']);

        assert.ok(schema.getFieldByKey('one') instanceof NPCSchemaField);
        assert.strictEqual(schema.getFieldLabelByKey('one'), 'Secrets');
        assert.ok(schema.getFieldByKey('two') instanceof NPCSchemaField);
        assert.strictEqual(schema.getFieldLabelByKey('two'), 'Goals');
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
        assert.strictEqual(schema.key, 'western');
        assert.strictEqual(schema.name, 'Western');
        assert.strictEqual(schema.author, 'Derik');
        assert.ok(schema.getFieldByKey('one') instanceof NPCSchemaField);
        assert.strictEqual(schema.getFieldLabelByKey('one'), 'Secrets');
    });
});
