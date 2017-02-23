import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import passport from 'passport';
import '../services/auth';

const requireSignin = passport.authenticate('local', { session: false });
const requireGithub = passport.authenticate('github', { session: false });
const requireFacebook = passport.authenticate('facebook', { session: false });
const requireGoogle = passport.authenticate('google',  { scope: 'profile email' }, { session: false });
const router = new Router();

router.route('/signup').post(authController.signup, authController.setToken);
router.route('/signin').post(requireSignin, authController.setToken);
router.route('/secret').get(authController.authenticateUser, (req, res) => res.send('Secret Message'));

router.route('/github').get(requireGithub);
router.route('/github/callback').get(
  passport.authenticate('github', { session: false, failureRedirect: '/signin' }),
  authController.setToken,
  (req, res) => res.redirect('/')
);

router.route('/facebook').get(requireFacebook);
router.route('/facebook/callback').get(
  passport.authenticate('facebook', { session: false, failureRedirect: '/signin' }),
  authController.setToken,
  (req, res) => res.redirect('/')
);

router.route('/google').get(requireGoogle);
router.route('/google/callback').get(
  passport.authenticate('google', { session: false, failureRedirect: '/signin' }),
  authController.setToken,
  (req, res) => res.redirect('/')
);

export default router;