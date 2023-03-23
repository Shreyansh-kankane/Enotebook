import { connect } from 'mongoose';

const mongoURI = "mongodb+srv://gopal:gopal420@cluster0.lwnmdxo.mongodb.net/test"

const connectToMongo = ()=>{
    console.log("connection Building with DB");
    connect(mongoURI,()=>{
        console.log("Connected to mongo successfully");
    });

}

export default connectToMongo;

// const mongoURI = "mongodb://localhost:27017"
