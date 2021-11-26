const express = require('express');
const router = express.Router();

const commentsControllers = require("../controllers/comments");

router.post('/', commentsControllers.post);

router.patch('/:comments_id', commentsControllers.patch);

router.delete('/:comments_id', commentsControllers.delete);

module.exports = router;