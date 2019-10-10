const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    isbn:{
        type:Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required:true
    },
    stocks:{
        type:Number,
        default:0,
        min:0
    },
    pages:{
        type:Number,
        min:0,
        default:0
    }
});

module.exports = Book = mongoose.model('books',bookSchema);