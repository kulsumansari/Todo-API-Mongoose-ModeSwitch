const express = require('express')
const cors =require('cors')
const fs = require('fs')
const app = express();

const taskRouter = require("./router/taskRouter")

let text= `<embed type="text/markdown" src="https://kulsumansari.github.io/Todo-API-Mongoose-ModeSwitch/" height="100%" width="100%"/>`;
fs.writeFileSync("./public/index.html", text);

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cors());
app.use("/tasks" , taskRouter)

app.use(express.static('public'))


module.exports =app
