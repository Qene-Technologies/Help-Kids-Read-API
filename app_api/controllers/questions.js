var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var User = mongoose.model('User');
var Book = mongoose.model('Book');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


addQuestion = (req, res) => {
    if(req.params && req.params.bookid && req.params.userid){
        Book.findById(req.params.bookid)
            .exec((err, book)=>{
                if(err){
                    sendJSONresponse(res, 404, {
                        "message" : "unable to find book"
                    });
                    return;
                }
                Question.create({
                    question : req.body.question,
                    answer : req.body.answer,
                    difficulty_level : req.body.difficulty_level,
                    added_by :{
                    user_id : req.params.userid
                    },
                    book_title : book.title,
                    book_id : book.bookid

                },(err, question) =>{
                    if(err){
                    console.log(err);
                    sendJSONresponse(res, 400, err);
                    return;
                    }
                    User.findById(req.params.userid)
                        .exec(function(err, userObj){
                        userObj.questions_added.push({
                            _id: question._id,
                            book_name :question.book_name,
                            question : question.question,
                            answer : question.answer
                        });
                        userObj.save((err, user)=>{

                            sendJSONresponse(res, 201, question);
                        })
                    });
                });
            })
    }
        
}

getAllQuestions = (req, res) => {
    Question
        .find()
        .exec(function(err, Questions){
            if(err){
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            sendJSONresponse(res, 200, Questions);
        });
}

getQuestionsByBook = (req, res) =>{

}

getOneQuestion = (req, res) => {
    if(req.params && req.params.questionid){
        Question
            .findById(req.params.questionid)
            .exec((err, result)=>{
                if(err){
                    sendJSONresponse(res, 404, err);
                    return;
                }
                sendJSONresponse(res, 200, result);
            });
    }else{
        sendJSONresponse(res, 400, {
            "message" : "questionid not found"
        });
    }
    
}  
updateQuestion = (req, res) => {
    if(req.params && req.params.questionid){
        Question
            .findById(req.params.questionid)
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
            "message" : "questionid not found"
        });
    }
}

removeQuestion = (req, res) => {
    if (req.params.questionid) {
    Question
      .findByIdAndRemove(req.params.questionid)
      .exec(
        function(err, Question) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Question id " + req.params.questionid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No req.params.questionid"
    });
  }
}

module.exports = {
    addQuestion,
    getAllQuestions,
    getOneQuestion,
    updateQuestion,
    removeQuestion,
    getQuestionsByBook
}