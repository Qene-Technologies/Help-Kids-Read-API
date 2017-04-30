var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


addBook = (req, res)=> {
    if(req.params && req.params.userid){
        User.findById(req.params.userid)
            .exec((err, user)=>{
                if(err){
                    console.log("user not found");
                    sendJSONresponse(res, 404, err);
                    return;
                }
                Book.create({
                    title: req.body.title,
                    description: req.body.description,
                    author :{name : req.body.author} ,
                    published : "this will change later",
                    reading_level : parseInt(req.body.reading_level),
                    added_by :{
                        userid : user._id
                    }
                }, function(err, Book) {
                    if (err) {
                        console.log(err);
                        sendJSONresponse(res, 400, err);
                    } else {
                        console.log(Book);
                        user.books_added.push(Book);
                        user.save((err, result)=>{
                            if(err){
                                sendJSONresponse(res, 400, err);
                                return;
                            }
                            sendJSONresponse(res, 201, Book);
                        });
                    }
                });
            });
    }
     
}

getAllBooks = (req, res) => {
    Book
        .find()
        .exec(function(err, Books){
            if(err){
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            sendJSONresponse(res, 200, Books);
        });
}

getOneBook = (req, res) => {
    if(req.params && req.params.bookid){
        Book
            .findById(req.params.bookid)
            .exec((err, result)=>{
                if(err){
                    sendJSONresponse(res, 404, err);
                    return;
                }
                sendJSONresponse(res, 200, result);
            });
    }else{
        sendJSONresponse(res, 400, {
            "message" : "bookid not found"
        });
    }
    
}  
updateBook = (req, res) => {
    if(req.params && req.params.bookid){
        Book
            .findById(req.params.bookid)
            .exec((err, result)=>{
                if(err){
                    sendJSONresponse(res, 404, err);
                    return;
                }
                if(req.body.title) {
                    result.title = req.body.title;
                }
                if(req.body.description) {
                    result.description = req.body.description;
                }
                if(req.body.author) {
                    result.author = req.body.author;
                }
                result.save((err, result)=>{
                    if(err){
                        sendJSONresponse(res, 200, err);
                        return;
                    }
                    sendJSONresponse(res, 200, result);
                    
                });
            });
    }else{
        sendJSONresponse(res, 400, {
            "message" : "bookid not found"
        });
    }
}

removeBook = (req, res) => {
    if (req.params.bookid) {
    Book
      .findByIdAndRemove(req.params.bookid)
      .exec(
        function(err, Book) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Book id " + req.params.bookid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No req.params.bookid"
    });
  }
}

module.exports = {
    addBook,
    getAllBooks,
    getOneBook,
    updateBook,
    removeBook
}