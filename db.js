//Data Model Draft 1

const mongoose = require('mongoose');

const Tea = new mongoose.Schema({
    name: {type: String},
    tags: //tag documents, type: doc array
});

const Tag = new mongoose.Schema({
    name: {type: String},
    teas: //tea documents, type: doc array
});

const User = new mongoose.Schema({
    // username provided by authentication plugin
    // password hash provided by authentication plugin
    favs: //tea documents, type: doc array
});

//connect to mongodb, export model