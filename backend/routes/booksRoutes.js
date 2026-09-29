import { Book } from '../models/bookmodel.js';
import express from 'express';
import { auth } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// require authentication for all book routes
router.use(auth);

// multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const updir = path.join(process.cwd(), 'backend', 'uploads');
        if (!fs.existsSync(updir)) fs.mkdirSync(updir, { recursive: true });
        cb(null, updir);
    },
    filename: (req, file, cb) => {
        const sanitized = file.originalname.replace(/\s+/g, '_');
        cb(null, `${Date.now()}-${sanitized}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') return cb(new Error('Only PDFs allowed'));
        cb(null, true);
    }
});


//Route for get all books from database
router.get('/', async(req,resp)=>{
    try{
        const books=await Book.find({ owner: req.user._id })
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
router.post('/', upload.single('pdf'), async(req,resp)=>{
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
                        owner: req.user._id,
                };
                if (req.file) {
                    newBook.pdf = {
                        filename: req.file.filename,
                        originalName: req.file.originalname,
                        mimeType: req.file.mimetype,
                        size: req.file.size,
                    };
                }
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
        console.log(req.params);
        const {id} =req.params;
        const book=await Book.findById(id);
        if(!book){
           return resp.status(404).json({message:"Book not found"})
        }
        if (!book.owner.equals(req.user._id)) return resp.status(403).json({ message: 'Forbidden' });
        return resp.status(200).json(book)
    }
    catch(error){
        console.log(error.message);
        resp.status(500).send({message: error.message});
    }
});

//Route for updating a book
router.put('/:id', upload.single('pdf'), async(req, resp) => {
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

                const updatePayload = { ...req.body };
                if (req.file) {
                    updatePayload.pdf = {
                        filename: req.file.filename,
                        originalName: req.file.originalname,
                        mimeType: req.file.mimetype,
                        size: req.file.size,
                    };
                }
                const result = await Book.findOneAndUpdate(
                        { _id: id, owner: req.user._id }, updatePayload, { new: true });

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
    const result = await Book.findOneAndDelete({ _id: id, owner: req.user._id });

    if(!result){
        return resp.status(404).json({message:"Book not found or not owned by you."})
    }
    return resp.status(200).send({message:"book successfully deleted."})
    }
    catch(error){
        return resp.status(500).send({message:error.message});
    }
})

// serve PDF for a book (authorized)
router.get('/:id/pdf', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        if (!book.owner.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
        if (!book.pdf || !book.pdf.filename) return res.status(404).json({ message: 'PDF not found' });
        const filePath = path.join(process.cwd(), 'backend', 'uploads', book.pdf.filename);
        if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'File not found on server' });
        res.type('application/pdf');
        if (req.query.download) return res.download(filePath, book.pdf.originalName);
        return res.sendFile(filePath);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
});

export default router;