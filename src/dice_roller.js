/* eslint-disable no-useless-escape */
import { randomInteger } from './randomizer.js';

/**
 * @prop {String} die Die notation.
 * @prop {Number} value Random roll for the die notation.
 */
class DiceResult {
    constructor ({
        die = '',
        value = 0
    }) {
        this.die = die;
        this.value = value;
    }
    toString () {
        return this.value;
    }
    toJSON () {
        return {
            className: 'DiceResult',
            die: this.die,
            value: this.value
        };
    }
}

/**
 * Dice rolling simulator
 * @param {Number} [die=6] Die type
 * @param {Number} [number=1] Number of times to roll the die
 * @param {Number} [modifier=0] Numeric modifier to dice total
 * @param {String} [mod_op=+] Operator for the modifier (+,-,/,*)
 * @returns {Number} Number rolled (die*number [mod_op][modifier])
 */
const parseDiceNotation = function (die = 6, number = 1, modifier = 0, mod_op = '+') {
    modifier = parseInt(modifier, 10);
    die = parseInt(die, 10);

    if (number <= 0) {
        number = 1;
    } else {
        number = parseInt(number, 10);
    }

    let sum = 0;
    for (let i = 1; i <= number; i++) {
        sum = sum + randomInteger(1, die);
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
 * takes a string like '3d6+2', 'd6', '2d6', parses it, and puts it through roll
 * @params {String} string a die roll notation
 * @returns {Number} the result of the roll
 */
const rollDie = function (string = '') {
    string = string.trim();
    const m = string.match(/^([0-9]*)d([0-9]+)(?:([\+\-\*\/])([0-9]+))*$/);
    if (!m) {
        return '';
    }
    return parseDiceNotation(m[2], m[1], m[4], m[3]);
};

/**
 * Return a dice result.
 * @param {String} die Die roll notation.
 * @returns {DiceResult}
 */
const getDiceResult = function (die = '') {
    return new DiceResult({
        die,
        value: rollDie(die)
    });
};

export {
    rollDie,
    DiceResult,
    getDiceResult
};
