import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import * as passport from '../services/passport';

const router = new Router();

router.route('/signup').post(
  authController.signup,
  authController.setToken,
  (req, res) => {
    const user= req.user;
    res.send({
      userName: user.profile.name,
      userPhoto: user.profile.picture
    });
  }
);
router.route('/signin').post(
  passport.localSignin,
  authController.setToken,
  (req, res) => {
    const user= req.user;
    res.send({
      userName: user.profile.name,
      userPhoto: user.profile.picture
    });
  }
);
router.route('/secret').get(authController.authenticateUser, (req, res) => res.send('Secret Message'));

router.route('/github').get(passport.githubSignin);
router.route('/github/callback').get(
  passport.githubSignin,
  authController.setToken,
  (req, res) => res.redirect('/')
);

router.route('/facebook').get(passport.facebookSignin);
router.route('/facebook/callback').get(
  passport.facebookSignin,
  authController.setToken,
  (req, res) => res.redirect('/')
);

router.route('/google').get(passport.googleSignin);
router.route('/google/callback').get(
  passport.googleSignin,
  authController.setToken,
  (req, res) => res.redirect('/')
);

export default router;