const express = require('express')
require('./db/mongoose')
const utils = require('./controllers/utils')

const app = express()
const port = process.env.PORT||5000

// const User = require('./models/Users')
// const userSchema = User.Users

// const Post = require('./models/Posts')
// const postSchema = Post.Posts

// const Comment = require('./models/Comments')
// const commentSchema = Comment.Comments

app.use(express.json()); 

const Authenticate = require('./controllers/authenticate')
const PostService = require('./controllers/postServices')
const CommentService = require('./controllers/commentServices')
const UserService = require('./controllers/userServices')


app.post('/signUp',Authenticate.signUp);
app.post('/signIn',Authenticate.signIn);
app.post('/createPost',utils.isTokenValid,PostService.createPost);
app.post('/createComment',utils.isTokenValid,CommentService.createComment);

app.put('/updateUser',utils.isTokenValid,UserService.updateUser);
app.put('/updatePost',utils.isTokenValid,PostService.updatePost);
app.put('/likePost',utils.isTokenValid,PostService.likePost);
app.put('/updateComment',utils.isTokenValid,CommentService.updateComment);

app.delete('/deletePost',utils.isTokenValid,PostService.deletePost);

app.get('/userProfile',utils.isTokenValid,UserService.userProfile);
app.get('/filterPost',utils.isTokenValid,PostService.postFilter);
app.get('/searchSortComments',utils.isTokenValid,CommentService.searchSortComments);


app.listen(port,() => {
    console.log('Listening to port '+ port)
})