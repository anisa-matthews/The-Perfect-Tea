//Data Model Draft 1

const mongoose = require('mongoose');

const Tea = new mongoose.Schema({
    name: {type: String},
    desc: {type: String},
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
// is the environment variable, NODE_ENV, set to PRODUCTION?
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
    // if we're in PRODUCTION mode, then read the configuration from a file
    // use blocking file io to do this...
    const fs = require('fs');
    const path = require('path');
    const fn = path.join(__dirname, 'config.json');
    const data = fs.readFileSync(fn);

    // our configuration file will be in json, so parse it and set the
    // connection string appropriately!
    const conf = JSON.parse(data);
    dbconf = conf.dbconf;
} else {
    // if we're not in PRODUCTION mode, then use
    dbconf = 'mongodb://localhost/am7931';
}

mongoose.connect(dbconf);