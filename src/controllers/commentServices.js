const Comment = require('../models/Comments')
const comments = Comment.Comments

var createComment = function(req,res) {
    const comments = new comments(req.body)
    comments.save().then(() => {
        res.send(comments)
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

module.exports = {
    createComment,
    updateComment  
}