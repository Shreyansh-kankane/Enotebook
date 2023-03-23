
import connectToMongo from './db.js';
import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 80;

const app=express();
app.use(cors());
app.use(express.json());

connectToMongo();

import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

const __mydirname = path.resolve();
console.log("MY dirname is", __mydirname)
console.log(process.env.NODE_ENV);
console.log(process.env.PORT);

if(process.env.NODE_ENV === 'production'){
    console.log("inside prduction ")
    app.use(express.static(path.join(__mydirname,'/../Frontend/build')))
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

// const connectToMongo = require('./db')
// const express = require('express')
// const cors = require('cors');
// const path = require("path")
// const env = require("dotenv").config();

// app.use('/api/auth',require('./routes/auth').default)
// app.use('/api/notes',require('./routes/notes').default)
// console.log("my new path",__mydirname);
