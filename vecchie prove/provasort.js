var MongoClient = require('mongodb').MongoClient;
var db = require('../db');

MongoClient.connect(db.url, function(err, database){
    if(err) throw err;
    
    //const tesi = database.db('tesi');
    //const provaTesi = tesi.collection('provaTesi');

    var mysort = {Time_L: 1}; //1 sta per ordine crescente, -1 per ordine decrescente
    
    database.db('tesi').collection('provaTesi').find().sort(mysort).toArray(function(err, res){
        if(err) throw err;

        console.log(res);
        database.close();
    });
    
});