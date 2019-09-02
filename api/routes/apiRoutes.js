'use strict';
module.exports = function(app){
    var currency = require('../controllers/currencyController');
    var todo = require('../controllers/todoController');

    //Route currency
    app.route('/currency')
        .get(currency.exchange);
    
    //Route todo
    app.route('/todo')

}