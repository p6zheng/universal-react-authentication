import jwt from 'jsonwebtoken';
import config from '../config';
import passport from 'passport';

export const tokenForUser = (user) => {
  return jwt.sign({sub: user._id}, config.jwt.secret, {expiresIn: 720000});
}

export const verifyToken = (token, cb) => {
  jwt.verify(token, config.jwt.secret, cb);
}

export const passportAuth = (strategy) => (req, res, next) =>
  passport.authenticate(strategy,
    (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        return res.status(401).json({
          message: info.message
        });
      }
      next();
    },
    { session: false })(req, res, next);