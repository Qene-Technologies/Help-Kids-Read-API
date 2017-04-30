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
        type:  Number,
        required : true
    },
    added_by : {
        userid : String
    }
});

mongoose.model('Book', booksSchema);