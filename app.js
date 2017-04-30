var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);
var ObjectId = mongojs.ObjectId;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:"false"}));

app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});
// 
// var logger = function(req, res, next){
//     console.log('logging...');
//     next();
// }

// app.use(logger);
// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// Express-validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
var users = [
    {
        id:1,
        first_name: 'Saurav',
        last_name: 'Pratihar',
        email: 'saurav@gmail.com'
    },

     {
        id:2,
        first_name: 'Sumit',
        last_name: 'Pratihar',
        email: 'sumit@gmail.com'
    },

     {
        id:3,
        first_name: 'Trusha',
        last_name: 'Pratihar',
        email: 'trusha@gmail.com'
    }
]

app.get('/', function(req, res){
    db.users.find(function(err,docs){
        console.log(docs);
    
    res.render('index', {
        title: 'customer',
        users: docs
        });
    });
});

app.post('/users/add', function(req, res){
    req.checkBody('first_name', 'First Name is Required').notEmpty();
    req.checkBody('last_name', 'Last Name is Required').notEmpty();
    req.checkBody('email', 'email is Required').notEmpty();

    var errors = req.validationErrors();
    
    if(errors){ 
        res.render('index', {
        title: "Customer",
        users: users,
        errors:errors
    });

    }
    else{
    var newUser =  {
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email
    }

    db.users.insert(newUser, function(err,result){  
        if(err){
            console.log(err);
        }

        res.redirect('/');
    });
    console.log("Success");
    
    
}


});

app.delete('/users/delete/:id', function(req, res){
    db.users.remove({_id: ObjectId(req.params.id)},function(err){
        if(err){
        console.log(err);
        }
    
        res.redirect('/');
    
    });
    
});
app.listen(3000, function(){
    console.log('Server Started!');
})