var express = require("express");
var passport = require("passport");
var User = require("../models/user");
var router = express.Router({mergeParams: true});

//root route: landing page
router.get('/', function(req, res){
  res.render('landing');
});

// auth routes

//show the register form
router.get("/register", function(req, res){
  res.render("register");
});

//handle signup logic
router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      req.flash("error", err.message + "!");
      return res.redirect("back");
    }
    else{
      passport.authenticate("local")(req, res, function(){
        req.flash("success", "Welcome to YelpCamp " + user.username + "! Happy Camping!");
        res.redirect("/campgrounds");
      });
    }
  });
});

// show login form
router.get("/login", function(req, res){
  res.render("login");
});

// handle login logic
router.post("/login", passport.authenticate("local", //authenticate middleware setup in passport config
  {
    // successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res){
    req.flash("success", "Successfully logged in!");
    res.redirect("/campgrounds");
});

//logout route
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Successfully logged out!")
  res.redirect("/campgrounds");
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
