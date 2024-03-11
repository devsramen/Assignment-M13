//Basic Library Import / Require
const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const rateLimit = require('express-rate-limit');
const helmate = require('helmet');
const hpp = require('hpp');
const cors=require('cors');
const mongoose=require('mongoose');



// Cors enable
app.use(cors());

// Security Implementation 
app.use(helmate());
app.use(hpp());
app.use(express.json({limit:"20mb"}))
app.use(express.urlencoded({extended:true}));

const limiter=rateLimit({windowMs:15*60*1000, max:3000})
app.use(limiter);

//Database Connection Established
let URL="mongodb://localhost:27017/taskmern5";
let OPTION={user:"", pass:"", autoIndex:true}

mongoose.connect(URL,OPTION).then((res)=>{
    console.log("Database Connection Success...");
}).catch((err)=>{
    console.log(err);
})


//Route Implement 
app.use("/api",router);

app.use("*",(req,res)=>{
    res.status(404).json("{data:Not Found")
})

module.exports=app;