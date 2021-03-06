var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

//adds in middleware methods to the User (such as .authenticate, .serialize, .deserialize)
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
