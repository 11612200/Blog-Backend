const textSearch = require('mongoose-text-search')
const Comment = require('../models/Comments')
const comments = Comment.Comments

var createComment = function(req,res) {
    const comment = new comments(req.body)
    comment.userId = req.headers.userid;
    comment.save().then(() => {
        res.send(comment)
    }).catch((error) => {
        res.status(400).send(error)
    })
}

var updateComment = function(req,res) {
    var commentId = req.headers.commentid
    var comment = req.body.comment
    var updated_at = Date.now();
    comments.update({_id: commentId},{
        $set: {
            comment: comment,
            updated_at: updated_at
        }
    },
    function(err,obj){
        if(err){
            console.log(err);
            res.send('Please try again Later')
        }else {
            res.send('Comment Updated successfully: '+obj);
        }
    });
}


const searchSortComments = function(req,res) {
    var searchString = req.query.searchstring
    comments.find({$text: {$search: searchString}},
    function(err, Comments) {
        if(err){
            console.log(err);
            res.send('Please try again Later')
        }else {
            res.send(Comments);
        }  
    }).sort({updated_at:1});
}

module.exports = {
    createComment,
    updateComment,
    searchSortComments
}