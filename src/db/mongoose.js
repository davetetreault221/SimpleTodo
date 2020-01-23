const mongoose = require('mongoose');

//Connecting to the database with Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{

    useNewUrlParser: true,
    useCreateIndex: true
});





















