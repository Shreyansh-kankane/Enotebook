const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors');
const path = require("path")
const env = require("dotenv").config();

const port = process.env.PORT || 80;

const app=express();
app.use(cors());
app.use(express.json());

connectToMongo();

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

const __mydirname = path.resolve();
console.log("MY dirname is", __mydirname)
console.log(process.env.NODE_ENV);
console.log(process.env.PORT);

if(process.env.NODE_ENV === 'production'){
    // console.log("hello")
    app.use(express.static(path.join(__mydirname,'/../Frontend/build')))
    console.log("my new path",__mydirname);

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__mydirname,'..','Frontend','build','index.html'));
    });

} else{
    app.get("/",(req,res)=>{
        res.send("I am running");
    })
}

app.listen(port,()=>{
    console.log(`Server is running in :${process.env.NODE_ENV} mode on port ${port}`)
});
