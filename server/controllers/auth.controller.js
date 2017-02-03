import User from '../models/user';
import cookie from 'react-cookie';
import * as jwt from '../utils/jwtToken'

export const respond = (req, res) => {
  res.status(200).send(req.user);
}

export const setToken = (req, res, next) => {
  const user = req.user;
  const token = jwt.tokenForUser(user);
  res.cookie('token', token);
  res.cookie('user_name', user.profile.name);
  res.cookie('user_id', user._id.toString());
  next();
}

export const signup = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(422).send({ error: 'Required Field Missing!'})
  }
  User.findOne({ 'local.email': email }, (err, existingUser) => {
    if (err) { return next(err) }
    if (existingUser) {
      return res.status(422).send({ error: 'Email in use !' });
    }
    const user = new User({
      local: {
        email,
        password
      },
      profile: {
        email,
        name: username
      }
    });
    user.save(err => {
      if (err) { return next(err) }
      req.user = user;
      next();
    });
  });
}

export const authenticateUser = (req, res, next) => {
  cookie.setRawCookie(req.headers.cookie);
  const token = cookie.load('token');
  jwt.verifyToken(token, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      });
    }
    next();
  });
}
