'use strict';
const https = require('https');

exports.index = function(req, res){
    res.send("Hello, this is page index from todo");
}