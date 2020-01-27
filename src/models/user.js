const mongoose = require('mongoose');
const validator = require('validator');
const Task = require('../models/task');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 6,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('The Email is invalid');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},{

    timestamps: true


});


userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});


//Is accessible only on the instances of User
//******************************************************************
userSchema.methods.generateToken = async function ()
{
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({token:token});
    await user.save();


    return token;
};
//******************************************************************

//******************************************************************
userSchema.methods.toJSON = function ()
{
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};
//******************************************************************

//Logging in
//******************************************************************

userSchema.statics.findByCredentials = async (email, password) => {

    //Finding the user
    const user = await User.findOne({email});

    //Checking to see if there is a user
    if(!user)
    {
        throw new Error('Unable to Login');
    }

    //Checks the Hashed the password with the one provided by the client
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch)
    {
        throw new Error('Unable to Login');
    }

    return user;

};

//******************************************************************


//Performed before the save function which Mongoose JS provides
//******************************************************************
userSchema.pre('save', async function (next) {
    const user = this;

    //Check if the user has modified his or her password
    if(user.isModified('password'))
    {
        //Hash the Password
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});
//******************************************************************

//Deletes the Tasks associated to a User after the User gets deleted
//******************************************************************
userSchema.pre('remove', async function (next) {

    const user = this;
    await Task.deleteMany({owner:user._id});
    next();

});
//******************************************************************


//Developing a Model/Schema
///**********************************************************************
const User = mongoose.model('User',userSchema);
///**********************************************************************

module.exports = User;