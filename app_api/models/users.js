var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var badgesSchema = new mongoose.Schema({
  _id : String,
  name: String,
  description: String,
  point : {
    type:  Number,
    required : true,
  }
});
var questionSchema = new mongoose.Schema({
    _id : String,
    book_name: String,
    question: String,
    answer: String
});
var booksSchema = new mongoose.Schema({
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

})
var userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true
  },
  username: String,
  hash: String,
  salt: String,
  badges: [badgesSchema],
  kids_helped: [{
    _id : String,
    name: String,
    image: String,
  }],
  questions_added:[questionSchema],
  books_added : [booksSchema]
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    phone: this.phone,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "this is the secret"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema);
