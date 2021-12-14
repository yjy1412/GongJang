const express = require('express');
const router = express.Router();

const commentsControllers = require("../controllers/comments");

router.post('/', commentsControllers.post);

router.get('/:post_id', commentsControllers.get);

router.patch('/:comment_id', commentsControllers.patch);

router.delete('/:comment_id', commentsControllers.delete);

module.exports = router;