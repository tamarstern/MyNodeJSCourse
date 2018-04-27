var Batch = require('../models/batch');

exports.postBatch = function (req, res) {
    var url = req.body.url;
    if (!url) {
        res.status(422);
        return res.json({ message: "no url" });
    }
    var payloads = req.body.payloads;
    if (!payloads) {
        res.status(422);
        return res.json({ message: "no payload" });
    }
    var verb = req.body.verb;
    if (!verb) {
        res.status(422);
        return res.json({ message: "no verb" });
    }

    var batch = new Batch();
    batch.url = url;
    batch.payloads = payloads;
    batch.verb = verb;
    batch.status = 'PENDING';

    batch.save(function (err) {
        if (err) {
            res.status(500);
            return res.send(err);
        } else {
            res.status(202);
            return res.json({ message: 'Batch successfully saved and pending to be executed!', data: batch });
        }
    });
};

exports.getBatches = function (req, res) {
    Batch.find(function (err, batches) {
        if (err) {
            res.status(500);
            return res.send(err);
        }
        return res.json(batches);
    });
};

exports.getBatch = function (req, res) {
    var batchId = req.params.batch_id;
    Batch.findById(batchId, function (err, batch) {
        if (err) {
            res.status(500);
            res.send(err);
        }
        res.json(batch);
    });
};

