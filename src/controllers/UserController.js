const UsersModel=require('../models/UsersModdle');
const OTPModel=require('../models/OTPModel');
const jwt=require('jsonwebtoken');
const SendEmailUtility=require('../utlity/SendEmailUtility');

//Registration
exports.registration=async (req,res)=>{
    try{
        let reqBody=req.body;
        await UsersModel.create(reqBody);
        res.json({status:"success",message:"Registration completed successfully."})
    }catch(err){
        res.json({status:"fail",message:err})
    }    
}

//Login
exports.login=async (req,res)=>{
    try{
        let reqBody=req.body;
        let user = await UsersModel.find(reqBody);
        if(user.length>0){
            //JWD Token
            let Payload={exp:Math.floor(Date.now()/1000)+(24*60*60),data:reqBody['email']}
            let token =jwt.sign(Payload,'123-xyz')
            res.json({status:"Success",message:"User Found.",token})
            res.setHeader('Content-Type', 'text/plain');
        }else{
            res.json({status:"Failed",message:"No User Found."})
            res.setHeader('Content-Type', 'text/plain');
        }
        res.json({status:"success",message:user})
    }catch(err){
        res.json({status:"fail",message:err})
    }
}

//ProfileDetails
exports.profileDetails=async (req,res)=>{
    try{
        let email=req.headers['email'];

        let result = await UsersModel.find({email:email});
        res.json({status:"success", data:result})
    }catch(err){
        res.json({status:"Failed", message:err})
    }
}

//ProfileUpdate
exports.profileUpdate=async (req,res)=>{
    try{
        let email=req.headers['email'];
        let reqBody=req.body;
        await UsersModel.updateOne({email:email},reqBody);
        res.json({status:"success",message:"Update completed successfully."})
    }catch(err){
        res.json({status:"Failed", message:err})
    }
}

//Mail Verification
exports.verifyEmail=async (req,res)=>{
    try{
        const {email}=req.params;
        let user = await UsersModel.find({email:email});
        if(user.length>0){
            //Send Email
            let otp=Math.floor(100000+Math.random()*900000);
            await SendEmailUtility(email,`Your PIN=${otp}`, "MERN 5 Task Manager Code.");
            console.log("test-1")
            await OTPModel.create({email:email, otp:otp,status:'Active'})
            console.log("test-2")
            res.json({status:"success",message:"Verification code has been sent to your Email."})
        }else{
            res.json({status:"Failed",message:"No User Found."});
        }
    }catch(err){
        res.json({status:"fail",message:err})
    }
}


//VerifyOTP
exports.verifyOTP=async (req,res)=>{
    try{
        const {email}=req.params;
        let user = await UsersModel.find({email:email, otp:otp,status:'Active'});
        if(user.length>0){
            //Send Email
            await OTPModel.updateOne({email:email, otp:otp},{status:'Verified'})
            res.json({status:"success",message:"Verification code has been sent to your Email."})
        }else{
            res.json({status:"Failed",message:"Invalied Code"});
        }
    }catch(err){
        res.json({status:"fail",message:err})
    }
}

//PasswordReset
exports.passwordReset=async (req,res)=>{
    try{
        const {email,otp,password}=req.params;
        let user = await OTPModel.find({email:email,otp:otp,status:'verified'})
        if(user.length>0){
            await OTPModel.deleteOne({email:email}, {password:password});
            req.json({status:"success",message:"Password Update Success"})
        }else{
            res.json({status:'Fail', message:"Invelide Request"})
        }
    }catch(err){
        res.json({status:"fail",message:err})
    }
}