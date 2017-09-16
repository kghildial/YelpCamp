var express = require("express");
var Campground = require("../models/campground");

var router = express.Router({mergeParams: true});

//index route: campgrounds page
router.get('/', function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    }
    else{
      res.render('campgrounds/index', {campgrounds: allCampgrounds});
    }
  });
});

//create route: campgrounds page with added campground
router.post('/', isLoggedIn, function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {name: name, image: image, description: desc, author: author};
  //create a new campground & save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    }
    else{
      res.redirect('/campgrounds'); //default redirect as a get request
    }
  })
});

//new route: new campground form page
router.get('/new', isLoggedIn, function(req, res){
  res.render('campgrounds/new');
});

//show route: show info about selected campground
router.get('/:id', function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    }
    else{
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

//edit campground route
router.get("/:id/edit", checkCampgroundOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});

//update campground route: put route
router.put("/:id", checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err){
      res.redirect("/campgrounds");
    }
    else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//destroy campground route
router.delete("/:id", checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    }
    else{
      res.redirect("/campgrounds");
    }
  });
});

//middleware: check user logged in middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  else {
    res.redirect("/login");
  }
}

//middleware:
function checkCampgroundOwnership(req, res, next){
  // is user logged in?
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
        res.redirect("back");
      }
      else{
        //foundCampground.author.object is a mongoose object and req,params.id is a string
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
module.exports = router;
