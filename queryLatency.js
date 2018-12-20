var MongoClient = require('mongodb').MongoClient,
    db = require('./db');

MongoClient.connect(db.url, function(err, database){
    if(err) throw err;
    var totaldocs = database.db('tesi').collection('tesiCollection').countDocuments({}, function(err, res){
        if(err) throw err;
        totaldocs = res;
    });
    var docs = [], time = 0;
    
    function dbGetDocuments(){
        return new Promise((succeed, fail) => {
            database.db('tesi').collection('tesiCollection').find({}).toArray( (err, res) => {
                if(err) throw fail;
                else succeed(docs.push(res));
            });
        });
    }
    dbGetDocuments()
        .then( () => {
            docs.forEach ((document) => {
                document.forEach((element) => {
                    time = time + element.Time_L;
                });
            })})
        .then( () => {
            var fres = time/totaldocs;
            console.log('Total n° documents = ' + totaldocs +
                '\nSum of time for whole response = ' + time + ' ms' +
                '\nAverage response time of the service is = ' + fres + ' ms');})
        .catch((error) => { throw error; });
});

