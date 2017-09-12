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

//requiring route files
var commentRoutes     = require("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes        = require("./routes/index");

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

//middleware to use currentUser: will come after passprt config
app.use(function(req, res, next){
  res.locals.currentUser = req.user;  // currentUser is an arbitrary name, res.locals holds anything that is made to be available inside the template
  next();
});

//using the routes
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function(req, res){
  console.log("Server Started...");
});
