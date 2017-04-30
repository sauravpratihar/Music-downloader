var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
// var mongojs = require('mongojs');
// var db = mongojs('customerapp', ['users']);
// var ObjectId = mongojs.ObjectId;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:"false"}));

// Youtube
var search = require('youtube-search');



app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){ 
    res.render('index');
});

// app.post('/search', function(req, res){
//     var song = req.param('song');


// });


app.get('/song/:param', function(req, res){ 
    var song = req.params.param;
    console.log(song);

    var opts = {
    maxResults: 1,
    key: 'AIzaSyD1J1tnUlAxa0WxO9-XY6AwsuoBc7Dso1w'
    };

    search(song, opts, function(err, results) {
        if(err) return console.log(err);
        
        console.dir(results[0].link);
        // res.render('index')
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(results));
    });


        // res.render('index');

});

app.listen(3000, function(){
    console.log('Server Started!');
})




// KEY
