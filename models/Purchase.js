const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:User
    },
    isbn:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:Book
    },
    quantity:{
        type:Number,
        required:true,
        min:0,
        max:10
    },
    amt:{
        type:Number,
        required:true,
        min:0,
        max:99999
    }
});

module.exports = Purchase = mongoose.model('purchase',purchaseSchema);