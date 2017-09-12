var express = require("express");
var Campground = require("../models/campground");
var Comment = require("../models/comment");

var router = express.Router({mergeParams: true});

//Comment Routes

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

router.post("/", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      redirect("/campgrounds");
    }
    else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err)
        }
        else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      })
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

module.exports = router;
