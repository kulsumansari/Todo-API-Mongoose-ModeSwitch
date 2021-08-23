const express = require('express');
const TaskSwitch = require('../utils/switch');
require('dotenv').config({path : './config.env'})

let obj = new TaskSwitch(process.env.MODE)

const router = express.Router()

router.route('/')
    .get(obj.getAllTasks)
    .post(obj.addTask);

router.route('/:taskId')
    .get(obj.getTaskById)
    .post(obj.updateTask)
    .delete(obj.deleteTask)

module.exports =router ;