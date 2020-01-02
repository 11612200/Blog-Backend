const User = require('../models/Users')
const user = User.Users

const Post = require('../models/Posts')
const post = Post.Posts

const Comment = require('../models/Comments')
const comments = Comment.Comments

var fields = ["first_name","last_name","emailID","password","bio","gender","age"]

const updateUser = function(req,res) {
    userId = req.headers.userid
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
    var params = {} 
    var userId = req.headers.userid

    const f1 = function(){
        return new Promise( (resolve, reject) => {
            user.findOne({_id: userId},
                async function(err,User){ 
                    if(err){params
                        console.log(err);
                        return reject(err);
                    }
                    else {
                        params["Name"] = User.first_name;
                        params["Email"] =   User.emailID;
                        params["Gender"] =  User.gender;
                        params["Age"] =     User.age;
                        return resolve();
                    }
                }    
              )
        })
    }

    const f2 = function(){
        return new Promise((resolve, reject) => {
            post.find({userId: userId},
                async function(err,Posts) {
                    if(err){
                        console.log(err);
                        return reject(err);
                    }
                    params["Total no. of Posts"] = Posts.length
                    return resolve();
            })
        })
    }
    
    const f3 = function(){
        return new Promise((resolve, reject) => {
            comments.find({userId: userId},
                async function(err,Comments) {
                    if(err){
                        console.log(err)
                        return reject(err);
                    }
                    params["Total no. of Comments"] = Comments.length
                    return resolve();
            })
        })
    }
    Promise.all([f1(), f2(), f3()]).then(function(data){
        // data[0]["Total no. of Posts"] = data[1];
        // data[0]["Total no. of Comments"] = data[2];
        res.send(params);
    }).catch(function(err){
        res.send('Please try again later'+err);
    })
    
}

module.exports = {
    updateUser,
    userProfile
}