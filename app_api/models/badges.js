var mongoose = require('mongoose');

var badgesSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        unique : true
    },
    point: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    description: {type: String, required: true},
});

mongoose.model('Badge', badgesSchema);