var MongoClient = require('mongodb').MongoClient;
var db = require('./db');

MongoClient.connect(db.url, (err, database) => {
    if(err) throw err;
    database.db('tesi').collection('tesiCollection').count({}, (err, res) => {
        if(err) throw err;
        console.log('il database contiene '+res+' elementi');
        database.close();
    });
});

