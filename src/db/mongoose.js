const mongoose = require('mongoose');

//Connecting to the database with Mongoose
mongoose.connect(process.env.MONGODB_URL,{

    useNewUrlParser: true,
    useCreateIndex: true
});





















