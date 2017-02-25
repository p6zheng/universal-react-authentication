import passport from 'passport';
import User from '../models/user';
import config from '../config';
import LocalStrategy from 'passport-local';
import GithubStrategy from 'passport-github2';
import FacebookStrategy from 'passport-facebook';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import cookie from 'react-cookie';

// Create local strategy
const localOptions = {
  usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ 'email': email }, (err, user) => {
    if (err) { return done(err); };
    if (!user) { return done(null, false, { message: 'The email address does not exits.' }); }

    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false, { message: 'Incorrect password.' }); }
      return done(null, user);
    });
  });
});

// Create Github strategy
const githubOptions = {
  clientID: config.github.id,
  clientSecret: config.github.secret,
  callbackURL: "/auth/github/callback"
};

const githubLogin = new GithubStrategy(githubOptions,
  (req, accessToken, refreshToken, profile, done) => {
    User.findOne({ 'github.id': profile.id }, (error, existingUser) => {
      if (error) { return done(error); }
      if (existingUser) { return done(null, existingUser); }

      User.findOne({ 'email': profile._json.email }, (err, existingEmailUser) => {
        if (err) { return done(err); }
        if (profile._json.email && existingEmailUser) {
          //req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with GitHub manually from Account Settings.' });
          done(err);
        } else {
          const user = new User();
          user.email = profile._json.email;
          user.profile.name = profile.username;
          user.github.id = profile.id;
          user.github.token = cookie.load('token');
          user.save(error =>
            done(error, user)
          );
        }
      });
    });
  }
)

// Create Facebook strategy
const facebookOptions = {
  clientID: config.facebook.id,
  clientSecret: config.facebook.secret,
  callbackURL: "/auth/facebook/callback"
};

const facebookLogin = new FacebookStrategy(facebookOptions,
  (req, accessToken, refreshToken, profile, done) => {
    User.findOne({ 'facebook.id': profile.id }, (error, existingUser) => {
      if (error) { return done(error); }
      if (existingUser) { return done(null, existingUser); }

      User.findOne({ 'email': profile._json.email }, (err, existingEmailUser) => {
        if (err) { return done(err); }
        if (profile._json.email && existingEmailUser) {
          //req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
          done(err);
        } else {
          const user = new User();
          user.email = profile._json.email;
          user.profile.name = profile.displayName;
          user.profile.gender = profile.gender;
          user.facebook.id = profile.id;
          user.facebook.token = accessToken;
          user.save(error =>
            done(error, user)
          );
        }
      });
    });
  }
)

// Create Google strategy
const googleOptions = {
  clientID: config.google.id,
  clientSecret: config.google.secret,
  callbackURL: "/auth/google/callback",
  passReqToCallback: true
};

const googleLogin = new GoogleStrategy(googleOptions,
  (req, accessToken, refreshToken, profile, done) => {
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
          user.profile.name = profile.displayName;
          user.profile.gender = profile.gender;
          user.google.id = profile.id;
          user.google.token = accessToken;
          user.save(error =>
            done(error, user)
          );
        }
      });
    });
  }
)

// Use strategies
passport.use(localLogin);
passport.use(githubLogin);
passport.use(facebookLogin);
passport.use(googleLogin);
