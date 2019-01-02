var MongoClient = require('mongodb').MongoClient;
var db = require('./db');

var call1,
    call2,
    call3,
    call4,
    call5,
    call6,
    call7;

var calls = [call1, call2, call3, call4, call5, call6, call7];

function Comparator(a, b) {
    if (a[1] > b[1]) return -1;
    if (a[1] < b[1]) return 1;
    return 0;
}

MongoClient.connect(db.url, (err, database) => {
    if(err) throw err;
    var tesiCollection = database.db('tesi').collection('tesiCollection');

    return new Promise((resolve, reject)=>{
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
        resolve(calls);

        setTimeout(()=>{reject((err)=>{throw err;})}, 5000);
    })
    .then(()=>{database.close();})
    .then(()=>{callcompare()
        .then(()=>{
            var called =[
                ["call1", call1],
                ["call2", call2],
                ["call3", call3],
                ["call4", call4],
                ["call5", call5],
                ["call6", call6],
                ["call7", call7]
            ];
            called = called.sort(Comparator);
            console.log(called);
        })})
    .catch((err)=>{throw err;});;
})

//last to fix


function callcompare(){
    return new Promise((resolve, reject)=>{
        var lngh = Math.max(call1, call2, call3, call4, call5, call6, call7);
        var longest;
        if(call1 == lngh) {console.log('call1 è la più richiesta'); longest = call1;}
        if(call2 == lngh) {console.log('call2 è la più richiesta'); longest = call2;}
        if(call3 == lngh) {console.log('call3 è la più richiesta'); longest = call3;}
        if(call4 == lngh) {console.log('call4 è la più richiesta'); longest = call4;}
        if(call5 == lngh) {console.log('call5 è la più richiesta'); longest = call5;}
        if(call6 == lngh) {console.log('call6 è la più richiesta'); longest = call6;}
        if(call7 == lngh) {console.log('call7 è la più richiesta'); longest = call7;}
        resolve(longest);
        setTimeout(()=>{reject((err)=>{throw err;})}, 7000);
    })
}

/*
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
*/