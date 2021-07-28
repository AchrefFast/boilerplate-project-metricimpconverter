const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test('convertHandler should correctly read a whole number input.', function () {
        assert.equal(convertHandler.getNum('1'), 1, 'getNum whole number input test');
    });
    test('convertHandler should correctly read a decimal number input.', function () {
        assert.equal(convertHandler.getNum('1.2'), 1.2, 'getNum decimal number input test');
    });

    test('convertHandler should correctly read a fractional input.', function () {
        assert.equal(convertHandler.getNum('2/2'), 2 / 2, 'getNum fractional input test');
    });
    test('convertHandler should correctly read a fractional input with a decimal.', function () {
        assert.equal(convertHandler.getNum('1/0.1'), 1 / 0.1, 'getNum fraction with decimal number input test');
    });

    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
        assert.equal(convertHandler.getNum('3/2/3'), false, 'getNum refuse double fraction');
    });
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
        assert.equal(convertHandler.getNum(), 1, 'getNum empty input return 1 test');
    });

    test('convertHandler should correctly read each valid input unit.', function () {
        assert.equal(convertHandler.getUnit('mi'), 'mi', 'getUnit accept each valid input unit test');
        assert.equal(convertHandler.getUnit('km'), 'km', 'getUnit accept each valid input unit test');
        assert.equal(convertHandler.getUnit('gal'), 'gal', 'getUnit accept each valid input unit test');
        assert.equal(convertHandler.getUnit('l'), 'L', 'getUnit accept each valid input unit test');
        assert.equal(convertHandler.getUnit('lbs'), 'lbs', 'getUnit accept each valid input unit test');
        assert.equal(convertHandler.getUnit('kg'), 'kg', 'getUnit accept each valid input unit test');
    });
    test('convertHandler should correctly return an error for an invalid input unit.', function () {
        assert.equal(convertHandler.getUnit('invalid'), false, 'getUnit accept each valid input unit test');
    });
    test('convertHandler should return the correct return unit for each valid input unit.', function () {
        assert.equal(convertHandler.getReturnUnit('mi'), 'km', 'getUnit accept return valid input unit test');
        assert.equal(convertHandler.getReturnUnit('km'), 'mi', 'getUnit accept return valid input unit test');
        assert.equal(convertHandler.getReturnUnit('gal'), 'L', 'getUnit accept return valid input unit test');
        assert.equal(convertHandler.getReturnUnit('L'), 'gal', 'getUnit accept return valid input unit test');
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg', 'getUnit accept return valid input unit test');
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs', 'getUnit accept return valid input unit test');
    });
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles', 'spellOutUnit  return valid input unit test');
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers', 'spellOutUnit  return valid input unit test');
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons', 'spellOutUnit  return valid input unit test');
        assert.equal(convertHandler.spellOutUnit('L'), 'liters', 'spellOutUnit  return valid input unit test');
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds', 'spellOutUnit  return valid input unit test');
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms', 'spellOutUnit  return valid input unit test');
    });


    test('convertHandler should correctly convert gal to L.', function () {
        assert.equal(convertHandler.convert(1, 'gal'), 3.78541, 'convert convert each valid input test');
    });
    test('convertHandler should correctly convert L to gal.', function () {
        assert.equal(convertHandler.convert(1, 'L'), 0.26417, 'convert convert each valid input test');
    });
    test('convertHandler should correctly convert mi to km.', function () {
        assert.equal(convertHandler.convert(1, 'mi'), 1.60934, 'convert convert each valid input test');
    });
    test('convertHandler should correctly convert km to mi.', function () {
        assert.equal(convertHandler.convert(1, 'km'), 0.62137, 'convert convert each valid input test');
    });
    test('convertHandler should correctly convert lbs to kg.', function () {
        assert.equal(convertHandler.convert(1, 'lbs'), 0.45359, 'convert convert each valid input test');
    });
    test('convertHandler should correctly convert kg to lbs.', function () {
        assert.equal(convertHandler.convert(1, 'kg'), 2.20462, 'convert convert each valid input test');
    });

});