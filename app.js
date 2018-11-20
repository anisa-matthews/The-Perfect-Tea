require('./db');

const express = require('express');
const path = require('path');
PORT = '27621';



const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({extended: false}));

//schemas
const Tea = mongoose.model('Tea');
const Tag = mongoose.model('Tag');
const User = mongoose.model('User');

//make Tea Objects with a text file...




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

app.get('/', (req, res) => {
    if(req.body.search){
        //find tag object
        Tag.findOne({name: req.body.search}, (err, tag) => {
            if(err){
                res.render('search', {message: "Cannot find any teas with those tags"});
            }
            else{
                const teas = tag.teas;
                res.render('search', {results: teas});
            }
        });
    }
    else{
        res.render('landing');
    }
});

app.listen(process.env.PORT || 3000);