const mongoose = require('mongoose')
const dotenv =require('dotenv');
const app = require('./app');
dotenv.config({path : './config.env'})

switch(process.env.MODE){
    case 'DATABASE' :
        console.log("database mode");
        mongoose
            .connect(process.env.MONGODB_URI ,{
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology:  true,
                useFindAndModify: false
            })
            .then((con)=>{
                console.log("Connected to DB")
                const port = process.env.PORT || 3000 ; 
                app.listen( port , ()=>{
                    console.log(`server started at port ${port}`);
                })
            })
            .catch((err)=>{
                console.log(err);
            })
        break;

    default :
        console.log('default_mode');
        const port = process.env.PORT || 3000 ; 
                app.listen( port , ()=>{
                    console.log(`server started at port ${port}`);
                })
        break;
}


