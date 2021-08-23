const mongoose = require('mongoose')


const taskSchema = mongoose.Schema({
    taskId:{
        type : String,
        unique : true,
        required :[true, "Task Cannot be created without taskId"],
    },
    content:{
        type : String,
        required : [true, "Cannot create task without content"], 
        validate: {
            validator: (v) =>{
              return v.length > 1;
            },
            message: "You must provide valid content."
          }
    },
    isCompleted:{
        type : Boolean,
        default : false,
    },
    createdAt:{
        type : String,
        required : true,
       
    },
    updatedAt:{
        type : String,
        default :""
    }
})
  
  
const Task = mongoose.model("Tasks" , taskSchema);

module.exports = Task;