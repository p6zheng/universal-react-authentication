import User from '../models/user';
import { tokenForUser, verifyToken } from '../utils/authHelper';

export const setToken = (req, res, next) => {
  if (req.flashMessage) {
    return next();
  }
  const user = req.user;
  const token = tokenForUser(user);
  res.cookie('token', token, { signed: true });
  res.cookie('user_name', user.profile.name, { signed: true });
  res.cookie('user_id', user._id.toString(), { signed: true });
  res.cookie('user_photo', user.profile.picture, { signed: true });
  next();
};

export const signup = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(422).send({ error: 'Required Field Missing!'});
  }
  User.findOne({ 'local.email': email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      return res.status(422).send({ error: 'Email in use !' });
    }
    const user = new User({
      email,
      password,
      profile: {
        name: username,
        picture: 'default.png'
      }
    });
    user.save(err => {
      if (err) { return next(err) }
      req.user = user;
      next();
    });
  });
};

export const authenticateUser = (req, res, next) => {
  const token = req.signedCookies.token;
  verifyToken(token, err => {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      });
    }
    next();
  });
};
