const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017"
const mongoURI = "mongodb+srv://gopal:gopal420@cluster0.lwnmdxo.mongodb.net/test"

const connectToMongo = ()=>{
    console.log("connection Building with DB");
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongo successfully");
    });

}

module.exports = connectToMongo;
