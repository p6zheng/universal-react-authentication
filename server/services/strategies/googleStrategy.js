import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import User from '../../models/user';
import config from '../../config';

// / Create Google strategy
const googleOptions = {
  clientID: config.google.id,
  clientSecret: config.google.secret,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true
};

// Create a new user using the Google account
const createNewGoogleUser = (profile, done) => {
  User.findOne({ 'google.id': profile.id }, (error, existingUser) => {
    if (error) { return done(error); }
    if (existingUser) {
      // The user account already exists
      return done(null, existingUser);
    }
    User.findOne({'email': profile._json.email}, (err, existingEmailUser) => {
      if (err) { return done(err); }
      if (profile._json.email && existingEmailUser) {
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
};

// Link the google account to the existing user
const LinkGoogleToUser = (userId, req, profile, done) => {
  User.findOne({ 'google.id': profile.id }, (error, existingUser) => {
    if (error) { return done(error); }
    if (existingUser) {
      req.session.flashMessage = 'There already exists a user using this google account!';
      return done(null);
    }
    const token = req.signedCookies.token;
    verifyToken(token, (err) => {
      if (err) { return done(err); }
      User.findOne({ '_id': userId }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          // Create a new user using the google account if the userId doesn't exist
          createNewGoogleUser(profile, done);
        }
        user.email = profile._json.email;
        user.google.id = profile.id;
        user.save((error) =>
          done(error, user)
        );
      });
    });
  });
};

// Google Strategy
export default new GoogleStrategy(googleOptions,
  (req, accessToken, refreshToken, profile, done) => {
    const userId = req.signedCookies.user_id;
    if (userId) {
      LinkGoogleToUser(userId, req, profile, done);
    } else {
      createNewGoogleUser(profile, done);
    }
  }
);
