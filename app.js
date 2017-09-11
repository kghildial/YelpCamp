var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose'),
    Campground    = require("./models/campground"),
    seedDB        = require("./seeds"),
    Comment       = require("./models/comment"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    User          = require("./models/user");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

//passport config
app.use(require("express-session")({
  secret: "This is the encoding phrase!",
  resave: false,
  saveuninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //.authnicate method comes with passport-local-mongoose
passport.serializeUser(User.serializeUser()); // from passport-local-mongoose
passport.deserializeUser(User.deserializeUser()); //from passport-local-mongoose

//landing page
app.get('/', function(req, res){
  res.render('landing');
});

//index route: campgrounds page
app.get('/campgrounds', function(req, res){
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
app.post('/campgrounds', function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
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
app.get('/campgrounds/new', function(req, res){
  res.render('campgrounds/new');
});

//show route: show info about selected campground
app.get('/campgrounds/:id', function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    }
    else{
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

//Comment Routes

app.get('/campgrounds/:id/comments/new', function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    }
    else{
      res.render('comments/new', {campground: campground});
    }
  });
});

app.post("/campgrounds/:id/comments", function(req, res){
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

// auth routes

//show the register form
app.get("/register", function(req, res){
  res.render("register");
});

//handle signup logic
app.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }
    else{
      passport.authenticate("local")(req, res, function(){
        res.redirect("/campgrounds");
      });
    }
  });
});

// show login form
app.get("/login", function(req, res){
  res.render("login");
});

// handle login logic
app.post("/login", function(req, res){
  res.send("Logging you in...");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(req, res){
  console.log("Server Started...");
});
