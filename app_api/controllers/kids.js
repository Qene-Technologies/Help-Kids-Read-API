var mongoose = require('mongoose');
var Kids = mongoose.model('Kids');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


addKid = (req, res)=> {
    console.log(req.body);
     Kids.create({
            name: req.body.name,
            date_of_birth : req.body.date_of_birth,
            school : req.body.school,
            grade : parseInt(req.body.grade)
        }, function(err, Kid) {
            if (err) {
                console.log(err);
                sendJSONresponse(res, 400, err);
            } else {
            console.log(Kid);
            sendJSONresponse(res, 201, Kid);
            }
        });
}

getAllKids = (req, res) => {
    Kids
        .find()
        .exec(function(err, Kids){
            if(err){
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            sendJSONresponse(res, 200, Kids);
        });
}

getOneKid = (req, res) => {
    if(req.params && req.params.kidid){
        Kids
            .findById(req.params.kidid)
            .exec((err, result)=>{
                if(err){
                    sendJSONresponse(res, 404, err);
                    return;
                }
                sendJSONresponse(res, 200, result);
            });
    }else{
        sendJSONresponse(res, 400, {
            "message" : "kidid not found"
        });
    }
    
}  
updateKid = (req, res) => {
    if(req.params && req.params.kidid){
        Kids
            .findById(req.params.kidid)
            .exec((err, result)=>{
                if(err){
                    sendJSONresponse(res, 404, err);
                    return;
                }
                if(req.body.name) {
                    result.name = req.body.name;
                }
                if(req.body.date_of_birth) {
                    result.date_of_birth = req.body.date_of_birth;
                }
                if(req.body.grade) {
                    result.grade = req.body.grade;
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
            "message" : "kidid not found"
        });
    }
}

removeKid = (req, res) => {
    if (req.params.kidid) {
    Kids
      .findByIdAndRemove(req.params.kidid)
      .exec(
        function(err, Kid) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Kid id " + req.params.kidid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No req.params.kidid"
    });
  }
}

module.exports = {
    addKid,
    getAllKids,
    getOneKid,
    updateKid,
    removeKid
}