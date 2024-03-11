const mongoose=require('mongoose');

const DatabaseSchema=mongoose.Schema({
    title:{type:String, unique:true, require:true},
    description:{type:String, require:true},
    status:{type:String, require:true}
}, {timestamps:true, versionKey:false});

const TasksModdle=mongoose.model('tasks', DatabaseSchema);

module.exports=TasksModdle;