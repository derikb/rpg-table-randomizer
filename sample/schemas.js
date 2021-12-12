/**
 * Sample schema
 */
const simple = {
    key: 'simple',
    title: 'Simple NPC',
    author: 'Derik A Badman',
    fields: [
        { key: 'name', type: 'string', source: 'name:random', label: 'Name' },
        { key: 'occupation', type: 'string', source: 'table:medieval_occupations', label: 'Job' },
        { key: 'appearance', type: 'array', source: 'table:onthenpc_appearance', count: 2, label: 'Phys. Appearance' },
        { key: 'personality', type: 'array', source: 'table:onewordtraits', count: 2 },
        { key: 'goals', type: 'string', source: 'table:character_goals' },
        { key: 'reaction', type: 'number', source: 'roll:2d6' },
        { key: 'notes', type: 'text' }
    ]
};

export {
    simple
};
