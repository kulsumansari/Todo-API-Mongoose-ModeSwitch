const express = require('express')
const cors =require('cors')
const app = express();

const taskRouter = require("./router/taskRouter")

// const taskRouter = require("./router/taskRouterDB")
// const taskRouter = require("./router/taskRouter")

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cors());
app.use("/tasks" , taskRouter)

app.use(express.static('public'))


module.exports =app