import { Book } from '../models/bookmodel.js';
import express from 'express';
const router=express.Router();


//Route for get all books from database
router.get('/', async(req,resp)=>{
    try{
        const books=await Book.find()
        return resp.status(200).json({
            count:books.length,
            data: books,
        })
    }
    catch(error){
        console.log(error.message);
        resp.status(500).send({message: error.message});
    }
});

//Route for Save a new book
router.post('/',async(req,resp)=>{
    try{
        if(
            !req.body.title||
            !req.body.author||
            !req.body.publishYear
        ){
            return resp.status(400).send({
                message:'All fields (title,author,publishYear) are required!'
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

//Route for getting a single book from database
router.get('/:id', async(req,resp)=>{
    try{
        const {id} =req.params;
        const book=await Book.findById(id);
        if(!book){
             return resp.status(404).json({message:"Book not found"})
        }
        return resp.status(200).json(book)
    }
    catch(error){
        console.log(error.message);
        resp.status(500).send({message: error.message});
    }
});

//Route for updating a book
router.put('/:id', async(req, resp) => {
    try {
        const { id } = req.params;

        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return resp.status(400).send({
                message: 'All fields (title,author,publishYear) are required!'
            });
        }

        const result = await Book.findByIdAndUpdate(
            id,req.body);

        if (!result) {
            return resp.status(404).json({ message: 'Book not found' });
        }

        return resp.status(200).json({
            message: 'Book updated.',
            data: result
        });
    } catch (error) {
        console.log(error.message);
        resp.status(500).send({ message: error.message });
    }
});

//delete
router.delete("/:id", async (req,resp)=>{
    try{
    const {id}=req.params;
    const result = await Book.findByIdAndDelete(id);

    if(!result){
        return resp.status(404).json({message:"Book not found."})
    }
    return resp.status(200).send({message:"book successfully deleted."})
    }
    catch(error){
        return resp.status(500).send({message:error.message});
    }
})

export default router;