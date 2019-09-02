'use strict';
import Todo from "../models/todoModel";
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

//get
exports.get = function(req, res){
    client.query('SELECT * FROM todo', (err, resd) => {
        if(err) throw err;
        let todos = [];
        for(let row of resd.rows){
            todos.push(new Todo(row[0], row[1], row[2], row[4]));
        }
        res.json(todos);
    })
}