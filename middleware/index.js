var Campground = require("../models/campground");
var Comments = require("../models/comment");


//All the middleware goes in here
var middlewareObj = {};

//middleware: for user campground auth
middlewareObj.checkCampgroundOwnership = function(req, res, next){
  // is user logged in?
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
        res.redirect("back");
      }
      else{
        //does the user own the campground ?
        //foundCampground.author.object is a mongoose object and req.params.id is a string
        if(foundCampground.author.id.equals(req.user._id)){ // equals is a mongoose method
          next();
        }
        else{
          res.redirect("back");
        }
      }
    });
  }
  else{
    res.redirect("back");
  }
}

//middleware: for user comment auth
middlewareObj.checkCommentOwnership = function(req, res, next){
  // is user logged in?
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect("back");
      }
      else{
        //does the user own the comment ?
        //foundCampground.author.object is a mongoose object and req.params.id is a string
        if(foundComment.author.id.equals(req.user._id)){ // equals is a mongoose method
          next();
        }
        else{
          res.redirect("back");
        }
      }
    });
  }
  else{
    res.redirect("back");
  }
}

//check user logged in middleware
middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  else {
    res.redirect("/login");
  }
}


module.exports = middlewareObj;
