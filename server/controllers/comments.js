const express = require('express');
const router = express.Router();

module.exports = {
  // POST /comments
  post: (req, res) => {
    console.log(req.body);
    const reqBody = req.body;

    res.json({
      method: 'POST /comments',
      reqBody
    });
  },
  // PATCH /comments/:comments_id
  patch: (req, res) => {
    console.log(req.params.comments_id);
    console.log(req.body);

    const commentsId = req.params.comments_id;
    const reqBody = req.body;

    res.json({
      method: 'PATCH /comments/:comments_id',
      commentsId,
      reqBody
    });
  },
  // DELETE /comments/:comments_id
  delete: (req, res) => {
    console.log(req.params.comments_id);
    console.log(req.body);

    const commentsId = req.params.comments_id;
    const reqBody = req.body;

    res.json({
      method: 'DELETE /comments/:comments_id',
      commentsId,
      reqBody
    });
  }
}