const express = require('express')
require('./db/mongoose')

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
app.post('/createPost',PostService.createPost);
app.post('/createComment',CommentService.createComment);
app.put('/updateUser',UserService.updateUser);
app.put('/updatePost',PostService.updatePost);
app.put('/updateComment',CommentService.updateComment);
app.delete('/deletePost',PostService.deletePost);

app.listen(port,() => {
    console.log('Listening to port '+ port)
})