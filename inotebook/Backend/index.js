const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors');

const app=express();
const port= process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('hello world I am live')
});

const start = async () =>{
    try{
        await connectToMongo();
        app.listen(port,()=>{
            console.log(`${port} Yes i am connected`);
        });
    } catch(error){
        console.log(error);
    }
}

start();
app.use(cors());
app.use(express.json());

//available routes
// app.use('/api/auth',require('./routes/auth'))
// app.use('/api/notes',require('./routes/notes'))

app.listen(port,()=>{
    console.log(`listen at localhost:${port}`)
})