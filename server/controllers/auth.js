const express = require('express');

module.exports = {
  // POST auth/signup
  signup : (req, res) => {
    res.send('auth/signup');
  },
  // POST auth/log-in
  login : (req, res) => {
    res.send('auth/login');
  },
  // POST auth/log-out
  logout : (req, res) => {
    res.send('auth/logout');
  },
  // DELETE auth/sign-out
  signout : (req, res) => {
    res.send('auth/signout');
  },
  // GET auth/mypage
  getMypage : (req, res) => {
    res.send('Get auth/mypage');
  },
  // GET auth/mypage/posts
  getMyposts : (req, res) => {
    res.send('Get auth/mypage/posts');
  },
  // PATCH auth/mypage
  patchMypage : (req, res) => {
    res.send('Patch auth/mypage');
  },
  // PATCH auth/password
  patchPassword : (req, res) => {
    res.send('Patch auth/password');
  }

}