var MongoClient = require('mongodb').MongoClient;
var db = require('../db');

//Voglio effettuare una query solo sulla collection provaTesi
MongoClient.connect(db.url, function(err, database){
    if(err) throw err;

    const tesi = database.db('tesi');
    const provaTesi = tesi.collection('provaTesi');

    var query1 = {OpName: "call1"};
    //questo find è un "find all". per questo mettiamo il toArray alla fine. Altrimenti, guarda provarimozione.js
    provaTesi.find(query1).toArray(function(err, result){
        if(err) throw err;

        console.log(result);
        console.log('sono stati trovati '+result.length+' elementi aventi lo stesso parametro');
        database.close();
    })
})