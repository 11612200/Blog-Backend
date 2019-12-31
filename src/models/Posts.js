const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    likes: {
        type: Number
    },
    image_url:{
        type: String
    },
    author: {
        type: String
    },
    userId: {
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
    Posts : mongoose.model('Posts',postSchema)
}