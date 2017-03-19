import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import User from '../../models/user';
import config from '../../config';
import { verifyToken } from '../../utils/authHelper';

// Create Google strategy
const googleOptions = {
  clientID: config.google.id,
  clientSecret: config.google.secret,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true
};


// Sign in with google
const signinWithGoogle = (profile, done) => {
  User.findOne({ 'google.id': profile.id })
    .then((existingUser) => {
      // If the google account already exists, signin with the google account
      if (existingUser) return Promise.resolve(existingUser);

      // If the google account doesn't exists, signup using the google crendential
      return createGoogleUser(profile);
    })
    .then((user) => done(null, user))
    .catch((err) => {
      if (!err.message) return done();
      done(err);
    });
};

// Create a new user using the Google account
const createGoogleUser = (profile) => {
  return User.findOne({'email': profile._json.email})
    .then((existingEmailUser) => {
      if (profile._json.email && existingEmailUser) return new Error();

      const user = new User();
      user.email = profile._json.email;
      user.profile.picture = 'default.png';
      user.profile.name = profile.displayName;
      user.profile.gender = profile.gender;
      user.google.id = profile.id;
      return user.save();
    });
};

// Link the google account to the existing user
const LinkGoogleToUser = (userId, req, profile, done) => {
  User.findOne({ 'google.id': profile.id})
    .then((existingGoogleUser) => {
      // Send a flash message if the google user already exits, skips the rest promise chain
      if (existingGoogleUser) {
        req.session.flashMessage = {
          message: 'There already exists a user using this google account!',
          type: 'ERROR'
        };
        throw new Error();
      }
      const token = req.signedCookies.token;
      verifyToken(token, (err) => { if (err) throw err; });
      return User.findOne({ '_id': userId });
    })
    .then((existingUser) => {
      // Throw an error if the existing userid cannot be found
      if (!existingUser) throw Error();

      // Link the google account with the existing user
      if (profile._json.email) existingUser.email = profile._json.email;
      existingUser.google.id = profile.id;
      return existingUser.save();
    })
    .then((savedUser) => {
      req.session.flashMessage = {
        message: 'Successfully linked google account with current account!',
        type: 'SUCCESS'
      };
      done(null, savedUser);
    })
    .catch((err) => {
      if (!err.message) return done();
      done(err);
    });
};

// Google Strategy
export default new GoogleStrategy(googleOptions,
  (req, accessToken, refreshToken, profile, done) => {
    const userId = req.signedCookies.user_id;
    if (userId) {
      LinkGoogleToUser(userId, req, profile, done);
    } else {
      signinWithGoogle(profile, done);
    }
  }
);
