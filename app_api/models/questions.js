var mongoose = require('mongoose');

var questionSchema = mongoose.model({
    question : {
        type : String,
        required : true
    },
    answer :{
        type : String,
        required : true
    },
    difficulty_level : {
        type : number,
        required : true,
        min : 1,
        max : 3
    }
});

mongoose.model('question', questionSchema);