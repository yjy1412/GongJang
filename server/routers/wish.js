const express = require('express');
const router = express.Router();

const wishControllers = require("../controllers/wish");

router.post('/', wishControllers.post);

router.delete('/', wishControllers.delete);

module.exports = router;