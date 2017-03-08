import FacebookStrategy from 'passport-facebook';
import User from '../../models/user';
import config from '../../config';
import { verifyToken } from '../../utils/authHelper';

// Create Facebook strategy
const facebookOptions = {
  clientID: config.facebook.id,
  clientSecret: config.facebook.secret,
  callbackURL: '/auth/facebook/callback',
  passReqToCallback: true
};


// Create a new user using the Facebook account
const createNewFacebookUser = (profile, done) => {
  User.findOne({ 'facebook.id': profile.id }, (error, existingUser) => {
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
};

// Link the facebook account to the existing user
const LinkFacebookToUser = (userId, req, profile, done) => {
  User.findOne({ 'facebook.id': profile.id }, (error, existingUser) => {
    if (error) { return done(error); }
    if (existingUser) {
      req.session.flashMessage = 'There already exists a user using this facebook account!';
      return done(null);
    }
    const token = req.signedCookies.token;
    verifyToken(token, (err) => {
      if (err) { return done(err); }
      User.findOne({ '_id': userId }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          // Create a new user using the facebook account if the userId doesn't exist
          createNewFacebookUser(profile, done);
        }
        user.email = profile._json.email;
        user.facebook.id = profile.id;
        user.save((error) =>
          done(error, user)
        );
      });
    });
  });
};

// Facebook Strategy
export default new FacebookStrategy(facebookOptions,
  (req, accessToken, refreshToken, profile, done) => {
    const userId = req.signedCookies.user_id;
    if (userId) {
      LinkFacebookToUser(userId, req, profile, done);
    } else {
      createNewFacebookUser(profile, done);
    }
  }
);
