const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    commented_by: {
        type:String
    },
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String
    },
    comment: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = {
    Comments : mongoose.model('Comments',commentSchema)
}