var MongoClient = require('mongodb').MongoClient;
var db = require('./db');


var call1,
    call2,
    call3,
    call4,
    call5,
    call6,
    call7;

MongoClient.connect(db.url, function(err, database){
    if(err) throw err;
    var tesiCollection = database.db('tesi').collection('tesiCollection');

    tesiCollection.count({OpName:"call1"}, function(err, res){
        if(err) throw err;
        console.log(res);
        call1 = res;
    });

    tesiCollection.count({OpName:"call2"}, function(err, res){
        if(err) throw err;
        console.log(res);
        call2 = res;
    });

    tesiCollection.count({OpName:"call3"}, function(err, res){
        if(err) throw err;
        console.log(res);
        call3 = res;
    });

    tesiCollection.count({OpName:"call4"}, function(err, res){
        if(err) throw err;
        console.log(res);
        call4 = res;
    });
    
    tesiCollection.count({OpName:"call5"}, function(err, res){
        if(err) throw err;
        console.log(res);
        call5 = res;
    });
    
    tesiCollection.count({OpName:"call6"}, function(err, res){
        if(err) throw err;
        console.log(res);
        call6 = res;
    });
    
    tesiCollection.count({OpName:"call7"}, function(err, res){
        if(err) throw err;
        console.log(res);
        call7 = res;
    });

    setTimeout(function after5Seconds(){
        database.close();
    }, 5000);
});

setTimeout(function callCompare(){
    var lngh = Math.max(call1, call2, call3, call4, call5, call6, call7);
    if(call1 == lngh) console.log('call1 è la più richiesta');
    if(call2 == lngh) console.log('call2 è la più richiesta');
    if(call3 == lngh) console.log('call3 è la più richiesta');
    if(call4 == lngh) console.log('call4 è la più richiesta');
    if(call5 == lngh) console.log('call5 è la più richiesta');
    if(call6 == lngh) console.log('call6 è la più richiesta');
    if(call7 == lngh) console.log('call7 è la più richiesta');
}, 7000);

function Comparator(a, b) {
    if (a[1] > b[1]) return -1;
    if (a[1] < b[1]) return 1;
    return 0;
}

setTimeout(function callCompare(){
    var calls =[
        ["call1", call1],
        ["call2", call2],
        ["call3", call3],
        ["call4", call4],
        ["call5", call5],
        ["call6", call6],
        ["call7", call7]
    ];
    calls = calls.sort(Comparator);
    console.log(calls);
}, 10000);