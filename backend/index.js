import express from 'express';
import mongoose from 'mongoose';
const app=express();
import {PORT,mongoDBURL} from './config.js'
import { Book } from './models/bookmodel.js';
//middleware for parsing request body
app.use(express.json());

app.get("/",(req,resp)=>{
    return resp.status(200).send("Welcome!")
})

//Route for Save a new book
app.post('/books',async(req,resp)=>{
    try{
        if(
            !req.body.title||
            !req.body.author||
            !req.body.publishYear
        ){
            return response.status(400).send({
                message:'Send all required fields: title,author,publishYear'
            });
        }
        const newBook={
            title: req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
        };
        
        const book= await Book.create(newBook);
        return resp.status(201).send(book);

    }
    catch(error){
        console.log(error.message);;
        resp.status(500).send({message:error.message})
    }
})  


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