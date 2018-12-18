var MongoClient = require('mongodb').MongoClient;
const db = require('../db');

var documents = [
	{"OpName": "call1", "OpType": "REST", "Time_R": 1, "Time_L": 1, "NumPar": 2},
	{"OpName": "call2", "OpType": "REST", "Time_R": 12, "Time_L": 12, "NumPar": 2},
	{"OpName": "call3", "OpType": "REST", "Time_R": 123, "Time_L": 123, "NumPar": 2},
	{"OpName": "call2", "OpType": "REST", "Time_R": 1234, "Time_L": 1234, "NumPar": 2},
	{"OpName": "call1", "OpType": "REST", "Time_R": 12345, "Time_L": 234, "NumPar": 2},
	{"OpName": "call4", "OpType": "REST", "Time_R": 123456, "Time_L": 34, "NumPar": 2},
	{"OpName": "call5", "OpType": "REST", "Time_R": 1234567, "Time_L": 4, "NumPar": 2},
	{"OpName": "call6", "OpType": "REST", "Time_R": 12345678, "Time_L": 43, "NumPar": 2},
	{"OpName": "call7", "OpType": "REST", "Time_R": 123456789, "Time_L": 432, "NumPar": 2}
];


MongoClient.connect(db.url, function(err, database){

	const tesi = database.db('tesi');
	//var collezione = tesi.collection('provaTesi');
	
	console.log('connessione stabilita');


	//scrittura su Mongo dei file immagazzinati nella variabile Documents soprastanti
	tesi.collection('provaTesi').insertMany(documents, function(error, inserted){
		if(error){
			console.error(error);
		}
		else{
			console.log('Inseriti con successo: '+inserted);
		}
	});

	database.close();

});
console.log('check mongo');