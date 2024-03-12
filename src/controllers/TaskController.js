const TasksModel=require('../models/TasksModel');

//Create Task
exports.create=async (req,res)=>{
    try{
        let email=req.headers['email'];
        let reqBody=req.body;
        reqBody.email=email;
        await TasksModel.create(reqBody);

        res.json({status:"success",message:"Task created successfully."})
    }catch(err){
        res.json({status:"fail",message:err})
    }    
}


//Update Task
exports.update=async (req,res)=>{
    try{
        let email=req.headers['email'];
        let {id}=req.params;
        let reqBody=req.body;
        await TasksModel.updateOne({_id:id, email:email},reqBody)
        res.json({status:"success",message:"Update completed successfully."})
    }catch(err){
        res.json({status:"fail",message:err})
    }    
}

//Read Task
exports.read=async (req,res)=>{
    try{
        let email=req.headers['email'];
        let data= await TasksModel.find({email:email})
        res.json({status:"success",message:data})
    }catch(err){
        res.json({status:"fail",message:err})
    }    
}

//Delete Task
exports.delete=async (req,res)=>{
    try{
        let email=req.headers['email'];
        console.log(email);
        let {id}=req.params;
        console.log(id);
        await TasksModel.deleteOne({_id:id, email:email});
        res.json({status:"success",message:"Delete completed successfully."})
    }catch(err){
        res.json({status:"fail",message:err})
    }    
}