require('./db');

const express = require('express');
const path = require('path');

const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({extended: false}));

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: '(store this elsewhere!)',
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);