let express = require('express');
let Router = express.Router();
let data = require('./models/taskSchema');

Router.get('/', async (req, res) => {
    let tasks = await data.find();
    res.json(tasks);
})

Router.post('/', (req, res) => {
    let {title, description} = req.body;
    if(!title || !description) {
        return res.status(400).send("title and description are required");
    }
    try{
        const task = new data({title, description});
        task.save();
        res.status(201).send({success:true,message:"task added successfully"});
    }catch(err) {
        res.status(500).send({success:false, message:"something went wrong"});
    }
        
})

Router.put('/:id', async (req, res) => {
    let id = req.params.id;
    if(!id) {
        return res.status(404).send({success:false, message:"task not found"});
    }
    let {title, description} = req.body;
    
    try{
        if(!title || !description) {
            return res.status(400).send("title and description are required");
        }
        const task = await data.findByIdAndUpdate(id, {title, description}, {new: true});
        res.status(200).send({success:true, message:"task updated successfully"});
    }
    catch(err) {
        res.status(500).send({success:false, message:"something went wrong"});
    }
})

Router.delete('/:id', async (req, res) => {
    let {id} = req.params;
    try{
        const task = await data.findByIdAndDelete(id);
        if(!task) {
            return res.status(404).send({success:false, message:"task not found"});
        }
        res.status(200).send({success:true, message:"task deleted successfully"});
    }
    catch(err) {
        res.status(500).send({success:false, message:"something went wrong"});
    }
    res.status(200).send({success:true, message:"task deleted successfully"});

})

Router.patch('/:id', async (req, res) => {
    let {id} = req.params;
    try{
        const task = await data.findById(id);
        if(!task) {
            return res.status(404).send({success:false, message:"task not found"});
        }
        task.completed = !task.completed;
        await task.save();
        res.status(200).send({success:true, message:"task deleted successfully"});
    }
    catch(err) {
        res.status(500).send({success:false, message:"something went wrong"});
    }
})

module.exports = Router;