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

app.listen(3000, function(){
    console.log('Server Started!');
})