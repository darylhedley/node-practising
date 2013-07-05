var users = require('../data/users');

console.log(users);

exports.test = function(req, res){
    res.render('test', { 
        title: 'Node' , 
        body: 'Hey check this out. My very first node website.',
        users: users
    });
};