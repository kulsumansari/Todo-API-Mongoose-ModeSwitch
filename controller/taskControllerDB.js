const uniqid =require('uniqid')

const Task =require('../model/taskModelMongoose')

const getAllTasks = async (req, res ) =>{
    let tasks = await Task.find();
    res.status(200).json({
        mesaage : "fetched",
        data : [...tasks]
    })
}

const getTaskById = async (req, res) => {
    try{
        let { taskId } = req.params;
        let task = await Task.findOne({ taskId : taskId });

        if(!task){
            throw new Error('Error 404: Task Not Found')
        }
        res.status(200).json({
                mesaage : "Succesfully fetched task",
                data : task
        })
    }
    catch(err){
        res.status(404).json({
            message: "Task Not Found : No task found with given taskId .",
            error: "Task Not Found"
        })
    }
};

const addTask = async(req, res) =>{

    try{
        let newtask = new Task({
            taskId : uniqid(),
            content : req.body.content,
            createdAt : req.body.createdAt,
            isCompleted : req.body.isCompleted
        })
        
        newtask = await newtask.save()
        res.status(200).json({
            mesaage : "created task",
            data : newtask
        })
       
    }
    catch(err){
        res.status(400).json({
            message: "Cannot Create task",
            error: err
        })
    }
}
const updateTask = async (req, res) =>{
    try{
        let {taskId} = req.params;
        let task = await Task.findOneAndUpdate({taskId : taskId},req.body , {new: true })
        
        res.status(200).json({
            mesaage : "task updated",
            data : task
        })

    }
    catch(err){
        res.status(404).json({
            message: "Task Not Found",
            error: err
        })
    }
}

const deleteTask = async(req, res) =>{
    try{
        let {taskId} = req.params;
        let data =await Task.deleteOne({taskId : taskId});
        
        if(data.deletedCount){
            res.status(204).json({
                mesaage : "Task Deleted"
            })
        }  
        else throw new Error('Task could not be delete')
    }catch(err){
        res.status(404).json({
            error : " Error in deleting task :Task Not Found",
            mesaage: "Task Not Found",
        })
    }
}

module.exports={
    getAllTasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById
}