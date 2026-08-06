import express from 'express';
import mongoose from 'mongoose';
import {PORT,mongoDBURL} from './config.js'
import { Book } from './models/bookmodel.js';
import booksRoute from './routes/booksRoutes.js';

const app=express();
//middleware for parsing request body
app.use(express.json());

app.get("/",(req,resp)=>{
    return resp.status(200).send("Welcome!")
});

app.use('/books',booksRoute);


mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("DB connected...");
    app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
})
.catch((error)=>{
    console.log(error);
})