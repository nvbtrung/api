'use strict';
const https = require('https');
const {Client} = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl:true,
});

client.connect();

exports.index = function(req, res){
    client.query('SELECT * FROM todo', (err, resd) => {
        if(err) throw err;
        for(let row of resd.rows){
            res.send(JSON.stringify(row));
        }
        client.end();
    });   
}