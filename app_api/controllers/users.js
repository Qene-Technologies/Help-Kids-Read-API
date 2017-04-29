var mongoose = require('mongoose');
var user = mongoose.model('User');
var Badge = mongoose.model('Badge');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


getUser = (req, res) =>{
      if (req.params && req.params.userid) {
    user
      .findById(req.params.userid)
      .exec(function(err, user) {
        if (!user) {
          sendJSONresponse(res, 404, {
            "message": "user not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(user);
        sendJSONresponse(res, 200, user);
      });
  } else {
    console.log('No locationid specified');
    sendJSONresponse(res, 404, {
      "message": "No locationid in request"
    });
  }
};

getAllUsers = (req, res) =>{
  user
    .find()
    .exec(function(err, users){
      if(!users){
        sendJSONresponse(res, 404, {
          "message" : "user not found"
        });
        return;
      }else if(err){
        console.log(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      console.log(users);
      sendJSONresponse(res, 200, users);
    });
}

updateUser = (req, res)=>{
  if (!req.params.userid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, userid is required"
    });
    return;
  }
  user
    .findById(req.params.userid)
    .exec(
      function(err, user) {
        if (!user) {
          sendJSONresponse(res, 404, {
            "message": "userid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        user.username = req.body.username;
        console.log(user);
        user.badges.push({
          name: req.body.badgename,
          description: req.body.badgedescription,
          point: req.body.badgepoint
        });
        user.save(function(err, user) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, user);
          }
        });
      }
  );
}

addBadge = (req, res) => {
  if (req.params && req.params.userid && req.params.badgeid) {
    user
      .findById(req.params.userid)
      .exec(function(err, user) {
        console.log("finding user");
        if (!user) {
          sendJSONresponse(res, 404, {
            "message": "user not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        Badge
          .findById(req.params.badgeid)
          .exec(function(err, badge){
            console.log("finding badge");
            if (!badge) {
              sendJSONresponse(res, 404, {
                "message": "badge not found"
              });
              return;
            } else if (err) {
              console.log(err);
              sendJSONresponse(res, 404, err);
              return;
            }
            user.badges.push(badge);

            user.save(function(err, user) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } else {
                sendJSONresponse(res, 200, user);
              }
            });
          })
      });
  } else {
    console.log('No locationid specified');
    sendJSONresponse(res, 404, {
      "message": "No locationid in request"
    });
  }
}

getBadges = (req, res) =>{
  if (req.params && req.params.userid) {
    user
      .findById(req.params.userid)
      .exec(function(err, user) {
        if (!user) {
          sendJSONresponse(res, 404, {
            "message": "user not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(user);
        sendJSONresponse(res, 200, user.badges);
      });
  } else {
    console.log('No locationid specified');
    sendJSONresponse(res, 404, {
      "message": "No locationid in request"
    });
  }
}

addKids = (req, res) => {

}

getKids = (req, res) => {

}

// Add books to the persons acount
addBooks = (req, res) =>{

}

// get books added by a specific user
getBooks = (req, res) => {

}
module.exports = {
    getUser,
    getAllUsers,
    updateUser,
    addBadge,
    getBadges
}