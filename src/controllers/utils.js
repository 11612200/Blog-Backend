const jwt = require('jsonwebtoken');

var isTokenValid = function(req,res,next) {
    var token = req.headers.token;
    if(token){
        var valid = false;
        jwt.verify(token,'abcd',(err,decode) => {
            if(err == null){
                // console.log("error: "+err);
                valid = true;
            }
        })
        if(valid){
            var decodededToken = jwt.decode(token);
            console.log("decoded userid: "+decodededToken.userId);
            req.headers.userid = decodededToken.userId;
            console.log("userid utils:"+req.headers.userid);
            next();
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