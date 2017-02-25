import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { passportAuth } from '../utils/authHelper';
import '../services/passport';

export const localSignin = passportAuth('local');
export const githubSignin = passportAuth('github');
export const facebookSignin = passportAuth('facebook');
export const googleSignin = passportAuth('google');

const router = new Router();

router.route('/signup').post(authController.signup, authController.setToken);
router.route('/signin').post(localSignin, authController.setToken);
router.route('/secret').get(authController.authenticateUser, (req, res) => res.send('Secret Message'));

router.route('/github').get(githubSignin);
router.route('/github/callback').get(
  githubSignin,
  authController.setToken,
  (req, res) => res.redirect('/')
);

router.route('/facebook').get(facebookSignin);
router.route('/facebook/callback').get(
  facebookSignin,
  authController.setToken,
  (req, res) => res.redirect('/')
);

router.route('/google').get(googleSignin);
router.route('/google/callback').get(
  googleSignin,
  authController.setToken,
  (req, res) => res.redirect('/')
);

export default router;