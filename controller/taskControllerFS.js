const fs = require('fs')
const path =require('path');
const Task = require('../model/taskModelFS');

const dataSource =path.join(__dirname ,"..","data","tasks.json");
const Tasks = JSON.parse(fs.readFileSync(dataSource , "utf-8"))

const getAllTasks= (req ,res ,next) => {
    res.status(200).json({
        message:"successful",
        data : Tasks
    })
};


const getTaskById =(req, res, next)=>{
    let { taskId } = req.params;
    let foundTask =Tasks.find((task) => task.taskId === taskId);
    if(!foundTask) {
        return res.status(404).json({
            error : "Task not found",
            message:"Invalid Id"
        })
    }
    res.status(200).json({
        message : "successful tasks",
        data : foundTask
    })
}

const addTaskValidation = (req, res, next) => {
    const objKeys = ['content', 'createdAt','updatedAt']
    if(req.params.taskId){
        objKeys.push('isCompleted');
    }
    if(!req.body.content){
        return res.status(400).json({ 
            message: "Invalid Request: Body Not Present",
            error: "Invalid Request",
        })
    }
    isKeyValid = objKeys.every((key)=>Object.keys(req.body).includes(key));
    if (!isKeyValid){
        return res.status(400).json({ 
            message: "Invalid Request: Keys are not compatible",
            error: "Invalid Request",
        })
    }
    next();
    
}

const addTask=(req, res, next) =>{
    let task =new Task(req.body);
    Tasks.push(task);
    fs.writeFile(dataSource ,JSON.stringify(Tasks ,null ,2) ,(err)=>{
        if(err){
            Tasks.pop(task)
            return res.status(500).json({ 
                message : "Error in adding",
                err :err
            })
        }
        return res.status(200).json({
            message : "task Added",
            data : task
        })
    })
}

const updateTask =(req,res,next) =>{
    let { taskId } = req.params;
    let taskIndex = Tasks.findIndex(item => item.taskId === taskId )
    if(taskIndex< 0){
        return res.status(404).json({ 
            message: "Invalid Request: Task Not Found",
            error: "Invalid Request",
        })
    }

    Object.keys(req.body).forEach((key)=>{
        Tasks[taskIndex][key] = req.body[key];
    });


    fs.writeFile(dataSource, JSON.stringify(Tasks, null, 2), (err)=>{
        if(err){
            return res.status(500).json({
                message: "An error occured while writing file during update",
                error: err,
            });
        }
        return res.status(200).json({
            message: "successfully updated",
            data: Tasks[taskIndex]
        });
    });  
}

const deleteTask =(req, res,next) =>{
    let { taskId } = req.params;
    let taskIndex = Tasks.findIndex(task => task.taskId === taskId );
    if(taskIndex < 0){
        return res.status(404).json({ 
            message: "NOT FOUND: Task Not Found",
            error: "NOT FOUND:",
        })
    }
    Tasks.splice(taskIndex ,1)
    fs.writeFile(dataSource, JSON.stringify(Tasks, null, 2), (err)=>{
        if(err){
            return res.status(500).json({
                message: "An error occured while writing file during update",
                error: err,
            });
        }
        return res.status(204).json({ 
            message: "task deleted successfully"
        })
    });  
   
    
}

module.exports={
    getAllTasks,
    getTaskById,
    addTask,
    addTaskValidation,
    updateTask,
    deleteTask
}
