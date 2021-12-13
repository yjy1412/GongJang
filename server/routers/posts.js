const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'uploads/', limits: { fieldSize: 50 * 1024 * 1024 } });
const router = express.Router();
const postsControllers = require('../controllers/posts');

router.post('/', upload.array('image', 3) ,postsControllers.post);

router.patch('/:posts_id', upload.array('image', 3), postsControllers.patch);

router.delete('/:posts_id', postsControllers.delete);

router.get('/', postsControllers.get);

router.get('/:posts_id', postsControllers.getDetail);

module.exports = router;