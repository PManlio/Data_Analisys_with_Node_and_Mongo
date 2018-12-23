var MongoClient = require('mongodb').MongoClient,
    db = require('./db'),
    latency, totaldocs, percentage;

MongoClient.connect(db.url, (err, database) => {
    
    if(err) throw err;

    function noDocs(){
        database.db('tesi').collection('tesiCollection').countDocuments({}, (err, res) => {
            if(err) throw err;
            else return res;
        });
    }
    function CalculatePercentageGT(lat){
        return new Promise(() => {
            database.db('tesi').collection('tesiCollection').countDocuments({Time_L : {$gte:lat}}, (err, res) => {
                if(err) throw err;
                latency = res;
            });
        });
    }

    function CalculatePercentageLT(lat){
        return new Promise(() => {
            database.db('tesi').collection('tesiCollection').countDocuments({Time_L : {$lte:lat}}, (err, res) => {
                if(err) throw err;
                latency = res;
            });
        });
    }

    function CalculatePercentageAVG(infLat, supLat){
        return new Promise(() => {
            database.db('tesi').collection('tesiCollection').countDocuments({Time_L : {$gte:infLat, $lte:supLat}}, (err, res) => {
                if(err) throw err;
                latency = res;
            });
        });
    }

    CalculatePercentageGT(400)
    .then(() => { totaldocs = noDocs(); })
    .then(() => {
        percentage = ((latency/totaldocs)*100);
        console.log('\nThe '+percentage+'% of total calls has a latency greater than 400 ms');
        console.log('\n(number of calls with latency > 400 ms: '+latency+')');
    })
    .catch((error) => { throw error });

    CalculatePercentageLT(200)
    .then(() => { totaldocs = noDocs(); })
    .then(() => {
        percentage = ((latency/totaldocs)*100);
        console.log('\nThe '+percentage+'% of total calls has a latency inferior than 400 ms');
        console.log('\n(number of calls with latency < 200 ms: '+latency+')');
    })
    .catch((error) => { throw error });

    CalculatePercentageAVG(200, 400)
    .then(() => { totaldocs = noDocs(); })
    .then(() => {
        percentage = ((latency/totaldocs)*100);
        console.log('\nThe '+percentage+'% of total calls has an average latency');
        console.log('\n(number of calls with latency between 200 ms and 400 ms: '+latency+')');
    })
    .catch((error) => { throw error;})
});


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
});*/