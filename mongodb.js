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


    //How to fetch one user:
    //***********************************************************************
    db.collection('users').findOne({name:'Dave'}, (error,user)=>{

        if(error)
        {
           return console.log("There was an error: " + error);
        }

        console.log("Here is the single user: ")
        console.log(user);
        console.log()

    });
    //***********************************************************************

    //How to find many
    //***********************************************************************

    db.collection('users').find({name:'Dave'}).toArray((error,users)=>{

        console.log("Here are the multiple users: ")
        console.log(users)
    })
    //***********************************************************************


    //Practice
    //***********************************************************************

    db.collection('users').updateOne({_id: ObjectId('5e247d855b4840f38a04eb2e')}, {

        $set: {name: 'Frank'}

    }, (error,result)=>{

        console.log(result.modifiedCount)
    })


    //How to delete
    db.collection('tasks').deleteOne({_id:ObjectId('5e24a278837b3af4e817ff77')}).then((result)=>{

        //if there is sucesss

        console.log('This is the result: ' + result)

    }).catch((error)=>{

        console.log('There was an error: ' + error)

    })

    //***********************************************************************
});


//Practicing Promises
//***********************************************************************

//Defining the promise
//***********************************************
//
// const doWorkPromise = new Promise((resolve, reject)=>{
//
//     //Waits 2 seconds to simulate a real life example
//     setTimeout(()=>{
//
//         resolve([1,2,3]);
//         reject("Server Error 101");
//
//     }, 2000)
//
//
// })
// //***********************************************
//
//
// //Calling the promise
// //***********************************************
// doWorkPromise.then((result)=>{
//
//     //This is if things went well and were "Resolved"
//     console.log("This is the success result of a callback with promises: " + result)
//
// }).catch((error)=>{
//     //This is if things went wrong
//     console.log("This is the error if something went wrong: " + error);
// })
// //***********************************************
//



//***********************************************************************





















