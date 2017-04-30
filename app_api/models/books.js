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
    },
    image : {
        type : String
    },
    reading_level : {
        
    }
});

mongoose.model('Book', booksSchema);