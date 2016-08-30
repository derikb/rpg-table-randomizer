
const rpgrandomizer = require('../../rpg-table-randomizer');


const namer = rpgrandomizer.RandomName;

console.log( namer.capitalizeName('derik badman') );

console.log( namer.holmesname() );

console.log( namer.demonname() );

console.log( namer.generateList('flemish') );

console.log( namer.generateList('flemish', true) );