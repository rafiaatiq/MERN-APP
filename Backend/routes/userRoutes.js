const express = require("express");
const User = require("../models/user");

const router = express.Router();

//create route
router.post("/", async (req,res) => {
    const {name, email, age} = req.body;

    try {
        const userAdded = await User.create({
            name : name,
            email : email,
            age : age
        })
        res.status(201).json(userAdded);
        console.log("user added!");
    } catch (error) {
        console.log(error);
        res.status(400).json({error : error.message})
    }
    
})
//get all user route
router.get("/", async (req,res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll);
        console.log("found All user");
    } catch (error) {
        console.log(error);
        res.status(500).json({error : error.message})
    }
})

//get single user 
router.get("/:id", async (req,res) => {
    const {id} = req.params;
    try {
        const singleUser = await User.findById({_id : id});
        res.status(200).json(singleUser);
        console.log("found single User");
    } catch (error) {
        console.log(error);
        res.status(500).json({error : error.message})
    }
})

//delete 
router.delete("/:id", async (req,res) => {
    const {id} = req.params;
    try {
        const deleteUser = await User.findByIdAndDelete({_id : id});
        res.status(200).json(deleteUser);
        console.log("user deleted!");
    } catch (error) {
        console.log(error);
        res.status(500).json({error : error.message})
    }
})

//patch or update query
router.patch("/:id", async (req,res) => {
    const {id} = req.params;
    const {name, email, age} = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json(updateUser);
        console.log("user updated!");
    } catch (error) {
        console.log(error);
        res.status(500).json({error : error.message})
    }
})
module.exports = router;