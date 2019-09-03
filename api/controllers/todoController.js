'use strict';
const Todo = require("../models/todoModel");
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
            todos.push(new Todo(row.id, row.task_name, row.task_content, row.task_iscompleted));
        }
        res.json(todos);
    })
}

exports.delete = function(req, res){
    // if(req.method === 'POST'){
    //     let body = '';
    //     req.on('data', chunk => {
    //         body += chunk.toString();
    //     });
    //     req.on('end', ()=>{
    //         res.end(body);
    //     });
    // }
    res.send("hello");
}