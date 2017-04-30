var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
    book_title : {
        type : String,
        required : true
    },
    question : {
        type : String,
        required : true
    },
    answer :{
        type : String,
        required : true
    },
    difficulty_level : {
        type : Number,
        required : true,
        min : 1,
        max : 3
    },
    votes : [
        {
            userid : String
        }
    ],
    added_by : {
        userid : String
    }, 
    total_votes :{
        type : Number,
        default : 0
    }
});

mongoose.model('Question', questionSchema);