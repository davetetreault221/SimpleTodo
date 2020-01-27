const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const hbs = require('hbs');
const jwt = require('jsonwebtoken');


const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth');
const path = require('path');

const app = express();
const port = process.env.PORT;

//Loading the Routes
const userRoutes = require('./routers/userRoutes');
const taskRoutes = require('./routers/taskRoutes');

//Paths used to set up config files
//****************************************************
const viewsPath = path.join(__dirname, './views');
const publicDirectoryPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.use(cookieParser());
app.use(express.static(publicDirectoryPath));
app.set('views', viewsPath);
//****************************************************

//Routes for Page navigation
//******************************************************************
app.get('', (req,res) => {
    res.render('index');
});

app.get('/main', auth, (req, res) => {

    //Need to return the right info
    res.render('main', {name:req.user.name});
});


//******************************************************************

//Automatically parse Json to an object to access in the handlers and set route files
app.use(express.json());
app.use(userRoutes);
app.use(taskRoutes);


//Makes sure the app is listening (Express)
app.listen(port, () => {
    console.log('Server is listening on port: ' + port)
});
