const express = require("express");
require("./db/mongoose.js");
require("dotenv").config()
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");


const app = express();
const port = process.env.PORT
// app.use((req,res,next)=>{
//     res.status(503).send("This site is under maintainence!!! pl try after some time!!");
// })

app.use(express.json())// this is the important part of the json data fetching!!
app.use(userRouter);
app.use(taskRouter);
  
 
 
// witohout middleware: new request => run route handler
// with middleware: new request => do something => run route handler

app.listen(port,()=>{
    console.log("Server started at port "+port);
})

// const jwt = require("jsonwebtoken");

// const sample = async()=>{

//     const token = jwt.sign({_id:"abc123"},"thisismann",{expiresIn:"7 days"})// second part is the secert key
//     console.log(token);
//     console.log(jwt.verify(token,"thisismann"));
// };


// sample();


// customize data using toJSON
// const pet = {
//     name:"Mann"
// }
// pet.toJSON = function(){
//      console.log(this)
//      this.name="garv";
//      return this;
// }
// console.log(JSON.stringify(pet))


const Task = require("./models/task");
const User = require("./models/user");
const main = async()=>{

    // const task = await Task.findById("615702a48d034f56acb8bc83");
    // const sam=await Task.findById("615702a48d034f56acb8bc83").populate("owner").exec();
    // console.log(sam);

    // const user = await User.findById("615701c34e89ce45bd04df67");
    // const sam=await User.findById("615701c34e89ce45bd04df67").populate("tasks").exec();
    // console.log(sam.tasks)
}
main();