const mongoose=require('mongoose');

const DatabaseSchema=mongoose.Schema({
    email:{type:String, unique:true, require:true},
    otp:{type:String, require:true},
    status:{type:String, require:true}
}, {timestamps:true, versionKey:false});

const OTPModel=mongoose.model('tasks', DatabaseSchema);

module.exports=OTPModel;