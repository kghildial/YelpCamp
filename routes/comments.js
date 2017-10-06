var express = require("express");
var Campground = require("../models/campground");
var Comment = require("../models/comment");

var router = express.Router({mergeParams: true});

//Comment Routes

//new comment
router.get('/new', isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    }
    else{
      res.render('comments/new', {campground: campground});
    }
  });
});

//create comment
router.post("/", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    }
    else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err)
        }
        else {
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          comment.save();
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});

//Comment edit route
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back");
    }
    else{
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }
  });
});

//Comment Update route
router.put("/:comment_id", function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect("back");
    }
    else{
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//Comment Destroy route
router.delete("/:comment_id", checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    }
    else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//check user logged in middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  else {
    res.redirect("/login");
  }
}

//middleware: for user auth
function checkCommentOwnership(req, res, next){
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

module.exports = router;
