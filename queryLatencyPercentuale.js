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
            setTimeout(() => {reject((err)=>{throw err;});}, 5000);
        });
    }

    esec().then(()=>{
        return new Promise((resolve, reject) => {
            database.db('tesi').collection('tesiCollection').countDocuments({Time_L : {$gte:400}}, (err, res)=>{
                if(err) throw err;
                lat400=res;
                resolve(lat400);
            });
            setTimeout(() => {reject((err)=>{throw err;});}, 5000);
        });
    }).then(() => {
        var percentuale = ((lat400/totaldocs)*100);
        console.log('\nThe '+percentuale+'% of total calls has a latency greater than 400 ms');
    }).then(()=>{
        return new Promise((resolve, reject) => {
            database.db('tesi').collection('tesiCollection').countDocuments({Time_L : {$lte:200}}, (err, res)=>{
                if(err) throw err;
                lat200=res;
                resolve(lat200);
            });
            setTimeout(() => {reject((err)=>{throw err;});}, 5000);
        });
    }).then(() => {
        var percentuale = ((lat200/totaldocs)*100);
        console.log('\nThe '+percentuale+'% of total calls has a latency lower than 200 ms');
    }).then(()=>{
        return new Promise((resolve, reject) => {
            database.db('tesi').collection('tesiCollection').countDocuments({Time_L : {$gte:200, $lte:400}}, (err, res)=>{
                if(err) throw err;
                latavg=res;
                resolve(latavg);
            });
            setTimeout(() => {reject((err)=>{throw err;});}, 5000);
        });
    }).then(() => {
        var percentuale = ((latavg/totaldocs)*100);
        console.log('\nThe '+percentuale+'% of total calls has an average response time \n between 200 ms and 400 ms');
    }).then(()=>{
        database.close();
    }).catch((err)=>{throw err;});
});