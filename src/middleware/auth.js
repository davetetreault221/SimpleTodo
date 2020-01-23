
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req,res,next) => {

    try {

        //Checking
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,'hello');
        const user = await User.findOne({_id:decoded._id,'tokens.token':token});

        if(!user)
        {
            throw new Error();
        }

        //Everything is Okay
        req.token = token;
        req.user = user;
        next();

    } catch(error)
    {
        res.status(401).send('Error: Please Authenticate');

    }


};

module.exports = auth