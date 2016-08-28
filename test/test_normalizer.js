'use strict';

const rpgrandomizer = require('../../rpg-table-randomizer');
const normalizer = new rpgrandomizer.TableNormalizer();
const fs = require('fs');

let data = '{"label":"something"}';

normalizer.setData(data);
console.log( normalizer.checkType() );
console.log( normalizer.normalizeData() );


data = fs.readFileSync('./test/test_text_data.txt', 'utf8');
normalizer.setData(data);
console.log( normalizer.checkType() );
console.log( normalizer.normalizeData() );


data = fs.readFileSync('./test/test_html_data.html', 'utf8');

normalizer.setData(data);

console.log( normalizer.checkType() );


console.log( normalizer.normalizeData() );