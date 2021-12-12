export default [
    {
        key: 'mission_generator',
        title: 'Colonial campaign mission generator',
        author: 'Derik Badman',
        tags: [
            'mission',
            'colonial'
        ],
        macro: [
            'mission_action',
            'mission_patron',
            'mission_antagonist',
            'mission_complication',
            'mission_reward'
        ]
    },
    {
        key: 'mission_action',
        title: 'Mission Action and Predicate',
        author: 'Derik Badman',
        tags: [
            'mission',
            'colonial'
        ],
        tables: {
            default: [
                {
                    label: 'Person',
                    weight: 3,
                    subtable: 'action_people'
                },
                {
                    label: 'Place',
                    weight: 2,
                    subtable: 'action_place'
                },
                {
                    label: 'Thing',
                    weight: 3,
                    subtable: 'action_thing'
                }
            ],
            action_people: [
                { label: 'Rescue' },
                { label: 'Capture (Ransom)' },
                { label: 'Kill' },
                { label: 'Find' },
                { label: 'Bribe' },
                { label: 'Defend' },
                { label: 'Steal from' },
                { label: 'Distract' },
                { label: 'Plant (evidence) on' },
                { label: 'Hide (smuggle)' },
                { label: 'Spy on' },
                { label: 'Trick/Misinform' }
            ],
            action_place: [
                { label: 'Discover' },
                { label: 'Explore' },
                { label: 'Map' },
                { label: 'Defend' },
                { label: 'Assault' },
                { label: 'Seize control of' },
                { label: 'Destroy' },
                { label: 'Consecrate' },
                { label: 'Desecrate' },
                { label: 'Improve/Build-up' }
            ],
            action_thing: [
                { label: 'Steal' },
                { label: 'Destroy' },
                { label: 'Buy' },
                { label: 'Retrieve' },
                { label: 'Sell' },
                { label: 'Create' },
                { label: 'Plant (on someone)' },
                { label: 'Hide' },
                { label: 'Enchant' },
                { label: 'Disenchant' },
                { label: 'Replace' }
            ]
        }
    },

    {
        key: 'mission_place',
        title: 'Mission Places',
        author: 'Derik Badman',
        tags: [
            'mission'
        ],
        sequence: [
            'default',
            'tag'
        ],
        tables: {
            default: [
                {
                    label: 'Settlement',
                    weight: 3,
                    subtable: 'settlement_type'
                },
                {
                    label: 'Wilderness',
                    weight: 3,
                    subtable: 'wilderness_type'
                },
                {
                    label: 'Ruins',
                    weight: 2,
                    subtable: 'ruins_type'
                }
            ],
            settlement_type: [
                { label: 'Homestead' },
                { label: 'Town', weight: 2 },
                { label: 'City', weight: 3 },
                { label: 'Trading Post' },
                { label: 'Fort' },
                { label: 'Native Village' },
                { label: 'Faction Outpost/Camp' }
            ],
            wilderness_type: [
                { label: 'Forest' },
                { label: 'Farmlands' },
                { label: 'Body of Water' },
                { label: 'Running water' },
                { label: 'Cave' },
                { label: 'Mountain' },
                { label: 'Swamp' },
                { label: 'Road' },
                { label: 'Lair' }
            ],
            ruins_type: [
                { label: 'Temple' },
                { label: 'Crypt' },
                { label: 'Dungeon' },
                { label: 'Fortress' },
                { label: 'Monument' },
                { label: 'Settlement' },
                { label: 'Shrine' },
                { label: 'Mine' },
                { label: 'Tower' },
                { label: 'Dungeon' }
            ],
            tag: [
                { label: 'Haunted' },
                { label: 'Infested' },
                { label: 'Fortified' },
                { label: 'Remote' },
                { label: 'Very near' },
                { label: 'Cursed' },
                { label: 'Holy' },
                { label: 'Hidden' },
                { label: 'Magic' },
                { label: 'Dangerous' },
                { label: 'Natural disaster in process' },
                { label: 'Occupants are fighting' },
                { label: 'Surrounded' },
                { label: 'Under Siege' },
                { label: 'Difficult to Access' },
                { label: 'Wild' },
                { label: 'Occupied' },
                { label: 'Monster-ridden' }
            ]
        }
    },

    {
        key: 'mission_thing',
        title: 'Mission Things',
        author: 'Derik Badman',
        tags: [
            'mission'
        ],
        sequence: [
            'default',
            'tag'
        ],
        tables: {
            default: [
                { label: 'Armament (guns, cannons, swords, gunpowder, shot, etc.)' },
                { label: 'Trade Goods / Supplies' },
                { label: 'Antiques' },
                { label: 'Coin/Valuables (jewelry, gems)' },
                { label: 'Everyday goods' },
                { label: 'Furniture' },
                { label: 'Animal' },
                { label: 'Food/Drink' },
                { label: 'Natural Resources (wood, furs, minerals, metals)' },
                { label: 'Object d’Art (icons, statues, paintings)' },
                { label: 'Documents (papers, books, diaries, letters, contracts, maps)' },
                { label: 'Clothing/Textiles' }
            ],
            tag: [
                { label: 'Damaged' },
                { label: 'Normal' },
                { label: 'Expensive' },
                { label: 'Magical' },
                { label: 'Rare' },
                { label: 'Incriminating' },
                { label: 'Evil' },
                { label: 'Holy' },
                { label: 'Noble' },
                { label: 'Ancient' },
                { label: 'Lost' },
                { label: 'Stolen' },
                { label: 'Vital' },
                { label: 'Ornamental' },
                { label: 'Blessed' },
                { label: 'Cursed' },
                { label: 'Secret' },
                { label: 'Symbolic' },
                { label: 'Other worldly' }
            ]
        }
    },

    {
        key: 'mission_person',
        title: 'Mission Person',
        author: 'Derik Badman',
        tags: [
            'mission'
        ],
        sequence: [
            'default',
            'tag'
        ],
        tables: {
            default: [
                { label: 'Child' },
                { label: 'Family' },
                { label: '{{table:colonial_occupations:laborer}}' },
                { label: '{{table:colonial_occupations:artisan}}' },
                { label: '{{table:colonial_occupations:criminal}}' },
                { label: '{{table:colonial_occupations:professional}}' },
                { label: 'Newspaperman' },
                { label: 'Merchant' },
                { label: 'Politician' },
                { label: 'Customs officer' },
                { label: 'Church leader' },
                { label: 'Noble' },
                { label: 'Military leader' },
                { label: '{{table:colonial_societies}}' },
                { label: 'Land speculator' },
                { label: 'Magic-user / Alchemist' },
                { label: 'Company official' },
                { label: 'Revolutionary' },
                { label: 'Native leader' },
                { label: 'Spy' },
                { label: 'Friend/Family of a PC' },
                { label: 'Ghost/Spirit/Deity' }
            ],
            tag: [
                { label: 'Dead' },
                { label: 'Sick' },
                { label: 'Rich' },
                { label: 'Jailed' },
                { label: 'Pursued' },
                { label: 'Insane' },
                { label: 'Magical' },
                { label: 'Paranoid' },
                { label: 'Helpless' },
                { label: 'Powerful' },
                { label: 'Cursed' }
            ]
        }
    },

    {
        key: 'mission_patron',
        title: 'Mission Patrons',
        author: 'Derik Badman',
        tags: [
            'mission',
            'mission_patron'
        ],
        tables: {
            default: [
                { label: '{{table:colonial_occupations:laborer}}' },
                { label: '{{table:colonial_occupations:artisan}}' },
                { label: '{{table:colonial_occupations:criminal}}' },
                { label: '{{table:colonial_occupations:professional}}' },
                { label: 'Newspaperman' },
                { label: 'Merchant' },
                { label: 'Politician' },
                { label: 'Customs officer' },
                { label: 'Church leader' },
                { label: 'Noble' },
                { label: 'Army leader' },
                { label: '{{table:colonial_societies}}' },
                { label: 'Land speculator' },
                { label: 'Magic-user / Alchemist' },
                { label: 'Village/Town/City (someone representing)' },
                { label: 'Company official' },
                { label: 'Revolutionary' },
                { label: 'Native leader' },
                { label: 'Spy' },
                { label: 'Friend/Family of a PC' },
                { label: 'Rumour/Word of Mouth' },
                { label: 'Advertisement (newspaper)/Broadsheet' },
                { label: 'Ghost/Spirit/Deity' },
                { label: 'Someone disguised as something they are not (roll twice, once for the reality, once for the disguise)', subtable: ['default', 'default'] }
            ]
        }
    },

    {
        key: 'mission_antagonist',
        title: 'Mission Antagonist',
        author: 'Derik Badman',
        tags: [
            'mission',
            'mission_antagonist'
        ],
        tables: {
            default: [
                { label: 'Mechanical (traps)' },
                { label: 'Environment' },
                { label: 'Monster' },
                { label: '{{table:colonial_factions}}' },
                { label: 'Settlement' },
                { label: 'NPC (already met)' },
                { label: 'Friendly Acquaintance of a PC (Friend/Family/Business/Patron)' },
                { label: '{{table:colonial_occupations}}' }
            ]
        }
    },

    {
        key: 'mission_complication',
        title: 'Mission Complications',
        author: 'Derik Badman',
        tags: [
            'mission',
            'mission_complication'
        ],
        tables: {
            default: [
                { label: 'Patron is lying' },
                { label: 'Patron is misinformed' },
                { label: 'Object of mission is dead/destroyed.' },
                { label: 'Someone else was already hired for the mission' },
                { label: 'Reward is nonexistent.' },
                { label: 'Antagonist has powerful backing.' },
                { label: 'Someone else is after the same person/place/object but with a different/opposing goal.' },
                { label: 'Object of mission has moved locations.' },
                { label: 'None' },
                { label: 'Tight deadline' },
                { label: 'A new patron wants to hire the PCs for a conflicting mission' },
                { label: 'Patron is attacked/killed' },
                { label: 'Patron is pretending to be someone else' },
                { label: 'Bizarre/Weird/Magical' },
                { label: 'Someone is also after the PCs' },
                { label: 'A rival faction is involved.' }
            ]
        }
    },

    {
        key: 'mission_reward',
        title: 'Mission Rewards',
        author: 'Derik Badman',
        tags: [
            'mission',
            'mission_reward'
        ],
        tables: {
            default: [
                { label: 'Blackmailed' },
                { label: 'Favor' },
                { label: 'Information' },
                { label: 'Goods' },
                { label: 'Minor Magic Item' },
                { label: 'Property' },
                { label: 'Further employment' },
                { label: 'Discount on future services/goods' },
                { label: 'Fame' },
                { label: 'Services' },
                { label: 'Money', weight: 2 }
            ]
        }
    }
];
