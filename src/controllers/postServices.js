const mongoose = require('mongoose')
const Post = require('../models/Posts')
const post = Post.Posts

const createPost = function(req,res){
    console.log("userid:"+req.headers.userid);
    const posts = new post(req.body)
    posts.userId = req.headers.userid;
    posts.save().then(() => {
        res.send(posts)
    }).catch((error) => {
        res.status(400).send(error)
    })
}

var fields = ["title","description"]

const updatePost = function(req,res) {
    var postId = req.headers.postid
    // var title = req.body.title
    // var description = req.body.description
    console.log(postId);
    var data = req.body;
    console.log(data)
    var json = {};
    for(i in fields){
        if(data[fields[i]] && data[fields[i]] != ""){
            json[fields[i]] = data[fields[i]];
        }
    }
    json["updated_at"] = Date.now()
    console.log(json);
        post.updateMany({_id: postId},{
            $set: json 
        },
        function(err,obj){
            if(err){
                console.log(err);
                res.send('Please try again later')
            }else {
                res.send('Post updated successfully')
            }
        
        });
}

const deletePost = function(req,res) {
    var postId = req.headers.postid;
    console.log(postId);
    post.deleteOne({ _id: postId },
        function (err) {
            if (err) {
                console.log(err);
                res.send('Please try again later.');
            }
            res.send('Post deleted successfully.');
        });

}


const postFilter = function(req,res) {

    // { airedAt: { $gte: '1987-10-19', $lte: '1987-10-26' } }

    var fields = ["likes","author"]
    var params = req.query;
    var jsonData = {}
    for( i in fields){
        if(params[fields[i]] && params[fields[i]] !== "" ){
            jsonData[fields[i]] = params[fields[i]]
        }
    }

    if(params.startDate && params.startDate !== "" ){
        jsonData["updated_at"] = {  $gte: new Date(new Date(params.startDate).setHours(00, 00, 00)),
            $lt: new Date(new Date(params.endDate).setHours(23, 59, 59)) }       
    }

    post.find(jsonData,
        function(err,Posts){
            if(err){
                console.log(err);
                res.send('Please try again later')
            }else {
                res.send(Posts)
            }
        
        });
}

const likePost = function(req,res) {
    var postId = req.headers.postid;
    var valid = false;
    var likes;
    post.findOneAndUpdate({_id:postId},{ 
        $inc: {
             likes: 1
            } 
    },
    function(err,Posts){
        if(err){
            console.log(err);
            res.send('Please try again later')
        }else {
            res.send("Liked Post Successfully");
        }

    });
}


module.exports = {
    createPost,
    updatePost,
    deletePost,
    postFilter,
    likePost
}