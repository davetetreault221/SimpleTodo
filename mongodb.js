//Creating the CRUD operations

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = require('mongodb').ObjectID;

const connectionURL = 'mongodb://127.0.0.1:27017';

//Database Name
const databaseName = 'task-manager';

//A provided method which allows us to connect to MongoDB
MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) =>{

    if(error)
    {
        return console.log("There was an error connecting to the database");
    }

    //Returns a reference to the database
    const db = client.db(databaseName);

    //***********************************************************************
});


















