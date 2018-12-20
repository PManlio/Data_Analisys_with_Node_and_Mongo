var MongoClient = require('mongodb').MongoClient;
var db = require('./db');

MongoClient.connect(db.url, function(err, database){
    if(err) throw err;
    database.db('tesi').collection('tesiCollection').count({}, function(err, res){
        if(err) throw err;
        console.log('il database contiene '+res+' elementi');
        database.close();
    });
});

