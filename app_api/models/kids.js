var mongoose = require('mongoose');

var booksSchema = mongoose.Schema({
    title : {
        type:  String
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
var badgesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    point: {
        type: Number,
        min: 0,
        max: 100
    },
    description: {type: String},
});

var kidsSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    date_of_birth: {
        type: Date
    },
    school : {
        type : String
    },
    grade : {
        type : Number
    },
    books_read :[booksSchema], 
    badges_collected : [badgesSchema],
});

mongoose.model('Kids', kidsSchema);