
/**
 * Module dependencies.
 */

var express = require('express'), 
    routes = require('./routes'), 
    user = require('./routes/user'), 
    test = require('./routes/test'),
    path = require('path'),
    mongoose = require( 'mongoose' );

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/test', test.test);

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

mongoose.connect ('mongodb://localhost/database');

//Schemas
var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date
});

//Models
var BookModel = mongoose.model( 'Book', Book );

//Get a list of all books
app.get( '/api/books', function( request, response ) {
    return BookModel.find( function( err, books ) {
        if( !err ) {
            return response.send( books );
        } else {
            return console.log( err );
        }
    });
});

//Insert a new book
app.post( '/api/books', function( request, response ) {
    var book = new BookModel({
        title: request.body.title,
        author: request.body.author,
        releaseDate: request.body.releaseDate
    });
    book.save( function( err ) {
        if( !err ) {
            return console.log( 'created' );
        } else {
            return console.log( err );
        }
    });
    return response.send( book );
});

//Get a single book by id
app.get( '/api/books/:id', function( request, response ) {
    return BookModel.findById( request.params.id, function( err, book ) {
        if( !err ) {
            return response.send( book );
        } else {
            return console.log( err );
        }
    });
});

//Update a book
app.put( '/api/books/:id', function( request, response ) {
    console.log( 'Updating book ' + request.body.title );
    return BookModel.findById( request.params.id, function( err, book ) {
        book.title = request.body.title;
        book.author = request.body.author;
        book.releaseDate = request.body.releaseDate;

        return book.save( function( err ) {
            if( !err ) {
                console.log( 'book updated' );
            } else {
                console.log( err );
            }
            return response.send( book );
        });
    });
});

//Delete a book
app.delete( '/api/books/:id', function( request, response ) {
    console.log( 'Deleting book with id: ' + request.params.id );
    return BookModel.findById( request.params.id, function( err, book ) {
        return book.remove( function( err ) {
            if( !err ) {
                console.log( 'Book removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});

/* THIS NEEDS ADDING TO BACKBONE MODEL
parse: function( response ) {
    response.id = response._id;
    return response;
}
*/