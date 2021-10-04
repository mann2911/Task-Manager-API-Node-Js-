const mongoose = require("mongoose");
const validator=require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Task = require("./task");
require("dotenv").config();

const { threadId } = require("worker_threads");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid!!");
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error("Age must be positive number");
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.length<6){
                throw new Error("password should be greater than 6 charater");
            }
            if(value.includes("password")){
                throw new Error("password should not contain password string!");
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
});


userSchema.virtual('tasks',{
    ref:"Tasks",
    localField:"_id",
    foreignField:"owner"
})

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();//getting standard object

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    console.log(userObject)
    return userObject;

}

userSchema.methods.generateAuthToken= async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({"token":token});
    await user.save();
    return token;

}


userSchema.statics.findByCredentials = async(email,password) =>{ //statics is applied on whole model
                                                // is we want to find from whole model we will use userSchema.statics
    const user = await User.findOne({"email":email});

    if(!user){
        throw new Error("Wrong Credentials!!!");
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        throw new Error("Wrong credentials!!!");
    }

    return user;

}



//Hash the plain text password before saving!!!
userSchema.pre("save", async function(next){ //it is mandatory to use the standard function over arrow function
    const user = this;                          // bcz arrow function does not use this object.
    
    if(user.isModified("password")){//isModified will check that the password is newly created or updating.
        user.password = await bcrypt.hash(user.password,8);// 8 is the number of salt rounds in hash algorithm.
    }
    next();
})

//delete user tasks when the user is deleted
userSchema.pre('remove',async function(next){
    const user = this;
    await Task.deleteMany({owner:user._id});
    next();
})


const User=mongoose.model("User",userSchema);

module.exports = User;