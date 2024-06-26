const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


const userRoute = require("./routes/userRoutes");

app.use(express.json()); //we can use body parser also
app.use(cors());

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

app.use("/",userRoute);

app.get("/", (req,res)=> {
  res.send("helooo")
})