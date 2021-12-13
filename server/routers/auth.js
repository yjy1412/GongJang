const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'uploads/', limits: { fieldSize: 50 * 1024 * 1024 } })
const router = express.Router();
const authControllers = require('../controllers/auth')


router.post('/sign-up', authControllers.signup);

router.post('/log-in', authControllers.login);

router.post('/log-out', authControllers.logout);

router.delete('/sign-out', authControllers.signout);

router.get('/mypage', authControllers.getMypage);

router.patch('/nickname', authControllers.patchNickname);

router.patch('/profile-image', upload.single('profile_image'),authControllers.patchProfileImg);

router.patch('/password', authControllers.patchPassword);

router.get('/mypage/posts', authControllers.getMyPosts);

router.get('/wish-list', authControllers.getWishLists);

router.post('/google/login', authControllers.googleLogin);

module.exports = router;