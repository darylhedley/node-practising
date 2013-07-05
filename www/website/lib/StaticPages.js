var StaticPages = module.exports = function StaticPages(){};

StaticPages.prototype = {

    initPages: function(app) {
        app.get('/', function(req, res){
            res.render('index', {
                title: 'Home'
            });
        });
        
        app.get('/Blog', function(req, res){
            res.render('index', {
                title: 'Blog'
            });
        });
        
        app.get('/About', function(req, res){
            res.render('about', {
                title: 'Home'
            });
        });
        
        app.get('/Blog/:id/:title', function(req, res){
		  res.render('post/bp_' + req.params.id , {
		    title: req.params.title.replace(/_/g,' ')
		  });
		});
    }
    
};