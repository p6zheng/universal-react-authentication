import GithubStrategy from 'passport-github';
import User from '../../models/user';
import config from '../../config';
import { verifyToken } from '../../utils/authHelper';

// Create Github strategy
const githubOptions = {
  clientID: config.github.id,
  clientSecret: config.github.secret,
  callbackURL: '/auth/github/callback',
  passReqToCallback: true
};


// Sign in with github
const signinWithGithub = (profile, done) => {
  User.findOne({ 'github.id': profile.id })
    .then((existingUser) => {
      // If the github account already exists, signin with the github account
      if (existingUser) return Promise.resolve(existingUser);

      // If the github account doesn't exists, signup using the github crendential
      return createGithubUser(profile);
    })
    .then((user) => done(null, user))
    .catch((err) => {
      if (!err.message) return done();
      done(err);
    });
};

// Create a new user using the Github account
const createGithubUser = (profile) => {
  return User.findOne({'email': profile._json.email})
    .then((existingEmailUser) => {
      if (profile._json.email && existingEmailUser) return new Error();

      const user = new User();
      user.email = profile._json.email;
      user.profile.picture = 'default.png';
      user.profile.name = profile.username;;
      user.profile.gender = profile.gender;
      user.github.id = profile.id;
      return user.save();
    });
};

// Link the github account to the existing user
const LinkGithubToUser = (userId, req, profile, done) => {
  User.findOne({ 'github.id': profile.id})
    .then((existingGithubUser) => {
      // Send a flash message if the github user already exits, skips the rest promise chain
      if (existingGithubUser) {
        req.flash('error', 'There already exists a user using this github account!');
        throw new Error();
      }
      const token = req.signedCookies.token;
      verifyToken(token, (err) => { if (err) throw err; });
      return User.findOne({ '_id': userId });
    })
    .then((existingUser) => {
      // Throw an error if the existing userid cannot be found
      if (!existingUser) throw Error();

      // Link the github account with the existing user
      if (profile._json.email) existingUser.email = profile._json.email;
      existingUser.github.id = profile.id;
      return existingUser.save();
    })
    .then((savedUser) => {
      req.flash('success', 'Successfully linked github account with current account!');
      done(null, savedUser);
    })
    .catch((err) => {
      if (!err.message) return done();
      done(err);
    });
};

// Github Strategy
export default new GithubStrategy(githubOptions,
  (req, accessToken, refreshToken, profile, done) => {
    const userId = req.signedCookies.user_id;
    if (userId) {
      LinkGithubToUser(userId, req, profile, done);
    } else {
      signinWithGithub(profile, done);
    }
  }
);
