const User = require('../models/User')

exports.send = function(req,res,next){
    User.find({username: req.body.friendUsername}).exec(function(err, user){
        const person = user[0]
        const coolio = [...user[0].requests, req.body.user]
        user[0].update({'requests': coolio}, function(err){
            if(err){
                res.json('Error:' + err)
            } else {
                res.json('Success!')
            }
        })
    })
}