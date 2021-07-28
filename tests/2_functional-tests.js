const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    test('Checking conversion of "10L" using http requests', function (done) {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '10L' })
            .end(function (err, res) {
                assert.equal(res.body.returnNum, 2.64172);
                if (err) done(err);
                else done();
            });
    });

    test('Checking conversion of "32gal" using http requests', function (done) {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '32gal' })
            .end(function (err, res) {
                assert.equal(res.body.returnNum, 121.13312);
                if (err) done(err);
                else done();
            });
    });

    test('Checking conversion with an invalid number input "3/7.2/4kg" using http requests', function (done) {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '3/7.2/4kg' })
            .end(function (err, res) {
                assert.equal(res.text, 'invalid number');
                if (err) done(err);
                else done();
            });
    });

    test('Checking conversion with an invalid number and unit input "3/7.2/4kilomegagram" using http requests', function (done) {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '3/7.2/4kilomegagram' })
            .end(function (err, res) {
                assert.equal(res.text, 'invalid number and unit');
                if (err) done(err);
                else done();
            });
    });

    test('Checking conversion with an invalid input "3/7.2/4kg" using http requests', function (done) {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '3/7.2/4kilomegagram' })
            .end(function (err, res) {
                assert.equal(res.text, 'invalid number and unit');
                if (err) done(err);
                else done();
            });
    });

    test('Checking conversion with no number using http requests', function (done) {
        chai.request(server)
            .get('/api/convert')
            .query({ input: 'kg' })
            .end(function (err, res) {
                assert.equal(res.body.initNum, 1);
                if (err) done(err);
                else done();
            });
    })

});
