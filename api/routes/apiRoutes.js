'use strict';
module.exports = function(app){
    var currency = require('../controllers/currencyController');
    var todo = require('../controllers/todoController');

    //Route currency
    app.route('/currency')
        .get(currency.exchange);
    
    //Route todo
    app.route('/todo')
        .get(todo.index);
    app.route('/todo/get')
        .get(todo.get);
    app.route('/todo/delete')
        .post(todo.delete);
    app.route('/todo/create')
        .get(todo.create);
}