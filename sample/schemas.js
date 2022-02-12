/**
 * Sample schema
 */
const simple = {
    key: 'simple',
    name: 'Simple NPC',
    author: 'Derik A Badman',
    fields: [
        { key: 'name', type: 'string', source: 'name:random', label: 'Name' },
        { key: 'occupation', type: 'string', source: 'table:medieval_occupations', label: 'Job' },
        { key: 'appearance', type: 'resultset', source: 'table:onthenpc_appearance', count: 2, label: 'Phys. Appearance' },
        { key: 'personality', type: 'resultset', source: 'table:onewordtraits', count: 2 },
        { key: 'goals', type: 'resultset', source: 'table:character_goals' },
        { key: 'reaction', type: 'number', source: 'roll:2d6' },
        { key: 'notes', type: 'text' }
    ]
};

export {
    simple
};
