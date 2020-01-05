const textSearch = require('mongoose-text-search')
const Comment = require('../models/Comments')
const utils = require('./utils')
const comments = Comment.Comments

var createComment = function(req,res) {
    const comment = new comments(req.body)
    comment.userId = req.headers.userid;
    comment.save().then((result) => {
        utils.sendResponse(res,200,true,'Comment created successfully',result);
    }).catch((err) => {
        utils.sendResponse(res, 400, false, 'Please try again later.',err);
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
    function(err,Comments){
        if(err){
            console.log(err);
            utils.sendResponse(res, 400, false, 'Please try again later.',err);
        }else {
            utils.sendResponse(res,200,true,'Comment Updated successfully');
        }
    });
}


const searchSortComments = function(req,res) {
    var searchString = req.query.searchstring
    comments.find({comment: new RegExp(searchString, "i")},
    function(err, Comments) {
        if(err){
            console.log(err);
            utils.sendResponse(res, 400, false, 'Please try again later.',err);
        }else {
            utils.sendResponse(res,200,true,'Searched Successfully',Comments);
        }  
    }).sort({updated_at:1});
}

module.exports = {
    createComment,
    updateComment,
    searchSortComments
}