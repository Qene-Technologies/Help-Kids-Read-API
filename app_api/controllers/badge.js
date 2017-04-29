var mongoose = require('mongoose');
var Badge = mongoose.model('Badge');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


addBadge = (req, res)=> {
    console.log(req.body);
     Badge.create({
            name: req.body.name,
            description: req.body.description,
            point: parseFloat(req.body.point)
        }, function(err, badge) {
            if (err) {
                console.log(err);
                sendJSONresponse(res, 400, err);
            } else {
            console.log(badge);
            sendJSONresponse(res, 201, badge);
            }
        });
}

getAllBadges = (req, res) => {
    Badge
        .find()
        .exec(function(err, badges){
            if(err){
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            sendJSONresponse(res, 200, badges);
        });
}

getOneBadge = (req, res) => {
    if(req.params && req.params.badgeid){
        Badge
            .findById(req.params.badgeid)
            .exec((err, result)=>{
                if(err){
                    sendJSONresponse(res, 404, err);
                    return;
                }
                sendJSONresponse(res, 200, result);
            });
    }else{
        sendJSONresponse(res, 400, {
            "message" : "badgeid not found"
        });
    }
    
}  
updateBadge = (req, res) => {
    if(req.params && req.params.badgeid){
        Badge
            .findById(req.params.badgeid)
            .exec((err, result)=>{
                if(err){
                    sendJSONresponse(res, 404, err);
                    return;
                }
                if(req.body.name) {
                    result.author = {
                        name : req.body.name
                    };
                }
                if(req.body.description) {
                    result.description = req.body.description;
                }
                if(req.body.point) {
                    result.point = req.body.point;
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
            "message" : "badgeid not found"
        });
    }
}

removeBadge = (req, res) => {
    if (req.params.badgeid) {
    Badge
      .findByIdAndRemove(req.params.badgeid)
      .exec(
        function(err, badge) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("badge id " + req.params.badgeid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No req.params.badgeid"
    });
  }
}

module.exports = {
    addBadge,
    getAllBadges,
    getOneBadge,
    updateBadge,
    removeBadge
}