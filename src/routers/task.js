const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = express.Router();


router.post("/tasks",auth,async(req,res)=>{

    
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })
    
    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(e);
    }
});

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=10
// GET /tasks?sortBy=createdAt:desc

// example for options={
                //     limit:1,
                //     skip:1,
                //     sort:{
                //         createdAt:1
                //     }
                // }
router.get("/tasks",auth,async(req,res)=>{
    const match = {};
    const options = {};
    const sort = {};

    if(req.query.sortBy){// for sorting
        const parts = req.query.sortBy.split(":");
        sort[parts[0]] = parts[1] === "desc"?-1:1;
        options.sort = sort;
    }

    if(req.query.limit){// for pagination
        options.limit = parseInt(req.query.limit);
    }

    if(req.query.skip){// for pagination
        options.skip = parseInt(req.query.skip);
    }

    if(req.query.completed){
        match.completed= req.query.completed === "true"// Remember req.query.completed is the string bcz it is coming from URL.
    }

    try{
        
        await req.user.populate({
            path:"tasks",
            match,
            options:options,
            
        })
        res.send(req.user.tasks);
    }catch(e){
        console.log("error",e)
        res.status(500).send(e.message);
    }
})

router.get("/tasks/:id",auth,async(req,res)=>{

    const _id = req.params.id;
    
    try{
        const task = await Task.findOne({_id,owner:req.user._id});
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
})

router.patch("/tasks/:id",auth,async(req,res)=>{

    const updates = Object.keys(req.body);
    const allowedUpdates = ['description','completed'];
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({"error":"Invalid Updates!!"});
    }
    try{
        
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id});
       
        if(!task){
            res.status(400).send()
        }
        updates.forEach((update)=>{
            task[update] = req.body[update];
        });
        await task.save();
        
        res.send(task);
    }catch(e){
        res.status(404).send();
    }
})

router.delete("/tasks/:id",auth,async(req,res)=>{
    try{
        
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id});
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
})

module.exports = router;