const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://gopal:gopal420@cluster0.lwnmdxo.mongodb.net/test"
const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo successfully");
    })
}

module.exports = connectToMongo;