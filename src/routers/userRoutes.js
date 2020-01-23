
//File Variables for Proper Functional
//***************************************
const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const User = require('../models/user');
//***************************************


//Handling a Patch/Update Request on the User Table
//**********************************************************************

router.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email','password','age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        //const user = await User.findById(req.user._id)

        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();

        res.send(req.user)

    } catch (e) {
        res.status(400).send(e)
    }
})
//**********************************************************************

//Handling a Delete Request on the Users Table
//**********************************************************************
router.delete('/users/me', auth, async (req, res) => {

    try {

        // const user = await User.findByIdAndDelete(req.user._id);
        //
        // if (!user) {
        //     return res.status(404).send()
        // }

        await req.user.remove();

        res.send(req.user)

    } catch (e) {
        res.status(500).send()
    }

})
//**********************************************************************

//Handling a Post Request For User Creation
//**********************************************************************
router.post('/users',async(req,res)=>{

    //Refactor with Await
    const user = new User(req.body);


    try {
        await user.save();
        const token = await user.generateToken();

        res.status(201).send({user, token});

    } catch (error) {
        res.status(400).send(error);
    }

});
//**********************************************************************


router.post('/users/logout', auth, async(req,res)=>{

    try
    {
        req.user.tokens = req.user.tokens.filter((token) =>{

            return token.token !== req.token
        })

        await req.user.save();

        res.send();

    } catch(error)  {
        res.status(500).send();
    }

});

router.post('/users/logoutAll', auth, async(req,res)=>{

    try
    {
        req.user.tokens = [];
        await req.user.save();

        res.send();

    } catch(error)  {
        res.status(500).send();
    }

});


//Endpoint used to log in
//**********************************************************************
router.post('/users/login',async(req,res)=>{

    try{
        //Using the the User Schema to call a function
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateToken();

        res.send({user, token});

    } catch (error)
    {
        res.status(400).send();
    }

});
//**********************************************************************

//Handling a GET request for all the Users table/Collection
//**********************************************************************
router.get('/users/me', auth ,(req,res)=>{

    res.send(req.user);
});
//**********************************************************************


//Exporting the User Route
module.exports = router;