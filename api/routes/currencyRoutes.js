'use strict';
module.exports = function(app){
    var currency = require('../controllers/currencyController');

    //currency Routes
    app.route('/change')
        .get(currency.exchange);
}