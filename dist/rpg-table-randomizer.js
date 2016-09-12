(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.rpgTableRandomizer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
	"options": {
		"flemish": "Flemish",
		"dutch": "Dutch",
		"cornish": "Cornish",
		"japanese": "Japanese",
		"turkish": "Turkish",
		"native american": "Native American"
	},
	"holmesian_syllables":	[
		"A",
		"Ael",
		"Af",
		"Ak",
		"Al",
		"Am",
		"An",
		"Ar",
		"Baf",
		"Bar",
		"Bee",
		"Bel",
		"Ber",
		"Berd",
		"Bes",
		"Bo",
		"Bo",
		"Bol",
		"Bor",
		"Bran",
		"Brose",
		"Bru",
		"Bur",
		"Car",
		"Chor",
		"Cig",
		"Cla",
		"Da",
		"Da",
		"Dan",
		"Do",
		"Do",
		"Dock",
		"Doh",
		"Don",
		"Dor",
		"Dor",
		"Dre",
		"Drebb",
		"E",
		"Eg",
		"Ek",
		"El",
		"El",
		"End",
		"Er",
		"Er",
		"Es",
		"Eth",
		"Eth",
		"Ev",
		"Fal",
		"Fan",
		"Far",
		"Feg",
		"Fen",
		"Fi",
		"Ful",
		"Fum",
		"Ga",
		"Gahn",
		"Gaith",
		"Gar",
		"Gar",
		"Gen",
		"Ger",
		"Glen",
		"Go",
		"Go",
		"Gram",
		"Grink",
		"Gulf",
		"Ha",
		"Hag",
		"Hal",
		"Han",
		"Harg",
		"Ho",
		"Hol",
		"Hor",
		"I",
		"Ig",
		"In",
		"Ith",
		"Jax",
		"Jo",
		"Jur",
		"Ka",
		"Kan",
		"Kra",
		"Krac",
		"Ky",
		"La",
		"Laf",
		"Lag",
		"Lap",
		"Le",
		"Lef",
		"Lem",
		"Lis",
		"Lo",
		"Lu",
		"Mal",
		"Mar",
		"Me",
		"Mer",
		"Mez",
		"Mez",
		"Mich",
		"Mil",
		"Mis",
		"Mo",
		"Mo",
		"Moo",
		"Mul",
		"Mun",
		"Mun",
		"Mur",
		"Mus",
		"Na",
		"Na",
		"Ned",
		"Nes",
		"Nick",
		"No",
		"Nor",
		"Nos",
		"Nu",
		"O",
		"Omes",
		"Os",
		"Pal",
		"Pen",
		"Phil",
		"Po",
		"Pos",
		"Poy",
		"Pres",
		"Pus",
		"Quas",
		"Que",
		"Ra",
		"Rag",
		"Ralt",
		"Ram",
		"Ray",
		"Ree",
		"Rem",
		"Rin",
		"Ris",
		"Ro",
		"Ro",
		"Ron",
		"Sa",
		"Sa",
		"See",
		"Ser",
		"Shal",
		"Sho",
		"Sho",
		"Sil",
		"Sit",
		"Spor",
		"Sun",
		"Sur",
		"Sus",
		"Tar",
		"Tar",
		"Tas",
		"Tee",
		"Ten",
		"Ten",
		"Teth",
		"To",
		"To",
		"Ton",
		"Ton",
		"Tra",
		"Treb",
		"Tred",
		"Tue",
		"U",
		"Va",
		"Vak",
		"Ven",
		"Ver",
		"Wal",
		"Web",
		"Wil",
		"Xor",
		"Y",
		"Yor",
		"Ys",
		"Zef",
		"Zell",
		"Zen",
		"Zer",
		"Zo",
		"Zo",
		"Zort"
	],
	"holmesian_scount": {
		"values": [
			"1",
			"2",
			"3",
			"4"
		],
		"weights": [
			"1",
			"6",
			"2",
			"1"
		]
	},
	"holmesian_title": [
		"from Above",
		"from Afar",
		"from Below",
		"the Adept",
		"the Albino",
		"the Antiquarian",
		"the Arcane",
		"the Archaic",
		"the Barbarian",
		"the Batrachian",
		"the Battler",
		"the Bilious",
		"the Bold",
		"the Brave",
		"the Civilized",
		"the Collector",
		"the Cryptic",
		"the Curious",
		"the Dandy",
		"the Daring",
		"the Decadent",
		"the Delver",
		"the Distant",
		"the Eldritch",
		"the Exotic",
		"the Explorer",
		"the Fair",
		"the Fearless",
		"the Fickle",
		"the Foul",
		"the Furtive",
		"the Gambler",
		"the Ghastly",
		"the Gibbous",
		"the Great",
		"the Grizzled",
		"the Gruff",
		"the Hairy",
		"the Bald",
		"the Haunted",
		"the Heavy",
		"the Lean",
		"the Hooded",
		"the Cowled",
		"the Hunter",
		"the Imposing",
		"the Irreverent",
		"the Loathsome",
		"the Loud",
		"the Quiet",
		"the Lovely",
		"the Mantled",
		"the Masked",
		"the Veiled",
		"the Merciful",
		"the Merciless",
		"the Mercurial",
		"the Mighty",
		"the Morose",
		"the Mutable",
		"the Mysterious",
		"the Obscure",
		"the Old",
		"the Young",
		"the Ominous",
		"the Peculiar",
		"the Perceptive",
		"the Pious",
		"the Quick",
		"the Ragged",
		"the Ready",
		"the Rough",
		"the Rugose",
		"the Scarred",
		"the Searcher",
		"the Shadowy",
		"the Short",
		"the Tall",
		"the Steady",
		"the Uncanny",
		"the Unexpected",
		"the Unknowable",
		"the Verbose",
		"the Vigorous",
		"the Wanderer",
		"the Wary",
		"the Weird",
		"the {{table:color}}",
		"the {{table:ordinal}}",
		"of the {{table:color}} Cloak",
		"of the {{table:direction}}",
		"of the Arid Wastes",
		"of the Beetling Brow",
		"of the Cyclopean City",
		"of the Dread Wilds",
		"of the Eerie Eyes",
		"of the Foetid Swamp",
		"of the Forgotten City",
		"of the Haunted Heath",
		"of the Hidden Valley",
		"of the Howling Hills",
		"of the Jagged Peaks",
		"of the Menacing Mien",
		"of the Savage Isle",
		"of the Tangled Woods",
		"of the Watchful Eyes"
	],
	"cornish": {
		"male": [
			"Aedan",
			"Alan",
			"Anaoc",
			"Benesek",
			"Boult",
			"Branok",
			"Cadan",
			"Cador",
			"Carasek",
			"Carlyon",
			"Casvelyn",
			"Carne",
			"Clemow",
			"Colan",
			"Conan",
			"Corentyn",
			"Cubert",
			"Daveth",
			"Denzel",
			"Derrick",
			"Digory",
			"Dofagan",
			"Donyerth",
			"Edern",
			"Ennor",
			"Enyon",
			"Gawen",
			"Gerens",
			"Gorran",
			"Gurcant",
			"Gurcon",
			"Guriant",
			"Gryffyn",
			"Gwithyen",
			"Hammitt",
			"Hedrek",
			"Hedyn",
			"Hendra",
			"Howel",
			"Jacca",
			"Jago",
			"Jermyn",
			"Jory",
			"Jowan",
			"Keby",
			"Kenan",
			"Kenver",
			"Kenwyn",
			"Kernick",
			"Kevern",
			"Kitto",
			"Lanyon",
			"Lewyth",
			"Locryn",
			"Maban",
			"Madern",
			"Margh",
			"Massen",
			"Mawgan",
			"Medrod",
			"Melor",
			"Menadue",
			"Meriasek",
			"Merryn",
			"Morcum",
			"Myghal",
			"Nadelek",
			"Neythen",
			"Pasco",
			"Padern",
			"Pasco",
			"Peder",
			"Pedrek",
			"Penrice",
			"Perran",
			"Petrok",
			"Remfry",
			"Rowse",
			"Rewan",
			"Sithny",
			"Talan",
			"Talek",
			"Tomas",
			"Treyfusis",
			"Trelawney",
			"Tremayne",
			"Tresco",
			"Trethowan",
			"Teudar",
			"Treeve",
			"Trevelyan",
			"Tristan",
			"Tyack",
			"Ust",
			"Vyvyan",
			"Wella",
			"Wendron",
			"Yestin",
			"Ythel",
			"Zennor"
		],
		"female": [
			"Aedoc",
			"Arranza",
			"Anaguistl",
			"Bennath",
			"Berlewen",
			"Bersaba",
			"Beryan",
			"Blejan",
			"Bronnen",
			"Bryluen",
			"Caja",
			"Chesten",
			"Colenso",
			"Conwenna",
			"Crewenna",
			"Delen",
			"Demelza",
			"Derowen",
			"Ebrel",
			"Elestren",
			"Elowen",
			"Endellion",
			"Esyld",
			"Eva",
			"Ewella",
			"Hedra",
			"Jenna",
			"Genna",
			"Gloiucen",
			"Gunnoda",
			"Gwen",
			"Gwenna",
			"Gwennap",
			"Gwenneth",
			"Gwenno",
			"Gwenora",
			"Gwynne",
			"Ienipa",
			"Jena",
			"Jenifry",
			"Jowna",
			"Kayna",
			"Kelynen",
			"Kensa",
			"Kerensa",
			"Kerra",
			"Kew",
			"Lamorna",
			"Loveday",
			"Lowenna",
			"Mabryn",
			"Medguistl",
			"Mellyn",
			"Melwyn",
			"Melyor",
			"Meraud",
			"Merryn",
			"Morenwyn",
			"Morva",
			"Morvoren",
			"Morwenna",
			"Newlyna",
			"Onwen",
			"Pasca",
			"Rosen",
			"Rosenwyn",
			"Rosevear",
			"Senara",
			"Sidwella",
			"Sowena",
			"Steren",
			"Talwyn",
			"Tamsin",
			"Tanguistl",
			"Tecca",
			"Tegen",
			"Tressa",
			"Ursell",
			"Wenna",
			"Ygerna",
			"Ysella"
		],
		"surname": [
			"Ahearn",
			"Andrewartha",
			"Angove",
			"Anning",
			"Annear",
			"Arthur",
			"Baragwaneth",
			"Bastian",
			"Bell",
			"Berryman",
			"Blamey",
			"Boden",
			"Bolitho",
			"Bonython",
			"Bosanko",
			"Bray",
			"Brock",
			"Burrows",
			"Cass",
			"Causley",
			"Collis",
			"Chegwidden",
			"Chynoweth",
			"Climo",
			"Clews",
			"Colenso",
			"Colley",
			"Connor",
			"Couch",
			"Craddick",
			"Crago",
			"Crocker",
			"Curnow",
			"Deane",
			"Dobell",
			"Drew",
			"Eddy",
			"Endean",
			"Ellery",
			"Ellis",
			"Elliott",
			"Evans",
			"Faull",
			"Fenton",
			"Frayne",
			"Fry",
			"Gay",
			"Geake",
			"Gee",
			"Glasson",
			"Godden",
			"Goldsworthy",
			"Goninan",
			"Goss",
			"Grose",
			"Grigg",
			"Gundry",
			"Hain",
			"Hale",
			"Hancock",
			"Hannaford",
			"Hart",
			"Hannah",
			"Harvey",
			"Hawke",
			"Hellyer",
			"Hendry",
			"Hocking",
			"Hoskins",
			"Hutchens",
			"Inch",
			"Isbel",
			"Jago",
			"James",
			"Jewell",
			"Johns",
			"Joliffe",
			"Jolly",
			"Jory",
			"Julian",
			"Keast",
			"Keen",
			"Kemp",
			"Kent",
			"Kersey",
			"Kinsey",
			"Kirby",
			"Kitto",
			"Laity",
			"Lander",
			"Lowry",
			"Lean",
			"Leggo",
			"Lock",
			"Lyon",
			"May",
			"Mayne",
			"Menadue",
			"Moon",
			"Moyle",
			"Mundey",
			"Nance",
			"Nankervis",
			"Negus",
			"Nicholls",
			"Odgers",
			"Oates",
			"Olver",
			"Pascoe",
			"Pawley",
			"Perrin",
			"Phillips",
			"Prowse",
			"Quick",
			"Rickard",
			"Roach",
			"Roberts",
			"Rodgers",
			"Rodda",
			"Rouse",
			"Sara",
			"Sanders",
			"Skewes",
			"Symons",
			"Stevens",
			"Tangye",
			"Teague",
			"Terrill",
			"Thorne",
			"Tonkin",
			"Truscott",
			"Tyack",
			"Uren",
			"Veale",
			"Vivian",
			"Vosper",
			"Voss",
			"Warren",
			"Warne"
		]
	},
	"flemish": {
		"male": [
			"Adam",
			"Adolf",
			"Aio",
			"Albern",
			"Alem",
			"Alting",
			"Andree",
			"Anno",
			"Arnold",
			"Ato",
			"Baderic",
			"Baldric",
			"Bartold",
			"Benno",
			"Bern",
			"Bero",
			"Baldwin",
			"Bono",
			"Brio",
			"Conrad",
			"Constantin",
			"Dagmar",
			"Dietmar",
			"Diggo",
			"Ebberich",
			"Ecco",
			"Egmund",
			"Ello",
			"Emeric",
			"Eric",
			"Eoban",
			"Etto",
			"Falko",
			"Fastrad",
			"Finn",
			"Folmar",
			"Franco",
			"Gaiko",
			"Gerald",
			"Getti",
			"Gregorio",
			"Gunther",
			"Henryk",
			"Herman",
			"Hiddo",
			"Hige",
			"Hubert",
			"Iger",
			"Immo",
			"Io",
			"Isaac",
			"Iwain",
			"Jalo",
			"Johannes",
			"Knut",
			"Kraft",
			"Laurentius",
			"Lela",
			"Liopold",
			"Limmo",
			"Ludbert",
			"Manno",
			"Martino",
			"Mauricius",
			"Meiner",
			"Menfrid",
			"Meno",
			"Nandino",
			"Norbert",
			"Odric",
			"Oleman",
			"Otto",
			"Pappo",
			"Paio",
			"Petrus",
			"Rainer",
			"Rette",
			"Richard",
			"Robbert",
			"Rupert",
			"Rutger",
			"Salomon",
			"Saxan",
			"Selo",
			"Sibert",
			"Sicco",
			"Simon",
			"Stefan",
			"Tammo",
			"Tete",
			"Theodi",
			"Tibbe",
			"Tiego",
			"Udo",
			"Waldo",
			"Walther",
			"Wana",
			"Waszo",
			"Wenzo",
			"Wilbrand",
			"Willem",
			"Windelmar",
			"Wolber"
		],
		"female": [
			"Adela",
			"Agatha",
			"Agnes",
			"Aia",
			"Alda",
			"Aldwi",
			"Ama",
			"Ava",
			"Benedicta",
			"Betta",
			"Berta",
			"Dida",
			"Enna",
			"Erlinda",
			"Ermina",
			"Evergerd",
			"Fida",
			"Fokka",
			"Gela",
			"Gertrude",
			"Ghisela",
			"Gutha",
			"Heiga",
			"Helena",
			"Hema",
			"Hera",
			"Ide",
			"Ige",
			"Imma",
			"Iudith",
			"Laurentia",
			"Ligef",
			"Luva",
			"Machtild",
			"Maga",
			"Megina",
			"Menika",
			"Murina",
			"Notha",
			"Oda",
			"Ogiva",
			"Olge",
			"Oza",
			"Sita",
			"Sophia",
			"Suvi",
			"Susanne",
			"Tetta",
			"Tiada",
			"Uda",
			"Wela",
			"Yolande"
		],
		"surname": [
			"Claes",
			"de Vroom",
			"Franke",
			"Goossens",
			"Joossens",
			"Maes",
			"Merckx",
			"Mertens",
			"Peeters",
			"Slootmaekers",
			"Tillens",
			"Vandroogenbroeck",
			"Van Rompuy",
			"Vermeulen",
			"Vervloet",
			"Vroom",
			"Vroomen"
		]
	},
	"dutch": {
		"male": [
			"Aart",
			"Abe",
			"Abraham",
			"Ad",
			"Adam",
			"Ade",
			"Adelbert",
			"Adolf",
			"Adriaan",
			"Adrianus",
			"Albert",
			"Aldert",
			"Alex",
			"Alexander",
			"Alfons",
			"Alfred",
			"Aloysius",
			"Alwin",
			"Ambroos",
			"Andreas",
			"Andries",
			"Anton",
			"Antonie",
			"Antonius",
			"Antoon",
			"Arend",
			"Arie",
			"Arjan",
			"Arnoud",
			"Arthur",
			"Augustijn",
			"Augustus",
			"Bart",
			"Bartel",
			"Bartholomeus",
			"Bas",
			"Bastiaan",
			"Ben",
			"Benedictus",
			"Benjamin",
			"Bernhard",
			"Bert",
			"Bob",
			"Bonifaas",
			"Boudewijn",
			"Braam",
			"Bram",
			"Brecht",
			"Broos",
			"Cas",
			"Casper",
			"Cees",
			"Chris",
			"Christiaan",
			"Christoffel",
			"Cobus",
			"Constantijn",
			"Coos",
			"Cornelis",
			"Cornelius",
			"Corné",
			"Daan",
			"Damiaan",
			"Damian",
			"Daniël",
			"David",
			"Dennis",
			"Dick",
			"Diede",
			"Diederick",
			"Diederik",
			"Dirk",
			"Dominicus",
			"Ed",
			"Eduard",
			"Edwin",
			"Egbert",
			"Elbert",
			"Elia",
			"Elian",
			"Emerens",
			"Erik",
			"Ernst",
			"Erwin",
			"Esmé",
			"Ewoud",
			"Ewout",
			"Faas",
			"Fabian",
			"Felix",
			"Femme",
			"Ferdi",
			"Ferdinand",
			"Filibert",
			"Filip",
			"Filippus",
			"Flip",
			"Floor",
			"Floris",
			"Fons",
			"Franciscus",
			"Frank",
			"Frans",
			"Fred",
			"Frederik",
			"Freek",
			"Frits",
			"Funs",
			"Funske",
			"Gabriël",
			"Geert",
			"Gerard",
			"Gerben",
			"Gerd",
			"Gerhard",
			"Gerlach",
			"Gerlof",
			"Gerolf",
			"Gerolt",
			"Gerrit",
			"Gerry",
			"Gert",
			"Gijs",
			"Gijsbert",
			"Gilbert",
			"Gillis",
			"Godfried",
			"Gustaaf",
			"Guus",
			"Hannes",
			"Hans",
			"Harm",
			"Heiko",
			"Hein",
			"Hendrik",
			"Henk",
			"Hennie",
			"Henny",
			"Henricus",
			"Herman",
			"Hermanus",
			"Hieronymus",
			"Hubert",
			"Hubertus",
			"Hubrecht",
			"Hugo",
			"Huub",
			"Ignaas",
			"Inge",
			"Ivo",
			"Izaäk",
			"Jaap",
			"Jacob",
			"Jacobus",
			"Jakob",
			"Jan",
			"Jasper",
			"Jef",
			"Jelle",
			"Jeroen",
			"Jesse",
			"Job",
			"Jochem",
			"Jodocus",
			"Joep",
			"Joeri",
			"Johan",
			"Johannes",
			"Jonas",
			"Jonathan",
			"Joop",
			"Joord",
			"Joos",
			"Joost",
			"Jordaan",
			"Joris",
			"Jos",
			"Josephus",
			"Jozef",
			"Jozua",
			"Joël",
			"Judocus",
			"Jurgen",
			"Jurriaan",
			"Justus",
			"Kai",
			"Karel",
			"Kasper",
			"Kees",
			"Kerneels",
			"Kevin",
			"Klaas",
			"Kobe",
			"Kobus",
			"Koen",
			"Koenraad",
			"Koert",
			"Koos",
			"Lambert",
			"Lammert",
			"Lars",
			"Lau",
			"Laurens",
			"Leo",
			"Leonard",
			"Leopold",
			"Levi",
			"Lex",
			"Lieven",
			"Lievin",
			"Lodewijk",
			"Louis",
			"Lourens",
			"Lowie",
			"Lucas",
			"Ludger",
			"Ludo",
			"Ludolf",
			"Luuk",
			"Maarten",
			"Maas",
			"Maikel",
			"Manfred",
			"Mannes",
			"Marcel",
			"Marco",
			"Marijn",
			"Marinus",
			"Marius",
			"Mark",
			"Marnix",
			"Marten",
			"Martijn",
			"Matthias",
			"Matthijs",
			"Maurits",
			"Max",
			"Maximiliaan",
			"Mees",
			"Meindert",
			"Meine",
			"Meino",
			"Meint",
			"Melchior",
			"Menno",
			"Michael",
			"Michaël",
			"Michel",
			"Michiel",
			"Mick",
			"Milan",
			"Minke",
			"Mozes",
			"Nick",
			"Nico",
			"Nicolaas",
			"Niek",
			"Niels",
			"Nikolaas",
			"Norbert",
			"Olaf",
			"Olivier",
			"Otto",
			"Pascal",
			"Paul",
			"Pauwel",
			"Pepijn",
			"Peter",
			"Petrus",
			"Philip",
			"Pier",
			"Piet",
			"Pieter",
			"Pim",
			"Puck",
			"Quinten",
			"Quirijn",
			"Radboud",
			"Raf",
			"Rafaël",
			"Rein",
			"Reinier",
			"Reinout",
			"Rembrandt",
			"Rens",
			"Richard",
			"Rien",
			"Rik",
			"Rob",
			"Robbe",
			"Robert",
			"Robin",
			"Robrecht",
			"Rochus",
			"Rodolf",
			"Roel",
			"Roeland",
			"Roelof",
			"Rogier",
			"Roy",
			"Ruben",
			"Rudolf",
			"Rupert",
			"Rutger",
			"Ruud",
			"Sander",
			"Sebastiaan",
			"Sem",
			"Servaas",
			"Siem",
			"Siemen",
			"Sieuwerd",
			"Simon",
			"Sjaak",
			"Sjakie",
			"Sjef",
			"Sjoerd",
			"Sjors",
			"Staas",
			"Stef",
			"Stefan",
			"Stefanus",
			"Steffen",
			"Sten",
			"Stephan",
			"Steven",
			"Stijn",
			"Sven",
			"Teun",
			"Teunis",
			"Theo",
			"Theodoor",
			"Theodorus",
			"Theofilus",
			"Theun",
			"Theunis",
			"Thijmen",
			"Thijs",
			"Thomas",
			"Tiede",
			"Ties",
			"Tijmen",
			"Tijn",
			"Tim",
			"Timon",
			"Timotheus",
			"Tjaard",
			"Tjeerd",
			"Tom",
			"Ton",
			"Toon",
			"Tuur",
			"Tygo",
			"Valentijn",
			"Vincent",
			"Wendel",
			"Wendelin",
			"Werner",
			"Wessel",
			"Wibo",
			"Wiebe",
			"Wil",
			"Wilbert",
			"Willem",
			"Willy",
			"Wim",
			"Wob",
			"Wouter",
			"Wubbe",
			"Xander",
			"Yorick",
			"Yvo",
			"Zef"
		],
		"female": [
			"Adelheid",
			"Agnes",
			"Albertina",
			"Aldegonda",
			"Aleid",
			"Aleida",
			"Alexandra",
			"Alida",
			"Amalia",
			"Amanda",
			"Amber",
			"Amelia",
			"Angela",
			"Angelien",
			"Angelina",
			"Angelique",
			"Anika",
			"Anita",
			"Anke",
			"Anna",
			"Annabel",
			"Anne",
			"Anneke",
			"Annelien",
			"Annelies",
			"Anneliese",
			"Annemarie",
			"Annika",
			"Anouk",
			"Ans",
			"Antje",
			"Antonia",
			"Ariane",
			"Augusta",
			"Beatrix",
			"Bente",
			"Betje",
			"Brechtje",
			"Brigitta",
			"Carla",
			"Carola",
			"Carolien",
			"Caroline",
			"Catharina",
			"Cato",
			"Cecilia",
			"Chantal",
			"Charlotte",
			"Christina",
			"Christine",
			"Cilla",
			"Claudia",
			"Coba",
			"Cokkie",
			"Cornelia",
			"Corrie",
			"Cécile",
			"Daphne",
			"Debora",
			"Denise",
			"Diana",
			"Diantha",
			"Dora",
			"Dorothea",
			"Drika",
			"Edith",
			"Eleonora",
			"Elisabeth",
			"Elise",
			"Elke",
			"Ellen",
			"Elly",
			"Elma",
			"Els",
			"Else",
			"Elsje",
			"Emma",
			"Emmy",
			"Esmée",
			"Esther",
			"Eva",
			"Evelien",
			"Eveline",
			"Febe",
			"Felicia",
			"Feline",
			"Femke",
			"Filomena",
			"Fleur",
			"Fleurette",
			"Floortje",
			"Florina",
			"Gabriëlle",
			"Geertje",
			"Geertruida",
			"Gemma",
			"Georgina",
			"Gerarda",
			"Gerda",
			"Gerdina",
			"Gertie",
			"Gertrude",
			"Gertruida",
			"Gilberta",
			"Gisela",
			"Godelieve",
			"Greet",
			"Greetje",
			"Griet",
			"Gusta",
			"Hadewych",
			"Hanna",
			"Hannah",
			"Hanne",
			"Hannie",
			"Hedy",
			"Heike",
			"Heintje",
			"Heleen",
			"Heleentje",
			"Helena",
			"Helma",
			"Hendrika",
			"Hendrikje",
			"Hendrina",
			"Henrietta",
			"Henriette",
			"Henriëtte",
			"Hilda",
			"Hilde",
			"Ida",
			"Ilse",
			"Ima",
			"Ina",
			"Irena",
			"Iris",
			"Isa",
			"Isabella",
			"Isabelle",
			"Jacintha",
			"Jacoba",
			"Jacobina",
			"Jacobine",
			"Jacomina",
			"Jana",
			"Janna",
			"Janneke",
			"Jantine",
			"Jantje",
			"Jasmijn",
			"Jeltje",
			"Jeltsje",
			"Jennigje",
			"Jet",
			"Jetta",
			"Jette",
			"Jo",
			"Johanna",
			"Johanneke",
			"Jolanda",
			"Jozefien",
			"Julia",
			"Juliana",
			"Justine",
			"Karin",
			"Katelijn",
			"Katelijne",
			"Katinka",
			"Katja",
			"Katrien",
			"Katrijn",
			"Katrina",
			"Klasina",
			"Klazina",
			"Kunigonde",
			"Lara",
			"Laura",
			"Laurie",
			"Lea",
			"Lieke",
			"Lien",
			"Lies",
			"Liesbeth",
			"Liese",
			"Liesje",
			"Lieve",
			"Lijsbeth",
			"Linda",
			"Lisa",
			"Lisanne",
			"Liselot",
			"Loes",
			"Lotte",
			"Louisa",
			"Louise",
			"Luus",
			"Lysanne",
			"Maaike",
			"Maartje",
			"Machteld",
			"Madelief",
			"Magda",
			"Magdalena",
			"Manon",
			"Margareta",
			"Margaretha",
			"Margreet",
			"Margriet",
			"Maria",
			"Marianne",
			"Marieke",
			"Marijke",
			"Marijse",
			"Marike",
			"Marilou",
			"Marina",
			"Mariska",
			"Marita",
			"Mariëtte",
			"Marja",
			"Marjan",
			"Marjolein",
			"Marjolijn",
			"Marleen",
			"Marlies",
			"Marloes",
			"Martina",
			"Martine",
			"Mathilde",
			"Maud",
			"Mechteld",
			"Meike",
			"Meintje",
			"Melanie",
			"Melissa",
			"Mia",
			"Michelle",
			"Mieke",
			"Mien",
			"Miep",
			"Mies",
			"Mina",
			"Mirjam",
			"Mirthe",
			"Myrthe",
			"Nes",
			"Neske",
			"Nicole",
			"Nicolet",
			"Nicoline",
			"Noor",
			"Noortje",
			"Nora",
			"Paula",
			"Paulien",
			"Petra",
			"Petronella",
			"Pietronella",
			"Prisca",
			"Rachel",
			"Rebekka",
			"Renate",
			"Renée",
			"Ria",
			"Rika",
			"Rina",
			"Roos",
			"Roosje",
			"Rosa",
			"Rosanne",
			"Sabien",
			"Samantha",
			"Sandra",
			"Sanne",
			"Sara",
			"Saskia",
			"Silke",
			"Sofie",
			"Sophie",
			"Stefana",
			"Stefanie",
			"Sterre",
			"Stien",
			"Susanna",
			"Tamara",
			"Teuna",
			"Thera",
			"Theresia",
			"Thirza",
			"Thyrza",
			"Til",
			"Tina",
			"Tineke",
			"Trees",
			"Trijntje",
			"Trudie",
			"Trudy",
			"Truus",
			"Ursula",
			"Vanessa",
			"Veer",
			"Veerke",
			"Vera",
			"Wilhelmina",
			"Willemijn",
			"Willemina",
			"Wilma",
			"Xandra",
			"Yvonne",
			"Zoë"
		],
		"surname": [
			"Aafjes",
			"Aaij",
			"Aakster",
			"Aaldenberg",
			"Aalders",
			"Aalfs",
			"Aalmers",
			"Aaltink",
			"Aarden",
			"Aarens",
			"Aarle",
			"Aarse",
			"Aarts",
			"Aartsen",
			"Aartsma",
			"Abbes",
			"Abbing",
			"Abbingh",
			"Abbink",
			"Abel",
			"Abelen",
			"Abels",
			"Aben",
			"Abraham",
			"Abrahams",
			"Abram",
			"Abrams",
			"Abspoel",
			"Abt",
			"Achilles",
			"Achterberg",
			"Achterkamp",
			"Achterop",
			"Acker",
			"Addens",
			"Addicks",
			"Addiks",
			"Adema",
			"Admiraal",
			"Adolfs",
			"Adriaans",
			"Adriaansen",
			"Adrichem",
			"Aerssens",
			"Agema",
			"Agterop",
			"Agthoven",
			"Ahlers",
			"Aikema",
			"Akker",
			"Akkerman",
			"Akkermans",
			"Akkersdijk",
			"Alberda",
			"Alberdink",
			"Alberink",
			"Albers",
			"Albersnagel",
			"Alberts",
			"Albring",
			"Albronda",
			"Aldenberg",
			"Aldenkamp",
			"Alderliesten",
			"Alders",
			"Aldershof",
			"Alferdinck",
			"Alferink",
			"Alfons",
			"Aling",
			"Alink",
			"Alkema",
			"Alles",
			"Alma",
			"Altena",
			"Althaus",
			"Althuis",
			"Alting",
			"Altink",
			"Amsing",
			"Ananias",
			"Andela",
			"Andries",
			"Andriessen",
			"Andringa",
			"Angenent",
			"Anholts",
			"Anker",
			"Anneijes",
			"Annevelink",
			"Antema",
			"Antonis",
			"Antonise",
			"Antonisen",
			"Antuma",
			"Aperlo",
			"Appeldoorn",
			"Appelhof",
			"Appelo",
			"Apperlo",
			"Arbeid",
			"Arbeider",
			"Arbeit",
			"Arendonk",
			"Arends",
			"Arendse",
			"Arendsen",
			"Arents",
			"Arentz",
			"Ariesen",
			"Arissen",
			"Arkema",
			"Arkes",
			"Arntz",
			"Arntzen",
			"Arntzenius",
			"Artz",
			"Asjes",
			"Askes",
			"Asselman",
			"Assenberg",
			"Assendorp",
			"Assies",
			"Assink",
			"Atses",
			"Atsma",
			"Aukema",
			"Aukes",
			"Averesch",
			"Aveskamp",
			"Baaiman",
			"Baak",
			"Baanders",
			"Baardwijk",
			"Baars",
			"Baarsma",
			"Baart",
			"Baas",
			"Baasch",
			"Baker",
			"Bakhuizen",
			"Bakker",
			"Banner",
			"Barends",
			"Benscoter",
			"Beringer",
			"Beulen",
			"Beulens",
			"Beullens",
			"Beumers",
			"Bezuidenhout",
			"Boer",
			"Boerefijn",
			"Boon",
			"Bootsma",
			"Borst",
			"Bosch",
			"Bouwmeester",
			"Braband",
			"Brams",
			"Brinkerhoff",
			"Bul",
			"Bulle",
			"Bullens",
			"Carl",
			"Carman",
			"Ceelen",
			"Claasen",
			"Claes",
			"Clark",
			"Cloet",
			"Cloeten",
			"Coeman",
			"Coemans",
			"Coenen",
			"Colijn",
			"Coolen",
			"Couman",
			"Coumans",
			"Crusan",
			"Cuijper",
			"Cuijpers",
			"Cuyper",
			"Cuypers",
			"Daalman",
			"Daalmans",
			"Daelman",
			"Daelmans",
			"Dahl",
			"Dahlman",
			"Dahlmans",
			"Daube",
			"De Cloet",
			"De Groot",
			"De Haven",
			"De Jonckheer",
			"De Jonker",
			"De Klerk",
			"De Kloet",
			"De Snaaijer",
			"De Snaijer",
			"De Veen",
			"De Ven",
			"De Vroom",
			"De Vroome",
			"De Wit",
			"De With",
			"De Witt",
			"De Witte",
			"Derichs",
			"Dierickx",
			"Dirchs",
			"Dircks",
			"Dircksens",
			"Dirckx",
			"Diriks",
			"Dirix",
			"Dirks",
			"Dirkse",
			"Dirksen",
			"Dirkx",
			"Drees",
			"Dreese",
			"Dreesen",
			"Dreesens",
			"Dreessen",
			"Dreessens",
			"Dreyer",
			"Dries",
			"Driessen",
			"Dykstra",
			"Eerkens",
			"Eikenboom",
			"Elzinga",
			"Erckens",
			"Erkens",
			"Evers",
			"Flipse",
			"Flipsen",
			"Fortuin",
			"Fortuyn",
			"Franke",
			"Geelen",
			"Geelens",
			"Geels",
			"Gelen",
			"Gelens",
			"Goossens",
			"Haak",
			"Haanraads",
			"Haanraadts",
			"Haanraats",
			"Haanrath",
			"Haas",
			"Haenraats",
			"Haenraets",
			"Hanraets",
			"Hansen",
			"Hase",
			"Haumann",
			"Heeren",
			"Heijman",
			"Heijmans",
			"Heiman",
			"Heimans",
			"Hendriks",
			"Hendrikx",
			"Hendrix",
			"Herbert",
			"Herberts",
			"Herman",
			"Herrema",
			"Heyman",
			"Heymans",
			"Hoedemaeker",
			"Hoedemaekers",
			"Hoedemaker",
			"Hoedemakers",
			"Hofwegen",
			"Holst",
			"Holt",
			"Holtman",
			"Houben",
			"Houtkooper",
			"Houtman",
			"Hummel",
			"Jacobs",
			"Jacobse",
			"Jacobson",
			"Jans",
			"Jansen",
			"Jansens",
			"Jansing",
			"Jansingh",
			"Jansink",
			"Janssen",
			"Janssens",
			"Janz",
			"Janzen",
			"Joncker",
			"Jonckers",
			"Jonckersen",
			"Jonckheer",
			"Jonker",
			"Jonkers",
			"Joossens",
			"Joosten",
			"Kappel",
			"Karl",
			"Kikkert",
			"King",
			"Klein",
			"Klerk",
			"Klerken",
			"Klerks",
			"Klerkse",
			"Klerkx",
			"Klerx",
			"Kloet",
			"Kloeten",
			"Kloeter",
			"Koeman",
			"Koemans",
			"Kolen",
			"Kolijn",
			"Kollen",
			"Koning",
			"Kool",
			"Koole",
			"Koolen",
			"Kools",
			"Kouman",
			"Koumans",
			"Krantz",
			"Kranz",
			"Krusen",
			"Kuijpers",
			"Kuiper",
			"Kuipers",
			"Langbroek",
			"Lauwens",
			"Lauwers",
			"Leeuwenhoek",
			"Lucas",
			"Lucassen",
			"Lyon",
			"Maas",
			"Maes",
			"Maessen",
			"Marquering",
			"Marqueringh",
			"Marquerink",
			"Mas",
			"Meeuwe",
			"Meeuwes",
			"Meeuwessen",
			"Meeuweszen",
			"Meeuwis",
			"Meeuwissen",
			"Meeuwsen",
			"Meisner",
			"Meissner",
			"Merckx",
			"Mertens",
			"Michel",
			"Miller",
			"Mohren",
			"Moore",
			"Mooren",
			"Mulder",
			"Muyskens",
			"Nagel",
			"Nelissen",
			"Nifterick",
			"Nifterik",
			"Niftrik",
			"Offermans",
			"Ogterop",
			"Oomen",
			"Oorschot",
			"Otten",
			"Pander",
			"Panders",
			"Paulis",
			"Paulissen",
			"Peerenboom",
			"Peeters",
			"Pender",
			"Peter",
			"Peters",
			"Peusen",
			"Philips",
			"Prinsen",
			"Rademaker",
			"Rademakers",
			"Ramaaker",
			"Ramaker",
			"Ramakers",
			"Ramecker",
			"Rameckers",
			"Rask",
			"Raske",
			"Reijnder",
			"Reijnders",
			"Reinder",
			"Reinders",
			"Reynder",
			"Reynders",
			"Richard",
			"Rietveld",
			"Rijnder",
			"Rijnders",
			"Robert",
			"Roggeveen",
			"Roijacker",
			"Roijackers",
			"Roijakker",
			"Roijakkers",
			"Romeijn",
			"Romeijnders",
			"Romeijnsen",
			"Romijn",
			"Romijnders",
			"Romijnsen",
			"Rompa",
			"Rooiakker",
			"Rooiakkers",
			"Rooijakker",
			"Rooijakkers",
			"Roosa",
			"Roosevelt",
			"Rutten",
			"Ryskamp",
			"Samson",
			"Sanna",
			"Schenck",
			"Schermer",
			"Schneider",
			"Schneiders",
			"Schneijder",
			"Schneijders",
			"Schoonenburg",
			"Schoonraad",
			"Schoorel",
			"Schoorl",
			"Schorel",
			"Schrijnemakers",
			"Schuyler",
			"Schwarzenberg",
			"Seeger",
			"Seegers",
			"Seelen",
			"Segers",
			"Segher",
			"Seghers",
			"Severijns",
			"Severins",
			"Sevriens",
			"Silje",
			"Simon",
			"Simonis",
			"Slootmaekers",
			"Smeets",
			"Smets",
			"Smit",
			"Smits",
			"Snaaijer",
			"Snaijer",
			"Sneiders",
			"Sneijder",
			"Sneijders",
			"Sneijer",
			"Sneijers",
			"Snell",
			"Snider",
			"Sniders",
			"Snijder",
			"Snijders",
			"Snyder",
			"Snyders",
			"Specht",
			"Spijker",
			"Ter Avest",
			"Teunissen",
			"Theunissen",
			"Tholberg",
			"Thomas",
			"Tillens",
			"Tunison",
			"Tunneson",
			"Van Aalsburg",
			"Van Aalst",
			"Van Aarle",
			"Van Achteren",
			"Van Achthoven",
			"Van Adrichem",
			"Van Aggelen",
			"Van Agteren",
			"Van Agthoven",
			"Van Akkeren",
			"Van Aller",
			"Van Alphen",
			"Van Alst",
			"Van Altena",
			"Van Althuis",
			"Van Amelsvoort",
			"Van Amersvoort",
			"Van Amstel",
			"Van Andel",
			"Van Andringa",
			"Van Ankeren",
			"Van Antwerp",
			"Van Antwerpen",
			"Van Apeldoorn",
			"Van Arendonk",
			"Van As",
			"Van Asch",
			"Van Assen",
			"Van Baarle",
			"Van Bokhoven",
			"Van Breda",
			"Van Bueren",
			"Van Buggenum",
			"Van Buiren",
			"Van Buren",
			"Van Can",
			"Van Cann",
			"Van Canne",
			"Van Daal",
			"Van Daalen",
			"Van Dael",
			"Van Daele",
			"Van Dale",
			"Van Dalen",
			"Van De Laar",
			"Van De Vliert",
			"Van Den Akker",
			"Van Den Andel",
			"Van Denend",
			"Van Der Aart",
			"Van Der As",
			"Van Der Beek",
			"Van Der Berg",
			"Van Der Hout",
			"Van Der Laar",
			"Van Der See",
			"Van Der Stoep",
			"Van Der Veen",
			"Van Der Ven",
			"Van Der Venn",
			"Van Der Venne",
			"Van Der Vennen",
			"Van Der Zee",
			"Van Donk",
			"Van Haanraads",
			"Van Haanraats",
			"Van Haanrade",
			"Van Haanrath",
			"Van Haenraats",
			"Van Haenraets",
			"Van Hanraets",
			"Van Hassel",
			"Van Hautem",
			"Van Hautum",
			"Van Heel",
			"Van Herten",
			"Van Hofwegen",
			"Van Horn",
			"Van Hout",
			"Van Houte",
			"Van Houtem",
			"Van Houten",
			"Van Houttum",
			"Van Houtum",
			"Van Kan",
			"Van Kann",
			"Van Kanne",
			"Van Laar",
			"Van Laren",
			"Van Leeuwenhoeck",
			"Van Leeuwenhoek",
			"Van Middelburg",
			"Van Middlesworth",
			"Van Nifterick",
			"Van Nifterik",
			"Van Niftrik",
			"Van Ogtrop",
			"Van Oirschot",
			"Van Oirschotten",
			"Van Oorschot",
			"Van Ophoven",
			"Van Peij",
			"Van Pey",
			"Van Rompa",
			"Van Rompaeij",
			"Van Rompaey",
			"Van Rompaij",
			"Van Rompay",
			"Van Rompaye",
			"Van Rompu",
			"Van Rompuy",
			"Van Rossem",
			"Van Rossum",
			"Van Rumpade",
			"Van Schoorel",
			"Van Schoorl",
			"Vandale",
			"Vandroogenbroeck",
			"Vann",
			"Vroom"
		]
	},
	"japanese": {
		"female": [
			"ai",
			"aiko",
			"aimi",
			"aina",
			"airi",
			"akane",
			"akemi",
			"aki",
			"akiko",
			"akira",
			"ami",
			"aoi",
			"asuka",
			"atsuko",
			"aya",
			"ayaka",
			"ayako",
			"ayame",
			"ayane",
			"ayano",
			"chika",
			"chikako",
			"chinatsu",
			"chiyo",
			"chiyoko",
			"cho",
			"chou",
			"chouko",
			"emi",
			"etsuko",
			"hana",
			"hanako",
			"haru",
			"haruka",
			"haruko",
			"haruna",
			"hikari",
			"hikaru",
			"hina",
			"hinata",
			"hiroko",
			"hitomi",
			"honoka",
			"hoshi",
			"hoshiko",
			"hotaru",
			"izumi",
			"junko",
			"kaede",
			"kanon",
			"kaori",
			"kaoru",
			"kasumi",
			"kazue",
			"kazuko",
			"keiko",
			"kiku",
			"kimiko",
			"kiyoko",
			"kohaku",
			"koharu",
			"kokoro",
			"kotone",
			"kumiko",
			"kyo",
			"kyou",
			"mai",
			"makoto",
			"mami",
			"manami",
			"mao",
			"mariko",
			"masami",
			"masuyo",
			"mayu",
			"megumi",
			"mei",
			"michi",
			"michiko",
			"midori",
			"mika",
			"miki",
			"miku",
			"minako",
			"minato",
			"mio",
			"misaki",
			"mitsuko",
			"miu",
			"miyako",
			"miyu",
			"mizuki",
			"moe",
			"momoka",
			"momoko",
			"moriko",
			"nana",
			"nanami",
			"naoko",
			"naomi",
			"natsuki",
			"natsuko",
			"natsumi",
			"noa",
			"noriko",
			"ran",
			"rei",
			"ren",
			"riko",
			"rin",
			"rina",
			"rio",
			"sachiko",
			"saki",
			"sakura",
			"sakurako",
			"satomi",
			"sayuri",
			"setsuko",
			"shinju",
			"shinobu",
			"shiori",
			"shizuka",
			"shun",
			"sora",
			"sumiko",
			"suzu",
			"suzume",
			"takako",
			"takara",
			"tamiko",
			"tomiko",
			"tomoko",
			"tomomi",
			"tsubaki",
			"tsubame",
			"tsubasa",
			"tsukiko",
			"ume",
			"umeko",
			"wakana",
			"yasu",
			"yoko",
			"yoshi",
			"yoshiko",
			"youko",
			"yua",
			"yui",
			"yuina",
			"yuki",
			"yukiko",
			"yuko",
			"yumi",
			"yumiko",
			"yuri",
			"yuu",
			"yuuka",
			"yuuki",
			"yuuko",
			"yuuna",
			"yuzuki"
		],
		"male": [
			"akio",
			"akira",
			"aoi",
			"arata",
			"ayumu",
			"daichi",
			"daiki",
			"daisuke",
			"goro",
			"gorou",
			"hachiro",
			"hachirou",
			"haru",
			"haruki",
			"haruto",
			"hayate",
			"hayato",
			"hibiki",
			"hideaki",
			"hideki",
			"hideyoshi",
			"hikaru",
			"hinata",
			"hiraku",
			"hiroshi",
			"hiroto",
			"hotaka",
			"ichiro",
			"ichirou",
			"isamu",
			"itsuki",
			"jiro",
			"jirou",
			"juro",
			"jurou",
			"kaede",
			"kaito",
			"kaoru",
			"katashi",
			"katsu",
			"katsuo",
			"katsuro",
			"katsurou",
			"kazuki",
			"kazuo",
			"ken",
			"ken'ichi",
			"kenji",
			"kenshin",
			"kenta",
			"kichiro",
			"kichirou",
			"kiyoshi",
			"kohaku",
			"kouki",
			"kouta",
			"kuro",
			"kurou",
			"kyo",
			"kyou",
			"makoto",
			"masaru",
			"michi",
			"minoru",
			"naoki",
			"noboru",
			"nobu",
			"noburu",
			"nobuyuki",
			"nori",
			"osamu",
			"ren",
			"riku",
			"rikuto",
			"rokuro",
			"rokurou",
			"ryo",
			"ryoichi",
			"ryota",
			"ryou",
			"ryouichi",
			"ryouta",
			"ryuu",
			"ryuunosuke",
			"saburo",
			"saburou",
			"shichiro",
			"shichirou",
			"shin",
			"shinobu",
			"shiori",
			"shiro",
			"shirou",
			"sho",
			"shota",
			"shou",
			"shouta",
			"shun",
			"sora",
			"sota",
			"souma",
			"souta",
			"susumu",
			"taichi",
			"taiki",
			"takahiro",
			"takashi",
			"takehiko",
			"takeshi",
			"takuma",
			"takumi",
			"taro",
			"tarou",
			"tsubasa",
			"yamato",
			"yasu",
			"yori",
			"yoshi",
			"yoshiro",
			"yoshirou",
			"youta",
			"yuki",
			"yuu",
			"yuudai",
			"yuuki",
			"yuuma",
			"yuuta",
			"yuuto"
		],
		"surname": [
			"akiyama",
			"fujimoto",
			"fujioka",
			"fukui",
			"hamasaki",
			"hashimoto",
			"hayashi",
			"himura",
			"hisakawa",
			"honda",
			"inoue",
			"ito",
			"kagome",
			"kato",
			"kawaguchi",
			"kimura",
			"kita",
			"kobayashi",
			"koizumi",
			"kurosawa",
			"maki",
			"matsumoto",
			"matsuoka",
			"matsushita",
			"minami",
			"miyamoto",
			"mizushima",
			"mori",
			"moto",
			"nakahara",
			"nakamura",
			"nakano",
			"nishimura",
			"oshiro",
			"saito",
			"sato",
			"shizuka",
			"suzuki",
			"tachibana",
			"takahashi",
			"takenaka",
			"tanaka",
			"tsukino",
			"tsukuda",
			"ueda",
			"ueno",
			"wakahisa",
			"watanabe",
			"yamada",
			"yamaguchi",
			"yamamoto",
			"yamauchi",
			"yoshida",
			"yukimura"
		]
	},
	"turkish": {
		"male": [
			"abdullah",
			"adem",
			"adnan",
			"ahmed",
			"ahmet",
			"ali",
			"alim",
			"alp",
			"altan",
			"arda",
			"arslan",
			"asil",
			"aslan",
			"ata",
			"atilla",
			"attila",
			"ayberk",
			"aydin",
			"aytaç",
			"aziz",
			"bahadir",
			"bariş",
			"bayram",
			"behram",
			"berat",
			"berk",
			"berkant",
			"berker",
			"bilge",
			"bora",
			"buğra",
			"bülent",
			"bulut",
			"bünyamin",
			"burak",
			"burçin",
			"çağatay",
			"can",
			"cem",
			"cemal",
			"cemil",
			"cengiz",
			"cenk",
			"çetin",
			"cihan",
			"cihangir",
			"coşkun",
			"cumhur",
			"demir",
			"deniz",
			"derya",
			"devrim",
			"direnç",
			"doruk",
			"duygu",
			"ediz",
			"egemen",
			"ekrem",
			"elvan",
			"emin",
			"emir",
			"emirhan",
			"emre",
			"ender",
			"enes",
			"engin",
			"enis",
			"enver",
			"erdem",
			"eren",
			"erkin",
			"erol",
			"eser",
			"evren",
			"fahri",
			"fatih",
			"feridun",
			"ferit",
			"fikri",
			"firat",
			"fuat",
			"galip",
			"göker",
			"gürsel",
			"hakan",
			"halil",
			"halim",
			"haluk",
			"harun",
			"hasan",
			"hayati",
			"haydar",
			"hayri",
			"hikmet",
			"hüseyin",
			"hüsnü",
			"ibrahim",
			"ihsan",
			"ilhami",
			"ilhan",
			"ilkay",
			"ilker",
			"ilkin",
			"isa",
			"iskender",
			"ismail",
			"ismet",
			"izzet",
			"kaan",
			"kadir",
			"kadri",
			"kağan",
			"kasim",
			"kemal",
			"kerem",
			"kerim",
			"kivanç",
			"koray",
			"kudret",
			"kuzey",
			"levent",
			"mahmut",
			"mahzun",
			"mazhar",
			"mehmed",
			"mehmet",
			"mert",
			"mesud",
			"mesut",
			"metin",
			"mücahit",
			"muhammed",
			"muhammet",
			"mümtaz",
			"murat",
			"musa",
			"mustafa",
			"nur",
			"ömer",
			"onur",
			"orhan",
			"osman",
			"ozan",
			"özgür",
			"ramazan",
			"recep",
			"ridvan",
			"riza",
			"rizvan",
			"sabah",
			"sabri",
			"şahin",
			"savaş",
			"şehzade",
			"selâhattin",
			"selahattin",
			"selim",
			"semih",
			"şemsettin",
			"serhan",
			"serhat",
			"serkan",
			"soner",
			"şukri",
			"süleyman",
			"tahir",
			"talât",
			"taner",
			"tarik",
			"taylan",
			"tayyip",
			"temel",
			"timur",
			"tolga",
			"toygar",
			"tunç",
			"tuncay",
			"turgay",
			"tutku",
			"ufuk",
			"uğur",
			"ulvi",
			"ümit",
			"umut",
			"utku",
			"vahit",
			"volkan",
			"yağmur",
			"yahya",
			"yakup",
			"yalçin",
			"yavuz",
			"yiğit",
			"yildirim",
			"yilmaz",
			"yunus",
			"yusuf",
			"zeki"
		],
		"female": [
			"adalet",
			"arzu",
			"asli",
			"asuman",
			"aydan",
			"aygül",
			"aygün",
			"ayla",
			"aylin",
			"aynur",
			"ayşe",
			"aysel",
			"aysu",
			"aysun",
			"aytaç",
			"azra",
			"bahar",
			"banu",
			"başak",
			"behiye",
			"belgin",
			"berna",
			"berrak",
			"beste",
			"beyza",
			"bihter",
			"bilge",
			"burçin",
			"burcu",
			"çağla",
			"çağri",
			"canan",
			"ceren",
			"damla",
			"deniz",
			"derya",
			"didem",
			"dilan",
			"dilara",
			"dilay",
			"dilek",
			"duygu",
			"ebru",
			"ece",
			"ecrin",
			"eda",
			"ekin",
			"elif",
			"elmas",
			"elvan",
			"emel",
			"emine",
			"enise",
			"esen",
			"eser",
			"esin",
			"esra",
			"evren",
			"eylül",
			"fatma",
			"fatoş",
			"feray",
			"feriha",
			"fidan",
			"fikriye",
			"filiz",
			"funda",
			"fusun",
			"gamze",
			"gaye",
			"gizem",
			"gonca",
			"gözde",
			"gül",
			"gülay",
			"gülbahar",
			"gülden",
			"gülistan",
			"gülizar",
			"gülten",
			"günay",
			"handan",
			"hande",
			"hatice",
			"havva",
			"hazan",
			"hülya",
			"ilkay",
			"ilknur",
			"ipek",
			"irem",
			"irmak",
			"kader",
			"kadriye",
			"kelebek",
			"kiraz",
			"lale",
			"latife",
			"leyla",
			"makbule",
			"mehtap",
			"melek",
			"meltem",
			"meryem",
			"müge",
			"nadiye",
			"naz",
			"nazli",
			"nehir",
			"nergis",
			"nermin",
			"nesrin",
			"nilüfer",
			"nimet",
			"nur",
			"nuray",
			"nurgül",
			"nurten",
			"özge",
			"özgür",
			"özlem",
			"pembe",
			"pinar",
			"reyhan",
			"sabah",
			"sabriye",
			"safiye",
			"şahnaz",
			"sanem",
			"şebnem",
			"seda",
			"sedef",
			"şehrazad",
			"şehrazat",
			"semiha",
			"şenay",
			"şermin",
			"serpil",
			"sevda",
			"sevgi",
			"sevil",
			"sevinç",
			"sidika",
			"sila",
			"simge",
			"şirin",
			"su",
			"şukriye",
			"şule",
			"tuba",
			"tuğba",
			"tülay",
			"tutku",
			"ülkü",
			"ulviye",
			"umut",
			"yağmur",
			"yasemin",
			"yeşim",
			"yeter",
			"yildiz",
			"yonca",
			"zehra",
			"zekiye",
			"zeynep",
			"ziynet"
		],
		"surname": [
			"aksoy",
			"albaf",
			"arap",
			"aslan",
			"avci",
			"badem",
			"balik",
			"bardakçi",
			"bariş",
			"binici",
			"burakgazi",
			"değirmenci",
			"demir",
			"demirci",
			"ekmekçi",
			"karga",
			"kartal",
			"katirci",
			"koç",
			"küçük",
			"kundakçi",
			"macar",
			"marangoz",
			"mataraci",
			"peynirci",
			"sadik",
			"solak",
			"teke",
			"terzi",
			"tilki",
			"tiryaki",
			"uzun",
			"yilmaz"
		]
	},
	"native american": {
		"female": [
			"abedabun",
			"abequa",
			"abeque",
			"abey",
			"abeytu",
			"abeytzi",
			"adoette",
			"adsila",
			"aiyana",
			"alameda",
			"alaqua",
			"alawa",
			"aleshanee",
			"algoma",
			"alsoomse",
			"altsoba",
			"amadahy",
			"amitola",
			"anaba",
			"anemy",
			"angeni",
			"angpetu",
			"angwusnasomtaqa",
			"ankti",
			"anna",
			"aponi",
			"aquene",
			"atepa",
			"awanatu",
			"awenasa",
			"awendela",
			"awinita",
			"ayasha",
			"ayashe",
			"ayita",
			"bena",
			"bly",
			"catori",
			"cha'kwaina",
			"chapa",
			"chapawee",
			"cha'risa",
			"chenoa",
			"chepi",
			"chilam",
			"chimalis",
			"chitsa",
			"chochmingwu",
			"cholena",
			"chosovi",
			"chosposi",
			"chu'mana",
			"chumani",
			"chu'si",
			"cocheta",
			"dena",
			"doba",
			"doli",
			"donoma",
			"dowanhowee",
			"dyani",
			"ehawee",
			"elu",
			"enola",
			"etenia",
			"eyota",
			"fala",
			"flo",
			"gaho",
			"galilahi",
			"genesee",
			"hachi",
			"haiwee",
			"hakidonmuya",
			"haloke",
			"halona",
			"hantaywee",
			"hateya",
			"hausis",
			"hausisse",
			"hehewuti",
			"helki",
			"honovi",
			"huata",
			"humita",
			"hurit",
			"huyana",
			"imala",
			"isi",
			"istas",
			"ituha",
			"izusa",
			"kachina",
			"kai",
			"kakawangwa",
			"kaliska",
			"kanti",
			"kasa",
			"kay",
			"keegsquaw",
			"keezheekoni",
			"kewanee",
			"kimama",
			"kimi",
			"kimimela",
			"kineks",
			"kiwidinok",
			"koko",
			"kokyangwuti",
			"kuwanlelenta",
			"kuwanyamtiwa",
			"kuwanyauma",
			"kwanita",
			"lenmana",
			"leotie",
			"litonya",
			"lomahongva",
			"lomasi",
			"lulu",
			"luyu",
			"macha",
			"magaskawee",
			"magena",
			"mahal",
			"mai",
			"maka",
			"makawee",
			"makkitotosimew",
			"malia",
			"malila",
			"manaba",
			"mansi",
			"mapiya",
			"maralah",
			"mausi",
			"meda",
			"meli",
			"memdi",
			"meoquanee",
			"miakoda",
			"migina",
			"migisi",
			"mika",
			"mimiteh",
			"minal",
			"mitena",
			"muna",
			"nadie",
			"nahimana",
			"namid",
			"nara",
			"nascha",
			"nashota",
			"nata",
			"nijlon",
			"nina",
			"ninovan",
			"nita",
			"nittawosew",
			"nituna",
			"nokomis",
			"nova",
			"nukpana",
			"numees",
			"nuna",
			"nuttah",
			"odahingum",
			"odina",
			"ogin",
			"ojinjintka",
			"olathe",
			"ominotago",
			"omusa",
			"onawa",
			"onida",
			"oota dabun",
			"opa",
			"orenda",
			"pakwa",
			"pamuy",
			"papina",
			"pati",
			"pauwau",
			"pavati",
			"pazi",
			"pelipa",
			"peta",
			"petah",
			"petunia",
			"polikwaptiwa",
			"poloma",
			"posala",
			"powaqa",
			"ptaysanwee",
			"pules",
			"quanah",
			"rozene",
			"sahkyo",
			"salali",
			"sapata",
			"shada",
			"sheshebens",
			"shuman",
			"sihu",
			"sikya",
			"sinopa",
			"sipatu",
			"sisika",
			"sitala",
			"snana",
			"sokanon",
			"sokw",
			"sonoma",
			"sooleawa",
			"soyala",
			"stinka",
			"suleta",
			"suni",
			"sunki",
			"taa",
			"tablita",
			"tadewi",
			"tahki",
			"taima",
			"taini",
			"taipa",
			"takala",
			"tala",
			"talulah",
			"tama",
			"tansy",
			"tayanita",
			"tehya",
			"tiponi",
			"tis-see-woo-na-tis",
			"tiva",
			"tolikna",
			"totsi",
			"tusa",
			"tuuwa",
			"tuwa",
			"una",
			"unega",
			"urika",
			"usdi",
			"utina",
			"wachiwi",
			"waki",
			"waneta",
			"wapun",
			"wawetseka",
			"weayaya",
			"wenona",
			"wicapi wakan",
			"wichahpi",
			"wikimak",
			"winema",
			"winona",
			"wuti",
			"wyanet",
			"wyome",
			"yamka",
			"yanaba",
			"yatokya",
			"yenene",
			"yepa",
			"yoki",
			"yona",
			"yutu",
			"zaltana",
			"zihna",
			"ziracuny",
			"zitkala",
			"zonta"
		],
		"male": [
			"abooksigun",
			"abukcheech",
			"achachak",
			"achak",
			"adahy",
			"adoeette",
			"ahanu",
			"ahiga",
			"ahmik",
			"ahote",
			"ahtunowhiho",
			"akando",
			"akecheta",
			"akule",
			"alo",
			"anakausuen",
			"anoki",
			"apenimon",
			"apiatan",
			"apisi",
			"aponivi",
			"aranck",
			"ashkii",
			"askook",
			"askuwheteau",
			"ata'halne",
			"atohi",
			"atsadi",
			"atsidi",
			"avonaco",
			"awan",
			"ayawamat",
			"bemossed",
			"beshkno",
			"bidziil",
			"bilagaana",
			"bimisi",
			"bodaway",
			"cha'akmongwi",
			"chankoowashtay",
			"chansomps",
			"chapa",
			"chas chunk a",
			"chatan",
			"cha'tima",
			"chavatangakwunua",
			"chayton",
			"chesmu",
			"cheveyo",
			"chochmo",
			"chochokpi",
			"chochuschuvio",
			"chogan",
			"choovio",
			"choviohoya",
			"chowilawu",
			"chu'a",
			"chuchip",
			"chunta",
			"ciqala",
			"cochise",
			"dakota",
			"dakotah",
			"degotoga",
			"delsin",
			"demothi",
			"dichali",
			"diwali",
			"dohate",
			"dohosan",
			"dustu",
			"dyami",
			"elan",
			"elki",
			"elsu",
			"eluwilussit",
			"enapay",
			"enkoodabaoo",
			"enyeto",
			"etchemin",
			"etlelooaat",
			"etu",
			"ezhno",
			"gaagii",
			"gad",
			"gawonii",
			"gomda",
			"gosheven",
			"guyapi",
			"hahkethomemah",
			"hahnee",
			"hakan",
			"halian",
			"hania",
			"hanska",
			"harkahome",
			"hassun",
			"hastiin",
			"hawiovi",
			"he lush ka",
			"heammawihio",
			"helaku",
			"helki",
			"heskovizenako",
			"hesutu",
			"hevataneo",
			"hevovitastamiutsto",
			"hiamovi",
			"hinto",
			"hohnihohkaiyohos",
			"hok'ee",
			"holata",
			"honani",
			"honaw",
			"honiahaka",
			"honon",
			"honovi",
			"hotah",
			"hototo",
			"hotuaekhaashtait",
			"howahkan",
			"howi",
			"huritt",
			"igasho",
			"iiniwa",
			"illanipi",
			"inteus",
			"istaqa",
			"istu",
			"ituha",
			"iye",
			"jacy",
			"jolon",
			"kachada",
			"kaga",
			"kajika",
			"kangee",
			"kanuna",
			"kele",
			"keme",
			"kesegowaase",
			"kestejoo",
			"kilchii",
			"kitchi",
			"kiyiya",
			"klah",
			"knoton",
			"kohana",
			"kohkahycumest",
			"koi",
			"kolichiyaw",
			"kosumi",
			"kotori",
			"kuckunniwi",
			"kuruk",
			"kusinut",
			"kwahu",
			"kwatoko",
			"lallo",
			"langundo",
			"lansa",
			"lapu",
			"len",
			"lena",
			"lenno",
			"leyti",
			"lise",
			"liwanu",
			"lokni",
			"lonan",
			"lonato",
			"lootah",
			"lusio",
			"machakw",
			"machk",
			"mahkah",
			"mahpee",
			"makkapitew",
			"makya",
			"mammedaty",
			"mantotohpa",
			"masichuvio",
			"maska",
			"matchitehew",
			"matchitisiw",
			"mato",
			"matoskah",
			"matunaagd",
			"matwau",
			"maza blaska",
			"megedagik",
			"mekledoodum",
			"meturato",
			"micco",
			"mika",
			"mikasi",
			"milap",
			"minco",
			"mingan",
			"minninnewah",
			"misu",
			"mochni",
			"mohe",
			"mojag",
			"mokatavatah",
			"moketavato",
			"moketaveto",
			"moketoveto",
			"moki",
			"mokovaoto",
			"molimo",
			"mongwau",
			"motavato",
			"motega",
			"muata",
			"mukki",
			"muraco",
			"naalnish",
			"naalyehe ya sidahi",
			"nahcomence",
			"nahiossi",
			"nakai",
			"napayshni",
			"nashashuk",
			"nashoba",
			"nastas",
			"nawat",
			"nawkaw",
			"nayati",
			"nayavu",
			"neeheeoeewootis",
			"neka",
			"nigan",
			"niichaad",
			"nikan",
			"nikiti",
			"nitis",
			"nixkamich",
			"niyol",
			"nodin",
			"nokosi",
			"nootau",
			"nosh",
			"noshi",
			"notaku",
			"nukpana",
			"ocumwhowurst",
			"ocunnowhurst",
			"odakotah",
			"ogaleesha",
			"ogima",
			"ogleesha",
			"ohanko",
			"ohanzee",
			"ohcumgache",
			"ohitekah",
			"ohiyesa",
			"okhmhaka",
			"omawnakw",
			"onacona",
			"osceola",
			"otaktay",
			"otetiani",
			"otoahhastis",
			"otoahnacto",
			"ouray",
			"pachu'a",
			"paco",
			"pahana",
			"pallaton",
			"pannoowau",
			"pat",
			"patamon",
			"patwin",
			"pay",
			"payat",
			"payatt",
			"paytah",
			"peopeo",
			"pezi",
			"pimne",
			"pitalesharo",
			"powwaw",
			"qaletaqa",
			"qochata",
			"quanah",
			"rowtag",
			"sahale",
			"sahkonteic",
			"sakima",
			"samoset",
			"sani",
			"satanta",
			"segenam",
			"setangya",
			"setimika",
			"sewati",
			"shappa",
			"shilah",
			"shiriki",
			"shiye",
			"shizhe'e",
			"shoemowetochawcawe",
			"sicheii",
			"sike",
			"sik'is",
			"sikyahonaw",
			"sikyatavo",
			"sipatu",
			"siwili",
			"skah",
			"songaa",
			"sowi'ngwa",
			"sucki",
			"sunukkuhkau",
			"tadi",
			"tadzi",
			"tahkeome",
			"tahmelapachme",
			"taima",
			"takoda",
			"tangakwunu",
			"tapco",
			"tashunka",
			"tasunke",
			"tatanka ptecila",
			"tatonga",
			"tawa",
			"teetonka",
			"teluhci",
			"telutci",
			"tihkoosue",
			"t'iis",
			"tocho",
			"togquos",
			"tohopka",
			"tokala",
			"tooantuh",
			"tse",
			"tsiishch'ili",
			"tsiyi",
			"tuari",
			"tuketu",
			"tumu",
			"tupi",
			"tyee",
			"unaduti",
			"uzumati",
			"vaiveahtoish",
			"viho",
			"vipponah",
			"vohkinne",
			"voistitoevitz",
			"voisttitoevetz",
			"vokivocummast",
			"waban",
			"wahanassatta",
			"wahchinksapa",
			"wahchintonka",
			"wahkan",
			"wahkoowah",
			"wakiza",
			"wamblee",
			"wambleesha",
			"wambli waste",
			"wanageeska",
			"wanahton",
			"wanikiy",
			"wapi",
			"waquini",
			"weayaya",
			"wematin",
			"wemilat",
			"wicasa",
			"wikvaya",
			"wilu",
			"wohehiv",
			"wokaihwokomas",
			"wuliton",
			"wuyi",
			"wynono",
			"yaholo",
			"yahto",
			"yancy",
			"yanisin",
			"yas",
			"yiska",
			"yuma"
		],
		"surname": []
	},
	"demonic": {
		"first": [
			"Ab",
			"Ag",
			"Ai",
			"Al",
			"Am",
			"An",
			"And",
			"Ar",
			"Art",
			"As",
			"Ast",
			"Ay",
			"Ba",
			"Bar",
			"Bath",
			"Be",
			"Bé",
			"Bel",
			"Bél",
			"Ber",
			"Bert",
			"Bi",
			"Bif",
			"Bil",
			"Bit",
			"Bo",
			"Bot",
			"Bu",
			"Buc",
			"Bug",
			"Bul",
			"Bun",
			"Ca",
			"Caa",
			"Car",
			"Cer",
			"Cha",
			"Ci",
			"Cim",
			"Co",
			"Coa",
			"Cro",
			"D",
			"Da",
			"Dan",
			"Dant",
			"De",
			"Dex",
			"Di",
			"Dis",
			"Dist",
			"Diu",
			"Dra",
			"Du",
			"Duc",
			"E",
			"El",
			"Fe",
			"Fen",
			"Fla",
			"Flau",
			"Fo",
			"Foc",
			"For",
			"Fur",
			"Ga",
			"Gaa",
			"Gam",
			"Gaz",
			"Ge",
			"Gem",
			"Gla",
			"Glas",
			"Gor",
			"Gre",
			"Gu",
			"Gus",
			"Ha",
			"Haa",
			"Hal",
			"Hau",
			"Ho",
			"I",
			"Ip",
			"La",
			"Lab",
			"Le",
			"Ler",
			"Lo",
			"Lor",
			"Lu",
			"Luc",
			"Ma",
			"Mac",
			"Mach",
			"Mal",
			"Mar",
			"Mo",
			"Mor",
			"Mu",
			"Mur",
			"O",
			"Or",
			"Os",
			"Oz",
			"Pa",
			"Pai",
			"Par",
			"Pho",
			"Phoe",
			"Poy",
			"Pro",
			"Pru",
			"Pu",
			"Pur",
			"Ra",
			"Rau",
			"Ro",
			"Ron",
			"Sa",
			"Sab",
			"Sal",
			"Sam",
			"Se",
			"See",
			"Sha",
			"Si",
			"Sid",
			"Sit",
			"Sto",
			"Sy",
			"Tu",
			"U",
			"Uv",
			"Va",
			"Val",
			"Vap",
			"Vas",
			"Ve",
			"Vep",
			"Vi",
			"Vip",
			"Vo",
			"Vol",
			"Vu",
			"Vua",
			"Za",
			"Zag",
			"Ze",
			"Zep"
		],
		"inner": [
			"ab",
			"ag",
			"al",
			"ar",
			"ba",
			"be",
			"ber",
			"bi",
			"bol",
			"ca",
			"cal",
			"car",
			"cho",
			"chos",
			"cu",
			"cub",
			"di",
			"dit",
			"do",
			"don",
			"dra",
			"dro",
			"dus",
			"dusc",
			"e",
			"ej",
			"en",
			"er",
			"gen",
			"gi",
			"gin",
			"go",
			"i",
			"ig",
			"le",
			"li",
			"lig",
			"ma",
			"mal",
			"me",
			"mej",
			"mer",
			"mi",
			"mig",
			"mo",
			"mor",
			"moy",
			"nac",
			"ne",
			"ni",
			"no",
			"oc",
			"ol",
			"oy",
			"pha",
			"phar",
			"pu",
			"pul",
			"ra",
			"rab",
			"re",
			"ri",
			"ro",
			"rob",
			"sa",
			"sag",
			"si",
			"so",
			"sta",
			"star",
			"sto",
			"stol",
			"sy",
			"ta",
			"tal",
			"tar",
			"ti",
			"to",
			"tol",
			"u",
			"uar",
			"ub",
			"ug",
			"ur",
			"us",
			"y"
		],
		"last": [
			"a",
			"aal",
			"al",
			"alphas",
			"am",
			"an",
			"ap",
			"ar",
			"as",
			"at",
			"ax",
			"ay",
			"bar",
			"bas",
			"bia",
			"cal",
			"cas",
			"cay",
			"cell",
			"chin",
			"cias",
			"day",
			"dée",
			"dras",
			"e",
			"el",
			"enix",
			"er",
			"ere",
			"es",
			"ès",
			"eth",
			"eve",
			"far",
			"fas",
			"flas",
			"for",
			"frons",
			"fur",
			"gan",
			"genti",
			"gin",
			"go",
			"gor",
			"gos",
			"hin",
			"ho",
			"ial",
			"ias",
			"ie",
			"ies",
			"im",
			"in",
			"ina",
			"ion",
			"is",
			"ith",
			"ius",
			"ix",
			"je",
			"ke",
			"la",
			"lac",
			"lam",
			"las",
			"lion",
			"lius",
			"lor",
			"m",
			"mer",
			"mon",
			"mur",
			"my",
			"nac",
			"nay",
			"ne",
			"neus",
			"nex",
			"nix",
			"nock",
			"o",
			"on",
			"or",
			"os",
			"oth",
			"ove",
			"p",
			"par",
			"pes",
			"phas",
			"pos",
			"r",
			"raie",
			"raje",
			"ras",
			"rax",
			"ray",
			"re",
			"res",
			"ri",
			"rith",
			"rons",
			"ros",
			"roth",
			"ry",
			"s",
			"san",
			"say",
			"se",
			"sion",
			"son",
			"soyn",
			"sya",
			"teth",
			"thas",
			"thin",
			"thym",
			"ti",
			"tis",
			"tos",
			"tri",
			"try",
			"tur",
			"uall",
			"ula",
			"um",
			"ur",
			"us",
			"val",
			"ve",
			"vos",
			"x",
			"y",
			"ya",
			"ym",
			"ze",
			"zon"
		]
	}
}
},{}],2:[function(require,module,exports){
'use strict';

var randomizer = require('./randomizer.js');
var random_table = require('./random_table.js');
var table_normalizer = require('./table_normalizer.js');
var RandomName = require('./random_name.js');
var r_helpers = require('./r_helpers.js');
var namedata = require('../sample/names.json');
var npc_gen = require('./npc.js')(randomizer);

module.exports = {
	randomizer: randomizer,
	RandomTable: random_table,
	TableNormalizer: table_normalizer,
	random_name: new RandomName(randomizer, namedata),
	r_helpers: r_helpers,
	npc_generator: npc_gen
};

},{"../sample/names.json":1,"./npc.js":3,"./r_helpers.js":4,"./random_name.js":5,"./random_table.js":6,"./randomizer.js":7,"./table_normalizer.js":8}],3:[function(require,module,exports){
'use strict';

/**
 * npc_gen: pass in the randomizer so we can return an object that can use the shared randomizer instance
 * @return {Object} npc functions
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function npc_gen(randomizer) {
	/**
  * Object to store NPC constructors.
  * each constructor (except the base one) is based on a schema
  */
	var NPC = {};
	/**
  * The base prototype for NPC constructors. From this schemas are used to make differing constructions
  */
	NPC.Base = function () {};
	/**
  * Just a unique identifier that can be used for storage/retrieval
  */
	NPC.Base.prototype.id = 0;
	/**
  * Name of the schema used for the NPC
  */
	NPC.Base.prototype.schema = '';
	/**
  * The NPC's fields as set by the schema
  */
	NPC.Base.prototype.fields = [];
	/**
  * Schema assigned helper functions
  */
	NPC.Base.prototype.helpers = {};
	/**
  * set defaults on the fields
  * usually this would involve calling random tables
  */
	NPC.Base.prototype.initialize = function () {
		var _this = this;

		var schema_fields = Schemas[this.schema].fields;
		var fields = Object.keys(this.fields);
		fields.forEach(function (f) {
			var sch = schema_fields.find(function (v) {
				return v.key === f;
			});
			if (sch) {
				if (sch.default) {
					_this.fields[f] = sch.default;
					return;
				}
				if (sch.source && sch.source !== '') {
					// parse source into something randomizer can use...
					var src_temp = void 0;
					if (sch.type === 'function') {
						var func = new Function(sch.source);
						src_temp = func.call(_this);
					} else {
						src_temp = sch.source;
					}
					// console.log(src_temp);
					if (sch.type === 'array') {
						var ct = sch.count ? sch.count : 1; // ???
						for (var i = 0; i < ct; i++) {
							_this.fields[f].push(randomizer.convertToken(src_temp));
						}
					} else {
						_this.fields[f] = randomizer.convertToken(src_temp);
					}
				}
			}
		});
	};
	/**
  * Take an empty object and set the fields
  * @todo should we account for id and schema too?
  * @param {Object} fields data for the fields
  */
	NPC.Base.prototype.set = function (fields) {
		var _this2 = this;

		if ((typeof fields === 'undefined' ? 'undefined' : _typeof(fields)) !== 'object') {
			return;
		}
		var props = Object.keys(fields);
		props.forEach(function (p) {
			if (_this2.fields[p]) {
				_this2.fields[p] = fields[p];
			}
		});
	};

	/**
  * Object store for registered schemas
  */
	var Schemas = {};

	/**
  * function to make a new NPC constructor
  * constructor is added to NPC[schema.key]
  * @param {Object} schema NPC schema object to base on the constructor
  * @return {null}
  */
	var registerSchema = function registerSchema(schema) {
		if (!schema.key || schema.key === 'base' || !Array.isArray(schema.fields)) {
			return null;
			// throw exception?
		}
		// store it for later reference
		Schemas[schema.key] = schema;
		// add this schema to the NPC object so we can use it as a constructor
		// this could overwrite is that ok?
		var Base = NPC[schema.key] = function () {
			// in case we add something to NPC constructor that we need to call?
			// NPC.Base.call(this);
		};
		Base.prototype = new NPC.Base();
		Base.prototype.constructor = Base;
		Base.prototype.schema = schema.key;
		Base.prototype.fields = [];
		Base.prototype.helpers = {};

		// initialize schema properties...
		schema.fields.forEach(function (f) {
			var default_ = null;
			switch (f.type) {
				case 'string':
				case 'text':
					default_ = '';
					break;
				case 'array':
					default_ = [];
					break;
				case 'number':
				case 'modifier':
					default_ = 0;
					break;
				case undefined:
					// ?
					break;
			}
			Base.prototype.fields[f.key] = default_;
		});

		if (!schema.helpers || _typeof(schema.helpers) !== 'object') {
			return;
		}
		var helpers = Object.keys(schema.helpers);
		helpers.forEach(function (h) {
			// if (typeof schema.helpers[h] === 'function') {
			//	Base.prototype.helpers[h] = schema.helpers[h];
			// }
			// create a function from the array
			Base.prototype.helpers[h] = new (Function.prototype.bind.apply(Function, [null].concat(_toConsumableArray(schema.helpers[h]))))();
		});
	};

	// return the NPC object of constructors and the registerSchema function
	return {
		NPC: NPC,
		registerSchema: registerSchema
	};
};

},{}],4:[function(require,module,exports){
'use strict';

/**
 * Is it empty (stolen from Underscore)
 * @param {Object|String|?} obj some type of things
 * @return {Boolean} is it empty?
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var isEmpty = function isEmpty(obj) {
  if (obj === null || obj === void 0) {
    return true;
  }
  if (Array.isArray(obj) || isString(obj)) {
    return obj.length === 0;
  }
  return Object.keys(obj).length === 0;
};
/**
 * Is it a String (stolen from Underscore)
 * @param {Object|String|?} obj some type of things
 * @return {Boolean} is it an string?
 */
var isString = function isString(obj) {
  return toString.call(obj) === '[object String]';
};
/**
 * Is it an Object (stolen from Underscore)
 * @param {Object|String|?} obj some type of things
 * @return {Boolean} is it an object?
 */
var isObject = function isObject(obj) {
  var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  return type === 'function' || type === 'object' && !!obj;
};
/**
 * Is a given variable undefined?
 * @param {Object|String|?} obj object to test
 * @return {Boolean} is it undefined
 */
var isUndefined = function isUndefined(obj) {
  return obj === void 0;
};
/**
 * Capitalize a string
 * @param {String} string a string
 * @return {String} string with first letter capitalized
 */
var capitalize = function capitalize(string) {
  return isEmpty(string) ? string : string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = {
  isEmpty: isEmpty,
  isString: isString,
  isObject: isObject,
  isUndefined: isUndefined,
  capitalize: capitalize
};

},{}],5:[function(require,module,exports){
'use strict';

var r_helpers = require('./r_helpers.js');

/**
 * Name generator...
 * @param {Object} randomizer an instance of randomizer module
 * @param {Object} namedata a lot of names divided by type. see /samples/names.json for formatting
 */
var RandomName = function RandomName(randomizer, namedata) {
	var _this2 = this;

	/**
  * Stores the Markov object (See below)
  */
	this.markov = {};
	/**
  * Stores the randomizer
  */
	this.randomizer = randomizer;
	/**
  * Name data object
  */
	this.namedata = namedata;
	/**
  * Generate a bunch of names, half male, half female
  * @param {Number} [number=10] number of names in the list (half will be male, half will be female)
  * @param {String} [name_type] type of name or else it will randomly select
  * @param {Bool} [create=false] new names or just pick from list
  * @return {Object} arrays of names inside male/female property
  */
	this.generateList = function (number, name_type, create) {
		var names = { male: [], female: [] };
		if (typeof create === 'undefined') {
			create = false;
		}
		if (typeof number === 'undefined') {
			number = 10;
		}
		if (typeof name_type === 'undefined' || name_type === '') {
			name_type = 'random';
		}

		for (var i = 1; i <= number; i++) {
			var gender = i <= Math.ceil(number / 2) ? 'male' : 'female';
			if (create && name_type !== 'holmesian' && name_type !== 'demonic') {
				names[gender].push(this.createName(name_type, gender, true));
			} else {
				names[gender].push(this.selectName(name_type, gender));
			}
		}
		return names;
	};
	/**
  * Select a name from one of the lists
  * @param {String} name_type What name list/process to use else random
  * @param {String} gender male, female, random, ''
  * @param {String} style first=first name only, else full name
  * @returns {String} a name
  */
	this.selectName = function (name_type, gender, style) {
		var name = '';

		if (typeof name_type === 'undefined' || name_type === '' || name_type === 'random') {
			// randomize a type...
			name_type = this.randomizer.rollRandom(Object.keys(this.namedata.options));
		}
		if (typeof gender === 'undefined' || gender === 'random') {
			// randomize a gender...
			gender = this.randomizer.rollRandom(['male', 'female']);
		}
		if (typeof style === 'undefined' || style !== 'first') {
			style = '';
		}

		switch (name_type) {
			case 'holmesian':
				name = this.holmesname();
				break;
			case 'demonic':
				name = this.demonname();
				break;
			case 'cornish':
			case 'flemish':
			case 'dutch':
			case 'turkish':
			default:
				name = this.randomizer.rollRandom(this.namedata[name_type][gender]);
				if (typeof this.namedata[name_type]['surname'] !== 'undefined' && style !== 'first') {
					name += ' ' + this.randomizer.rollRandom(this.namedata[name_type]['surname']);
				}
				name = this.randomizer.findToken(name).trim();
				break;
		}
		return this.capitalizeName(name);
	};
	/**
  * Select a sur/last name only from one of the lists
  * @param {String} name_type what list/process to use, else random
  * @returns {String} a name
  */
	this.selectSurname = function (name_type) {
		var name = '';
		if (typeof name_type === 'undefined' || name_type === '' || name_type === 'random') {
			// randomize a type...
			name_type = this.randomizer.rollRandom(Object.keys(this.namedata.options));
		}
		switch (name_type) {
			case 'holmesian':
				name = this.holmesname();
				break;
			case 'cornish':
			case 'flemish':
			case 'dutch':
			case 'turkish':
			default:
				name = this.randomizer.rollRandom(this.namedata[name_type]['surname']);
				name = this.randomizer.findToken(name);
				break;
		}
		return this.capitalizeName(name);
	};
	/**
  * Create a name using Markov chains
  * @param {String} [name_type=random] what list/process to use
  * @param {String} [gender=random] male or female or both
  * @param {String} style first=first name only, else full name
  * @returns {String} a name
  */
	this.createName = function (name_type, gender, style) {
		var _this = this;

		if (typeof name_type === 'undefined' || name_type === '' || name_type === 'random') {
			// randomize a type...
			name_type = this.randomizer.rollRandom(Object.keys(this.namedata.options));
		}
		if (typeof style === 'undefined') {
			style = '';
		}
		if (!this.namedata[name_type]) {
			return '';
		}
		if (typeof gender === 'undefined' || gender !== 'male' && gender !== 'female') {
			gender = '';
		}

		var mkey = name_type + '_' + gender;
		var lastname = '';
		var thename = '';

		if (!this.markov.memory) {
			this.markov = new Markov({ order: 3 });
		}

		if (!this.markov.memory[mkey]) {
			// console.log('learn '+mkey);
			var namelist = [];
			if (gender === '') {
				namelist = this.namedata[name_type]['male'];
				namelist = namelist.concat(this.namedata[name_type]['female']);
			} else {
				namelist = this.namedata[name_type][gender];
			}
			namelist.forEach(function (v) {
				_this.markov.learn(mkey, v);
			});
		}

		if (style !== 'first' && !r_helpers.isEmpty(this.namedata[name_type]['surname'])) {
			(function () {
				var skey = name_type + '_last';
				if (!_this.markov.memory[skey]) {
					// console.log('learn surname '+skey);
					var _namelist = _this.namedata[name_type]['surname'];
					_namelist.forEach(function (v) {
						_this.markov.learn(skey, v);
					});
				}
				lastname = _this.markov.generate(skey);
			})();
		}

		thename = this.markov.generate(mkey) + ' ' + lastname;
		return this.capitalizeName(thename.trim());
	};
	/**
  * Capitalize names, account for multiword lastnames like "Van Hausen"
  * @param {String} name a name
  * @return {String} name capitalized
  */
	this.capitalizeName = function (name) {
		var leave_lower = ['of', 'the', 'from', 'de', 'le', 'la'];
		// need to find spaces in name and capitalize letter after space
		var parts = name.split(' ');
		var upper_parts = parts.map(function (w) {
			return leave_lower.indexOf(w) >= 0 ? w : '' + r_helpers.capitalize(w);
		});
		return upper_parts.join(' ');
	};
	/**
  * Generate a Holmes name
  * @returns {String} name
  */
	this.holmesname = function () {
		var name = '';
		var scount = this.randomizer.getWeightedRandom(this.namedata.holmesian_scount.values, this.namedata.holmesian_scount.weights);

		for (var i = 1; i <= scount; i++) {
			name += this.randomizer.rollRandom(this.namedata.holmesian_syllables); // array
			if (i < scount) {
				name += this.randomizer.getWeightedRandom(['', ' ', '-'], [3, 2, 2]);
			}
		}
		name = name.toLowerCase() + ' ' + this.randomizer.rollRandom(this.namedata.holmesian_title);

		name = this.randomizer.findToken(name);

		name = name.replace(/[\s\-]([a-z]{1})/g, function (match) {
			return match.toUpperCase();
		});
		return name;
	};
	/**
  * Demonic name
  * Taken from Jeff Rients, based on Goetia, as implemented here: http://www.random-generator.com/index.php?title=Goetic_Demon_Names
  * @return {String} a name
  */
	this.demonname = function () {
		var name = '';
		var format = this.randomizer.getWeightedRandom([['first', 'last'], ['first', 'inner', 'last'], ['first', 'inner', 'inner', 'last'], ['first', 'inner', 'inner', 'inner', 'last']], [55, 35, 7, 3]);
		for (var i = 0; i < format.length; i++) {
			name += this.randomizer.rollRandom(this.namedata.demonic[format[i]]);
		}
		return name;
	};
	/**
  * Add some name data
  * Note: you can overwrite existing name_types if you want
  * @param {String} name_type the shortname for the type
  * @param {Object} data names
  * @param {Array} data.male male names
  * @param {Array} data.female female names
  * @param {Array} data.surnames surnames
  * @param {String} [label] descriptive name of type (defaults to just the name_type)
  * @return {Boolean} success or failure
  */
	this.registerNameType = function (name_type, data, label) {
		if (typeof name_type === 'undefined' || label === '') {
			return false;
		}
		if (typeof label === 'undefined' || label === '') {
			label = name_type;
		}
		if (!data.male && !data.female && !data.surname) {
			return false;
		}
		this.namedata[name_type] = data;
		this.namedata.options[name_type] = label;
		return true;
	};
	/**
  * Register the name token with the randomizer
  */
	this.randomizer.registerTokenType('name', function (token_parts, full_token, curtable) {
		var string = '';
		var n = _this2;
		if (typeof token_parts[1] === 'undefined' || token_parts[1] === '' || token_parts[1] === 'random') {
			token_parts[1] = '';
		}
		if (typeof token_parts[3] === 'undefined' || token_parts[3] !== 'first') {
			token_parts[3] = '';
		}
		if (typeof token_parts[2] === 'undefined' || token_parts[2] === '') {
			token_parts[2] = 'random';
		}
		string = n.createName(token_parts[1], token_parts[2], token_parts[3]);
		return string;
	});
};

/**
 * Adapted from http://blog.javascriptroom.com/2013/01/21/markov-chains/
 */
var Markov = function Markov(config) {
	if (typeof config === 'undefined') {
		config = {};
	}
	/**
  * the "memory" where the language parts go
  */
	this.memory = {};
	/**
  * If you want to delimit the generated parts
  */
	this.separator = config.separator ? config.separator : '';
	/**
  * How many... something... to something.... oh it's been too long I don't remember how this works...
  */
	this.order = config.order ? config.order : 2;
	/**
  * Feed text to memory
  * @param {String} key key for the chain (so we can store multiple memories)
  * @param {String} txt word or phrase
  * @return {null} null
  */
	this.learn = function (key, txt) {
		var mem = this.memory[key] ? this.memory[key] : {};
		// split up text then add the calculated parts to the memory for this ket
		this.breakText(txt, function (key, value) {
			// console.log(key);
			if (!mem[key]) {
				mem[key] = [];
			}
			mem[key].push(value);
			return mem;
		});
		this.memory[key] = mem;
	};
	/**
  * Return a generated response
  * @param {String} key key for the chain (so we can store multiples
  * @param {Array} seed letters to start the response (?)
  */
	this.generate = function (key, seed) {
		if (!seed) {
			seed = this.genInitial();
		}
		this.cur_key = key;
		return seed.concat(this.step(seed, [])).join(this.separator);
	};
	/**
  * iterate through, calls self
  * @param {Array} state array of most recent x(x=order) elements in chain
  * @param {Array} ret the chain
  * @return {Array}
  */
	this.step = function (state, ret) {
		var nextAvailable = this.memory[this.cur_key][state] || [''];
		var next = this.getRandomValue(nextAvailable);
		// we don't have anywhere to go
		if (!next) {
			return ret;
		}
		ret.push(next);
		var nextState = state.slice(1);
		nextState.push(next);
		return this.step(nextState, ret);
	};
	/**
  * Chunk the word or phrase
  * @param {String} txt the text to chunk
  * @param {Function} cb callback function
  * @return {null} null
  */
	this.breakText = function (txt, cb) {
		var parts = txt.split(this.separator);
		var prev = this.genInitial();

		parts.forEach(function (v) {
			v = v.toLowerCase();
			cb(prev, v);
			prev.shift();
			prev.push(v);
		});
		cb(prev, '');
	};
	/**
  * Generate a starting array for the chain based on the order number
  * @return {Array} just an empty array of length=order
  */
	this.genInitial = function () {
		var ret = [];
		for (var i = 0; i < this.order; ret.push(''), i++) {}
		return ret;
	};
	/**
  * Get a random array element
  * @param {Array} arr an array
  * @return {String|Object}	random value
  */
	this.getRandomValue = function (arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	};
};

module.exports = RandomName;

},{"./r_helpers.js":4}],6:[function(require,module,exports){
'use strict';

var r_helpers = require('./r_helpers.js');

/**
 * RandomTable: Model for tables used by Randomizer
 * @param {Object} config the tables non-default attributes
 */
var RandomTable = function RandomTable(config) {
	/**
  * The primary attributes of this table
  * @property {String} id id for the table, primary key for database if used
  * @property {String} key identifier for the table
  * @property {String} [title] title of the table
  * @property {String} [author] author of the table
  * @property {String} [description] description of the table
  * @property {String} [source] source of the table
  * @property {Array} [tags] subject tags
  * @property {String|Array} [sequence] tables to roll on. if array it can be an array of strings (table names) or objects (two properties table: the table to roll on and times: the number of times to roll)
  * @property {Array} [table] default table. array of strings or objects. removed after initialization.
  * @property {Object} [tables] a property for each subtables. if table property is not set then the first propery of this Object is used to start rolling
  * @property {Array} [macro] for tables that are only used to aggregate result from other tables, this array consists of table keys to be rolled on in order
  * @property {Object} [print] objects to describe what parts of a (sub)table should be displayed in the results
  * @property {Object} [print.default] how to display the default table's results
  * @property {Object} [print.default.hide_table] set to 1 will not show the table name
  * @property {Object} [print.default.hide_result] set to 1 will not show the result on that (sub)table
  * @property {Object} [print.default.hide_desc] set to 1 will not show any description for a result on that (sub)table
  * @property {Array} [result] current result array of objects
  */
	this.id = 0;
	this.key = '';
	this.title = '';
	this.author = '';
	this.description = '';
	this.source = '';
	this.tags = [];
	this.sequence = ''; // where to start rolling and if other tables should always be rolled on
	this.tables = {};
	this.macro = [];
	this.result = [];
	/**
  * Run on first construction
  * @param {Object} config data passed from the constructor
  */
	var initialize = function initialize(config) {
		for (var prop in config) {
			if (config.hasOwnProperty(prop)) {
				this[prop] = config[prop];
			}
		}
		// make sure this.tables.default is set instead of this.table
		// maybe we dont need this
		if (!r_helpers.isEmpty(this.table)) {
			var tables = this.tables;
			tables.default = this.table;
			this.tables = tables;
			delete this.table;
		}
		if (this.key === '') {
			this.key = this.id;
		}
	};
	/**
  * validate fields before saving
  * @param {Object} properties new attributes to save
  * @returns {Object} error information
  */
	this.validate = function (properties) {
		// console.log(attributes);
		var error = { fields: [], general: '' };

		if (properties.title === '') {
			error.fields.push({ field: 'title', message: 'Title cannot be blank' });
			error.general += 'Title cannot be blank. ';
		}

		if (r_helpers.isEmpty(properties.tables) && r_helpers.isEmpty(properties.macro)) {
			error.fields.push({ field: 'tables', message: 'Both Tables and Macro cannot be empty' });
			error.general += 'Both Tables and Macro cannot be empty. ';
		}

		if (!r_helpers.isEmpty(error.fields) || !r_helpers.isEmpty(error.general)) {
			return error;
		}
		return true;
	};
	/**
  * Show the results as a string
  * @todo make this nicer/clearer #23
  * Alternate: write a template to use in the views?
  * @param {Boolean} [simple=false] if true only output the first result label
  * @returns {String} the results
  */
	this.niceString = function (simple) {
		if (typeof simple === 'undefined') {
			simple = false;
		}
		var r = this.result; // array
		if (r_helpers.isString(r) || !Array.isArray(r) || r.length === 0) {
			return '';
		}

		if (simple) {
			return r[0]['result'];
		} // @todo maybe use shift() instead, if editing this array won't be a problem. (else we could clone it...

		var o = '';
		var print_opt = this.print ? this.print : {};
		r.forEach(function (v) {
			if (print_opt[v.table]) {
				if (!print_opt[v.table].hide_table || print_opt[v.table].hide_table === 0) {
					o += r_helpers.capitalize(v.table) + ': ';
				}
				if (!print_opt[v.table].hide_result || print_opt[v.table].hide_result === 0) {
					o += r_helpers.capitalize(v.result) + '\n';
				}
				if (!print_opt[v.table].hide_desc || print_opt[v.table].hide_desc === 0) {
					if (v.desc !== '') {
						o += v.desc + '\n';
					}
				}
			} else {
				if (v.table === 'default') {
					o += r_helpers.capitalize(v.result) + '\n';
				} else {
					o += r_helpers.capitalize(v.table) + ': ' + r_helpers.capitalize(v.result) + '\n';
				}
				if (v.desc !== '') {
					o += v.desc + '\n';
				}
			}
		});
		o = o.trim(); // trim off final linebreak
		return o;
	};
	/**
  * outputs the json data for the table (import/export)
  * @param {Boolean} [editmode=false] if false empty properties will be stripped out
  * @returns {Object} table attributes
  */
	this.outputObject = function (editmode) {
		if (typeof editmode === 'undefined') {
			editmode = false;
		}
		// clone the data, this will strip out any functions too.
		var att = JSON.parse(JSON.stringify(this));
		var props = Object.keys(att);
		props.forEach(function (k) {
			if (!editmode && r_helpers.isEmpty(att[k])) {
				delete att[k];
			}
		});
		// don't include results
		if (att.result && editmode) {
			att.result = [];
		} else if (att.result) {
			delete att.result;
		}
		delete att.id;
		return att;
	};
	/**
  * outputs the json data for the table (import/export)
  * @param {Boolean} [editmode=false] if false empty properties will be stripped out
  * @param {Boolean} [compress=false] if true JSON will not have indentation, etc.
  * @returns {String} table properties in JSON
  */
	this.outputCode = function (editmode, compress) {
		if (typeof editmode === 'undefined') {
			editmode = false;
		}
		if (typeof compress === 'undefined') {
			compress = false;
		}

		var obj = this.outputObject(editmode);

		if (compress) {
			return JSON.stringify(obj);
		}
		return JSON.stringify(obj, null, 2);
	};
	/**
  * Get an object result in case we only have the label and need other data from it
  * @param {String} label The item we are looking for
  * @param {String} [table=default] the table to search
  * @returns {Object} the object associated with the label or an empty one
  */
	this.findObject = function (label, table) {
		if (typeof table === 'undefined' || table === '') {
			table = 'default';
		}
		var t = this.tables[table];
		if (t[label]) {
			return t[label];
		}
		if (Array.isArray(t)) {
			var obj = t.find(function (v) {
				return v.label === label;
			});
			return typeof obj !== 'undefined' ? obj : {};
		}
		return {};
	};
	/**
   * find the result element for a specific table/subtable
   * only works if we have already generated a result
   * @param {String} table The table to look for
   * @returns {Object} result element for specified table (or empty)
   */
	this.findResultElem = function (table) {
		if (typeof table === 'undefined' || table === '') {
			table = 'default';
		}
		var obj = this.result.find(function (v) {
			return v.table === table;
		});
		return typeof obj !== 'undefined' ? obj : {};
	};

	/**
  * Initialize the table, set the data, normalize, etc.
  */
	initialize.call(this, config);
};

module.exports = RandomTable;

},{"./r_helpers.js":4}],7:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var r_helpers = require('./r_helpers.js');

/**
 * Randomizer - handles app randomization functions
 * Module exports a single instance of Randomizer...
 * @constructor
 */
var Randomizer = function Randomizer() {
	var _this4 = this;

	/**
  * Store the token types/processing
  */
	this.token_types = {};
	/**
  * Random integer between two numbers (stolen from underscorejs)
  * @param {Number} min mininum value
  * @param {Number} max maximum value
  * @return {Number} random value
  */
	this.random = function (min, max) {
		if (max == null) {
			max = min;
			min = 0;
		}
		return min + Math.floor(Math.random() * (max - min + 1));
	};
	/**
  * Sum an array
  * @param {Array} arr an array of numbers
  * @returns {Number} Total value of numbers in array
  */
	function arraySum(arr) {
		var total = 0;
		for (var i = 0; i < arr.length; i++) {
			var v = parseFloat(arr[i]);
			if (!isNaN(v)) {
				total += v;
			}
		}
		return total;
	};
	/**
  * Random value selection
  * @param {Array} values an array of strings from which to choose
  * @param {Array} weights a matching array of integers to weight the values (i.e. values and weights are in the same order)
  * @returns {String} the randomly selected Array element from values param
  */
	this.getWeightedRandom = function (values, weights) {
		var n = 0;
		var num = this.random(1, arraySum.call(this, weights));
		for (var i = 0; i < values.length; i++) {
			n = n + weights[i];
			if (n >= num) {
				break;
			}
		}
		return values[i];
	};
	/**
  * Random value selection, wrapper for getWeightedRandom that processes the data into values/weights arrays
  * @param {Object|Array} data An object or array of data
  * @returns {String} the randomly selected Object property name, Array element, or value of the "label" property
  */
	this.rollRandom = function (data) {
		var values = [];
		var weights = [];

		if (Array.isArray(data)) {
			data.forEach(function (v, k, l) {
				if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
					if (typeof v.weight !== 'undefined') {
						weights.push(v.weight);
					} else {
						weights.push(1);
					}
					values.push(v.label);
				} else if (typeof v === 'string') {
					// nothing
					weights.push(1);
					values.push(v);
				}
			});
		} else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data !== null) {
			var props = Object.keys(data);
			props.forEach(function (k) {
				var v = data[k];
				if (typeof v.weight !== 'undefined') {
					weights.push(v.weight);
				} else {
					weights.push(1);
				}
				values.push(k);
			});
		}
		return this.getWeightedRandom(values, weights);
	};
	/**
  * Dice rolling simulator
  * @param {Number} [die=6] Die type
  * @param {Number} [number=1] Number of times to roll the die
  * @param {Number} [modifier=0] Numeric modifier to dice total
  * @param {String} [mod_op=+] Operator for the modifier (+,-,/,*)
  * @returns {Number} Number rolled (die*number [mod_op][modifier])
  */
	function parseDiceNotation(die, number, modifier, mod_op) {
		modifier = typeof modifier === 'undefined' ? 0 : parseInt(modifier, 10);
		die = typeof die === 'undefined' ? 6 : parseInt(die, 10);
		mod_op = typeof mod_op === 'undefined' ? '+' : mod_op;

		if (typeof number === 'undefined' || number === 0) {
			number = 1;
		} else {
			number = parseInt(number, 10);
		}

		var sum = 0;
		for (var i = 1; i <= number; i++) {
			sum = sum + this.random(1, die);
		}
		if (modifier === 0) {
			return sum;
		}

		switch (mod_op) {
			case '*':
				sum = sum * modifier;
				break;
			case '-':
				sum = sum - modifier;
				break;
			case '/':
				sum = sum / modifier;
				break;
			case '+':
			default:
				sum = sum + modifier;
				break;
		}
		return Math.round(sum);
	};
	/**
  * Generate a result from a RandomTable object
  * @param {Object} rtable the RandomTable
  * @param {String} [start=''] subtable to roll on
  * @return {Array} array of object results { table: table that was rolled on, result: result string, desc: optional description string }
  */
	this.getTableResult = function (rtable, start) {
		var _this = this;

		if (!r_helpers.isObject(rtable)) {
			return [{ table: 'Error', result: 'No table found to roll on.', desc: '' }];
		}
		var result = [];
		if (typeof start === 'undefined') {
			start = '';
		}

		// if macro is set then we ignore a lot of stuff
		if (!r_helpers.isEmpty(rtable.macro)) {
			// iterate over the tables and get results
			rtable.macro.forEach(function (t) {
				var table = _this.getTableByKey(t);
				if (r_helpers.isEmpty(table)) {
					return;
				}
				_this.getTableResult(table);
				result.push({ table: t, result: table.niceString() });
			});
			rtable.result = result;
			return result;
		}

		// we look in the start table for what to roll if the start wasn't explicitly set in the call
		var sequence = start === '' ? rtable.sequence : start;

		if (sequence === 'rollall') {
			// roll all the tables in order
			sequence = Object.keys(rtable.tables);
		}

		if (sequence === '') {
			// if no start attribute
			// try for "default" table
			if (typeof rtable.tables['default'] !== 'undefined') {
				result = this.selectFromTable(rtable, 'default');
			} else {
				// select first item from tables
				var tables = Object.keys(rtable.tables);
				result = this.selectFromTable(rtable, tables[0]);
			}
		} else if (typeof sequence === 'string') {
			result = this.selectFromTable(rtable, sequence);
		} else {
			sequence.forEach(function (seq) {
				var r = '';
				if (r_helpers.isString(seq)) {
					r = _this.selectFromTable(rtable, seq);
					result = result.concat(r);
					return;
				}
				// its an object
				var table = seq.table ? seq.table : '';
				if (table === '') {
					return;
				}
				var times = typeof seq.times === 'number' ? seq.times : 1;
				for (var i = 1; i <= times; i++) {
					r = _this.selectFromTable(table);
					result = result.concat(r);
				}
			});
		}

		rtable.result = result;
		return result;
	};
	/**
  * Get a result from a table/subtable in a RandomTable object
  * DANGER: you could theoretically put yourself in an endless loop if the data were poorly planned
  * ...but at worst that would just crash the users browser since there's no server processing involved... (???)
  * @todo we'll have to fix for this with a node version
  * @param {Object} rtable the RandomTable object
  * @param {String} table table to roll on
  * @returns {Array} array of object results { table: table that was rolled on, result: result string, desc: optional description string }
  */
	this.selectFromTable = function (rtable, table) {
		var _this2 = this;

		if (!r_helpers.isObject(rtable)) {
			return [{ table: 'Error', result: 'No table found to roll on.', desc: '' }];
		}
		if (typeof table === 'undefined') {
			return [{ table: 'Error', result: 'No table found to roll on.', desc: '' }];
		}
		// console.log(table);
		var o = []; // output for sequence of rolls/selections
		var t = rtable.tables[table]; // the table/subtable
		var result = this.rollRandom(t); // the random string from the table (either the object property, a string value from an array, or the value property from a selected object)
		var r = ''; // the string result from the table
		var result_print = true; // are we going to show this result

		if (r_helpers.isUndefined(t[result])) {
			// table is an array
			// r = _.findWhere(t, { label: result });
			r = t.find(function (v) {
				return v.label === result;
			});
			if (r_helpers.isUndefined(r)) {
				// it's just an array of strings so we can stop here
				o.push({ table: table, result: result, desc: '' });
				return o;
			}
			result_print = typeof r['print'] === 'undefined' ? true : r['print'];
		} else {
			r = t[result];
			result_print = typeof t[result]['print'] === 'undefined' ? true : t[result]['print'];
		}
		// r is now the result object

		// if print==false we suppress the output from this table (good for top-level tables)
		if (result_print === true) {
			// add the description if there is one
			var desc = r_helpers.isString(r['description']) ? r['description'] : '';
			// replace any tokens
			var t_result = this.findToken(result, rtable.key);
			o.push({ table: table, result: t_result, desc: desc });
		}

		// are there subtables to roll on?
		var subtable = r.subtable;
		var r2 = ''; // subtable results
		if (typeof subtable === 'undefined') {
			// no subtables
			return o;
		} else if (r_helpers.isString(subtable)) {
			// subtables is a string reference to a table so we run this function again
			r2 = this.selectFromTable(rtable, subtable);
			o = o.concat(r2);
		} else if (Array.isArray(subtable)) {
			// subtables is an array, assume reference to other tables, roll on each in turn
			subtable.forEach(function (v) {
				r2 = _this2.selectFromTable(rtable, v);
				o = o.concat(r2);
			});
		} else if (r_helpers.isObject(subtable)) {
			// subtable is object assume embedded table(s)
			// loop over keys
			var k = Object.keys(subtable);
			k.forEach(function (kx) {
				var result = _this2.rollRandom(subtable[kx]);
				var desc = '';
				if (r_helpers.isUndefined(subtable[kx][result])) {
					// r2 = _.findWhere(subtable[kx], { label: result });
					r2 = subtable[kx].find(function (v) {
						return v.label === result;
					});
					if (r_helpers.isObject(r2)) {
						desc = r_helpers.isString(r2.description) ? r2.description : '';
					}
				} else {
					desc = r_helpers.isString(subtable[kx][result]['description']) ? subtable[kx][result]['description'] : '';
				}
				result = _this2.findToken(result, rtable.key);

				o.push({ table: kx, result: result, desc: desc });
			});
		}

		return o;
	};
	/**
  * Perform token replacement.  Only table and roll actions are accepted
  * @param {String} token A value passed from findToken containing a token(s) {{SOME OPERATION}} Tokens are {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{roll:1d6+2}} (etc) (i.e. {{table:colonial_occupations:laborer}} {{table:color}} also generate names with {{name:flemish}} (surname only) {{name:flemish:male}} {{name:dutch:female}}
  * @param {String} curtable key of the RandomTable the string is from (needed for "this" tokens)
  * @returns {String} The value with the token(s) replaced by the operation or else just the token (in case it was a mistake or at least to make the error clearer)
  */
	this.convertToken = function (token, curtable) {
		var parts = token.replace('{{', '').replace('}}', '').split(':');
		if (parts.length === 0) {
			return token;
		}

		// look for a token type we can run
		if (this.token_types[parts[0]]) {
			return this.token_types[parts[0]](parts, token, curtable);
		} else {
			return token;
		}
	};
	/**
  * Look for tokens to perform replace action in convertToken
  * @param {String} string usually a result from a RandomTable
  * @param {String} curtable key of the RandomTable the string is from (needed for "this" tokens)
  * @returns {String} String with tokens replaced (if applicable)
  */
	this.findToken = function (string, curtable) {
		var _this3 = this;

		if (r_helpers.isEmpty(string)) {
			return '';
		}
		if (typeof curtable === 'undefined') {
			curtable = '';
		}
		var regexp = new RegExp('({{2}.+?}{2})', 'g');
		var newstring = string.replace(regexp, function (token) {
			return _this3.convertToken(token, curtable);
		});
		return newstring;
	};
	/**
  * takes a string like '3d6+2', 'd6', '2d6', parses it, and puts it through roll
  * @params {String} string a die roll notation
  * @returns {Number} the result of the roll
  */
	this.roll = function (string) {
		string = typeof string === 'undefined' ? '' : string.trim();
		var m = string.match(/^([0-9]*)d([0-9]+)(?:([\+\-\*\/])([0-9]+))*$/);
		if (m) {
			if (typeof m[4] === 'undefined') {
				m[4] = 0;
			}
			if (m[1] !== '') {
				return parseDiceNotation.call(this, parseInt(m[2], 10), parseInt(m[1], 10), parseInt(m[4], 10), m[3]);
			} else {
				return parseDiceNotation.call(this, parseInt(m[2], 10), '1', parseInt(m[4], 10), m[3]);
			}
		}
		return '';
	};
	/**
  * Since tables are stored outside of this module, this function allows for the setting of a function which will be used to lookup a table by it's key
  * @param {Function} lookup a function that takes a table key and returns the table data object
  * @return {null} nothing
  */
	this.setTableKeyLookup = function (lookup) {
		this.getTableByKey = lookup;
	};
	/**
  * Placeholder that should be replaced by a function outside this module
  * @param {String} key human readable table identifier
  * @return {null} nothing, when replaced this function should return a table object
  */
	this.getTableByKey = function (key) {
		return null;
	};
	/**
  * Add a token variable
  * @param {String} name Name of the token (used as first element
  * @param {Function} process Function to return token replacement value function is passed the token_parts (token split by ":"),  original full_token, current table name
  */
	this.registerTokenType = function (name, process) {
		this.token_types[name] = process;
	};
	/**
  * Dice roll token.
  */
	this.registerTokenType('roll', function (token_parts, full_token, curtable) {
		return _this4.roll(token_parts[1]);
	});
	/**
  * Table token lookup in the form:
  * {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{table:SOMETABLE:SUBTABLE*2}} (roll subtable 2 times)
  */
	this.registerTokenType('table', function (token_parts, full_token, curtable) {
		var string = '';
		// console.log(token_parts);
		if (typeof token_parts[1] === 'undefined') {
			return full_token;
		}
		var multiplier = 1;
		if (token_parts[1].indexOf('*') !== -1) {
			var x = token_parts[1].split('*');
			token_parts[1] = x[0];
			multiplier = x[1];
		}

		// what table do we roll on
		var t = null;
		if (token_parts[1] === 'this') {
			// reroll on same table
			// console.log('this..'+curtable);
			t = _this4.getTableByKey(curtable);
			// console.log(t);
		} else {
			t = _this4.getTableByKey(token_parts[1]);
			// console.log(t);
		}
		if (t === null || (typeof t === 'undefined' ? 'undefined' : _typeof(t)) !== 'object') {
			return full_token;
		}
		if (typeof token_parts[2] !== 'undefined' && token_parts[2].indexOf('*') !== -1) {
			var _x = token_parts[2].split('*');
			token_parts[2] = _x[0];
			multiplier = _x[1];
		}
		var subtable = typeof token_parts[2] === 'undefined' ? '' : token_parts[2];

		for (var i = 1; i <= multiplier; i++) {
			_this4.getTableResult(t, subtable);
			string += t.niceString() + ', ';
		}
		string = string.trim();
		string = string.replace(/,$/, '');
		return string;
	});
};

