//File Variables for Proper Functionality
//***************************************
const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');
//***************************************


//Testing
//**********************************************************************

router.get('', (req,res) => {
    res.render('main', {
        
        message: 'Hello there!'}
        );


});
//**********************************************************************


//Handling a Get request for all Task
//**********************************************************************
router.get('/tasks', auth, async (req,res)=>{

    //Finding out if anything was set for the completed value in the url
    //**************************************************************************
    const match = {};

    if(req.query.completed)
    {
        if(req.query.completed === 'true')
        {
            match.completed = true
        }
        else
        {
            match.completed = false;
        }
    }
    //**************************************************************************


    try {
        await req.user.populate({
            path: 'tasks',
            match
        }).execPopulate();
        res.send(req.user.tasks);

    } catch (error)
    {
        res.send('There was an error: ' + error);
    }
});
//******************************************


//Handling a GET request for a Task with a specific ID
//**********************************************************************
router.get('/tasks/:id', auth, async (req,res)=>{

    const _id = req.params.id;

    try {

        const theTask = await Task.findOne({_id,owner:req.user._id});

        if(!theTask)
        {
            return res.status(404).send();
        }

        res.status(200).send(theTask);

    } catch (error) {

        res.status(500).send('There was an error' + error);
    }

});
//**********************************************************************


//Handling a Post Request for Task Creation
//**********************************************************************

router.post('/tasks', auth , async (req,res)=>{

    const aTask = new Task({
        ...req.body,
        owner: req.user._id

    }) ;

    aTask.save().then((result)=>{

        console.log('A new task has been added to the database!')
        console.log('This is the result: ')
        console.log(result)
        res.status(201).send(aTask);

    }).catch((error)=>{

        console.log('There was an error in adding the new task')
        res.send(error)

    })
})
//**********************************************************************


//Deleting a Task
//**********************************************************************

router.delete('/tasks/:id', auth, async(req,res)=>{

    try {

        const deletedTask = await Task.findOneAndDelete({_id:req.params.id, owner: req.user._id});

        if(!deletedTask)
        {
            return res.status(404).send();
        }

        res.status(201).send(deletedTask);

    } catch (error)
    {
        res.status(500).send(error);
    }

});

//**********************************************************************



//Handling a Patch/Update Request for Task Creation
//**********************************************************************

router.patch('/tasks/:id', auth, async(req,res) =>{

    // //Extra Validations
    //*****************************************************
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed', 'description'];

    const isAValidUpdate = updates.every((update)=>{
        return allowedUpdates.includes(update);
    });

    if(!isAValidUpdate)
    {
        return res.status(404).send();
    }
    //*****************************************************

    try
    {
        //Fetching the Task with the provided ID and the User ID
        //************************************************
        const theTask = await Task.findOne({_id: req.params.id, owner: req.user._id});

        if(!theTask)
        {
            //There was no task to update
            return res.status(404).send();
        }

        updates.forEach((update)=>{

            theTask[update] = req.body[update];
        });

        await theTask.save();
        //************************************************

        //If not return the new task/updated
        res.status(201).send(theTask);

    } catch (error)
    {
        res.status(500).send(error);
    }

    const theTask = Task.findByIdAndUpdate()

});
//**********************************************************************

module.exports = router;