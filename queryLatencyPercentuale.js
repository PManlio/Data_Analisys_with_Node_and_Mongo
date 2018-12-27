var MongoClient = require('mongodb').MongoClient,
    db = require('./db'),
    totaldocs, lat400, lat200, latavg;

MongoClient.connect(db.url, (err, database)=>{
    if(err) throw err;

    function esec(){
        return new Promise((resolve, reject)=>{
            database.db('tesi').collection('tesiCollection').countDocuments({}, (err, res)=>{
                if(err) throw err;
                totaldocs = res;
                resolve(totaldocs);
            });
            setTimeout(() => {reject((err)=>{throw err;});}, 2000);
        });
    }
    esec().then(()=>{
        return new Promise((resolve, reject) => {
            database.db('tesi').collection('tesiCollection').countDocuments({Time_L : {$gte:400}}, (err, res)=>{
                if(err) throw err;
                lat400=res;
                resolve(lat400);
            });
            setTimeout(() => {reject((err)=>{throw err;});}, 2000);
        });
    }).then(() => {
        var percentuale = ((lat400/totaldocs)*100);
        console.log('\nThe '+percentuale+'% of total calls has a latency greater than 400 ms');
    }).then(()=>{
        database.close();
    }).catch((err)=>{throw err;});
});

/*
function esegui(){
    openingConnection()
    .catch((err) => {
        reject(err);
    })
    .then(()=>{
        console.log('sto entrando nel THEN')
        percentuale = (lat400/totaldocs)*100;
        console.log('\necco il risultato: ' + percentuale);
        database.db('tesi').collection('tesiCollection').countDocuments({}, (err, res) => { 
            if(err) throw err;
            totaldocs = res;
            console.log(totaldocs);
        });
        database.db('tesi').collection('tesiCollection').countDocuments({Time_L : {$gte:400}}, (err, res) => {
            if(err) throw err;
            lat400 = res;
            console.log(lat400);
        });
    })
    .then(()=>{
        console.log('poi entro qui');
        var percentuale = ((lat400/totaldocs)*100);
        console.log('\nThe '+percentuale+'% of total calls has a latency greater than 400 ms');
    });
}
/*
MongoClient.connect(db.url, (err, database) => {
    if(err) throw err;
    var latenza = database.db('tesi').collection('tesiCollection').countDocuments({Time_L : {$gte:400}}, (err, res) => {
        if(err) throw err;
        latenza = res;
    });
    var totaldocs = database.db('tesi').collection('tesiCollection').countDocuments({}, (err, res) => {
        if(err) throw err;
        totaldocs = res;
    });
    setTimeout(function(){
        var percentuale = ((latenza/totaldocs)*100);
        console.log('\nThe '+percentuale+'% of total calls has a latency greater than 400 ms');
        console.log('\n(number of calls with latency > 400 ms: '+latenza+')');
        database.close();
    }, 2000);
});

MongoClient.connect(db.url, (err, database) => {
    if(err) throw err;
    var latenza = database.db('tesi').collection('tesiCollection').countDocuments({Time_L : {$lte:200}}, (err, res) => {
        if(err) throw err;
        latenza = res;
    });
    var totaldocs = database.db('tesi').collection('tesiCollection').countDocuments({}, (err, res) => {
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

MongoClient.connect(db.url, (err, database) => {
    if(err) throw err;
    var latenza = database.db('tesi').collection('tesiCollection').countDocuments({Time_L : {$gte:200, $lte:400}}, (err, res) => {
        if(err) throw err;
        latenza = res;
    });
    var totaldocs = database.db('tesi').collection('tesiCollection').countDocuments({}, (err, res) => {
        if(err) throw err;
        totaldocs = res;
    });
    setTimeout(() => {
        var percentuale = ((latenza/totaldocs)*100);
        console.log('il '+percentuale+'% delle call presenta una latenza compresa tra i 200 ms e i 400 ms');
        console.log('(chiamate con latenza compresa tra 200 ms e 400 ms: '+latenza+')');
        database.close();
    }, 2000);
});
*/