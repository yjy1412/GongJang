const express = require('express');

const router = express.Router();
const authRouter = require('./auth');
const postsRouter = require('./posts');
const wishRouter = require('./wish');
const commentsRouter = require('./comments');

router.use('/auth', authRouter);

router.use('/posts', postsRouter);

router.use('/wish', wishRouter);

router.use('/comments', commentsRouter);

module.exports = router;