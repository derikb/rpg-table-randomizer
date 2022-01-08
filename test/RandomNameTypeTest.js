'use strict';

import { describe, it } from 'mocha';
import { expect } from 'chai';

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
        expect(obj.key).to.equal('western');
        expect(obj.label).to.equal('Western Names');
        expect(obj.male).to.deep.equal(['Seth', 'Al']);
        expect(obj.female).to.deep.equal(['Alma', 'Jane']);
        expect(obj.surname).to.deep.equal(['Dougherty', 'Cochran']);
        expect(obj.className).to.equal('RandomNameType');
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
        expect(type.key).to.equal('western');
        expect(type.label).to.equal('Western Names');
        expect(type.male).to.deep.equal(['Seth', 'Al']);
        expect(type.female).to.deep.equal(['Alma', 'Jane']);
        expect(type.surname).to.deep.equal(['Dougherty', 'Cochran']);
    });

    it('should return all personal names list', function () {
        const type = new RandomNameType({
            key: 'western',
            label: 'Western Names',
            male: ['Seth', 'Al'],
            female: ['Alma', 'Jane'],
            surname: ['Dougherty', 'Cochran']
        });

        expect(type.getAllPersonalNames()).to.deep.equal([
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

        expect(type.getPersonalNameList('mixed')).to.deep.equal([
            'Seth', 'Al',
            'Alma', 'Jane'
        ]);

        expect(type.getPersonalNameList('female')).to.deep.equal([
            'Alma', 'Jane'
        ]);

        expect(type.getPersonalNameList('male')).to.deep.equal([
            'Seth', 'Al'
        ]);
        expect([type.male, type.female]).to.deep.include(
            type.getPersonalNameList('random')
        );

        type.male = [];
        type.female = [];
        expect(type.getPersonalNameList('random')).to.deep.equal([]);
    });
});
