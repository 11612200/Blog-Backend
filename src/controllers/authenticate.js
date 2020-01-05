const jwt = require('jsonwebtoken')
const passwordHash = require('password-hash')
const User = require('../models/Users')
const utils = require('./utils')
const user = User.Users

var signUp = function(req,res){
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var emailID = req.body.emailID
    var password;
    if(req.body.password){
         password = passwordHash.generate(req.body.password)
    }
    console.log('password: '+ password);
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
        utils.sendResponse(res,200,true,'Sign up Successful')
    }).catch((err) =>{
           utils.sendResponse(res, 400, false, err);
    });
}

var signIn = function(req,res) {
    var emailID = req.body.emailID;
    var password = req.body.password;
    user.findOne({emailID: emailID}).then((userObj) => {
        if(userObj){
            if(!passwordHash.verify(password,userObj.password)){
                utils.sendResponse(res,400,false,'Wrong Password');
            }else {
                const payload = {
                    userId: userObj._id
                };
                var token = jwt.sign(payload,'abcd',{
                    expiresIn: 24*60*60
                });
                var params = {
                    token: token
                }
                utils.sendResponse(res,200,true,'Sign In Successful',params);
            }
        }else {
            utils.sendResponse(res,404,false,'User Not Found');
        }
    }).catch((err) => {
        utils.sendResponse(res,404,false,'User Not Found');
    });
}


module.exports = {
    signUp: signUp,
    signIn: signIn
}