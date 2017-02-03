import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/user.controller';
import * as authController from '../controllers/auth.controller';

const router = new Router();

router.route('/profile').get(authController.authenticateUser, getProfile);
router.route('/profile').post(authController.authenticateUser, updateProfile);

export default router;