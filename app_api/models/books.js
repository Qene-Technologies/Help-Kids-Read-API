var mongoose = require('mongoose');

var booksSchema = mongoose.Schema({
    title : {
        type:  String,
        required : true,
        unique : true
    },
    author : {
        name : {type : String, required : true },
    },
    description : {
        type : String
    },
    published : {
        type : String
    }
});

mongoose.model('Book', booksSchema);