const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-node');

var userSchema = new Schema({
  email: String,
  password: String,
  google: {
    id : String,
    name : String
  },
  github: {
    id : String,
    name : String
  },
  facebook: {
    id : String,
    name : String
  },
  profile: {
    name: String,
    picture: String,
    age: String,
    gender: String
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password') || typeof user.password === 'undefined') {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

var User = mongoose.model('User', userSchema);
module.exports = User;
