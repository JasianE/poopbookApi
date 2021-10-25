const User = require('../models/User')
//Finds User, returns user
//Once displayed controller can send friend request 
//Request uses home's current user and sends it to the requested friend user from state (stores new user in a state box that resets once the user leaves pages)
//This request is then sent to the other user where they can either accept or reject
//Once accepted use friendController.add
exports.find = function(req,res,next){
    User.find({username: req.params.user}, function(err, user){
        if(user.length === 0){
            res.json('No User Found')
        } else{
            res.json(user[0])
        }
    })
}
exports.stupid = function(req,res,next){
    console.log(req.params)
    User.find({"_id": req.params.id}, function(err, user){
        res.json(user[0])
    })
}
exports.write = function(req,res,next){
    /* Stores it in users comments
    Stores Text
    When homepage is read scan through each friend of the users post
    Sort chronilogiclaylasdsfal and yeah
    Ok it hink this is a good way to do ti
    */
   User.find({username: req.body.user.username}, function(err, user){
       const post = {
           sender: req.body.user.username,
           post: req.body.post
       }
       const newPosts = [...user[0].posts, post]
       console.log(newPosts)
       user[0].update({'posts': newPosts}, function(err){
           if(err){
               res.json(err)
           } else{
               res.json(':)')
           }
       })
   })
}
exports.findPosts = function(req,res,next){
    /*
    Finds Friends and user stores them in array
    maps through array, pushing each post into posts array
    sorts posts by date
    returns posts array
     */
    const friends = req.params.friends.split(',')
    const og = JSON.parse(req.params.user)
    let posts = [...og]
    for(let i = 0; i < friends.length; i++){
        if(i === friends.length - 1){
            User.find({'_id': friends[i]}, function(err, user){
                posts = [...posts, ...user[0].posts]
                res.json(posts)
            })
        } else {
            User.find({'_id': friends[i]}, function(err, user){
                posts = [...posts, ...user[0].posts]
            })
        }
    }
    console.log('hello')
}
exports.like = function(req,res,next){
    /*
    Finds User then finds post
    Adds current user to post likers
     */
    User.find({'username': req.body.post.sender}, function(err, userr){
        const user = userr[0]
        //Looks through posts and finds the post that is the same as the post we sent in poopbok
        const post = user.posts.find((key) => {
            console.log(key.equals(req.body.post))
            return key.equals(req.body.post)
        })
        console.log(post, user, req.body.post)
        /*
        const newPosts = [...post.likers, req.body.user._id] 
        post.likers = newPosts
        user.posts.splice(user.indexOf(req.body.post), 1, newPosts)
        console.log(user) */
    })
}