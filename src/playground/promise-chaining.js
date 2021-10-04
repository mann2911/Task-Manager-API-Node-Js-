require("../db/mongoose");
const User = require("../models/user");

// User.findByIdAndUpdate("61543a87ccaa0317f96a0c13",{age:23}).then((res)=>{
//     console.log("first "+res);
//     return User.countDocuments({age:22})
// }).then((res)=>{
//     console.log("second "+res);
// }).catch((e)=>{
//     console.log("err "+e);
// })


const updateAgeAndCount = async(id,age) =>{

    const user = await User.findByIdAndUpdate(id,{"age":age});
    const count = await User.countDocuments({age});
    return count;

}

updateAgeAndCount("61543a87ccaa0317f96a0c13",30).then((res)=>{
    console.log("res",res);
}).catch((e)=>{
    console.log("error",e);
})