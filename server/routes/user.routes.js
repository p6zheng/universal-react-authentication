import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authenticateUser } from '../controllers/auth.controller';

const router = new Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/uploads/user/photo');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.route('/profile').get(authenticateUser, userController.getProfile);
router.route('/profile').post(authenticateUser, userController.updateProfile);

router.route('/account').get(authenticateUser, userController.getAccount);
router.route('/account').post(authenticateUser, userController.updateAccount);

router.route('/photo').get(authenticateUser, userController.getPhoto);
router.route('/photo').post(authenticateUser, upload.single('photo'), userController.uploadPhoto);

router.route('/unlink').post(authenticateUser, userController.unlinkProvider);

export default router;