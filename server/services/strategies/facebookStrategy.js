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


// Sign in with facebook
const signinWithFacebook = (profile, done) => {
  User.findOne({ 'facebook.id': profile.id })
    .then((existingUser) => {
      // If the facebook account already exists, signin with the facebook account
      if (existingUser) return Promise.resolve(existingUser);

      // If the facebook account doesn't exists, signup using the facebook crendential
      return createFacebookUser(profile);
    })
    .then((user) => done(null, user))
    .catch((err) => {
      if (!err.message) return done();
      done(err);
    });
};

// Create a new user using the Facebook account
const createFacebookUser = (profile) => {
  return User.findOne({'email': profile._json.email})
    .then((existingEmailUser) => {
      if (profile._json.email && existingEmailUser) return new Error();

      const user = new User();
      user.email = profile._json.email;
      user.profile.picture = 'default.png';
      user.profile.name = profile.displayName;
      user.profile.gender = profile.gender;
      user.facebook.id = profile.id;
      return user.save();
    });
};

// Link the facebook account to the existing user
const LinkFacebookToUser = (userId, req, profile, done) => {
  User.findOne({ 'facebook.id': profile.id})
    .then((existingFacebookUser) => {
      // Send a flash message if the facebook user already exits, skips the rest promise chain
      if (existingFacebookUser) {
        req.flash('error', 'There already exists a user using this facebook account!');
        throw new Error();
      }
      const token = req.signedCookies.token;
      verifyToken(token, (err) => { if (err) throw err; });
      return User.findOne({ '_id': userId });
    })
    .then((existingUser) => {
      // Throw an error if the existing userid cannot be found
      if (!existingUser) throw Error();

      // Link the facebook account with the existing user
      if (profile._json.email) existingUser.email = profile._json.email;
      existingUser.facebook.id = profile.id;
      return existingUser.save();
    })
    .then((savedUser) => {
      req.flash('success', 'Successfully linked facebook account with current account!');
      done(null, savedUser);
    })
    .catch((err) => {
      if (!err.message) return done();
      done(err);
    });
};

// Facebook Strategy
export default new FacebookStrategy(facebookOptions,
  (req, accessToken, refreshToken, profile, done) => {
    const userId = req.signedCookies.user_id;
    if (userId) {
      LinkFacebookToUser(userId, req, profile, done);
    } else {
      signinWithFacebook(profile, done);
    }
  }
);
