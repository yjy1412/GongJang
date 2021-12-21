const express = require('express');
const router = express.Router();
const recommentsControllers = require("../controllers/recomments");

router.post('/:comment_id', recommentsControllers.post)

router.get('/:comment_id', recommentsControllers.get)

router.patch('/:comment_id', recommentsControllers.patch)

router.delete('/:comment_id', recommentsControllers.delete)

module.exports = router;