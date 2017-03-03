import GithubStrategy from 'passport-github2';
import User from '../../models/user';
import config from '../../config';
import { verifyToken } from '../../utils/authHelper';

// Github strategy
const githubOptions = {
  clientID: config.github.id,
  clientSecret: config.github.secret,
  callbackURL: '/auth/github/callback',
  passReqToCallback: true
};

// Create a new user using the Github account
const createNewGithubUser = (profile, done) => {
  User.findOne({'email': profile._json.email}, (err, existingEmailUser) => {
    if (err) { return done(err); }
    if (profile._json.email && existingEmailUser) {
      done(err);
    } else {
      const user = new User();
      user.email = profile._json.email;
      user.profile.name = profile.username;
      user.profile.picture = 'default.png';
      user.github.id = profile.id;
      user.save((error) =>
        done(error, user)
      );
    }
  });
};

// Link the github account to the existing user
const LinkGithubToUser = (userId, token, profile, done) => {
  verifyToken(token, (err) => {
    if (err) { return done(err); }
    User.findOne({ '_id': userId }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        // Create a new user using the github account if the userId doesn't exist
        createNewGithubUser(profile, done);
      }
      user.email = profile._json.email;
      user.github.id = profile.id;
      user.save((error) =>
        done(error, user)
      );
    });
  });
};

export default new GithubStrategy(githubOptions,
  (req, accessToken, refreshToken, profile, done) => {
    User.findOne({ 'github.id': profile.id }, (error, existingUser) => {
      if (error) { return done(error); }
      if (existingUser) { return done(null, existingUser, { message: 'There already exists a user using this github account!'}); }
      const userId = req.signedCookies.user_id;
      if (userId) {
        const token = req.signedCookies.token;
        LinkGithubToUser(userId, token, profile, done);
      } else {
        createNewGithubUser(profile, done);
      }
    });
  }
);
