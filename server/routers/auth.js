const express = require('express');
// multer 설정
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../uploads/profileImg')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })
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

module.exports = router;