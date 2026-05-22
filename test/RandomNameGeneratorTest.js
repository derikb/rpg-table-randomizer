'use strict';

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import RandomNameGenerator from '../src/RandomNameGenerator.js';
import RandomNameType from '../src/RandomNameType.js';
import RandomNameError from '../src/RandomNameError.js';

const orcType = new RandomNameType({
    key: 'orc',
    label: 'Orcish',
    male: [
        'oog',
        'boog'
    ],
    female: [
        'oosh',
        'boosh'
    ],
    surname: [
        'spike',
        'flame'
    ]
});

const dwarfType = new RandomNameType({
    key: 'dwarf',
    label: 'Dwarvish',
    male: [
        'Thorin'
    ],
    surname: [
        'Hammer'
    ]
});

describe('RandomNameGenerator', function () {
    it('it should register name type data', function () {
        assert.deepStrictEqual(orcType.getAllPersonalNames(), [
            'oog',
            'boog',
            'oosh',
            'boosh'
        ]);
        assert.deepStrictEqual(orcType.getPersonalNameList('male'), [
            'oog',
            'boog'
        ]);
        assert.deepStrictEqual(orcType.getPersonalNameList('female'), [
            'oosh',
            'boosh'
        ]);
        assert.deepStrictEqual(orcType.getPersonalNameList('mixed'), [
            'oog',
            'boog',
            'oosh',
            'boosh'
        ]);

        const randomResult = orcType.getPersonalNameList('random');
        assert.ok(
            [['oog', 'boog'], ['oosh', 'boosh']].some(option => {
                try { assert.deepStrictEqual(randomResult, option); return true; }
                catch { return false; }
            })
        );
        assert.deepStrictEqual(dwarfType.getPersonalNameList('random'), [
            'Thorin'
        ]);

        const generator = new RandomNameGenerator({
            namedata: [
                orcType
            ]
        });
        assert.deepStrictEqual(generator.getValidNameTypes(), ['orc']);
        assert.strictEqual(generator.getRandomNameType(), 'orc');
    });

    it('it should throw on invalid name type data for registerNameType', function () {
        const generator = new RandomNameGenerator({});
        assert.throws(() => { generator.registerNameType('hello'); }, { name: 'RandomNameError', message: /instance/ });

        const type1 = new RandomNameType({});
        assert.throws(() => { generator.registerNameType(type1); }, { name: 'RandomNameError', message: /key/ });

        const type2 = new RandomNameType({
            key: 'random'
        });
        assert.throws(() => { generator.registerNameType(type2); }, { name: 'RandomNameError', message: /reserved/ });

        const type3 = new RandomNameType({
            key: 'orc'
        });
        assert.throws(() => { generator.registerNameType(type3); }, { name: 'RandomNameError', message: /lists/ });
    });

    it('it should return a name for selectPersonalName', function () {
        const generator = new RandomNameGenerator({
            namedata: [
                orcType,
                dwarfType
            ]
        });

        assert.strictEqual(generator.selectPersonalName('dwarf', 'male'), 'Thorin');
        assert.ok(['Oog', 'Boog'].includes(generator.selectPersonalName('orc', 'male')));
        assert.ok(['Oosh', 'Boosh'].includes(generator.selectPersonalName('orc', 'female')));
        assert.ok(['Oog', 'Boog', 'Oosh', 'Boosh'].includes(generator.selectPersonalName('orc')));
        // Invalid types
        assert.throws(() => { generator.selectPersonalName('elf'); }, { name: 'RandomNameError', message: /Invalid name type/ });
        assert.throws(() => { generator.selectPersonalName('dwarf', 'female'); }, { name: 'RandomNameError', message: /does not have subtype/ });
    });

    it('it should return a name for selectSurname', function () {
        const generator = new RandomNameGenerator({
            namedata: [
                orcType,
                dwarfType
            ]
        });

        assert.strictEqual(generator.selectSurname('dwarf'), 'Hammer');
        assert.ok(['Spike', 'Flame'].includes(generator.selectSurname('orc')));
        assert.throws(() => { generator.selectSurname('elf'); }, { name: 'RandomNameError', message: /Invalid name type/ });
    });

    it('it should return a name for selectName', function () {
        const generator = new RandomNameGenerator({
            namedata: [
                orcType,
                dwarfType
            ]
        });

        assert.ok(['Oog Spike', 'Oog Flame', 'Boog Spike', 'Boog Flame'].includes(generator.selectName('orc', 'male')));
        assert.ok(['Oosh', 'Boosh'].includes(generator.selectName('orc', 'female', 'first')));
        assert.strictEqual(generator.selectName('dwarf', 'random', 'first'), 'Thorin');
        assert.throws(() => { generator.selectName('elf'); }, { name: 'RandomNameError', message: /Invalid name type/ });
    });

    it('it should return a name for createPersonalName', (t) => {
        const generator = new RandomNameGenerator({
            namedata: [
                orcType,
                dwarfType
            ]
        });
        t.mock.method(generator._markov, 'isMemoryKeySet', (key) => key !== 'orc_male');
        const learnMock = t.mock.method(generator._markov, 'learn', () => {});
        t.mock.method(generator._markov, 'generate', (key) => key === 'orc_male' ? 'new orc name' : '');

        assert.strictEqual(generator.createPersonalName('orc', 'male'), 'New Orc Name');

        assert.strictEqual(learnMock.mock.callCount(), 2);
        assert.deepStrictEqual(learnMock.mock.calls[0].arguments, [
            'orc_male',
            'oog'
        ]);
    });

    it('it should return a name for createSurName', (t) => {
        const generator = new RandomNameGenerator({
            namedata: [
                orcType,
                dwarfType
            ]
        });
        t.mock.method(generator._markov, 'isMemoryKeySet', (key) => key !== 'orc_surname');
        const learnMock = t.mock.method(generator._markov, 'learn', () => {});
        t.mock.method(generator._markov, 'generate', (key) => key === 'orc_surname' ? 'new orc name' : '');

        assert.strictEqual(generator.createSurName('orc'), 'New Orc Name');

        assert.strictEqual(learnMock.mock.callCount(), 2);
        assert.deepStrictEqual(learnMock.mock.calls[0].arguments, [
            'orc_surname',
            'spike'
        ]);
    });

    it('it should return a name for createName', (t) => {
        const generator = new RandomNameGenerator({
            namedata: [
                orcType,
                dwarfType
            ]
        });
        t.mock.method(generator, 'createPersonalName', (type, gender) => (type === 'orc' && gender === 'male') ? 'New Orc' : '');
        t.mock.method(generator, 'createSurName', (type) => type === 'orc' ? 'Name' : '');

        assert.strictEqual(generator.createName('orc', 'male'), 'New Orc Name');
    });

    it('it should return names for generateList', (t) => {
        const generator = new RandomNameGenerator({
            namedata: [
                orcType,
                dwarfType
            ]
        });
        t.mock.method(generator, 'selectName', (type, gender) => {
            if (type === 'orc' && gender === 'male') return 'oof';
            if (type === 'orc' && gender === 'female') return 'boof';
        });

        assert.deepStrictEqual(generator.generateList(2, 'orc'), {
            male: ['oof'],
            female: ['boof']
        });
    });

    it('it should create names for generateList', (t) => {
        const generator = new RandomNameGenerator({
            namedata: [
                orcType,
                dwarfType
            ]
        });
        t.mock.method(generator, 'createName', (type, gender) => {
            if (type === 'orc' && gender === 'male') return 'oof';
            if (type === 'orc' && gender === 'female') return 'boof';
        });

        assert.deepStrictEqual(generator.generateList(2, 'orc', true), {
            male: ['oof'],
            female: ['boof']
        });
    });

    it('it should return names for nameTokenCallback', function () {
        const generator = new RandomNameGenerator({
            namedata: [
                orcType,
                dwarfType
            ]
        });

        assert.ok(['Oog', 'Boog'].includes(generator.nameTokenCallback(['name', 'orc', 'male', 'first'])));
        assert.strictEqual(generator.nameTokenCallback(['name', 'dwarf', 'female']), '');
    });
});
