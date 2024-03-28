const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//scehma
const userSchema = new Schema({
    name : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        unique : true,
        require : true,
    },
    age : {
        type : Number,
        require : true,
    }

}, {timestamps : true});

//model
const User = mongoose.model("User", userSchema);
module.exports = User;