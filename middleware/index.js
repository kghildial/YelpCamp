var Campground = require("../models/campground");
var Comment = require("../models/comment");


//All the middleware goes in here
var middlewareObj = {};

//middleware: for user campground auth
middlewareObj.checkCampgroundOwnership = function(req, res, next){
  // is user logged in?
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
        req.flash("error", "Something went wrong. Please try again in a few minutes.");
        res.redirect("/campgrounds/" + req.params.id);
      }
      else{
        //does the user own the campground ?
        //foundCampground.author.object is a mongoose object and req.params.id is a string
        if(foundCampground.author.id.equals(req.user._id)){ // equals is a mongoose method
          next();
        }
        else{
          req.flash("error", "Permission Denied!");
          res.redirect("/campgrounds/" + req.params.id);
        }
      }
    });
  }
  else{
    req.flash("error", "Permission Denied. Please Login First!")
    res.redirect("/campgrounds/" + req.params.id);
  }
}

//middleware: for user comment auth
middlewareObj.checkCommentOwnership = function(req, res, next){
  // is user logged in?
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        req.flash("error", "Something went wrong. Please try again in a few minutes.");
        res.redirect("/campgrounds/" + req.params.id);
      }
      else{
        //does the user own the comment ?
        //foundCampground.author.object is a mongoose object and req.params.id is a string
        if(foundComment.author.id.equals(req.user._id)){ // equals is a mongoose method
          next();
        }
        else{
          req.flash("error", "Permission Denied!");
          res.redirect("/campgrounds/" + req.params.id);
        }
      }
    });
  }
  else{
    req.flash("error", "Permission Denied. Please Login First!")
    res.redirect("/campgrounds/" + req.params.id);
  }
}

//check user logged in middleware
middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  else {
    req.flash("error", "Please Login First!");
    res.redirect("/login");
  }
}


module.exports = middlewareObj;
