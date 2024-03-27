const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

main()
.then(() => {
    console.log("connection successfull");
    app.listen(process.env.PORT || 8000, (err) => {
        if(err) console.log("something went wrong!");

        console.log("Running Successfully on", process.env.PORT);
    });
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.URL);
}

app.get("/", (req,res) => {
    res.send("app is running");
})

