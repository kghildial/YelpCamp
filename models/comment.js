var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
  text: String,
  author: {
    id:{
      type: mongoose.Schema.Types.ObjectId, //type of the data
      ref: "User" //model to which id refers ie. the User model
    },
    username: String
  }
});

module.exports = mongoose.model("Comment", commentSchema);
