import FacebookStrategy from 'passport-facebook';
import User from '../../models/user';
import config from '../../config';

// Create Facebook strategy
const facebookOptions = {
  clientID: config.facebook.id,
  clientSecret: config.facebook.secret,
  callbackURL: '/auth/facebook/callback'
};

export default new FacebookStrategy(facebookOptions,
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ 'facebook.id': profile.id }, (error, existingUser) => {
      if (error) { return done(error); }
      if (existingUser) { return done(null, existingUser); }

      User.findOne({ 'email': profile._json.email }, (err, existingEmailUser) => {
        if (err) { return done(err); }
        if (profile._json.email && existingEmailUser) {
          done(err);
        } else {
          const user = new User();
          user.email = profile._json.email;
          user.profile.picture = 'default.png';
          user.profile.name = profile.displayName;
          user.profile.gender = profile.gender;
          user.facebook.id = profile.id;
          user.save(error =>
            done(error, user)
          );
        }
      });
    });
  }
)