const express = require('express');
const router = express.Router();
const recommentsControllers = require("../controllers/recomments");

router.post('/:comments_id', recommentsControllers.post)

router.get('/:comments_id', recommentsControllers.get)

router.patch('/', recommentsControllers.patch)

router.delete('/', recommentsControllers.delete)

module.exports = router;