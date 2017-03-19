import LocalStrategy from 'passport-local';
import User from '../../models/user';

// Local strategy
const localOptions = {
  usernameField: 'email'
};

export default new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ 'email': email })
    .then((existingUser) => {
      if (!existingUser) return done(null, false, { message: 'The email address does not exits.' });
      existingUser.comparePassword(password, (err, isMatch) => {
        if (err) { return done(err); }
        if (!isMatch) { return done(null, false, { message: 'Incorrect password.' }); }
        return done(null, existingUser);
      });
    })
    .catch((err) => done(err));
});