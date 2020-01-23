//Required Functions

require('./db/mongoose');
const Task = require('./models/task');


//Creating the deleteTaskAndCount Async function

//Will Always return a Promise because of async
//******************************************************
const deleteTaskAndCount = async (id) =>{

    const deletedTask = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments();

    //Return the count on the promise value
    return count;
};
//******************************************************

//Testing the new function
//******************************************************

deleteTaskAndCount('5e261d1b914bb1fad7095777').then((count)=>{
    console.log('This is the count: ' + count);
}).catch((error)=>{
    console.log(error)
});


//******************************************************

//Creating a new Promise
//******************************************************
const add = ((a,b) => {

    return new Promise((resolve,reject)=>{

        setTimeout(()=> {
            resolve(a+b);
        }, 2000)
    })
});
//******************************************************
