const express = require('express');

module.exports = {
  // POST /posts
  post: (req, res) => {
    res.send('POST /posts')
  },
  // PATCH /posts/:posts_id
  patch: (req, res) => {
    console.log(req.params.posts_id)
    const postsId = req.params.posts_id;

    res.json({
      method: 'PATCH /posts/:posts_id',
      postsId
    });
  },
  // DELETE /posts/:posts_id
  delete: (req, res) => {
    console.log(req.params.posts_id)
    const postsId = req.params.posts_id;

    res.json({
      method: 'dELETE /posts/:posts_id',
      postsId
    });
  },
  // GET /posts
  get : (req, res) => {
    res.send('GET /posts');
  },
  // GET /posts/:user_email
  getWishLists: (req, res) => {
    console.log(req.params.user_email);
    const userEmail = req.params.user_email;

    res.json({
      method: 'GET /posts/:user_email',
      userEmail
    });
  },
  // GET /posts/:posts_id
  getDetail: (req, res) => {
    console.log(req.params.posts_id);
    const postsId = req.params.posts_id;

    res.json({
      method: 'GET /posts/:posts_id',
      postsId
    });
  }
}