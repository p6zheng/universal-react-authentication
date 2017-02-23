import { Router } from 'express';
import { getProfile, updateProfile, getAccount, updateAccount } from '../controllers/user.controller';
import { authenticateUser } from '../controllers/auth.controller';

const router = new Router();

router.route('/profile').get(authenticateUser, getProfile);
router.route('/profile').post(authenticateUser, updateProfile);

router.route('/account').get(authenticateUser, getAccount);
router.route('/account').post(authenticateUser, updateAccount);

export default router;