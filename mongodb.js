//crud operations for mongodb using node js

const mongodb=require("mongodb");
const MongoClient= mongodb.MongoClient;

const connectionURL='mongodb://127.0.0.1:27017';
const databaseName='task-manager';

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log("unable to connect database!!!");
    }
    console.log("Connected successfully!!");
    const db=client.db(databaseName);
    db.collection("users");

    // db.collection("users").insertOne({
    //     name:"mann spatel",
    //     age:"22"
    // },(error,result)=>{
    //     if(error){
    //         return console.log("error in insering data!");
    //     }
    //     console.log(result);
    // })

    db.collection("users").findOne({name:"mann patel"},(error,user)=>{
        if(error){
            return console.log("unable to find the data!!");

        }
        console.log(user);
    })
})
