const express = require('express');
const {Issue} = require("../models/schema");
const router = express.Router();

//messages
const noData = "Data cannot be found";
const missingId = "You need to provide an id";
const somethingWentWrong = "Something went wrong"

//get all issues
router.get('/issues', async(req, res) => {
    const data = await Issue.find({});
    res.status(200).json({data: data});
});

//get an issue by id
router.get('/issues/:id', async(req, res) => {
    const id = req.params.id;
    if(!id) {
        res.status(400).json({message: missingId});
        return;
    }

    try {
        const data = await Issue.find({
            _id: id
        });

        if(data.length === 0) {
            res.status(400).json({message: noData});
            return;
        }

        res.status(200).json({data: data});
    } catch(e) {
        res.status(500).json({message: e.message});
    }
});

//add an issue
router.post('/issues', async(req, res) => {
    const b = req.body;
    const data = new Issue({
        // id: b.id,
        title: b.title,
        description: b.description,
        author: b.author,
        priority: b.priority,
        authorEmail: b.authorEmail
    });

    if(data === undefined || data === null) {
        res.status(400).json({message: somethingWentWrong})
        return;
    }

    const newData = await data.save();
    res.status(201).json({data: newData});
});

//delete an issue by id
router.delete('/issues/:id', async(req, res) => {
    const id = req.params.id;
    if(!id) {
        res.status(400).json({message: missingId});
        return;
    }
    try {
        await Issue.findOneAndRemove({id: id});
        res.json({message: "Successfully deleted issue #" + id});
    } catch(e) {
        res.status(500).json({message: e.message});
    }
});

//update an issue given the id
router.patch('/issues/:id/', async(req, res) => {
    const body = req.body;
    const id = body.id;
    const title = body.title;
    const description = body.description;
    const priority = body.priority;

    if(!id) {
        res.status(400).json({message: missingId});
        return;
    }

    try{
        if(title && description && priority) {
            await Issue.updateOne({id: id}, {
                title: title,
                description: description,
                priority: priority,
                lastUpdated: Date.now()
            });
        } else if(title && description) {
            await Issue.updateOne({id: id}, {title: title, description: description, lastUpdated: Date.now()});
        } else if(title) {
            await Issue.updateOne({id: id}, {title: title, lastUpdated: Date.now()});
        }
        res.status(200).json({message: "Successfully updated issue #" + id});
    }catch(e){
        res.status(500).json({message: e.message});
    }
});

module.exports = router;