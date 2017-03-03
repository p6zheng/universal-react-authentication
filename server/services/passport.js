import passport from 'passport';
import localLogin from './strategies/localStrategy';
import githubLogin from './strategies/githubStrategy';
import facebookLogin from './strategies/facebookStrategy';
import googleLogin from './strategies/googleStrategy';
import { passportAuth } from '../utils/authHelper';

// Use strategies
passport.use(localLogin);
passport.use(githubLogin);
passport.use(facebookLogin);
passport.use(googleLogin);

export const localSignin = passportAuth('local', { session: false });
export const githubSignin = passportAuth('github', { session: false });
export const facebookSignin = passportAuth('facebook', { session: false });
export const googleSignin = passportAuth('google', { session: false, scope: 'profile email' });