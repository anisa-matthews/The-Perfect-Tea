require('./db');

const express = require('express');
const app = express();
const path = require('path');
PORT = '27621';
console.log('ok');

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: '.(store this elsewhere!)',
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');

app.use(express.urlencoded({extended: false}));

//schemas
const Tea = mongoose.model('Tea');
const Tag = mongoose.model('Tag');
const User = mongoose.model('User');

//make Tea Objects with a text file...


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
                teaStrings.forEach((t) => {
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

app.listen(process.env.PORT || 3000);