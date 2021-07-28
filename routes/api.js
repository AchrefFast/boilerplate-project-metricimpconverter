'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', function (req, res) {
    const data = req.query.input;
    // console.log(convertHandler.getNum(data), convertHandler.getUnit(data));
    if (convertHandler.getNum(data) && convertHandler.getUnit(data)) {
      const initNum = convertHandler.getNum(data);
      const initUnit = convertHandler.getUnit(data);
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      const response = {
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: string
      }
      //console.log(response);
      res.json(response);
    }
    else if (!convertHandler.getNum(data) && convertHandler.getUnit(data)) {
      res.send("invalid number");
    }
    else if (convertHandler.getNum(data) && !convertHandler.getUnit(data)) {
      res.send("invalid unit")
    }
    else res.send("invalid number and unit");
  });

};
