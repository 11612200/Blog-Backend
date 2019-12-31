const User = require('../models/Users')
const user = User.Users

const updateUser = function(req,res) {
    userId = req.headers.userid
    first_name = req.body.first_name
    last_name = req.body.last_name
    emailID = req.body.emailID
    password = req.body.password
    bio = req.body.bio
    gender = req.body.gender
    age = req.body.age
    updated_at = Date.now()
    user.update({_id: userId},{
        $set: {
            first_name: first_name,
            last_name: last_name,
            emailID: emailID,
            password: password,
            bio: bio,
            gender: gender,
            age: age,
            updated_at: updated_at
        }
    },
    function(err,obj) {
        if(err){
            res.send('Please try again later');
        }else{
            res.send('User Updated Successfully')
        }
    })
}

module.exports = {
    updateUser
}