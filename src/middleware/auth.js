
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req,res,next) => {

    try {

        //Logic for checking if the user is logged in either through header authorization or Cookie
        //**************************************************************
        let token = "";

        if(req.cookies.token)
        {
            token = req.cookies.token;

            if(token === '')
            {
                throw new Error();
            }
        }
        else
        {
            token = req.header('Authorization').replace('Bearer ','');
        }
        //**************************************************************


        //Decoding the Token
        //**************************************************************
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findOne({_id:decoded._id,'tokens.token':token});
        //**************************************************************
        if(!user)
        {
            throw new Error();
        }

        //Everything is Okay
        //**************************************************************
        req.token = token;
        req.user = user;
        next();
        //**************************************************************


    } catch(error)
    {
        res.status(401).send('Error: Please Authenticate');

    }
};

module.exports = auth;