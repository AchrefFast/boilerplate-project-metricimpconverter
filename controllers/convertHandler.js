function ConvertHandler() {

  this.getNum = function (input) {
    let result;
    // Creating regular expressions to help us check the validation of the entered number
    const regex_fraction = /^(?<num>(\d+\.\d+|\d+))\/(?<denum>(\d+\.\d+)|\d+)/; // to accept a fractional input
    const regex_errorFraction = /^(?<num>((\d+\.\d+)|\d+))\/(?<denum>(\d+\.\d+)[^\w]|\d+(?![.]\d+)([^\w]|[.][^\d]*))/; // to reject an input with more than one fraction
    const regex_number = /(^(?<number1>\d+[.]\d+))|(^(?<number2>\d+))/; // to accept decimal or whole number input number.
    const regex_notNumber = /(^(?<number1>\d+[.]\d*)[^\w])|(^(?<number2>\d+)[^\w.])/; // reject any number followed by an unknown character.
    const regex_empty = /\d+/g; // if there is no input entered,the default input would be 1.

    if (!regex_empty.test(input)) {
      return 1;
    }
    if (regex_errorFraction.test(input))
      return false;

    if (regex_fraction.test(input)) {
      const num = parseFloat(input.match(regex_fraction).groups.num);
      const denum = parseFloat(input.match(regex_fraction).groups.denum);
      result = num / denum;
      return result;
    }
    if (regex_notNumber.test(input)) {
      return false;
    }
    else if (regex_number.test(input)) {
      const match = input.match(regex_number);
      result = match.groups.number1 || match.groups.number2;
      return parseFloat(result);
    }

    return false;
  };
  //-----------------------------------------------------------//
  this.getUnit = function (input) {
    let result;
    let unit = '';
    try {
      unit = input.match(/[a-z]+$/i)[0];
    } catch (error) {
      console.log('No unit was entered !!!');
    }
    const regex = /\b(mi|km|gal|l|kg|lbs)\b/i;
    //console.log(unit);
    // user switch case to parse "unit" or we use the regex with boundary assertion '\b'.
    const match = unit.match(regex);
    if (regex.test(unit)) {
      result = match[0].toLowerCase() === 'l' ? match[0].toUpperCase() : match[0].toLowerCase();
    }
    else {
      result = false;
    }
    return result;
  };
  //-----------------------------------------------------------//
  this.getReturnUnit = function (initUnit) {
    let result;
    let units = ['mi', 'km', 'gal', 'L', 'kg', 'lbs'];
    if (units.indexOf(initUnit) > -1) {
      switch (initUnit) {
        case 'mi': return 'km';
        case 'km': return 'mi';
        case 'gal': return 'L';
        case 'L': return 'gal';
        case 'lbs': return 'kg';
        case 'kg': return 'lbs';
        default: return false;
      }
    }
    return false;
  };

  this.spellOutUnit = function (unit) {
    let result;
    switch (unit) {
      case 'mi': result = 'miles'; break;
      case 'km': result = 'kilometers'; break;
      case 'gal': result = 'gallons'; break;
      case 'L': result = 'liters'; break;
      case 'lbs': result = 'pounds'; break;
      case 'kg': result = 'kilograms'; break;
      default: result = '';
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    if (initUnit === 'mi' || initUnit === 'km') {
      if (initUnit === 'mi') result = initNum * miToKm;
      else result = initNum / miToKm;
    }
    else if (initUnit === 'gal' || initUnit === 'L') {
      if (initUnit === 'gal') result = initNum * galToL;
      else result = initNum / galToL;
    }
    else if (initUnit === 'lbs' || initUnit === 'kg') {
      if (initUnit === 'lbs') result = initNum * lbsToKg;
      else result = initNum / lbsToKg;
    }
    else return false;
    return +result.toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit);
    return result;
  };

}
// const convert = new ConvertHandler();
// const input = '1.1344/97.32km';
// console.log(input);
// const initNumber = convert.getNum(input);
// const initUnit = convert.getUnit(input);
// const returnUnit = convert.getReturnUnit(initUnit);
// const returnNumber = convert.convert(initNumber, initUnit);
// console.log('This is the Number: ', initNumber);
// console.log('This is the initUnit: ', initUnit);
// console.log('GetReturnUnit: ', returnUnit);
// console.log('Thsi is the unite Spelled-out: ', convert.spellOutUnit(initUnit));
// console.log('The converted result: ', convert.convert(initNumber, initUnit), ' ', convert.spellOutUnit(returnUnit));
// console.log(convert.getString(initNumber, initUnit, returnNumber, returnUnit));
module.exports = ConvertHandler;
