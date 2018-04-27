
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Batch = require('../models/batch');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
var async = require('async');
let should = chai.should();

chai.use(chaiHttp);

var serverUrl = 'http://localhost:3030/api/messages/{messageId}';
var serverUrlPost = 'http://localhost:3030/api/messages/';


var constructPayloadForSinglePatch = function () {
    var payloads = [];
    var payload = {};
    payload.messageId = 7;
    payload.requestBody = {};
    payload.requestBody.text = 30;
    payloads.push(payload);
    var payloadsStr = JSON.stringify(payloads);
    return payloadsStr;
}

var constructPayloadForSinglePost = function () {
    var payloads = [];
    var payload = {};
    payload.requestBody = {};
    payload.requestBody.text = 30;
    payloads.push(payload);
    var payloadsStr = JSON.stringify(payloads);
    return payloadsStr;
}

var constructPayloadForSingleDelete = function() {
    var payloads = [];
    var payload = {};
    payload.messageId = 7;
    payloads.push(payload);
    var payloadsStr = JSON.stringify(payloads);
    return payloadsStr;
    
}



describe('Batches', () => {
    beforeEach((done) => { //Before each test we empty the database
        Batch.remove({}, (err) => {
            done();
        });
    });
    describe('/GET batch', () => {
        it('it should GET all the batchs', (done) => {
            chai.request(server)
                .get('/api/batch')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST batch', () => {
        it('it should POST a batch', (done) => {
            var payloadsStr = constructPayloadForSinglePatch();
            let batch = {
                url: serverUrl,
                verb: 'PATCH',
                payloads: payloadsStr
            }
            chai.request(server)
                .post('/api/batch')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(batch)
                .end((err, res) => {
                    res.should.have.status(202);
                    res.body.should.be.a('object');
                    res.body.data.should.have.property('url').eql(serverUrl);
                    res.body.data.should.have.property('verb').eql('PATCH');
                    res.body.data.should.have.property('status').eql('PENDING');
                    res.body.data.should.have.property('payloads').eql(payloadsStr);
                    done();
                });
        });

    });

    describe('/POST batch', () => {
        it('it should not POST a batch with no verb', (done) => {
            var payloadsStr = constructPayloadForSinglePatch();
            let batch = {
                url: serverUrl,
                payloads: payloadsStr
            }
            chai.request(server)
                .post('/api/batch')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(batch)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

    });

    describe('/POST batch', () => {
        it('it should not POST a batch with no url', (done) => {
            var payloadsStr = constructPayloadForSinglePatch();
            let batch = {
                verb: 'PATCH',
                payloads: payloadsStr
            }
            chai.request(server)
                .post('/api/batch')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(batch)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

    });

    describe('/POST batch', () => {
        it('it should not POST a batch with no payloads', (done) => {
            var payloadsStr = constructPayloadForSinglePatch();
            let batch = {
                url: serverUrl,
                verb: 'PATCH'
            }
            chai.request(server)
                .post('/api/batch')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(batch)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

    });

    describe('/GET/:id batch', () => {
        it('it should GET a batch by the given id', (done) => {
            var payloadsStr = constructPayloadForSinglePatch();
            let batch = new Batch({ url: serverUrl, verb: 'PATCH', payloads: payloadsStr });
            batch.save((err, batch) => {
                chai.request(server)
                    .get('/api/batch/' + batch.id)
                    .send(batch)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('url').eql(serverUrl);
                        res.body.should.have.property('verb').eql('PATCH');
                        res.body.should.have.property('payloads').eql(payloadsStr);
                        res.body.should.have.property('_id').eql(batch.id);
                        done();
                    });
            });

        });
    });

    describe('Check Patch executed by batch job executer', () => {
        it('Check Patch executed by batch job executer', (done) => {
            done()
        });

    });

    describe('Check POST executed by batch job executer', () => {
        it('Check POST executed by batch job executer', (done) => {
           done();

    });

    describe('Check DELETE executed by batch job executer', () => {
        it('Check DELETE executed by batch job executer', (done) => {
            done();
        });
         

    });
});
});
