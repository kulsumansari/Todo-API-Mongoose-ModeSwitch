const FS_Controller = require('../controller/taskControllerFS')
const DB_Controller = require('../controller/taskControllerDB')

class TaskSwitch{
    constructor(mode){
        switch(mode){
            case "DATABASE" :
                this.getAllTasks = DB_Controller.getAllTasks;
                this.addTask =DB_Controller.addTask;
                this.getTaskById = DB_Controller.getTaskById;
                this.updateTask = DB_Controller.updateTask;
                this.deleteTask =DB_Controller.deleteTask;
                break;
            default:
                this.getAllTasks = FS_Controller.getAllTasks;
                this.addTask =[FS_Controller.addTaskValidation ,FS_Controller.addTask];
                this.getTaskById = FS_Controller.getTaskById;
                this.updateTask = [FS_Controller.addTaskValidation ,FS_Controller.updateTask];
                this.deleteTask =FS_Controller.deleteTask;
        }
    }
}
module.exports = TaskSwitch