'use strict';

import { expect } from 'chai';
import { stub } from 'sinon';

import RandonNameGenerator from '../src/RandomNameGenerator.js';
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

describe('RandonNameGenerator', function () {
    it('it should register name type data', function () {
        expect(orcType.getAllPersonalNames()).to.deep.equal([
            'oog',
            'boog',
            'oosh',
            'boosh'
        ]);
        expect(orcType.getPersonalNameList('male')).to.deep.equal([
            'oog',
            'boog'
        ]);
        expect(orcType.getPersonalNameList('female')).to.deep.equal([
            'oosh',
            'boosh'
        ]);
        expect(orcType.getPersonalNameList('mixed')).to.deep.equal([
            'oog',
            'boog',
            'oosh',
            'boosh'
        ]);
        expect(orcType.getPersonalNameList('random')).to.be.deep.oneOf([
            [
                'oog',
                'boog'
            ],
            [
                'oosh',
                'boosh'
            ]
        ]);
        expect(dwarfType.getPersonalNameList('random')).to.deep.equal([
            'Thorin'
        ]);


        const generator = new RandonNameGenerator({
            namedata: [
                orcType
            ]
        });
        expect(generator.getValidNameTypes()).to.deep.equal(['orc']);
        expect(generator.getRandomNameType()).to.equal('orc');
    });

    it('it should throw on invalid name type data for registerNameType', function () {
        const generator = new RandonNameGenerator({});
        expect(() => { generator.registerNameType('hello'); }).to.throw(RandomNameError, 'instance');

        const type1 = new RandomNameType({});
        expect(() => { generator.registerNameType(type1); }).to.throw(RandomNameError, 'key');

        const type2 = new RandomNameType({
            key: 'random'
        });
        expect(() => { generator.registerNameType(type2); }).to.throw(RandomNameError, 'reserved');

        const type3 = new RandomNameType({
            key: 'orc'
        });
        expect(() => { generator.registerNameType(type3); }).to.throw(RandomNameError, 'lists');
    });

    it('it should return a name for selectPersonalName', function () {
        const generator = new RandonNameGenerator({
            namedata: [
                orcType,
                dwarfType
            ]
        });

        expect(generator.selectPersonalName('dwarf', 'male')).to.equal('Thorin');
        expect(generator.selectPersonalName('orc', 'male')).to.be.oneOf(['Oog', 'Boog']);
        expect(generator.selectPersonalName('orc', 'female')).to.be.oneOf(['Oosh', 'Boosh']);
        expect(generator.selectPersonalName('orc')).to.be.oneOf(['Oog', 'Boog', 'Oosh', 'Boosh']);
        // Invalid types
        expect(() => { generator.selectPersonalName('elf'); }).to.throw(RandomNameError, 'Invalid name type');
        expect(() => { generator.selectPersonalName('dwarf', 'female'); }).to.throw(RandomNameError, 'does not have subtype');
    });

    it('it should return a name for selectSurname', function () {
        const generator = new RandonNameGenerator({
            namedata: [
                orcType,
                dwarfType
            ]
        });

        expect(generator.selectSurname('dwarf')).to.equal('Hammer');
        expect(generator.selectSurname('orc')).to.be.oneOf(['Spike', 'Flame']);
        expect(() => { generator.selectSurname('elf'); }).to.throw(RandomNameError, 'Invalid name type');
    });

    it('it should return a name for selectName', function () {
        const generator = new RandonNameGenerator({
            namedata: [
                orcType,
                dwarfType
            ]
        });

        expect(generator.selectName('orc', 'male')).to.be.oneOf(['Oog Spike', 'Oog Flame', 'Boog Spike', 'Boog Flame']);
        expect(generator.selectName('orc', 'female', 'first')).to.be.oneOf(['Oosh', 'Boosh']);
        expect(generator.selectName('dwarf', 'random', 'first')).to.equal('Thorin');
        expect(() => { generator.selectName('elf'); }).to.throw(RandomNameError, 'Invalid name type');
    });

    it('it should return a name for createPersonalName', function () {
        const generator = new RandonNameGenerator({
            namedata: [
                orcType,
                dwarfType
            ]
        });
        const isMemoryKeySet = stub(generator._markov, 'isMemoryKeySet');
        isMemoryKeySet.withArgs('orc_male').returns(false);
        const learn = stub(generator._markov, 'learn');

        const generate = stub(generator._markov, 'generate');
        generate.withArgs('orc_male').returns('new orc name');

        expect(generator.createPersonalName('orc', 'male')).to.equal('New Orc Name');

        expect(learn.callCount).to.equal(2);
        expect(learn.firstCall.args).to.deep.equal([
            'orc_male',
            'oog'
        ]);
    });

    it('it should return a name for createSurName', function () {
        const generator = new RandonNameGenerator({
            namedata: [
                orcType,
                dwarfType
            ]
        });
        const isMemoryKeySet = stub(generator._markov, 'isMemoryKeySet');
        isMemoryKeySet.withArgs('orc_surname').returns(false);
        const learn = stub(generator._markov, 'learn');

        const generate = stub(generator._markov, 'generate');
        generate.withArgs('orc_surname').returns('new orc name');

        expect(generator.createSurName('orc')).to.equal('New Orc Name');

        expect(learn.callCount).to.equal(2);
        expect(learn.firstCall.args).to.deep.equal([
            'orc_surname',
            'spike'
        ]);
    });


    it('it should return a name for createName', function () {
        const generator = new RandonNameGenerator({
            namedata: [
                orcType,
                dwarfType
            ]
        });
        const createPersonalName = stub(generator, 'createPersonalName');
        createPersonalName.withArgs('orc', 'male').returns('New Orc');
        const createSurName = stub(generator, 'createSurName');
        createSurName.withArgs('orc').returns('Name');

        expect(generator.createName('orc', 'male')).to.equal('New Orc Name');
    });

    it('it should return names for generateList', function () {
        const generator = new RandonNameGenerator({
            namedata: [
                orcType,
                dwarfType
            ]
        });
        const selectName = stub(generator, 'selectName');
        selectName.withArgs('orc', 'male').returns('oof');
        selectName.withArgs('orc', 'female').returns('boof');

        expect(generator.generateList(2, 'orc')).to.deep.equal({
            male: ['oof'],
            female: ['boof']
        });
    });

    it('it should create names for generateList', function () {
        const generator = new RandonNameGenerator({
            namedata: [
                orcType,
                dwarfType
            ]
        });
        const createName = stub(generator, 'createName');
        createName.withArgs('orc', 'male').returns('oof');
        createName.withArgs('orc', 'female').returns('boof');

        expect(generator.generateList(2, 'orc', true)).to.deep.equal({
            male: ['oof'],
            female: ['boof']
        });
    });

    it('it should return names for nameTokenCallback', function () {
        const generator = new RandonNameGenerator({
            namedata: [
                orcType,
                dwarfType
            ]
        });

        expect(generator.nameTokenCallback(['name', 'orc', 'male', 'first'])).to.be.oneOf(['Oog', 'Boog']);
        expect(generator.nameTokenCallback(['name', 'dwarf', 'female'])).to.equal('');
    });
});
