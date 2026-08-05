import express from 'express';
const app=express();
import {PORT} from './config.js'

app.get("/",(req,resp)=>{
    console.log(req);
    return resp.status(200).send("Welcome!")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})