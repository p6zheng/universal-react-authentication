const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-node');

var userSchema = new Schema({
  local: {
    email: String,
    password: String,
  },
  google: {
    id : String,
    token : String,
    name : String
  },
  github: {
    id : String,
    token : String,
    name : String
  },
  facebook: {
    id : String,
    token : String,
    name : String
  },
  profile: {
    name: String,
    email: String,
    pitcture: String,
    age: String,
    gender: String
  }
});


userSchema.pre('save', function(next) {
  const user = this;
  /*if (!user.local.isModified('password')) {
    return next();
  }*/
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
    bcrypt.hash(user.local.password, salt, null, function(err, hash) {
      if (err) { return next(err); }
      user.local.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.local.password, function(err, isMatch) {
    if (err) { return callback(err) };
    callback(null, isMatch);
  });
}

var User = mongoose.model('User', userSchema);
module.exports = User;
