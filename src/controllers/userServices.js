const User = require('../models/Users')
const user = User.Users

const Post = require('../models/Posts')
const post = Post.Posts

const Comment = require('../models/Comments')
const comments = Comment.Comments

var fields = ["first_name","last_name","emailID","password","bio","gender","age"]

const updateUser = function(req,res) {
    userId = req.headers.userid
    // first_name = req.body.first_name
    // last_name = req.body.last_name
    // emailID = req.body.emailID
    // password = req.body.password
    // bio = req.body.bio
    // gender = req.body.gender
    // age = req.body.age
    var data = req.body;
    console.log(data)
    var json = {};
    for(i in fields){
        if(data[fields[i]] && data[fields[i]] != ""){
            json[fields[i]] = data[fields[i]];
        }
    }
    json["updated_at"] = Date.now()
    // updated_at = Date.now()
    user.update({_id: userId},{
        $set: json
    },
    function(err,obj) {
        if(err){
            res.send('Please try again later');
        }else{
            res.send('User Updated Successfully')
        }
    })
}

const userProfile = function(req,res) {
    var params;
    var userId = req.headers.userid
    user.findOne({_id: userId},
      function(err,User){ 
          if(err){
              console.log(err)
              res.send('Please try again later')
          }else {
                  params = {
                  "Name" : User.first_name,
                  "Email" : User.emailID,
                  "Gender": User.gender,
                  "Age": User.age
              }
          }
      }    
    )
    post.find({userId: userId},
        function(err,Posts) {
            if(err){
                console.log(err)
                res.send('Please try again later')
            }
            params["Total no of posts"]= Posts.length;
    })
    comments.find({userId: userId},
        function(err,Comments) {
            if(err){
                console.log(err)
                res.send('Please try again later')
            }
            params["Total no of comments"]= Comments.length;
            res.send(params)
    })
}

module.exports = {
    updateUser,
    userProfile
}