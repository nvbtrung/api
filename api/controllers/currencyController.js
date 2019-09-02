'use strict';
const https = require('https');

exports.exchange = function(req, res){
    let from = req.query.from;
    let to = req.query.to.toUpperCase();
    let amount = req.query.amount;
    https.get('https://api.exchangerate-api.com/v4/latest/' + from.toUpperCase(), (resp) => {
        resp.on('data', function(chunk){
            let rates = JSON.stringify(JSON.parse(chunk)['rates'][to]);
            res.json(amount * rates);
        })        
    }).end();
};