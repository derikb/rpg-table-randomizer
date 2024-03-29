export default [
    {
        key: 'colonial_personality',
        title: 'Personality Traits (Colonial)',
        author: 'Derik Badman',
        tags: [
            'personality',
            'npcs',
            'colonial'
        ],
        tables: {
            default: [
                { label: 'Talkative/Gossip' },
                { label: 'Shy/Reticent/Secretive' },
                { label: 'Inquisitive' },
                { label: 'Boisterous/Proud' },
                { label: 'Meek' },
                { label: 'Greedy/Miserly' },
                { label: 'Charitable' },
                { label: 'Flirtatious/Charming' },
                { label: 'Modest/Chaste' },
                { label: 'Manic' },
                { label: 'Depressed' },
                { label: 'Friendly' },
                { label: 'Aloof' },
                { label: 'Angry/Grouchy' },
                { label: 'Cheerful/Happy' },
                { label: 'Apathetic' },
                { label: 'Idealistic' },
                { label: 'Enthusiastic/Driven/Zealous' },
                { label: 'Judgmental/Moralistic' },
                { label: 'Jocular/Goofy' },
                { label: 'Naive' },
                { label: 'Worldly' },
                { label: 'Pious' },
                { label: 'Narrowminded/Prejudiced' },
                { label: 'Reckless' },
                { label: 'Rude/Tactless' },
                { label: 'Polite/Tactful' },
                { label: 'Snobbish' },
                { label: 'Insane' },
                { label: 'Paranoid' }
            ]
        }
    },
    {
        key: 'colonial_appearance',
        title: 'Appearance/Behavior (Colonial)',
        author: 'Derik Badman',
        tags: [
            'colonial',
            'npcs',
            'appearance'
        ],
        tables: {
            default: [
                { label: 'Missing limb/eye/ear' },
                { label: 'Tattooed / Scarred' },
                { label: 'Lots of Jewelry' },
                { label: 'Very Short' },
                { label: 'Very Tall' },
                { label: 'Extremely Skinny' },
                { label: 'Large / Fat' },
                { label: 'Muscular' },
                { label: 'Smokes / chews / snorts' },
                { label: 'Twitchy' },
                { label: 'Elegant' },
                { label: 'Disheveled' },
                { label: 'Filthy' },
                { label: 'Hands on (touchy)' },
                { label: 'Maintains constant personal bubble' },
                { label: 'Always has a pet(s) with them' },
                { label: 'Drunk/High' },
                { label: 'Laughs nervously' },
                { label: 'Shifty eyes' },
                { label: 'Constantly fingers weapon/holy symbol/charm/jewelry' },
                { label: 'Hairy' },
                { label: 'Hairless' },
                { label: 'Spits/coughs/sneezes/sniffles/belches' },
                { label: 'Hard of hearing' },
                { label: 'Poor vision/blind' },
                { label: 'Stutters/mumbles' },
                { label: 'Hunched over / hunchbacked' },
                { label: 'Flamboyant' },
                { label: 'Itchy' },
                { label: 'Constantly eating / drinking' }
            ]
        }
    },
    {
        key: 'colonial_goals',
        title: 'NPC Goals (Colonial)',
        author: 'Derik Badman',
        tags: [
            'npcs',
            'colonial',
            'goals'
        ],
        tables: {
            default: [
                { label: 'Furtherance of Science / Studies / Art / Craft / Skill' },
                { label: 'Wealth / Business' },
                { label: 'Earthly Pleasures' },
                { label: 'To be loved / comradeship / romance' },
                { label: 'Power over others' },
                { label: 'Fame' },
                { label: 'Rank / Class Mobility' },
                { label: 'Preservation of the Status Quo / Order' },
                { label: 'Preservation of Nature' },
                { label: 'Glory / Risk Taking' },
                { label: 'Collecting' },
                { label: 'Religious Service' },
                { label: 'Freedom' },
                { label: 'Mystic Power' },
                { label: 'Patriotism' },
                { label: 'Discovery / Curiosity' },
                { label: 'Charity / Welfare of Others' },
                { label: 'Cruelty / Destruction' },
                { label: 'Self-Discipline' },
                { label: 'Revenge' }
            ]
        }
    },
    {
        key: 'colonial_occupations',
        title: 'Occupations (Colonial)',
        author: 'Derik Badman',
        tags: [
            'npcs',
            'colonial',
            'occupation'
        ],
        tables: {
            default: [
                {
                    label: 'Laborer',
                    subtable: 'laborer',
                    print: false
                },
                {
                    label: 'Criminal',
                    subtable: 'criminal',
                    print: false
                },
                {
                    label: 'Artisan',
                    subtable: 'artisan',
                    print: false
                },
                {
                    label: 'Professional',
                    subtable: 'professional',
                    print: false
                }
            ],
            laborer: [
                { label: 'Farmer' },
                { label: 'Factory Worker (shipyard, textiles, brewery)' },
                { label: 'Servant' },
                { label: 'Soldier' },
                { label: 'Sailor' },
                { label: 'Hunter/Trapper' },
                { label: 'Stevedore' },
                { label: 'Beggar' },
                { label: 'Mercenary' },
                { label: 'Housewife' },
                { label: 'Prostitute' },
                { label: 'Unemployed' }
            ],
            criminal: [
                { label: 'Pickpocket' },
                { label: 'Burglar' },
                { label: 'Smuggler' },
                { label: 'Fence' },
                { label: 'Spy (?)' },
                { label: 'Thug' },
                { label: 'Adventurer' },
                { label: 'Revolutionary' }
            ],
            artisan: [
                { label: 'Scribe / Cartographer' },
                { label: 'Miller' },
                { label: 'Blacksmith / gunsmith / weapon smith' },
                { label: 'Chandler (candles)' },
                { label: 'Cooper (barrel/cask maker)' },
                { label: 'Wheelwright / Coachmaker' },
                { label: 'Trader/merchant/Peddler' },
                { label: 'Tavern keeper / barkeep' },
                { label: 'Apprentice (of some craft/art)' },
                { label: 'Cobbler' },
                { label: 'Tailor  / Milliner (clothes maker)' },
                { label: 'Printer/newspaperman' },
                { label: 'Silversmith' },
                { label: 'Animal handler / livery? / ?' },
                { label: 'Teacher' },
                { label: 'Furrier' },
                { label: 'Apothecary / Doctor' },
                { label: 'Basketmaker' },
                { label: 'Brick maker' },
                { label: 'Carpenter/Joiner/Cabinetmaker' },
                { label: 'Weaver' },
                { label: 'Cutler' },
                { label: 'Barber' },
                { label: 'Ropemaker' },
                { label: 'Tanner / Saddler' },
                { label: 'Sawyer' },
                { label: 'Bureaucrat / Accountant' },
                { label: 'Exciseman' },
                { label: 'Brewer' },
                { label: 'Importer/Exporter' },
                { label: 'Actor/Dancer/Musician' },
                { label: 'Coach driver' },
                { label: 'Messenger/Postal Carrier' }
            ],
            professional: [
                { label: 'Priest / Religious Official' },
                { label: 'Judge/Sheriff' },
                { label: 'Lawyer' },
                { label: 'Magician' },
                { label: 'Politician' },
                { label: 'Noble' },
                { label: 'Ship Captain' },
                { label: 'Military Leader' },
                { label: 'Company Leader' },
                { label: 'Faction Leader' }
            ]
        }
    },
    {
        key: 'colonial_companies',
        title: 'Companies (Colonial)',
        author: 'Derik Badman',
        description: 'Quick company.',
        display_opt: [
            { table: 'name', hide_table: 1 },
            { table: 'name_1', hide_table: 1 },
            { table: 'name_2', hide_table: 1 },
            { table: 'name_3', hide_table: 1 },
            { table: 'name_place', hide_table: 1 }
        ],
        tags: [
            'colonial',
            'factions'
        ],
        sequence: [
            'name',
            'industry',
            'alignment'
        ],
        tables: {
            name: [
                { label: 'The {{table:this:name_1}} {{table:this:name_2}} {{table:this:name_3}}' },
                { label: 'The {{table:this:name_1}} {{table:this:name_2}} & {{table:this:name_2}} {{table:this:name_3}}' },
                { label: 'The {{table:this:name_1}} {{table:this:name_3}}' }
            ],
            name_1: [
                { label: 'Angeln' },
                { label: 'Ghent' },
                { label: 'New World' },
                { label: 'Royal' },
                { label: '{{name:flemish}}' },
                { label: '{{name:cornish}}' },
                { label: '{{name:dutch}}' },
                { label: '{{table:this:name_place}}' }
            ],
            name_2: [
                { label: 'Exploration' },
                { label: 'Trading' },
                { label: 'Mercantile' },
                { label: 'Shipping' },
                { label: 'Land' },
                { label: 'Import' },
                { label: 'Export' },
                { label: 'Fighting' }
            ],
            name_3: [
                { label: 'Company' },
                { label: 'Corporation' },
                { label: 'Interest' },
                { label: 'Group' },
                { label: 'Agency' },
                { label: 'Concern' }
            ],
            name_place: [
                'River',
                'Valley',
                'Mountain',
                'River Valley',
                'Bay',
                'Sea',
                'Lake',
                'Castle'
            ],
            industry: [
                { label: 'Land speculation' },
                { label: 'Exploration' },
                { label: 'Excavation of ruins (for treasure/knowledget)' },
                { label: 'Mining' },
                { label: 'Lumber' },
                { label: 'Trade/Shipping' },
                { label: 'Furs' },
                { label: 'Mercenary' },
                { label: 'Manufacturing' }
            ],
            alignment: [
                { label: 'Chaotic Good' },
                { label: 'Chaotic Evil' },
                { label: 'Lawful Good' },
                { label: 'Lawful Evil' },
                { label: 'Neutral Good' },
                { label: 'Neutral Evil' }
            ]
        }
    },

    {
        key: 'colonial_factions',
        title: 'Factions (colonial)',
        author: 'Derik Badman',
        tags: [
            'colonial',
            'npcs'
        ],
        tables: {
            default: [
                { label: 'Military' },
                { label: 'Militia' },
                { label: 'Government' },
                { label: 'Revolutionary' },
                { label: '{{table:colonial_societies}}', weight: 10 },
                { label: 'Church/Sect/Cult', subtable: 'faction_church', print: false },
                { label: 'Company', subtable: 'faction_company', print: false },
                { label: 'Native Tribe/Confederacy' },
                { label: 'Thieves/Bandits/Pirates' },
                { label: 'Individual', subtable: 'faction_individual', print: false }
            ],
            faction_society: [
                { label: '{{table:colonial_societies}}' }
            ],
            faction_church: [
                { label: '{{table:colonial_religions}}' }
            ],
            faction_company: [
                { label: '{{table:colonial_companies:name}}' }
            ],
            faction_individual: [
                { label: 'Noble Family' },
                { label: 'Wizard' },
                { label: 'Wealthy Merchant' },
                { label: 'Smuggler' }
            ]
        }
    },

    {
        key: 'colonial_societies',
        title: 'Societies (colonial)',
        author: 'Derik Badman',
        tags: [
            'colonial',
            'npcs'
        ],
        tables: {
            default: [
                { label: 'Social Club: {{table:this:goals_public}}' },
                { label: 'Secret Society: {{table:this:goals_secret}}' },
                { label: '{{table:this:specific}}' }
            ],
            specific: [
                { label: 'Chemycal & Herbal Society', type: 'Public', description: 'Share learning and promote alchemy.' },
                { label: 'Circle of Eser', type: 'Secret', description: 'Mages within the alchemy society.' },
                { label: 'Sisters of Genna', type: 'Secret', description: 'Increase the power and role of women in the church of the High Lord.' },
                { label: 'Brothers of the Hunt', type: 'Public', description: 'Companionship, camaraderie.' },
                { label: 'Learning Man\'s Society', type: 'Public', description: 'Share knowledge (primarily of the ancient civilization).' },
                { label: 'name', type: 'Secret', description: 'Bring back the worship of the old gods and overthrow the High Lord.' },
                { label: 'another name', type: 'Public', description: 'Ostensibly a trade organization but really plotting independence and revolution.' },
                { label: 'Friends of Egbert', type: 'Public', description: 'Mapping and exploration, including natural science.' },
                { label: 'The Lord’s Civilizers', type: 'Public', description: 'A group of Angles dedicated to wiping out all the natives in the New World.' },
                { label: 'Coven of Ella', type: 'Secret', description: 'You gotta have witches, right?' }
            ],
            goals_secret: [
                'Political Conservatism',
                'Political Revolution',
                'Heretical Religious',
                'Conservative Religious',
                'Magic',
                'Shared Secret'
            ],
            goals_public: [
                'Comaraderie',
                'Charity',
                'Mutual Interest',
                'Debate',
                'Political Action',
                'Religious Affinity',
                'Learning',
                'Activity'
            ]
        }
    },
    {
        key: 'colonial_religions',
        title: 'Religions (colonial)',
        author: 'Derik Badman',
        tags: [
            'colonial',
            'npcs'
        ],
        tables: {
            default: [
                { label: 'Church of the High Lord' },
                { label: 'High Lord Sect', subtable: 'sects', weight: 3 },
                { label: 'High Lord Heretical Sect', subtable: 'heresies', weight: 3 },
                { label: 'Cult / Old God' },
                { label: 'Spirit Worship' },
                { label: 'Atheism' }
            ],
            sects: [
                { label: 'Monks of St. Cavil' },
                { label: 'Nuns of the Prairie' },
                { label: 'Knights of Saint Ceren', description: 'Within the church of the High Lord, tasked with hunting and eliminating practitioners of black magic (which is pretty much all magic to them).' },
                { label: 'Order of the Ring' },
                { label: 'Brothers of Amadeus' },
                { label: 'Knights Rampant' }
            ],
            heresies: [
                'Matriarchy',
                'Return to Nature',
                'Local leader as new son of deity',
                'Worship of obscure saint',
                'Satanism (or whatever the equivalent is)',
                'Death cult',
                'Non-hierarchical structure (no priests)',
                'Polygamy',
                'Normalization of magic use',
                'Some obscure minor theologial issue that almost no one understands but makes the authorities really mad'
            ],
            old_gods: [
                '???',
                '???',
                '???'
            ]
        }
    },

    {
        key: 'colonial_encounters_road',
        title: 'Encounters Road (Colonial)',
        author: 'Derik Badman',
        tags: [
            'colonial',
            'encounters'
        ],
        display_opt: [
            { table: 'actions_men', hide_table: 1 },
            { table: 'actions_animal', hide_table: 1 },
            { table: 'men', hide_table: 1 },
            { table: 'animals', hide_table: 1 },
            { table: 'monsters', hide_table: 1 },
            { table: 'other', hide_table: 1 },
            { table: 'weather', hide_table: 1 }
        ],
        tables: {
            default: [
                { label: 'Animal', weight: 2, print: false, subtable: 'animals' },
                { label: 'Men', weight: 4, print: false, subtable: 'men' },
                { label: 'Monster', weight: 1, print: false, subtable: 'monsters' },
                { label: 'Other', weight: 1, print: false, subtable: 'other' }
            ],
            actions_men: [
                { label: 'Searching (something specific)' },
                { label: 'Travelling' },
                { label: 'Fighting/Arguing' },
                { label: 'Fleeing' },
                { label: 'Dying/Dead' },
                { label: 'Foraging/Hunting' },
                { label: 'Working' },
                { label: 'Sleeping/Camping/Living' },
                { label: 'Lost' },
                { label: 'Exploring (general)' },
                { label: 'Eating/Drinking/Playing' },
                { label: 'Adventure/Campaign Specific' },
                { label: 'Lying in wait' }
            ],
            actions_animal: [
                { label: 'Hunting/Foraging' },
                { label: 'Sleeping' },
                { label: 'Fighting' },
                { label: 'Traveling' },
                { label: 'Dying/Dead' },
                { label: 'Eating/Drinking/Playing' }
            ],
            men: [
                { label: 'Group from: {{table:colonial_factions}}', subtable: 'actions_men' },
                { label: 'Individual from {{table:colonial_factions}}', subtable: 'actions_men' },
                { label: 'Peddler and cart', subtable: 'actions_men' },
                { label: 'A group of soldiers on patrol', subtable: 'actions_men' },
                { label: 'A wagon/carriage transporting people', subtable: 'actions_men' },
                { label: 'Farmer with a cart of goods headed to market', subtable: 'actions_men' },
                { label: 'Hunters/Trappers', subtable: 'actions_men' },
                { label: 'Messenger on horseback', subtable: 'actions_men' },
                { label: 'Merchant wagons carrying goods', subtable: 'actions_men' },
                { label: 'Bandits', subtable: 'actions_men' },
                { label: 'Preacher (and followers)', subtable: 'actions_men' }
            ],
            animals: [
                { label: 'Bear', subtable: 'actions_animal' },
                { label: 'Wolves', subtable: 'actions_animal' },
                { label: 'Dogs', subtable: 'actions_animal' },
                { label: 'Deer', subtable: 'actions_animal' },
                { label: 'Hawk/Eagle', subtable: 'actions_animal' },
                { label: 'Livestock (Goat, pig, sheep)', subtable: 'actions_animal' }
            ],
            monsters: [
                { label: '???', subtable: 'actions_animal' },
                { label: 'Demon, Disguised', weight: 1 },
                { label: 'Undead' },
                { label: '[Something flying overhead]' },
                { label: '[Other: Something large or dangerous]' }
            ],
            other: [
                { label: 'Barricade (trees)', weight: 2 },
                { label: 'Barricade (wagons)', weight: 2 },
                { label: 'Tripwire', weight: 2 },
                { label: 'Net trap', weight: 1 },
                { label: 'Pit trap', weight: 1 },
                { label: 'Snare', weight: 1 },
                { label: 'Inn', weight: 3 },
                { label: 'Altar/shrine', weight: 3 },
                { label: 'Campsite', weight: 3 },
                { label: 'Village', weight: 1 },
                { label: 'Weather event', weight: 1, print: false, subtable: 'weather' },
                { label: 'Thick Mud' },
                { label: 'Stream' },
                { label: 'Fire', weight: 1 },
                { label: 'Fallen Tree', weight: 1 },
                { label: 'Statue', weight: 1 },
                { label: 'Grave(s)', weight: 1 }
            ],
            weather: [
                { label: 'Light Fog/mist', weight: 2 },
                { label: 'Heavy Fog/mist', weight: 2 },
                { label: 'Light precipitation', weight: 2 },
                { label: 'Heavy precipitation' },
                { label: 'Light Wind', weight: 2 },
                { label: 'Heavy Wind' },
                { label: 'Storm' },
                { label: 'Heavy Clouds', weight: 2 },
                { label: 'Sun shower', weight: 2 },
                { label: 'Bright Sun', weight: 2 },
                { label: 'Major Weather event', description: 'Hurricane, tornado, blizzard, flood, etc.' }
            ],
            hexdressing: [
                { label: 'Tree fallen across the road' },
                { label: 'Dead horse' },
                { label: 'A cracked barrel on the side of the road' },
                { label: 'A small shrine' },
                { label: 'A ditch' },
                { label: 'An apple tree' },
                { label: 'A sign post' },
                { label: 'A trail is visible headed perpendicular from the road' },
                { label: 'Path switchback to go down a steep incline' },
                { label: 'Bridge across waterway' },
                { label: 'Bridge across a small rift in the ground' },
                { label: 'A small clearing off the road clearly used as a campsite' },
                { label: 'Sinkhole' },
                { label: 'Water-filled depression forms a pond in the road' },
                { label: 'A wagon/cart with a broken wheel' },
                { label: 'Dead body (bodies)' },
                { label: 'Farmhouse with fenced-in pen. Farmer’s wife offers drinks/food (for sale/trade) to travelers (proto-inn)' },
                { label: 'Fork in the road' },
                { label: 'Smaller path leads off to the n/s/e/w' },
                { label: 'Rise in the road obscures the view ahead' },
                { label: 'A stone road marker of ancient origin' },
                { label: 'Brook that must be forded' },
                { label: 'Large trees overhand the road obscuring the sky' }
            ]
        }
    },

    {
        key: 'colonial_encounters_forest',
        title: 'Encounters Forest (Colonial)',
        author: 'Derik Badman',
        tags: [
            'colonial',
            'encounters'
        ],
        display_opt: [
            { table: 'actions_men', hide_table: 1 },
            { table: 'actions_animal', hide_table: 1 },
            { table: 'men', hide_table: 1 },
            { table: 'animals', hide_table: 1 },
            { table: 'monsters', hide_table: 1 },
            { table: 'other', hide_table: 1 },
            { table: 'weather', hide_table: 1 }
        ],
        tables: {
            default: [
                { label: 'Animal', weight: 2, print: false, subtable: 'animals' },
                { label: 'Men', weight: 3, print: false, subtable: 'men' },
                { label: 'Monster', weight: 1, print: false, subtable: 'monsters' },
                { label: 'Other', weight: 1, print: false, subtable: 'other' }
            ],
            actions_men: [
                { label: 'Searching (something specific)' },
                { label: 'Travelling' },
                { label: 'Fighting/Arguing' },
                { label: 'Fleeing' },
                { label: 'Dying/Dead' },
                { label: 'Foraging/Hunting' },
                { label: 'Working' },
                { label: 'Sleeping/Camping/Living' },
                { label: 'Lost' },
                { label: 'Exploring (general)' },
                { label: 'Eating/Drinking/Playing' },
                { label: 'Adventure/Campaign Specific' },
                { label: 'Lying in wait' }
            ],
            actions_animal: [
                { label: 'Hunting/Foraging' },
                { label: 'Sleeping' },
                { label: 'Fighting' },
                { label: 'Traveling' },
                { label: 'Dying/Dead' },
                { label: 'Eating/Drinking/Playing' }
            ],
            men: [
                { label: 'Military group', subtable: 'actions_men' },
                { label: 'Company group', subtable: 'actions_men' },
                { label: 'Hunters/trappers', subtable: 'actions_men' },
                { label: 'Natives', subtable: 'actions_men' },
                { label: 'Lumberjacks', subtable: 'actions_men' },
                { label: 'Homesteaders', subtable: 'actions_men' },
                { label: 'Cultists', subtable: 'actions_men' },
                { label: 'Bandits', subtable: 'actions_men' },
                { label: 'Revolutionaries', subtable: 'actions_men' },
                { label: 'Alchemist/Mage/Hermit', subtable: 'actions_men' },
                { label: 'Farmers', subtable: 'actions_men' },
                { label: 'Merchants', subtable: 'actions_men' },
                { label: 'Preacher', subtable: 'actions_men' },
                { label: 'Campaign/Adventure Relevant', subtable: 'actions_men' }
            ],
            animals: [
                { label: 'Bear', subtable: 'actions_animal' },
                { label: 'Wolves', subtable: 'actions_animal' },
                { label: 'Spiders', subtable: 'actions_animal' },
                { label: 'Wolverine?', subtable: 'actions_animal' },
                { label: 'Deer', subtable: 'actions_animal' },
                { label: 'Hawk/Eagle', subtable: 'actions_animal' },
                { label: 'Fur animals (beaver, rabbit, mink?, etc.)', subtable: 'actions_animal' },
                { label: 'Snakes', subtable: 'actions_animal' },
                { label: 'Livestock (Goat, pig, sheep)', subtable: 'actions_animal' }
            ],
            monsters: [
                { label: '???', subtable: 'actions_animal' },
                { label: 'Lizard Men', subtable: 'actions_men' },
                { label: 'Kobold', subtable: 'actions_men' },
                { label: 'Demon, Disguised', weight: 1 },
                { label: 'Undead' },
                { label: '[Something flying overhead]' },
                { label: '[Other: Something large or dangerous]' }
            ],
            other: [
                { label: 'Tripwire', weight: 2 },
                { label: 'Net trap', weight: 1 },
                { label: 'Pit trap', weight: 1 },
                { label: 'Snare', weight: 1 },
                { label: 'Spider Webs', weight: 1 },
                { label: 'Altar/shrine', weight: 3 },
                { label: 'Campsite', weight: 3 },
                { label: 'Village', weight: 1 },
                { label: 'Homestead', weight: 1 },
                { label: 'Weather event', weight: 1, print: false, subtable: 'weather' },
                { label: 'Thick Mud' },
                { label: 'Stream' },
                { label: 'Fire', weight: 1 },
                { label: 'Fallen Tree', weight: 1 },
                { label: 'Statue', weight: 1 },
                { label: 'Grave(s)', weight: 1 },
                { label: 'Magic Clearing', weight: 1 },
                { label: 'Mushroom Circle', weight: 1 },
                { label: 'Magic Pool', weight: 1 },
                { label: 'Tree lair', weight: 2 },
                { label: 'Nest (ground)', weight: 2 }
            ],
            weather: [
                { label: 'Light Fog/mist', weight: 2 },
                { label: 'Heavy Fog/mist', weight: 2 },
                { label: 'Light precipitation', weight: 2 },
                { label: 'Heavy precipitation' },
                { label: 'Light Wind', weight: 2 },
                { label: 'Heavy Wind' },
                { label: 'Storm' },
                { label: 'Heavy Clouds', weight: 2 },
                { label: 'Sun shower', weight: 2 },
                { label: 'Bright Sun', weight: 2 },
                { label: 'Major Weather event', description: 'Hurricane, tornado, blizzard, flood, etc.' }
            ],
            hexdressing: [
                { label: 'Clearing' },
                { label: 'Brook' },
                { label: 'Bee hive' },
                { label: 'Sink hole' },
                { label: 'Ginormous tree' },
                { label: 'An area of recently burnt shrub/grass/trees. (Still smoldering?) Probably set by local natives.' },
                { label: 'Small clearing that has been planted with vegetables and berries.' },
                { label: 'A number of unusual herbs appear to have been planted at the base of nearby trees.' },
                { label: 'Blueberry patch' },
                { label: 'Carcass' },
                { label: 'Site of a recent camp' },
                { label: 'A snare holding a rabbit' },
                { label: 'The area seems to be unnaturally full of some edible plant (probably promoted by local natives as a food source)' },
                { label: 'A pile of stones form a small cave (lair?)' },
                { label: 'The underbrush is heavy here, blocking or slowing travel.' },
                { label: 'Babbling brook.' },
                { label: 'An old statue overgrown with vines.' },
                { label: 'Rock markers from the distant past.' },
                { label: 'What looks like a rock floor or is it part of a roof.' },
                { label: 'Fallen tree with massive roots sticking up in the air. Large patch of mushrooms growing beneath' },
                { label: 'Hunter’s traps' },
                { label: 'Sinkhole' },
                { label: 'Small cliff-like break in the ground running in both directions.' },
                { label: 'Traps set by the kobolds' },
                { label: 'Rain shower' },
                { label: 'Spider webs' },
                { label: 'Forest Fire?' },
                { label: 'A family of deer erupt from the brush. (Is something chasing them?)' },
                { label: 'Elven tree fort.' },
                { label: 'Brook rushing down from a rocky rise in the ground forming a small pool.' },
                { label: 'Ancient grave markers' },
                { label: 'Morning fog.' },
                { label: 'Old stone bridge.' },
                { label: 'A hunting horn in the distance.' },
                { label: 'Dragon flies overhead.' },
                { label: 'Small marshy area.' },
                { label: 'An old book nestled into the crook of a tree.' },
                { label: 'statue' },
                { label: 'Pit trap' },
                { label: 'Wandering madman' },
                { label: 'Area of fruit/nut trees.' }
            ]
        }
    },

    {
        key: 'colonial_encounters_rivers',
        title: 'Encounters Rivers (Colonial)',
        author: 'Derik Badman',
        tags: [
            'colonial',
            'encounters'
        ],
        display_opt: [
            { table: 'actions_men', hide_table: 1 },
            { table: 'actions_animal', hide_table: 1 },
            { table: 'men', hide_table: 1 },
            { table: 'animals', hide_table: 1 },
            { table: 'monsters', hide_table: 1 },
            { table: 'other', hide_table: 1 },
            { table: 'weather', hide_table: 1 }
        ],
        tables: {
            default: [
                { label: 'Animal', weight: 2, print: false, subtable: 'animals' },
                { label: 'Men', weight: 3, print: false, subtable: 'men' },
                { label: 'Monster', weight: 1, print: false, subtable: 'monsters' },
                { label: 'Other', weight: 1, print: false, subtable: 'other' }
            ],
            actions_men: [
                { label: 'Searching (something specific)' },
                { label: 'Travelling', weight: 2 },
                { label: 'Fighting/Arguing' },
                { label: 'Fleeing' },
                { label: 'Dying/Dead' },
                { label: 'Fishing', weight: 2 },
                { label: 'Working' },
                { label: 'Bathing', weight: 2 },
                { label: 'Lost' },
                { label: 'Exploring (general)' },
                { label: 'Adventure/Campaign Specific' },
                { label: 'Lying in wait' }
            ],
            actions_animal: [
                { label: 'Hunting/Foraging' },
                { label: 'Sleeping' },
                { label: 'Fighting' },
                { label: 'Traveling' },
                { label: 'Dying/Dead' },
                { label: 'Eating/Drinking/Playing' }
            ],
            men: [
                { label: 'Barge(s) carrying raw materials to the city (food, lumber, stone)' },
                { label: 'Barge(s) carrying good to the towns/villages/forts (gunpowder, cloth, artisanal goods, weapons, etc.)' },
                { label: 'Military sloop/pinnace (?)' },
                { label: 'Fishing boat(s)' },
                { label: 'River pirates' },
                { label: 'Men fishing (not in a boat)' },
                { label: 'Locals in canoe' },
                { label: 'Native canoes' },
                { label: 'Dwarven raiders' },
                { label: 'Bathers' },
                { label: 'A camp on the shore for {{table:colonial_factions}}' }
            ],
            animals: [
                { label: 'Fish', subtable: 'actions_animal' },
                { label: 'Turtle', subtable: 'actions_animal' },
                { label: 'Snake', subtable: 'actions_animal' },
                { label: 'Frog', subtable: 'actions_animal' },
                { label: '{{table:colonial_encounters_forest:animals}} drinking' }
            ],
            monsters: [
                { label: '???', subtable: 'actions_animal' },
                { label: '[Something flying overhead]' },
                { label: '[Other: Something large or dangerous]' }
            ],
            other: [
                { label: 'Campsite', weight: 3 },
                { label: 'Village', weight: 1 },
                { label: 'Homestead', weight: 1 },
                { label: 'Weather event', weight: 1, print: false, subtable: 'weather' },
                { label: 'Thick Mud' },
                { label: 'Side Stream' },
                { label: 'Fallen Tree', weight: 1 },
                { label: 'Statue', weight: 1 },
                { label: 'Magic Pool', weight: 1 },
                { label: 'Rapids', weight: 2 },
                { label: 'Nest', weight: 2 }
            ],
            weather: [
                { label: 'Light Fog/mist', weight: 2 },
                { label: 'Heavy Fog/mist', weight: 2 },
                { label: 'Light precipitation', weight: 2 },
                { label: 'Heavy precipitation' },
                { label: 'Light Wind', weight: 2 },
                { label: 'Heavy Wind' },
                { label: 'Storm' },
                { label: 'Heavy Clouds', weight: 2 },
                { label: 'Sun shower', weight: 2 },
                { label: 'Bright Sun', weight: 2 },
                { label: 'Major Weather event', description: 'Hurricane, tornado, blizzard, flood, etc.' }
            ]
        }
    },

    {
        key: 'colonial_encounters_swamp',
        title: 'Encounters Swamp (Colonial)',
        author: 'Derik Badman',
        tags: [
            'colonial',
            'encounters'
        ],
        display_opt: [
            { table: 'actions_men', hide_table: 1 },
            { table: 'actions_animal', hide_table: 1 },
            { table: 'men', hide_table: 1 },
            { table: 'animals', hide_table: 1 },
            { table: 'monsters', hide_table: 1 },
            { table: 'other', hide_table: 1 },
            { table: 'weather', hide_table: 1 }
        ],
        tables: {
            default: [
                { label: 'Animal', weight: 2, print: false, subtable: 'animals' },
                { label: 'Men', weight: 3, print: false, subtable: 'men' },
                { label: 'Monster', weight: 1, print: false, subtable: 'monsters' },
                { label: 'Other', weight: 1, print: false, subtable: 'other' }
            ],
            actions_men: [
                { label: 'Searching (something specific)' },
                { label: 'Travelling' },
                { label: 'Fighting/Arguing' },
                { label: 'Fleeing' },
                { label: 'Dying/Dead' },
                { label: 'Foraging/Hunting' },
                { label: 'Working' },
                { label: 'Sleeping/Camping/Living' },
                { label: 'Lost' },
                { label: 'Exploring (general)' },
                { label: 'Eating/Drinking/Playing' },
                { label: 'Adventure/Campaign Specific' },
                { label: 'Lying in wait' }
            ],
            actions_animal: [
                { label: 'Hunting/Foraging' },
                { label: 'Sleeping' },
                { label: 'Fighting' },
                { label: 'Traveling' },
                { label: 'Dying/Dead' },
                { label: 'Eating/Drinking/Playing' }
            ],
            men: [
                { label: 'Lost Child/Peasant' },
                { label: 'Military group', subtable: 'actions_men' },
                { label: 'Company group', subtable: 'actions_men' },
                { label: 'Hunters/trappers', subtable: 'actions_men' },
                { label: 'Natives', subtable: 'actions_men' },
                { label: 'Lumberjacks', subtable: 'actions_men' },
                { label: 'Homesteaders', subtable: 'actions_men' },
                { label: 'Cultists', subtable: 'actions_men' },
                { label: 'Bandits', subtable: 'actions_men' },
                { label: 'Revolutionaries', subtable: 'actions_men' },
                { label: 'Alchemist/Mage/Hermit', subtable: 'actions_men' },
                { label: 'Farmers', subtable: 'actions_men' },
                { label: 'Merchants', subtable: 'actions_men' },
                { label: 'Preacher', subtable: 'actions_men' },
                { label: 'Campaign/Adventure Relevant', subtable: 'actions_men' }
            ],
            animals: [
                { label: 'Alligator', subtable: 'actions_animal' },
                { label: 'Turtle', subtable: 'actions_animal' },
                { label: 'Spider', subtable: 'actions_animal' },
                { label: 'Snake', subtable: 'actions_animal' },
                { label: 'Frogs', subtable: 'actions_animal' },
                { label: 'Fish (giant)', subtable: 'actions_animal' },
                { label: 'Giant Grasshoppers', subtable: 'actions_animal' },
                { label: 'Water Fowl', subtable: 'actions_animal' },
                { label: 'Monkeys/Sloths', subtable: 'actions_animal' },
                { label: 'Crabs/Crayfish', subtable: 'actions_animal' },
                { label: 'Leeches', subtable: 'actions_animal' },
                { label: 'Insect swarm', subtable: 'actions_animal' }
            ],
            monsters: [
                { label: 'Tentacled Octopus Monster', weight: 1 },
                { label: 'Will-o-wisp', weight: 1 },
                { label: 'Lizardmen/Snakemen', weight: 1 },
                { label: 'Dragon', weight: 1 },
                { label: 'Dryad', weight: 1 },
                { label: 'Carnivorous Plant', weight: 1 },
                { label: 'Zombies (drowners)' },
                { label: '[Other: Something large or dangerous]' }
            ],
            other: [
                { label: 'Weather event', weight: 1, subtable: 'weather' },
                { label: 'Fire', weight: 1 },
                { label: 'Whirlpool', weight: 1 },
                { label: 'Rapids', weight: 1 },
                { label: 'Quicksand', weight: 1 },
                { label: 'Heavy vines/brush', weight: 1 },
                { label: 'Large Dead Tree', weight: 1 },
                { label: 'Magic Clearing', weight: 1 },
                { label: 'Mushroom Circle', weight: 1 },
                { label: 'Magic Pool', weight: 1 },
                { label: 'Statue', weight: 1 },
                { label: 'Grave(s)', weight: 1 },
                { label: 'Spiderweb', weight: 2 },
                { label: 'Tripwire', weight: 2 },
                { label: 'Net trap', weight: 3 },
                { label: 'Pit trap', weight: 3 },
                { label: 'Snare', weight: 3 },
                { label: 'Rocks from above', weight: 1 },
                { label: 'Altar/shrine', weight: 3 },
                { label: 'Campsite', weight: 3 },
                { label: 'Village', weight: 1 },
                { label: 'Stream' },
                { label: 'Fallen Tree', weight: 1 },
                { label: 'Tree lair', weight: 2 },
                { label: 'Nest (ground)', weight: 2 },
                { label: 'Nest (water)', weight: 2 }
            ],
            weather: [
                { label: 'Light Fog/mist', weight: 2 },
                { label: 'Heavy Fog/mist', weight: 2 },
                { label: 'Light precipitation', weight: 2 },
                { label: 'Heavy precipitation' },
                { label: 'Light Wind', weight: 2 },
                { label: 'Heavy Wind' },
                { label: 'Storm' },
                { label: 'Heavy Clouds', weight: 2 },
                { label: 'Sun shower', weight: 2 },
                { label: 'Bright Sun', weight: 2 },
                { label: 'Major Weather event', description: 'Hurricane, tornado, blizzard, flood, etc.' }
            ]
        }
    },

    {
        key: 'colonial_encounters_town',
        title: 'Encounters Town (Colonial)',
        author: 'Derik Badman',
        tags: [
            'encounters',
            'colonial'
        ],
        display_opt: [
            { table: 'actions_men', hide_table: 1 },
            { table: 'actions_animal', hide_table: 1 },
            { table: 'men', hide_table: 1 },
            { table: 'animals', hide_table: 1 },
            { table: 'monsters', hide_table: 1 },
            { table: 'other', hide_table: 1 },
            { table: 'weather', hide_table: 1 }
        ],
        tables: {
            default: [
                {
                    label: '{{table:colonial_occupations:laborer}}',
                    subtable: 'actions_men'
                },
                {
                    label: '{{table:colonial_occupations:artisan}}',
                    subtable: 'actions_men'
                },
                {
                    label: '{{table:colonial_occupations:criminal}}',
                    subtable: 'actions_men'
                },
                {
                    label: '{{table:colonial_occupations:professional}}',
                    subtable: 'actions_men'
                },
                {
                    label: 'Member(s) of {{table:colonial_factions}}',
                    subtable: 'actions_men'
                },
                {
                    label: 'Farmer',
                    subtable: 'actions_men'
                },
                {
                    label: 'Local priest',
                    subtable: 'actions_men'
                },
                {
                    label: 'Militia member(s)',
                    subtable: 'actions_men'
                },
                {
                    label: 'Traveling Trader',
                    subtable: 'actions_men'
                },
                {
                    label: 'Traveling Tinker/Craftsmen',
                    subtable: 'actions_men'
                },
                {
                    label: 'Native Trading Party',
                    subtable: 'actions_men'
                },
                {
                    label: 'Itinerant preacher',
                    subtable: 'actions_men'
                },
                {
                    label: 'Hunter/Trapper',
                    subtable: 'actions_men'
                },
                {
                    label: 'Military Patrol',
                    subtable: 'actions_men'
                },
                {
                    label: 'Alchemist/Wizard',
                    subtable: 'actions_men'
                },
                {
                    label: 'Company scout/expedition',
                    subtable: 'actions_men'
                },
                {
                    label: 'Campaign/Adventure Specific',
                    subtable: 'actions_men'
                }
            ],
            actions_men: [
                { label: 'Preaching/speechifying' },
                { label: 'Selling something' },
                { label: 'Looking to buy' },
                { label: 'Arguing' },
                { label: 'Fighting' },
                { label: 'Lost' },
                { label: 'Traveling somewhere else' },
                { label: 'Looking for someone/thing' },
                { label: 'Running away from someone/thing' },
                { label: 'Dead' },
                { label: 'Drunk' },
                { label: 'Working (engaged in their normal business)' },
                { label: 'Something Campaign/Adventure Specific' }
            ]
        }
    },

    {
        key: 'colonial_settlement_locations',
        title: 'Settlement Locations (Colonial)',
        author: 'Derik Badman',
        tags: [
            'colonial',
            'settlements'
        ],
        tables: {
            default: [
                { label: 'Residence (single-family) (often a farm in villages/towns)' },
                { label: 'Church' },
                { label: 'Tavern' },
                { label: 'General Store' },
                { label: 'Commons' },
                { label: 'Artisan Shop: {{table:colonial_occupations:artisan}}' },
                { label: 'Merchant' },
                { label: 'Meeting House (for club/society)' },
                { label: 'Barracks' },
                { label: 'Residence (multi-family)' },
                { label: 'Warehouse' },
                { label: 'Office' },
                { label: 'Shipyard' },
                { label: 'Almshouse' },
                { label: 'Docks (news and rumors arrive from other locations, letters, packages, etc.)' },
                { label: 'Government Building' },
                { label: 'Factory' },
                { label: 'Coffeehouse (all manner of men discussing and debating the news and ideas of the time, good for meeting people or getting information) (Many will have a specialized or self-selecting clientele such as rebels, loyalists, intellectuals, or a front for a secret society.)' },
                { label: 'Open space / green space' },
                { label: 'Hospital' },
                { label: 'Boxing ring/field' },
                { label: 'Wharf/Pier' },
                { label: 'Fort' },
                { label: 'Library' },
                { label: 'Square' },
                { label: 'Promenade' }
            ]
        }
    },

    {
        key: 'colonial_settlement_townevents',
        title: 'What\'s going on in this town?',
        author: 'Derik Badman',
        tags: [
            'colonial',
            'settlements'
        ],
        tables: {
            default: [
                { label: 'Everyone is currently in the church for a service (regular, wedding, funeral)' },
                { label: 'Military are temporarily barracked here and the villagers are not happy' },
                { label: 'Natives have been raiding the outskirts' },
                { label: 'Monsters of some kind have been attacking citizens' },
                { label: 'A Knights of Saint Ceren has shown up to hunt mages (people are on edge)' },
                { label: 'Massive fire is destroying the village center' },
                { label: 'Locals have just uncovered some ancient ruins' },
                { label: 'Native trading party is set-up in the commons trading with the locals' },
                { label: 'While they pretend to be a orthodox High Lord congregation, the village church is actually a splinter sect run by women.' },
                { label: 'Haven of revolutionaries, the militia is ready to take up arms against the military' },
                { label: 'Plague' },
                { label: 'Festival/party. People are drunk, loud, singing, dancing, etc.' },
                { label: 'A hunter has just brought in the corpse of some large monster he killed in the nearby woods' },
                { label: 'A hunter has just brought in the corpse of a villager(s) he found nearby.' },
                { label: 'A couple days old newspaper from the nearest city arrived that day and a literate villager is reading it to an audience' },
                { label: 'Local militia are holding someone in a cellar they claim is a thief/murderer/etc. The accused claims innocence.' },
                { label: 'Valuable resource recently discovered in area, village is booming (makeshift abodes, camps, impromptu street stalls)' },
                { label: 'Utterly destroyed by monster, natural disaster, magic, other people. There may be survivors hiding out.' },
                { label: 'A spirit is haunting the church.' },
                { label: 'Something went horribly wrong in one villagers home. No can go in, no one has come out, but it smells oddly and there is smoke rising from the chimney.' },
                { label: 'The local beer was spiked… with hallucinogens.' }
            ]
        }
    },

    {
        key: 'colonial_settlement_riled',
        title: 'What\'s got the people riled up?',
        author: 'Derik Badman',
        tags: [
            'colonial',
            'settlements'
        ],
        tables: {
            default: [
                { label: 'New tax on alcohol sales.' },
                { label: 'Excise tax on {{table:mission_thing:default}}' },
                { label: 'Popular adventurer to be hanged on charges of treason.' },
                { label: 'Additional troops have been billeted in local homes.' },
                { label: 'New curfew instituted.' },
                { label: 'Government seizure of property.' },
                { label: 'Religious crackdown on minor sects.' },
                { label: 'Popular preacher jailed for vagrancy/impiety.' },
                { label: 'Attack by natives on nearby settlement' },
                { label: 'Shortage of {{table:mission_thing:default}}' },
                { label: 'Epidemic of sickness' },
                { label: 'Political scandal' }
            ]
        }
    },

    {
        key: 'colonial_settlement_flemish_names',
        title: 'Flemish Town Names',
        tags: [
            'colonial',
            'settlements'
        ],
        tables: {
            default: [
                { label: 'Aalst' },
                { label: 'Aarschot' },
                { label: 'Antwerp' },
                { label: 'Beringen' },
                { label: 'Bilzen' },
                { label: 'Blankenberge' },
                { label: 'Borgloon' },
                { label: 'Bree' },
                { label: 'Bruges' },
                { label: 'Damme' },
                { label: 'Deinze' },
                { label: 'Dendermonde' },
                { label: 'Diest' },
                { label: 'Diksmuide' },
                { label: 'Dilsen-Stokkem' },
                { label: 'Eeklo' },
                { label: 'Geel' },
                { label: 'Genk' },
                { label: 'Ghent' },
                { label: 'Geraardsbergen' },
                { label: 'Gistel' },
                { label: 'Halen' },
                { label: 'Halle' },
                { label: 'Hamont-Achel' },
                { label: 'Harelbeke' },
                { label: 'Hasselt' },
                { label: 'Herentals' },
                { label: 'Herk-de-Stad' },
                { label: 'Hoogstraten' },
                { label: 'Ypres' },
                { label: 'Izegem' },
                { label: 'Kortrijk' },
                { label: 'Landen' },
                { label: 'Leuven' },
                { label: 'Lier' },
                { label: 'Lo-Reninge' },
                { label: 'Lokeren' },
                { label: 'Lommel' },
                { label: 'Maaseik' },
                { label: 'Mechelen' },
                { label: 'Menen' },
                { label: 'Mesen' },
                { label: 'Mortsel' },
                { label: 'Nieuwpoort' },
                { label: 'Ninove' },
                { label: 'Ostend' },
                { label: 'Oudenaarde' },
                { label: 'Oudenburg' },
                { label: 'Peer' },
                { label: 'Poperinge' },
                { label: 'Roeselare' },
                { label: 'Ronse' },
                { label: 'Scherpenheuvel-Zichem' },
                { label: 'Sint-Niklaas' },
                { label: 'Sint-Truiden' },
                { label: 'Tielt' },
                { label: 'Tienen' },
                { label: 'Tongeren' },
                { label: 'Torhout' },
                { label: 'Turnhout' },
                { label: 'Veurne' },
                { label: 'Vilvoorde' },
                { label: 'Waregem' },
                { label: 'Wervik' },
                { label: 'Zottegem' },
                { label: 'Zoutleeuw' }
            ]
        }
    }
];
