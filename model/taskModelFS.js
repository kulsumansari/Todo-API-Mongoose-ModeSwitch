const uniqid = require('uniqid')

function Task({content ,createdAt, updatedAt}){
    this.taskId = uniqid();
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isCompleted =  false;
}

module.exports =Task