
var request = require('requestretry');
var async = require('async');
var timeout = 1000;
var Batch = require('../models/batch');


var updateResArrStatus = function (resArr, err, response, cb) {
    if (err) {
        resArr.push("FAIL");
    } else if (response && response.statusCode != 200) {
        resArr.push("FAIL");
    } else {
        resArr.push("SUCCESS");
    }
    cb();
};


var prepareOptionsForHttpRequest = function (payload, url) {
    var formData = payload.requestBody;
    let options = {
        url: url,
        form: formData,
        maxAttempts: 2, 
        retryDelay: 300, 
        retrySrategy: request.RetryStrategies.HTTPOrNetworkError 
    };
    return options;
};

var prepareUrl = function (payload, url) {
    for (var key in payload) {
        if (payload.hasOwnProperty(key)) {
            if (key != 'requestBody') {
                var valueToReplace = "{" + key + "}";
                url = url.replace(valueToReplace, payload[key]);
            }
        }
    }
    return url;
}

var editBatchPerPayload = function (url,verb, payload,resArr, cb) {
    url = prepareUrl(payload, url);
    if (verb === 'DELETE') {
        request.delete(url, function (err, response, body) {
            updateResArrStatus(resArr, err, response, cb);
        });
    }
    if (verb === 'POST') {
        let options = prepareOptionsForHttpRequest(payload, url);
        request.post(options, function (err, response, body) {
            updateResArrStatus(resArr, err, response, cb);
        });
    }
    if (verb === 'PATCH') {
        let options = prepareOptionsForHttpRequest(payload, url);
        request.patch(options, function (err, response, body) {
            updateResArrStatus(resArr, err, response, cb);
        });
    }
};

var executeSingleBatch = function (batch, asyncCb) {
    var payloads = JSON.parse(batch.payloads);
    var url = batch.url;
    var verb = batch.verb;
    var resArr = [];
    async.series(payloads,
        function (payload, cb) {
            editBatchPerPayload(url, verb, payload, resArr, cb);
        }, function (err) {
            if (err) {
                console.error("error in Batch job", err);
            }
            batch.batchRes = resArr;
            batch.status = 'COMPLETED';
            batch.save(function (err) {
                if (err) {
                    console.error("error while saving batch", err);
                }
                asyncCb();
            });
        });
}


var executeBatch = function () {
    Batch.find({ status: 'PENDING' }, function (err, res) {
        if (err) {
            console.error("error while executing batch", err);
        }
        if (res == 'undedfined' || res.length == 0) {
            return setTimeout(executeBatch, timeout);
        }
        async.series(res, function (batch, cb) {
            executeSingleBatch(batch, cb);
        }, function (err) {
           setTimeout(executeBatch, timeout);
        });
    });
}

exports.init = function () {
    setTimeout(executeBatch, timeout);
}