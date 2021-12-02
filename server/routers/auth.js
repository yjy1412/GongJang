const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/auth')

router.post('/sign-up', authControllers.signup);

router.post('/log-in', authControllers.login);

router.post('/log-out', authControllers.logout);

router.delete('/sign-out', authControllers.signout);

router.get('/mypage', authControllers.getMypage);

router.patch('/mypage', authControllers.patchMypage);

router.patch('/password', authControllers.patchPassword);

router.get('/mypage/posts', authControllers.getMyPosts);

router.get('/wish-list', authControllers.getWishLists);

module.exports = router;