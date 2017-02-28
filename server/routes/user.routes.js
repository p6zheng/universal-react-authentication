import { Router } from 'express';
import { getProfile, updateProfile, getAccount, updateAccount, getPhoto, uploadPhoto } from '../controllers/user.controller';
import { authenticateUser } from '../controllers/auth.controller';

const router = new Router();
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/uploads/user/photo')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage });

router.route('/profile').get(authenticateUser, getProfile);
router.route('/profile').post(authenticateUser, updateProfile);

router.route('/account').get(authenticateUser, getAccount);
router.route('/account').post(authenticateUser, updateAccount);

router.route('/photo').get(authenticateUser, getPhoto);
router.route('/photo').post(authenticateUser, upload.single('photo'), uploadPhoto);

export default router;