module.exports = new Randomizer();

},{"./r_helpers.js":4}],8:[function(require,module,exports){
'use strict';

var r_helpers = require('./r_helpers');

/**
 * Take some data and normalize it into a config object for RandomTable
 * Module exports a constructor function
 */
var TableNormalizer = function TableNormalizer(data) {
	this.orig_data = typeof data !== 'undefined' ? data : ''; // save this for later if necessary
	this.normalized_data = {}; // normalized config object for RandomTable
	this.data_type = '';

	/**
  * Set the data
  * @param {String|Object|Array} data the data to normalize
  */
	this.setData = function (data) {
		this.orig_data = data;
	};
	/**
  * Decide what type of data it is so we can treat it appropriately.
  * @return {String} data_type
  */
	this.checkType = function () {
		var data = this.orig_data;
		if (r_helpers.isEmpty(data)) {
			this.data_type = '';
		} else if (r_helpers.isString(data)) {
			// html should start with a tag.... right?
			// @todo I'm sure there's a better way
			try {
				JSON.parse(data);
				this.data_type = 'json';
				return this.data_type;
			} catch (e) {
				// not json
			}
			if (data.substring(0, 1) === '<') {
				this.data_type = 'html';
				return this.data_type;
			}
			this.data_type = 'text';
		} else if (r_helpers.isObject(data)) {
			this.data_type = 'object';
		}
		return this.data_type;
	};
	/**
  * Try to parse HTML into table object data
  * @return {Array} table options
  */
	this.parseHtml = function () {
		var html = this.orig_data;
		// strip linebreaks cause we'll be making new ones based on the tags
		html = html.replace(/[\n\r]+/g, '');
		// add line breaks for specific end tags li tr p br
		// @todo really <tr> leaves you with some weird data.
		html = html.replace(/<\/(p|tr|li|div)>|<\/?br\/?>/g, '\n').replace(/\t/g, '');

		html = html.replace(/<\/?[^>]+>/g, '').replace(/[\n\r]+$/g, '');
		// console.log(html);
		var text = html.split(/[\n\r]+/g);
		// console.log(text);

		var ct = 0;

		text.forEach(function (v, k, l) {
			v = v.trim(); // trim spaces from ends
			// parse out the pre-post ## data (if it's there)
			var parse = v.match(/^(?:(?:[0-9]+\-)?([0-9]+)(##)?(?:\.\s*|:\s*|,\s*|\t+|\s*))?(.+?)(?:##(.+))?$/);

			if (parse) {
				l[k] = { label: parse[3].trim() };

				if (typeof parse[1] !== 'undefined') {
					var weight = 1;
					if (typeof parse[2] === 'undefined') {
						weight = parseFloat(parse[1]) - ct;
						if (weight < 1) {
							weight = 1;
						}
						ct = ct + weight;
					} else {
						weight = parseFloat(parse[1]);
					}
					if (weight > 1) {
						l[k].weight = weight;
					}
				} else {
					ct++;
				}

				if (typeof parse[4] !== 'undefined') {
					l[k].subtable = parse[4].trim();
				}
			} else {
				delete l[k];
			}
		});
		return text;
	};
	/**
  * Try to parse text into table data
  * @returns {Array} parsed table data
  */
	this.parseText = function () {
		var text = this.orig_data;
		// split it into an array of lines
		text = text.split(/[\n\r]+/g);

		var ct = 0; // the cumulative 'die' count we'll use to calculate the weight
		text.forEach(function (v, k, l) {
			v = v.trim();

			// parse numbers off front and subtables off back
			var parse = v.match(/^(?:(?:[0-9]+\-)?([0-9]+)(##)?(?:\.\s*|:\s*|,\s*|\t+|\s*))?(.+?)(?:##(.+))?$/);
			// console.log(parse);
			if (parse) {
				// console.log(parse);
				var label = parse[3].trim();
				label = label.replace(/^[-*]\s?/, '');
				l[k] = { label: label };

				if (typeof parse[1] !== 'undefined') {
					var weight = 1;
					if (typeof parse[2] === 'undefined') {
						weight = parseFloat(parse[1]) - ct;
						// console.log(weight);
						if (weight < 1) {
							weight = 1;
						}
						ct = ct + weight;
					} else {
						weight = parseFloat(parse[1]);
					}
					if (weight > 1) {
						l[k].weight = weight;
					}
				} else {
					ct++;
				}

				if (typeof parse[4] !== 'undefined') {
					l[k].subtable = parse[4].trim();
				}
			} else {
				delete l[k];
			}
		});
		return text;
	};
	/**
  * Parse markdown...?
  * @todo
  */
	this.parseMarkdown = function () {
		// deal with headers
		// deal with lists and sublists.

	};
	/**
  * Process the data and try to do something
  */
	this.normalizeData = function () {
		var type = this.checkType();
		if (type === '') {
			return false;
		}
		var parse_data = null;
		switch (type) {
			case 'html':
				this.normalized_data = this.parseHtml();
				break;
			case 'text':
				this.normalized_data = this.parseText();
				break;
			case 'json':
				parse_data = JSON.parse(this.orig_data);
				this.normalized_data = parse_data;
				break;
		}

		// ?
		return this.normalized_data;
	};
};

module.exports = TableNormalizer;

},{"./r_helpers":4}]},{},[2])(2)
});