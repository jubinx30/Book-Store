import mongoose from "mongoose";
const bookSchema=mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    publishYear:{
        type: Number,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},   
    {
        timestamps:true,
    }
)

bookSchema.index({ owner: 1 });

export const Book = mongoose.model('Book', bookSchema);