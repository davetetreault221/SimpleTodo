
const mongoose = require('mongoose');
const validator = require('validator');


//Defining the Task Model
///**********************************************************************
const taskSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},
    {
        timestamps: true
});
///**********************************************************************

//Developing a Model/Schema
///**********************************************************************
const Task = mongoose.model('Task',taskSchema);
///**********************************************************************

//Make sure that index.js can create an instance of it
module.exports = Task;