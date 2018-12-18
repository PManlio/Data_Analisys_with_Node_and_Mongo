var MongoClient = require('mongodb').MongoClient,
    db = require('./db');

MongoClient.connect(db.url, function(err, database){
    if(err) throw err;
    var latenza = database.db('tesi').collection('tesiCollection').countDocuments({Time_L : {$gte:400}}, function(err, res){
        if(err) throw err;
        latenza = res;
    });
    var totaldocs = database.db('tesi').collection('tesiCollection').countDocuments({}, function(err, res){
        if(err) throw err;
        totaldocs = res;
    });
    setTimeout(function(){
        var percentuale = ((latenza/totaldocs)*100);
        console.log('il '+percentuale+'% delle call presenta una latenza superiore a 400 ms');
        console.log('(chiamate con latenza > 400 ms: '+latenza+')');
        database.close();
    }, 2000);
});

MongoClient.connect(db.url, function(err, database){
    if(err) throw err;
    var latenza = database.db('tesi').collection('tesiCollection').countDocuments({Time_L : {$lte:200}}, function(err, res){
        if(err) throw err;
        latenza = res;
    });
    var totaldocs = database.db('tesi').collection('tesiCollection').countDocuments({}, function(err, res){
        if(err) throw err;
        totaldocs = res;
    });
    setTimeout(function(){
        var percentuale = ((latenza/totaldocs)*100);
        console.log('il '+percentuale+'% delle call presenta una latenza inferiore a 200 ms');
        console.log('(chiamate con latenza < 200 ms: '+latenza+')');
        database.close();
    }, 2000);
});

MongoClient.connect(db.url, function(err, database){
    if(err) throw err;
    var latenza = database.db('tesi').collection('tesiCollection').countDocuments({Time_L : {$gte:200, $lte:400}}, function(err, res){
        if(err) throw err;
        latenza = res;
    });
    var totaldocs = database.db('tesi').collection('tesiCollection').countDocuments({}, function(err, res){
        if(err) throw err;
        totaldocs = res;
    });
    setTimeout(function(){
        var percentuale = ((latenza/totaldocs)*100);
        console.log('il '+percentuale+'% delle call presenta una latenza compresa tra i 200 ms e i 400 ms');
        console.log('(chiamate con latenza compresa tra 200 ms e 400 ms: '+latenza+')');
        database.close();
    }, 2000);
});