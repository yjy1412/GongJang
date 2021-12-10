const express = require('express');
const router = express.Router();

const commentsControllers = require("../controllers/comments");

router.post('/', commentsControllers.post);

router.get('/:posts_id', commentsControllers.get);

router.patch('/:comments_id', commentsControllers.patch);

router.delete('/:comments_id', commentsControllers.delete);

// router.post('/reco/:comments_id', commentsControllers.refPost)

// router.get('/reco/:comments_id', commentsControllers.refGet)

module.exports = router;