const express = require('express');
const router = express.Router();
const recommentsControllers = require("../controllers/recomments");

router.post('/:comments_id', recommentsControllers.post)

router.get('/:comments_id', recommentsControllers.get)

router.patch('/:comments_id', recommentsControllers.patch)

router.delete('/:comments_id', recommentsControllers.delete)

module.exports = router;