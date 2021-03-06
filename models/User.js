const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    message: {type: String, required: true},
    sender: {type: String, required: true}
})
const RequestSchema = new Schema({
    user: {type: String, required: true}
})
const PostSchema = new Schema({
    sender: {type: String, required: true},
    likers: {type: Array},
    post: {type: String, required: true},
    date: {type: Date, default: Date.now},
    comments: {
        type: [ CommentSchema ],
        default: []
    }
})
const UserSchema = new Schema({
    username: {type: String, required: true},
    firstname: {type: String, required: true},
    email: {type: String, required: true},
    lastname: {type: String, required: true},
    friends: [],
    password: {type: String, required: true},
    photo: {type: String},
    requests: {
        type: [ RequestSchema ],
        default: []
    },
    posts: {
        type: [ PostSchema ],
        default: []
    }
})

module.exports = mongoose.model('User', UserSchema)