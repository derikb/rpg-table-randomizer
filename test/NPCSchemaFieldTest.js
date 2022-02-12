'use strict';

import { expect } from 'chai';
import { describe, it } from 'mocha';

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
        expect(serialized.key).to.equal('haircolor');
        expect(serialized.label).to.equal('Hair Color');
        expect(serialized.type).to.equal('string');
        expect(serialized.count).to.equal(1);
        expect(serialized.starting_value).to.equal('black');
        expect(serialized.className).to.equal('NPCSchemaField');
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
        expect(field.key).to.equal('haircolor');
        expect(field.label).to.equal('Hair Color');
        expect(field.type).to.equal('string');
        expect(field.count).to.equal(1);
        expect(field.starting_value).to.equal('black');
    });

    it('should handle default constructor settings', function () {
        let field = new NPCSchemaField({ count: -2 });
        expect(field.count).to.equal(1);
        field = new NPCSchemaField({ count: null });
        expect(field.count).to.equal(1);
    });

    it('should return defaultEmpty for each type', function () {
        const field = new NPCSchemaField({
            type: 'string'
        });
        expect(field.defaultEmpty).to.equal('');

        field.type = 'text';
        expect(field.defaultEmpty).to.equal('');

        field.type = 'array';
        expect(field.defaultEmpty).to.deep.equal([]);

        field.type = 'number';
        expect(field.defaultEmpty).to.equal(0);

        field.type = 'modifier';
        expect(field.defaultEmpty).to.equal(0);

        field.type = 'note';
        expect(field.defaultEmpty).to.equal(null);

        field.type = 'resultset';
        expect(field.defaultEmpty).to.equal(null);

        field.type = 'something else';
        expect(field.defaultEmpty).to.equal(null);

        field.count = 2;
        expect(field.defaultEmpty).to.deep.equal([]);
    });

    it('should return true for specific type checks', function () {
        const field = new NPCSchemaField({
            type: 'string'
        });
        expect(field.isString()).to.be.true;

        field.type = 'text';
        expect(field.isText()).to.be.true;

        field.type = 'array';
        expect(field.isArray()).to.be.true;

        field.type = 'number';
        expect(field.isNumber()).to.be.true;

        field.type = 'modifier';
        expect(field.isModifier()).to.be.true;

        field.type = 'note';
        expect(field.isNote()).to.be.true;

        field.type = 'resultset';
        expect(field.isResult()).to.be.true;

        field.type = 'something else';
        expect(field.isString()).to.be.false;
        expect(field.isText()).to.be.false;
        expect(field.isNumber()).to.be.false;
        expect(field.isModifier()).to.be.false;
        expect(field.isNote()).to.be.false;
        expect(field.isResult()).to.be.false;
        expect(field.isArray()).to.be.false;

        field.count = 2;
        expect(field.isArray()).to.be.true;
    });
});
