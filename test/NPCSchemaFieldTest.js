'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import NPCSchemaField from '../src/NPCSchemaField.js';

describe('NPCSchemaField', function () {
    it('should serialize the class to an object', function () {
        const field = new NPCSchemaField({
            key: 'haircolor',
            label: 'Hair Color',
            type: 'string',
            source: 'color:natural',
            count: 1,
            starting_value: 'black'
        });

        const serialized = field.toJSON();
        assert.strictEqual(serialized.key, 'haircolor');
        assert.strictEqual(serialized.label, 'Hair Color');
        assert.strictEqual(serialized.type, 'string');
        assert.strictEqual(serialized.count, 1);
        assert.strictEqual(serialized.starting_value, 'black');
        assert.strictEqual(serialized.className, 'NPCSchemaField');
    });

    it('should unserialize an object to class with field objects', function () {
        const obj = {
            key: 'haircolor',
            label: 'Hair Color',
            type: 'string',
            source: 'color:natural',
            count: 1,
            starting_value: 'black',
            className: 'NPCSchemaField'
        };

        const field = new NPCSchemaField(obj);
        assert.strictEqual(field.key, 'haircolor');
        assert.strictEqual(field.label, 'Hair Color');
        assert.strictEqual(field.type, 'string');
        assert.strictEqual(field.count, 1);
        assert.strictEqual(field.starting_value, 'black');
    });

    it('should handle default constructor settings', function () {
        let field = new NPCSchemaField({ count: -2 });
        assert.strictEqual(field.count, 1);
        field = new NPCSchemaField({ count: null });
        assert.strictEqual(field.count, 1);
    });

    it('should return defaultEmpty for each type', function () {
        const field = new NPCSchemaField({
            type: 'string'
        });
        assert.strictEqual(field.defaultEmpty, '');

        field.type = 'text';
        assert.strictEqual(field.defaultEmpty, '');

        field.type = 'array';
        assert.deepStrictEqual(field.defaultEmpty, []);

        field.type = 'number';
        assert.strictEqual(field.defaultEmpty, 0);

        field.type = 'modifier';
        assert.strictEqual(field.defaultEmpty, 0);

        field.type = 'note';
        assert.strictEqual(field.defaultEmpty, null);

        field.type = 'resultset';
        assert.strictEqual(field.defaultEmpty, null);

        field.type = 'something else';
        assert.strictEqual(field.defaultEmpty, null);

        field.count = 2;
        assert.deepStrictEqual(field.defaultEmpty, []);
    });

    it('should return true for specific type checks', function () {
        const field = new NPCSchemaField({
            type: 'string'
        });
        assert.strictEqual(field.isString(), true);

        field.type = 'text';
        assert.strictEqual(field.isText(), true);

        field.type = 'array';
        assert.strictEqual(field.isArray(), true);

        field.type = 'number';
        assert.strictEqual(field.isNumber(), true);

        field.type = 'modifier';
        assert.strictEqual(field.isModifier(), true);

        field.type = 'note';
        assert.strictEqual(field.isNote(), true);

        field.type = 'resultset';
        assert.strictEqual(field.isResult(), true);

        field.type = 'something else';
        assert.strictEqual(field.isString(), false);
        assert.strictEqual(field.isText(), false);
        assert.strictEqual(field.isNumber(), false);
        assert.strictEqual(field.isModifier(), false);
        assert.strictEqual(field.isNote(), false);
        assert.strictEqual(field.isResult(), false);
        assert.strictEqual(field.isArray(), false);

        field.count = 2;
        assert.strictEqual(field.isArray(), true);
    });
});
