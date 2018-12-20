var MongoClient = require('mongodb').MongoClient;
var db = require('../db');

MongoClient.connect(db.url, function(err, database){
    if(err) throw err;

    const tesi = database.db('tesi');
    const provaTesi = tesi.collection('provaTesi');

    var newDoc ={"OpName": "yaffio", "OpType": "fulippo", "Time_R": 91, "Time_L": 31, "NumPar": 2}

    provaTesi.insertOne(newDoc, function(err, res){
        if(err) throw err;
        console.log('elemento inserito: ' + res);
    });

    var query = {OpName: "yaffio"};

    provaTesi.findOne(query, function(err, result){
        if(err) throw err;
        console.log(result);
    });

    provaTesi.deleteOne(query, function(err, obj){
        if(err) throw err;
        console.log('1 elemento rimosso');
        database.close();
    });
});