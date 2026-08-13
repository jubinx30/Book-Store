import express from 'express';
import mongoose from 'mongoose';
import {PORT,mongoDBURL} from './config.js'
import { Book } from './models/bookmodel.js';
import booksRoute from './routes/booksRoutes.js';
import authRoute from './routes/authRoutes.js';
import cors from 'cors';
import fs from 'fs';
import path from 'path';


const app=express();
//middleware for parsing request body
app.use(express.json());
//middleware for cors
app.use(cors());

// ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'backend', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
//custom cors middleware
// app.use(
//     cors({
//         origin:'http://localhost:5173',
//         methods: ['GET', 'PUT', 'POST', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// );


app.get("/",(req,resp)=>{
    return resp.status(200).send("Welcome!")
});

app.use('/books',booksRoute);
app.use('/auth', authRoute);


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