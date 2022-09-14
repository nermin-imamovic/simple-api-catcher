var express = require('express');
var router = express.Router();
const PicoDB = require('picodb');
const db = PicoDB();

/* GET home page. */
router.get('/', function (req, res, next) {
    db.find({}).toArray()
        .then((resp) => {
            resp.reverse();
            res.render('index', {requests: resp});
        })
        .catch((err) => {
            // your code here
        });
});

/* GET users listing. */
router.post('/post(/*)?', function (req, res, next) {
    db.insertOne({
        method: "POST",
        url: req.url,
        requestBody: req.body,
        requestHeaders: req.headers,
        createdAt: new Date(),
        createdAtTimestamp: new Date().getTime()
    });

    res.send(req.body);
});

/* GET users listing. */
router.get('/get(/*)?', function (req, res, next) {
    db.insertOne({
        method: "GET",
        url: req.url,
        requestBody: null,
        requestHeaders: req.headers,
        createdAt: new Date(),
        createdAtTimestamp: new Date().getTime()
    });

    res.send({
        'ok': true
    });
});


router.get('/api', function (req, res, next) {

    //let url, from, filterBody;

    try {
        let filter = {};
        if (req.query.url) {
            filter.url = req.query.url;
        }

        if (req.query.from) {
            filter.createdAtTimestamp = {$gt: new Date(req.query.from).getTime()}
        }

        db.find(filter).toArray()
            .then((resp) => {
                res.send(resp);
            })
            .catch((err) => {
                next(err)
            });
    } catch (err){
        next(err)
    }

});


module.exports = router;
