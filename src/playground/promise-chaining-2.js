require("../db/mongoose");
const Task=require("../models/task");

// Task.deleteOne({_id:"615468e309642b56f02dd57b"}).then((res)=>{
//     console.log("first ",res);
//     return Task.countDocuments({completed:false});
// }).then((res)=>{
//     console.log("second "+res);
// }).catch((e)=>{
//     console.log(e);
// })


const deleteTasks = async(id) =>{
    const tasks = await Task.deleteOne({id});
    const count = await Task.countDocuments({completed:false});
    return count;
}

deleteTasks("615468ba44bf7232be558267").then((res)=>{
    console.log("res",res);
}).catch((e)=>{
    console.log("error",e);
})
