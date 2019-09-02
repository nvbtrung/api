'use strict';
const https = require('https');
const {Client} = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl:true,
});

client.connect();

exports.index = function(req, res){
    client.query('SELECT * FROM todo', (err, res) => {
        if(err) throw err;
        for(let row of res.row){
            res.send(JSON.stringify(row));
        }
        client.end();
    });   
}