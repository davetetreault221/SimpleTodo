const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const hbs = require('hbs')

const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

//Loading the Routes
const userRoutes = require('./routers/userRoutes');
const taskRoutes = require('./routers/taskRoutes');

//Paths used to set up config files
//****************************************************
const viewsPath = path.join(__dirname, './views');

console.log(viewsPath);
app.set('view engine', 'hbs');

//Sets a certain value of EXPRESS with a given value
app.set('views', viewsPath);
//****************************************************



//Position is important
// app.use((req,res,next) =>{
//
//     console.log(req.method,req.path);
//
//
//     //Must be called or else it'll jam LOL
//     next();
//
// });

//Automatically parse Json to an object to access in the handlers and set route files
app.use(express.json());
app.use(userRoutes);
app.use(taskRoutes);

const jwt = require('jsonwebtoken');

//Makes sure the app is listening (Express)
app.listen(port, () => {
    console.log('Server is listening on port: ' + port)
});



// const main = async () => {
//
//     // const task =  await Task.findById('5e28ab8ae56b050829dee284');
//     // await task.populate('owner').execPopulate();
//     // console.log(task.owner);
//
//     const user = await User.findById('5e28aa0fb3aa7408096ffac4');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
//
// };
//
// main();




//Notes
//*************************************************
//res.send always calls .toJSON method
//*************************************************



