var MongoClient = require('mongodb').MongoClient;
var db = require('./db');

function random(low, high){
    return Math.random()*(high - low) + low;
}

//con questo file, inseriamo delle call che vengono effettuate con ridondanza maggiore
//e alcune con latency maggiore

MongoClient.connect(db.url, function(err, database){
    if(err) throw err;

    const tesi = database.db('tesi');
    const tesiCollection = tesi.collection('tesiCollection');

    var calls = ['call1', 'call2', 'call3', 'call3'];

    var docs = [];
    var k = 0;

    for(var i = 0; i<100; i++){ //prima era i<100000
        var opnm = calls[Math.floor(Math.random()*calls.length)];
        var timeRrand = (Math.round(new Date().getTime()/1000.0))+k; //segnala la struttura di sto coso nella tesi
        var timeLrand = random(320, 500);//prima era random(120, 500)
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