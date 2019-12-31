const jwt = require('jsonwebtoken')
const User = require('../models/Users')
const user = User.Users

var signUp = function(req,res){
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var emailID = req.body.emailID
    var password = req.body.password
    var bio = req.body.bio
    var gender = req.body.gender
    var age = req.body.age

    const newUser = new user({
        first_name: first_name,
        last_name: last_name,
        emailID: emailID,
        password: password,
        bio: bio,
        gender: gender,
        age: age

    });
    newUser.save().then(()=>{
        res.send('Sign Up Successful')
    }).catch((error) =>{
        if(error.emailID = 'ValidationError'){
            res.send('User Already Exists')
        }
        else{
            res.send('Please Try Again Later')
        }
    });
}

var signIn = function(req,res) {
    var emailID = req.body.emailID;
    var password = req.body.password;
    user.findOne({emailID: emailID}).then((userObj) => {
        if(userObj){
            if(userObj.password!=password){
                res.send('Wrong Password')
            }else {
                const payload = {
                    userId: userObj._id
                };
                var token = jwt.sign(payload,'abcd',{
                    expiresIn: 24*60*60
                });
                var params = {
                    userObj: userObj,
                    token: token
                }
                res.send('Sign In Successful'+ userObj+'key: '+params.token);
            }
        }
    }).catch((error) => {
        res.send('No user found');
    });
}


module.exports = {
    signUp: signUp,
    signIn: signIn
}