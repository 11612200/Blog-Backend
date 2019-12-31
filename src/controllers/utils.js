const jwt = require('jsonwebtoken');

var isTokenValid = function(req,res,next) {
    var token = req.headers.token;
    if(token){
        var valid = false;
        jwt.verify(token,'abcd',(err,decode) => {
            if(err == NULL){
                valid: true;
            }
        })
        if(valid){
            next()
        }else{
            return res.send('Session Expired')
        }
    }else {
        return res.send('Token not provided')
    }
}

module.exports = {
    isTokenValid
}