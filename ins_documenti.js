var MongoClient = require('mongodb').MongoClient;
var db = require('./db');

function random(low, high){
    return Math.random()*(high - low) + low;
}

MongoClient.connect(db.url, function(err, database){
    if(err) throw err;

    const tesi = database.db('tesi');
    const tesiCollection = tesi.collection('tesiCollection');

    var calls = ['call1', 'call2', 'call3', 'call4', 'call5', 'call6', 'call7'];

    var docs = [];
    var k = 0;

    for(var i = 0; i<100000; i++){
        var opnm = calls[Math.floor(Math.random()*calls.length)];
        var timeRrand = (Math.round(new Date().getTime()/1000.0))+k; //made to increment virtual date
        var timeLrand = random(125, 500);
        var doc = {"OpName": opnm, "OpType": "REST", "Time_R": timeRrand, "Time_L": timeLrand, "NumPar": 2};
        k= k+2;
        docs.push(doc);
    }

    tesiCollection.insertMany(docs, function(err, inserted){
        if(err) throw err;
        console.log('Inseriti con successo: '+ docs.length);
        database.close();
    });

});