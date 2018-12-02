require('./db');
require('./auth');

const express = require('express');
const app = express();
const path = require('path');


// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: '.(store this elsewhere!)',
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOptions));

//more set up
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
	res.locals.user = req.user;
	next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');

app.use(express.urlencoded({extended: false}));

console.log('ok');

//schemas
const Tea = mongoose.model('Tea');
const Tag = mongoose.model('Tag');
const User = mongoose.model('User');

app.get('/', (req, res) => {
    if(req.query.search){
        console.log("-- " + req.query.search + " --");
        //find tag object
        Tag.findOne({name: req.query.search}, (err, tag) => {
            if(err){
                res.render('search', {message: "Cannot find any teas with those tags"});
            }
            else{
                const teaStrings = tag.teas;
                //for every string in teas, find it's matching tea doc. create an array of those
                const teas = [];
                teaStrings.map((t) => {
                    Tea.findOne({name: t}, (err, tea) =>{
                        teas.push(tea);
                    });
                });
                res.render('search', {results: teas});
            }
        });
    }
    else{
        res.render('landing');
    }
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    User.findOne({username: req.body.username}, function(err, user){
        if(user) { 
            //user already exists. throw error accordingly
            res.render('register',{message:'Username already exists'});
        }
        else{
            User.register(new User({username:req.body.username}), req.body.password, function(err, user){
                if (err){
                    res.render('register',{message:'Your registration information is not valid'});
                } 
                else {
                    passport.authenticate('local')(req, res, function() {
                        res.redirect('/');
                    });
                }
            });
        }
    });   
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    passport.authenticate('local', function(err,user) {
        if(user) {
          req.logIn(user, function(err) {
            res.redirect('/');
          });
        } else {
          res.render('login', {message:'Your login or password is incorrect.'});
        }
    })(req, res, () =>
        res.redirect('/'));
});

app.get('/favs', (req, res) => {
    if(req.user){
        favs = req.user.favs;
        //for every string in teas, find it's matching tea doc. create an array of those
        const favorites = [];
        favs.map((t) => {
            Tea.findOne({name: t}, (err, tea) =>{
                favorites.push(tea);
            });
        });
        //favorites = array of actual tea documents
        res.render('favs', {favorite: favorites});
    }
    else{
        res.redirect('/login');
    }
});

app.post('/favs', (req, res) => {
    if(req.user){
        console.log(req.body.favtea + " added to " +req.user.username+ "'s favorites");
        let tmpfavs = req.user.favs;
        tmpfavs.push(req.body.tea);
        User.updateOne({username: req.user.username}, {favs: tmpfavs}, () => {
            res.redirect('/favs');
        });
    }
    else{
        res.redirect('/login');
    }
});

const fs = require('fs');

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/contact', (req, res) => {
    let {name, email, msg} = req.body;
    fs.appendFile('contacts.txt', name+","+email+","+msg+'\n',(err) => {  
        if (err) throw err;
        console.log('Somebody contacted you!');
    });
    res.render('contact', {message: 'true'})
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.listen(process.env.PORT || 3000);