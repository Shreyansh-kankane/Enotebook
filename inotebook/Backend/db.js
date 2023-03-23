const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://gopal:gopal420@cluster0.lwnmdxo.mongodb.net/test"
const connectToMongo = ()=>{
    console.log("connect DB");
    return mongoose.connect(mongoURI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectToMongo;