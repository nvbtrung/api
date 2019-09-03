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
    client.query('SELECT * FROM todo;', (err, resd) => {
        if(err) throw err;
        for(let row of resd.rows){
            res.send(JSON.stringify(row));
        }
    });   
}

//get
exports.get = function(req, res){
    client.query('SELECT * FROM todo;', (err, resd) => {
        if(err) throw err;
        let todos = [];
        for(let row of resd.rows){
            todos.push(new Todo(row.id, row.task_name, row.task_content, row.task_iscompleted));
        }
        res.json(todos);        
    })
}

exports.delete = function(req, res){  
    let id = req.body.id;

    client.query('DELETE FROM todo WHERE Id = ' + id + ';', (err, resd) => {
        if(err) throw err;   
        res.status(200);   
    });
}

exports.create = function(req, res){    
    let taskName = req.body.taskName;
    let taskContent = req.body.taskContent;
    let isCompleted = req.body.isCompleted;

    client.query('INSERT INTO todo(task_name, task_content, task_iscompleted) VALUES('
        + taskName + ','
        + taskContent + ','
        + isCompleted +');', (err, resd) => {
            if(err) throw err;
            client.query('SELECT Max(Id) FROM todo;', (err1, res1) => {
                if(err1) throw err1;
                res.send(res1.id);
            });                        
        });
}