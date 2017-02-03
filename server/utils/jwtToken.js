import jwt from 'jsonwebtoken';
import config from '../config';

export const tokenForUser = (user) => {
  return jwt.sign({sub: user._id}, config.jwt.secret, {expiresIn: 7200});
}

export const verifyToken = (token, cb) => {
  jwt.verify(token, config.jwt.secret, cb);
}