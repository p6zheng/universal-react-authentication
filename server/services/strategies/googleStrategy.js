import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import User from '../../models/user';
import config from '../../config';

// / Create Google strategy
const googleOptions = {
  clientID: config.google.id,
  clientSecret: config.google.secret,
  callbackURL: '/auth/google/callback'
};

export default  new GoogleStrategy(googleOptions,
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ 'google.id': profile.id }, (error, existingUser) => {
      if (error) { return done(error); }
      if (existingUser) { return done(null, existingUser); }

      User.findOne({ 'email': profile._json.email }, (err, existingEmailUser) => {
        if (err) { return done(err); }
        if (profile._json.email && existingEmailUser) {
          //req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
          done(err);
        } else {
          const user = new User();
          user.email = profile.emails[0].value;
          user.profile.picture = 'default.png';
          user.profile.name = profile.displayName;
          user.profile.gender = profile.gender;
          user.google.id = profile.id;
          user.save(error =>
            done(error, user)
          );
        }
      });
    });
  }
);