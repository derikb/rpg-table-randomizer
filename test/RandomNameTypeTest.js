'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import RandomNameType from '../src/RandomNameType.js';

describe('RandomNameType', function () {
    it('should serialize the class', function () {
        const type = new RandomNameType({
            key: 'western',
            label: 'Western Names',
            male: ['Seth', 'Al'],
            female: ['Alma', 'Jane'],
            surname: ['Dougherty', 'Cochran']
        });

        const obj = type.toJSON();
        assert.strictEqual(obj.key, 'western');
        assert.strictEqual(obj.label, 'Western Names');
        assert.deepStrictEqual(obj.male, ['Seth', 'Al']);
        assert.deepStrictEqual(obj.female, ['Alma', 'Jane']);
        assert.deepStrictEqual(obj.surname, ['Dougherty', 'Cochran']);
        assert.strictEqual(obj.className, 'RandomNameType');
    });

    it('should unserialize an object to the class', function () {
        const obj = {
            key: 'western',
            label: 'Western Names',
            male: ['Seth', 'Al'],
            female: ['Alma', 'Jane'],
            surname: ['Dougherty', 'Cochran'],
            className: 'RandomNameType'
        };

        const type = new RandomNameType(obj);
        assert.strictEqual(type.key, 'western');
        assert.strictEqual(type.label, 'Western Names');
        assert.deepStrictEqual(type.male, ['Seth', 'Al']);
        assert.deepStrictEqual(type.female, ['Alma', 'Jane']);
        assert.deepStrictEqual(type.surname, ['Dougherty', 'Cochran']);
    });

    it('should return all personal names list', function () {
        const type = new RandomNameType({
            key: 'western',
            label: 'Western Names',
            male: ['Seth', 'Al'],
            female: ['Alma', 'Jane'],
            surname: ['Dougherty', 'Cochran']
        });

        assert.deepStrictEqual(type.getAllPersonalNames(), [
            'Seth', 'Al',
            'Alma', 'Jane'
        ]);
    });

    it('should return personal names list', function () {
        const type = new RandomNameType({
            key: 'western',
            label: 'Western Names',
            male: ['Seth', 'Al'],
            female: ['Alma', 'Jane'],
            surname: ['Dougherty', 'Cochran']
        });

        assert.deepStrictEqual(type.getPersonalNameList('mixed'), [
            'Seth', 'Al',
            'Alma', 'Jane'
        ]);

        assert.deepStrictEqual(type.getPersonalNameList('female'), [
            'Alma', 'Jane'
        ]);

        assert.deepStrictEqual(type.getPersonalNameList('male'), [
            'Seth', 'Al'
        ]);

        const randomResult = type.getPersonalNameList('random');
        assert.ok(
            [type.male, type.female].some(option => {
                try { assert.deepStrictEqual(randomResult, option); return true; }
                catch { return false; }
            })
        );

        type.male = [];
        type.female = [];
        assert.deepStrictEqual(type.getPersonalNameList('random'), []);
    });
});
