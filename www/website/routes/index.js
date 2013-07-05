var index = require('../data/index');
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', { 
        title: index.title, 
        body: index.body
    });
};