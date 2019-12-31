const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    commented_by: {
        type:String
    },
    post_id: {
        type: String
    },
    comment: {
        type: String
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