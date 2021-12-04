const express = require('express');

const router = express.Router();
const postsControllers = require('../controllers/posts');

router.post('/', postsControllers.post);

router.patch('/:posts_id', postsControllers.patch);

router.delete('/:posts_id', postsControllers.delete);

router.get('/', postsControllers.get);

router.get('/:posts_id', postsControllers.getDetail);

module.exports = router;