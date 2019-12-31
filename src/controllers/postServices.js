const mongoose = require('mongoose')
const Post = require('../models/Posts')
const post = Post.Posts

const createPost = function(req,res){
    const posts = new post(req.body)
    posts.save().then(() => {
        res.send(posts)
    }).catch((error) => {
        res.status(400).send(error)
    })
}

var arr = ["title","description"]

const updatePost = function(req,res) {
    var postId = req.headers.postid
    // var title = req.body.title
    // var description = req.body.description
    console.log(postId);
    var data = req.body;
    console.log(data)
    var j = {};
    for(i in arr){
        if(data[arr[i]] && data[arr[i]] != ""){
            j[arr[i]] = data[arr[i]];
        }
    }
    j["updated_at"] = Date.now()
    console.log(j);
        post.update({_id: postId},{
            $set: j 
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

var deletePost = function(req,res){
    var postId = req.headers.postid;
    console.log(mongoose.Types.ObjectId(postId));
    post.deleteOne({ _id: postId },
        function (err) {
            if (err) {
                console.log(err);
                res.send('Please try again later.');
            }
            res.send('Post deleted successfully.');
        });

}


module.exports = {
    createPost,
    updatePost,
    deletePost
}