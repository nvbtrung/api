'use strict';
const Todo = require("../models/todoModel");
const {Client} = require('pg');

const client = new Client({
    //Connection string to postgres local
    // connectionString: "postgres://postgres:postgres@localhost:5432/postgres",
    //Connection string heroku postgres
    connectionString : process.env.DATABASE_URL,
    // ssl:true,
});
client.connect();
//get
exports.get = function(req, res){    
    client.query('SELECT * FROM todo;', (err, resd) => {
        if(err) {client.end();throw err;}
        let todos = [];
        for(let row of resd.rows){
            todos.push(new Todo(row.id, row.task_name, row.task_content, row.task_iscompleted));
        }
        res.json(todos).end();        
    })
}
//delete
exports.delete = function(req, res){  
    let id = req.body.id;
    client.query('DELETE FROM todo WHERE Id = ' + id + ';', (err, resd) => {
        if(err) {client.end();throw err;}
        res.status(200).end();   
    });
}
//create
exports.create = function(req, res){ 
    let taskName = req.body.TaskName;
    let taskContent = req.body.TaskContent;
    let isCompleted = req.body.IsCompleted;
    let cmd = "INSERT INTO todo(task_name, task_content, task_iscompleted) "
        + "VALUES('"+ taskName + "','" + taskContent + "'," + isCompleted +");";
    client.query(cmd, (err, resd) => {
        if(err) {client.end();throw err;}
        res.status(200).end();      
    });
}
//update
exports.update = function(req, res){
    let id = req.body.Id;
    let taskName = req.body.TaskName;
    let taskContent = req.body.TaskContent;
    let isCompleted = req.body.IsCompleted;
    let cmd = "UPDATE todo " 
        + "SET task_name = '" + taskName + "',"
        + "task_content = '" + taskContent + "',"
        + "task_iscompleted = " + isCompleted 
        + " where id = " + id + ";";
    client.query(cmd, (err, resd) => {
        if(err) {client.end();throw err;}
        res.status(200).end();
    });
}